import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Linkedin,
  Github,
  Instagram,
  ArrowUpRight,
  MessageSquare,
  User,
  CheckCircle2,
} from "lucide-react";
import PageTransition from "../components/PageTransition";

// --- DATA SOCIAL MEDIA ---
const SOCIAL_LINKS = [
  {
    id: 1,
    name: "LinkedIn",
    username: "Fatiya Labibah",
    icon: <Linkedin size={20} />,
    link: "https://www.linkedin.com/in/fatiya-labibah/",
    color: "text-blue-400",
  },
  {
    id: 2,
    name: "GitHub",
    username: "fatiya17",
    icon: <Github size={20} />,
    link: "https://github.com/fatiya17",
    color: "text-white",
  },
  {
    id: 3,
    name: "Instagram",
    username: "@dambelsbru_",
    icon: <Instagram size={20} />,
    link: "https://www.instagram.com/dambelsbru_/",
    color: "text-pink-500",
  },
];

const Contact = () => {
  const [focusedField, setFocusedField] = useState(null);

  const autofillStyle = {
    WebkitBoxShadow: "0 0 0 30px #2a2a2a inset",
    WebkitTextFillColor: "white",
    caretColor: "white",
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto custom-scrollbar bg-[#121212] pb-32">
        {/* header */}
        <div className="relative bg-gradient-to-b from-[#535353] via-[#2a2a2a] to-[#121212] pt-24 pb-12 px-6 md:px-10 lg:px-14 flex flex-col md:flex-row items-end gap-6 md:gap-10 transition-colors duration-500">
          {/* icon */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-32 h-32 md:w-52 md:h-52 bg-gradient-to-br from-indigo-500 to-purple-600 shadow-[0_8px_40px_rgba(0,0,0,0.5)] rounded-full md:rounded-md flex items-center justify-center shrink-0 group hover:scale-105 transition-transform duration-500"
          >
            <MessageSquare className="text-white drop-shadow-md w-14 h-14 md:w-24 md:h-24 group-hover:rotate-12 transition-transform duration-500" />
          </motion.div>

          {/* title */}
          <div className="flex flex-col gap-2 w-full z-10 pb-1">
            <span className="text-xs font-bold tracking-widest uppercase text-white flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-[#3D91F4] fill-white" />{" "}
              Verified Contact
            </span>
            <h1 className="text-4xl sm:text-6xl md:text-7xl  font-black tracking-tighter text-white drop-shadow-2xl leading-tight">
              Get in Touch
            </h1>
            <p className="text-gray-300 font-medium text-sm md:text-base mt-3 max-w-2xl leading-relaxed">
              Let's collaborate on your next project. Feel free to send a
              message or connect via social media. I'm always open to discussing
              new ideas.
            </p>
          </div>
        </div>

        {/* content */}
        <div className="px-6 md:px-10 lg:px-14 grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-12 lg:gap-20 pb-20">
          {/* socials */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {/* section title */}
            <div className="flex items-center justify-between border-b border-[#333] pb-2">
              <h3 className="text-xl font-bold text-white">Connect</h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Social Links
              </span>
            </div>

            {/* featured email card */}
            <motion.div
              variants={itemVariants}
              // P-4 di mobile, P-5 di desktop agar tidak terlalu sempit
              className="bg-[#181818] hover:bg-[#282828] p-4 md:p-5 rounded-lg group transition duration-300 border border-transparent hover:border-[#333] cursor-pointer"
            >
              <div className="flex items-center gap-3 md:gap-5">
                {/* Icon: Lebih kecil di Mobile (w-10/w-12) agar hemat ruang */}
                <div className="w-12 h-12 md:w-14 md:h-14 bg-green-500 rounded-full flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition shrink-0">
                  <Mail className="w-5 h-5 md:w-6 md:h-6" />
                </div>

                {/* Text Area */}
                <div className="overflow-hidden min-w-0 flex-1">
                  <p className="text-gray-400 text-[10px] uppercase font-bold tracking-widest mb-0.5 md:mb-1 group-hover:text-green-400 transition">
                    Primary Email
                  </p>

                  {/* Email Link: 
                - text-sm (Mobile) -> text-base (Tablet) -> text-xl (Desktop) 
                - truncate: Memotong teks jika masih kepanjangan (...)
            */}
                  <a
                    href="mailto:fatiyalabibah17@gmail.com"
                    className="text-white font-bold text-sm sm:text-base md:text-xl hover:underline truncate block"
                    title="fatiyalabibah17@gmail.com"
                  >
                    fatiyalabibah17@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* social list */}
            <div className="flex flex-col">
              {SOCIAL_LINKS.map((social, idx) => (
                <motion.a
                  variants={itemVariants}
                  key={social.id}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3 -mx-3 rounded-md hover:bg-[#ffffff1a] group transition cursor-pointer"
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <span className="text-gray-500 font-mono text-sm w-5 text-center group-hover:text-white transition">
                      {idx + 1}
                    </span>
                    <div className="p-2 rounded bg-[#2a2a2a] group-hover:bg-[#333] text-gray-300 group-hover:text-white transition shrink-0">
                      {social.icon}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span
                        className={`font-bold text-base ${social.color} group-hover:text-white transition truncate`}
                      >
                        {social.name}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-gray-300 transition truncate">
                        {social.username}
                      </span>
                    </div>
                  </div>
                  <ArrowUpRight
                    size={18}
                    className="text-gray-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all transform group-hover:translate-x-1 group-hover:-translate-y-1 shrink-0"
                  />
                </motion.a>
              ))}
            </div>

            {/* location badge */}
            <div className="inline-flex items-center gap-3 text-gray-400 text-sm mt-4 px-4 py-2 bg-[#181818] rounded-full border border-transparent hover:border-[#333] transition">
              <MapPin size={16} className="text-red-500" />
              <span>
                Based in <b className="text-white">Bogor Regency, Indonesia</b>
              </span>
            </div>
          </motion.div>

          {/* form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-[#121212]"
          >
            <div className="flex items-center justify-between border-b border-[#333] pb-2 mb-8">
              <h3 className="text-xl font-bold text-white">Send a Message</h3>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                No Login Required
              </span>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 group">
                  <label
                    className={`text-[11px] font-bold tracking-widest transition-colors ${
                      focusedField === "name"
                        ? "text-[#1ed760]"
                        : "text-gray-400"
                    }`}
                  >
                    NAME
                  </label>
                  {/* HAPUS style={autofillStyle} */}
                  <input
                    type="text"
                    placeholder="What's your name?"
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-[#2a2a2a] hover:bg-[#3E3E3E] focus:bg-[#333] text-white rounded-md p-3.5 outline-none border border-transparent focus:border-[#1ed760] transition-all font-medium placeholder-gray-500 shadow-sm"
                  />
                </div>

                {/* email field */}
                <div className="flex flex-col gap-2 group">
                  <label
                    className={`text-[11px] font-bold tracking-widest transition-colors ${
                      focusedField === "email"
                        ? "text-[#1ed760]"
                        : "text-gray-400"
                    }`}
                  >
                    EMAIL
                  </label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-[#2a2a2a] hover:bg-[#3E3E3E] focus:bg-[#333] text-white rounded-md p-3.5 outline-none border border-transparent focus:border-[#1ed760] transition-all font-medium placeholder-gray-500 shadow-sm"
                  />
                </div>
              </div>

              {/* subject field */}
              <div className="flex flex-col gap-2 group">
                <label
                  className={`text-[11px] font-bold tracking-widest transition-colors ${
                    focusedField === "subject"
                      ? "text-[#1ed760]"
                      : "text-gray-400"
                  }`}
                >
                  SUBJECT
                </label>
                <input
                  type="text"
                  placeholder="Project Inquiry / Collab"
                  onFocus={() => setFocusedField("subject")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#2a2a2a] hover:bg-[#3E3E3E] focus:bg-[#333] text-white rounded-md p-3.5 outline-none border border-transparent focus:border-[#1ed760] transition-all font-medium placeholder-gray-500 shadow-sm"
                />
              </div>

              {/* message field */}
              <div className="flex flex-col gap-2 group">
                <label
                  className={`text-[11px] font-bold tracking-widest transition-colors ${
                    focusedField === "message"
                      ? "text-[#1ed760]"
                      : "text-gray-400"
                  }`}
                >
                  MESSAGE
                </label>
                <textarea
                  rows="5"
                  placeholder="Tell me more about your project..."
                  onFocus={() => setFocusedField("message")}
                  onBlur={() => setFocusedField(null)}
                  className="w-full bg-[#2a2a2a] hover:bg-[#3E3E3E] focus:bg-[#333] text-white rounded-md p-3.5 outline-none border border-transparent focus:border-[#1ed760] transition-all font-medium placeholder-gray-500 resize-none shadow-sm"
                ></textarea>
              </div>

              {/* submit button */}
              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  className="
                                w-full md:w-auto
                                bg-[#1ed760] hover:bg-[#1db954] text-black font-bold 
                                py-3.5 px-10 rounded-full 
                                transition-all transform hover:scale-105 active:scale-95 
                                flex items-center justify-center gap-2 
                                shadow-lg shadow-green-900/20
                            "
                >
                  Send Message <Send size={18} strokeWidth={2.5} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact;
