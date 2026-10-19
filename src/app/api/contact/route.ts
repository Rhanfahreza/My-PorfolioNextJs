import { NextRequest, NextResponse } from "next/server";

// In-memory sliding window rate limiter (max 3 requests per 10 minutes per IP)
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 3;
const ipRequestMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestMap.get(ip) || [];
  const validTimestamps = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestMap.set(ip, validTimestamps);
    return true;
  }

  validTimestamps.push(now);
  ipRequestMap.set(ip, validTimestamps);
  return false;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    // 1. Origin check (CSRF defense)
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Akses ditolak (Invalid Origin)." }, { status: 403 });
    }

    // 2. IP Rate Limiting
    const forwardedFor = req.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    if (isRateLimited(clientIp)) {
      return NextResponse.json(
        { error: "Terlalu banyak permintaan. Silakan tunggu beberapa menit sebelum mencoba lagi." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const { name, email, message, website_honeypot } = body;

    // 3. Honeypot check (Silent discard if bot filled hidden field)
    if (website_honeypot) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 4. Input validation
    const cleanName = typeof name === "string" ? name.trim() : "";
    const cleanEmail = typeof email === "string" ? email.trim() : "";
    const cleanMessage = typeof message === "string" ? message.trim() : "";

    if (cleanName.length < 2 || cleanName.length > 80) {
      return NextResponse.json(
        { error: "Nama harus terdiri dari 2 hingga 80 karakter." },
        { status: 400 }
      );
    }

    if (!EMAIL_REGEX.test(cleanEmail) || cleanEmail.length > 120) {
      return NextResponse.json(
        { error: "Format alamat email tidak valid." },
        { status: 400 }
      );
    }

    if (cleanMessage.length < 10 || cleanMessage.length > 2000) {
      return NextResponse.json(
        { error: "Pesan harus terdiri dari 10 hingga 2000 karakter." },
        { status: 400 }
      );
    }

    // 5. Forward to Web3Forms using server-side access key
    const accessKey = process.env.WEB3FORMS_ACCESS_KEY || "c2891275-b6f4-4cae-8328-caf9152dad39";

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name: cleanName,
        email: cleanEmail,
        message: cleanMessage,
        subject: `[Portfolio] New message from ${cleanName}`,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.success) {
      return NextResponse.json(
        { error: "Gagal mengirim pesan melalui gateway. Silakan coba lagi." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server saat memproses pesan." },
      { status: 500 }
    );
  }
}
