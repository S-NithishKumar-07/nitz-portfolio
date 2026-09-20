"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

type Message = {
  role: "bot" | "user";
  text: string;
};

const BOT_RESPONSES: Record<string, string> = {
  hi: "Hey! 👋 I'm Nithish's AI assistant. Ask me about his skills, projects, or how to contact him!",
  hello: "Hello! 😊 I'm here to tell you all about Nithishkumar. Try asking about skills, projects, or contact info!",
  about:
    "Nithishkumar is a fresher MERN Stack Developer and creative visual artist from Tamil Nadu, India. He builds full-stack web apps by day and captures cinematic stories by night 📸",
  skills:
    "Nithish is skilled in:\n• Frontend: React.js, JavaScript, HTML/CSS\n• Backend: Node.js, Express.js\n• Database: MongoDB\n• Creative: Photography, Cinematography, Video Editing 🎬",
  projects:
    "He has built several projects including an E-Commerce Platform, Task Manager, Blog REST API, and more! Scroll to the Projects section to explore them 💻",
  contact:
    "You can reach Nithishkumar at:\n📧 nithishkumar@email.com\n💼 LinkedIn: /in/nithishkumar\n🐙 GitHub: /nithishkumar",
  experience:
    "Nithishkumar is a fresher with hands-on project experience in MERN stack development. He has completed 10+ projects during his academic tenure and won multiple awards.",
  hire:
    "Nithish is available for freelance and full-time opportunities! Drop him a message via the Contact section or email him directly at nithishkumar@email.com 🚀",
  location: "Nithishkumar is based in Tamil Nadu, India 🇮🇳",
  photography:
    "Photography is Nithish's creative passion. He captures portraits, urban architecture, street photography, and cinematic reels. Check the Creative Works section!",
  default:
    "Interesting! I can tell you about Nithish's skills, projects, contact info, or experience. What would you like to know? 😊",
};

function getBotResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const key of Object.keys(BOT_RESPONSES)) {
    if (lower.includes(key)) return BOT_RESPONSES[key];
  }
  return BOT_RESPONSES.default;
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Hi! 👋 I'm Nithish's virtual assistant. Ask me anything about him — skills, projects, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;

    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = getBotResponse(text);
      setMessages((m) => [...m, { role: "bot", text: response }]);
      setTyping(false);
    }, 800);
  };

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{
          background: "linear-gradient(135deg, var(--accent-cyan), #0077AA)",
          boxShadow: "0 4px 30px rgba(0,217,255,0.4)",
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Open chatbot"
        id="chatbot-toggle"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} color="white" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <MessageCircle size={22} color="white" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 left-6 z-50 w-80 rounded-2xl overflow-hidden"
            style={{
              background: "rgba(10,10,16,0.95)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(0,217,255,0.15)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(0,217,255,0.05)",
            }}
          >
            {/* Header */}
            <div
              className="px-4 py-3 flex items-center justify-between"
              style={{ background: "linear-gradient(135deg, rgba(0,217,255,0.1), rgba(139,92,246,0.1))", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(0,217,255,0.15)" }}
                >
                  <Bot size={18} style={{ color: "var(--accent-cyan)" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">Nithish's Assistant</p>
                  <p className="text-xs" style={{ color: "var(--accent-cyan)" }}>● Online</p>
                </div>
              </div>
              
              <button 
                onClick={() => setOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                aria-label="Close chatbot"
              >
                <X size={16} className="text-white/70 hover:text-white" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-64 overflow-y-auto p-4 flex flex-col gap-3" style={{ scrollbarWidth: "none" }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex gap-2 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: msg.role === "bot"
                        ? "rgba(0,217,255,0.15)"
                        : "rgba(139,92,246,0.15)",
                    }}
                  >
                    {msg.role === "bot"
                      ? <Bot size={13} style={{ color: "var(--accent-cyan)" }} />
                      : <User size={13} style={{ color: "var(--accent-purple)" }} />
                    }
                  </div>
                  <div
                    className="max-w-[75%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-line"
                    style={{
                      background: msg.role === "bot"
                        ? "rgba(255,255,255,0.05)"
                        : "rgba(139,92,246,0.15)",
                      color: "rgba(255,255,255,0.85)",
                      border: msg.role === "bot"
                        ? "1px solid rgba(255,255,255,0.06)"
                        : "1px solid rgba(139,92,246,0.2)",
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: "rgba(0,217,255,0.15)" }}>
                    <Bot size={13} style={{ color: "var(--accent-cyan)" }} />
                  </div>
                  <div className="px-3 py-2 rounded-xl flex gap-1 items-center" style={{ background: "rgba(255,255,255,0.05)" }}>
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 rounded-full"
                        style={{
                          background: "var(--accent-cyan)",
                          animation: `bounce 1s ease infinite ${i * 0.2}s`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div
              className="px-3 py-3 flex gap-2"
              style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder="Ask me anything..."
                className="flex-1 text-xs rounded-lg px-3 py-2 outline-none"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  color: "white",
                }}
                id="chatbot-input"
              />
              <button
                onClick={sendMessage}
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, var(--accent-cyan), #0077AA)" }}
                aria-label="Send message"
              >
                <Send size={13} color="white" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-6px); }
        }
      `}</style>
    </>
  );
}
