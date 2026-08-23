"use client";

import { useState } from "react";
import { Send, ArrowUpRight, Shield } from "lucide-react";

export default function ContactForm({ showContent = false }: { showContent?: boolean }) {
  const [result, setResult] = useState("");

  // Handler submit form via Web3Forms API
  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const form = event.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", "c2891275-b6f4-4cae-8328-caf9152dad39");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();
    if (data.success) {
      setResult("Terima kasih! Pesan Anda telah berhasil dikirim.");
      form.reset();
    } else {
      setResult("Gagal mengirim pesan");
    }
  };

  return (
    <section id="contact" className="py-20 pb-32 md:pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div
          className={`text-center md:text-left mb-12 transition-all duration-1000 ease-out-expo delay-900 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
            }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded border-2 border-black dark:border-zinc-700 bg-google-yellow text-black text-xs font-bold uppercase tracking-wider mb-3 shadow-[2px_2px_0px_#000]">
            Contact
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white uppercase tracking-tight">
            Let&apos;s Connect
          </h2>
          <div className="w-16 h-2 bg-google-yellow border-2 border-black dark:border-zinc-700 shadow-[2px_2px_0px_#000] dark:shadow-[2px_2px_0px_#000] rounded-sm mt-2 mx-auto md:mx-0"></div>
          <p className="text-zinc-800 dark:text-zinc-300 font-semibold max-w-lg mt-3">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Form Card */}
          <div
            className={`gdg-card p-6 md:p-8 hover:border-google-blue transition-all duration-1000 ease-out-expo delay-1000 ${showContent ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-8 pointer-events-none"
              }`}
          >
            <form className="space-y-4" onSubmit={onSubmit}>
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                  className="w-full px-4 py-2.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium focus:outline-none focus:bg-yellow-50 dark:focus:bg-zinc-700 focus:shadow-[2px_2px_0px_#000] dark:focus:shadow-[2px_2px_0px_#000] transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-2.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium focus:outline-none focus:bg-yellow-50 dark:focus:bg-zinc-700 focus:shadow-[2px_2px_0px_#000] dark:focus:shadow-[2px_2px_0px_#000] transition-all"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-xs font-black uppercase tracking-wider text-black dark:text-white mb-1.5"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  placeholder="Tell me about your project..."
                  required
                  className="w-full px-4 py-2.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm text-black dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 font-medium focus:outline-none focus:bg-yellow-50 dark:focus:bg-zinc-700 focus:shadow-[2px_2px_0px_#000] dark:focus:shadow-[2px_2px_0px_#000] transition-all resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-google-blue text-white border-2 border-black dark:border-zinc-700 rounded font-bold shadow-[4px_4px_0px_#000] dark:shadow-[4px_4px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all mt-2 cursor-pointer"
              >
                <Send size={16} />
                Send Message
              </button>
              {result && (
                <div className={`text-xs font-black uppercase tracking-wider text-center mt-3 p-3 rounded border-2 border-black dark:border-zinc-700 shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] transition-all ${result.includes("Terima kasih") || result.includes("Thank you") || result.includes("Successfully")
                  ? "bg-google-green text-white"
                  : result.includes("Sending")
                    ? "bg-google-yellow text-black"
                    : "bg-google-red text-white"
                  }`}>
                  {result}
                </div>
              )}
            </form>
          </div>

          {/* Kolom Kanan: Media Sosial & Kartu Tim */}
          <div
            className={`flex flex-col gap-6 transition-all duration-1000 ease-out-expo delay-1050 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
              }`}
          >
            {/* Kartu Link Media Sosial */}
            <div className="gdg-card p-6 md:p-8 hover:border-google-yellow">
              <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-5">
                Find me on
              </h3>
              <div className="space-y-3">
                <a
                  href="https://github.com/Rhanfahreza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span className="text-sm font-bold uppercase">GitHub</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-800 dark:text-zinc-200 transition-colors" />
                </a>
                <a
                  href="https://www.linkedin.com/in/rayhan-arie-fahreza-6408a138a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1 2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.8v8.37h2.8v-4.67c0-.25.02-.5.1-.68a1.14 1.14 0 0 1 1-.77c.76 0 1 .56 1 1.39v4.73h2.8M6.5 8.37a1.37 1.37 0 0 0 1.3-1.3A1.3 1.3 0 0 0 6.5 5.7a1.3 1.3 0 0 0-1.3 1.3c0 .76.57 1.37 1.3 1.37m1.4 10.13V10.2H5.1v8.3h2.8z" />
                    </svg>
                    <span className="text-sm font-bold uppercase">LinkedIn</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-800 dark:text-zinc-200 transition-colors" />
                </a>
                <a
                  href="https://www.instagram.com/rayhanarfhrz/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200">
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                    <span className="text-sm font-bold uppercase">Instagram</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-800 dark:text-zinc-200 transition-colors" />
                </a>
                <a
                  href="https://s.id/Rayhan-Arie-Fahreza"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3 text-zinc-800 dark:text-zinc-200">
                    <svg className="w-5 h-5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    <span className="text-sm font-bold uppercase">My Personal Link</span>
                  </div>
                  <ArrowUpRight size={16} className="text-zinc-800 dark:text-zinc-200 transition-colors" />
                </a>
              </div>
            </div>

            {/* Kartu Informasi Tim & Edukasi */}
            <div className="gdg-card p-6 md:p-8 hover:border-google-blue flex flex-col justify-between">
              <div>
                <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-white mb-5">
                  Team
                </h3>
                <div className="space-y-4">
                  {/* Info tim */}
                  <a
                    href="https://www.ackteams.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3.5 rounded border-2 border-black dark:border-zinc-700 bg-white dark:bg-zinc-800 text-black dark:text-white shadow-[3px_3px_0px_#000] dark:shadow-[3px_3px_0px_#000] hover:translate-x-px hover:translate-y-px hover:shadow-[2px_2px_0px_#000] dark:hover:shadow-[2px_2px_0px_#000] transition-all duration-150 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <Shield size={20} className="text-google-blue shrink-0" />
                      <div className="text-left min-w-0">
                        <span className="block text-[9px] font-black uppercase text-zinc-400 dark:text-zinc-500">Member of</span>
                        <span className="text-xs font-black uppercase block truncate">Acnowledge Teams</span>
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-zinc-800 dark:text-zinc-200 transition-colors shrink-0" />
                  </a>
                </div>
              </div>

              <div className="mt-8 p-4 bg-zinc-50 dark:bg-zinc-800/40 rounded border-2 border-black dark:border-zinc-800 text-center">
                <span className="text-xs text-zinc-800 dark:text-zinc-300 font-bold">
                  Open for internship &amp; bug bounty collaboration.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          className={`text-center mt-20 pt-8 border-t-2 border-black dark:border-white transition-all duration-1000 ease-out-expo delay-1100 ${showContent ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="flex items-center justify-center gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-google-blue border border-black dark:border-white shadow-[1px_1px_0px_#000]" />
            <div className="w-2.5 h-2.5 rounded-full bg-google-red border border-black dark:border-white shadow-[1px_1px_0px_#000]" />
            <div className="w-2.5 h-2.5 rounded-full bg-google-yellow border border-black dark:border-white shadow-[1px_1px_0px_#000]" />
            <div className="w-2.5 h-2.5 rounded-full bg-google-green border border-black dark:border-white shadow-[1px_1px_0px_#000]" />
          </div>
          <p className="text-xs text-black dark:text-white font-bold">
            © {new Date().getFullYear()} Rayhan Arie Fahreza.

          </p>
        </div>
      </div>
    </section>
  );
}
