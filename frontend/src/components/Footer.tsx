import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check } from "lucide-react"
import { useTheme } from "./Themetoogler/ThemeContext"

export function Footer() {
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setEmail("")
    }, 2000)
  }

  const socialLinks = [
    {
      imageSrc: "/images/x.svg",
      href: "https://x.com/ssrathore_01",
      label: "Twitter",
      hoverColor: "group-hover:text-blue-400",
    },
    {
      imageSrc: "/images/github.svg",
      href: "https://github.com/SidhantK21",
      label: "GitHub",
      hoverColor: "group-hover:text-purple-400",
    },
    {
      imageSrc: "/images/linkedin.svg",
      href: "https://www.linkedin.com/in/sidhant-singh-815a75246/",
      label: "LinkedIn",
      hoverColor: "group-hover:text-blue-500",
    },
    {
      imageSrc: "/images/mail.svg",
      href: "mailto:sidhantsinghrathoreprsnl@gmail.com",
      label: "Email",
      hoverColor: "group-hover:text-red-400",
    },
  ]

  return (
    <footer
      className={`relative transition-colors duration-300 ${theme === "dark" ? "bg-black text-white" : "bg-white text-gray-900"}`}
    >
      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme === "dark" ? "from-transparent via-purple-900/5 to-blue-900/5" : "from-transparent via-gray-300/5 to-gray-200/5"}`}
      />

      <div className={`relative border-t ${theme === "dark" ? "border-white/10" : "border-gray-300"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Newsletter Section */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <h3
                  className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${theme === "dark" ? "from-white via-white to-white/70" : "from-gray-900 via-gray-800 to-gray-600"}`}
                >
                  Stay updated
                </h3>
                <p
                  className={`text-lg leading-relaxed max-w-md ${theme === "dark" ? "text-white/60" : "text-gray-600"}`}
                >
                  Get the latest updates and insights delivered straight to your inbox.
                </p>
              </motion.div>

              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                onSubmit={handleSubmit}
                className="relative max-w-md"
              >
                <div className="relative group">
                  <div
                    className={`absolute -inset-0.5 rounded-xl opacity-30 group-hover:opacity-100 transition duration-500 group-hover:duration-200 animate-tilt blur-xl group-hover:blur-2xl ${theme === "dark" ? "bg-white/10" : "bg-gray-400/20"}`}
                  />
                  <div className="relative flex items-center">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={`w-full px-6 py-4 outline-none border rounded-xl transition-colors duration-300
                        ${theme === "dark" ? "bg-black border-gray-500 text-white placeholder:text-white/40" : "bg-white border-gray-400 text-gray-900 placeholder:text-gray-500"}
                      `}
                      required
                    />
                    <AnimatePresence mode="wait">
                      {!isSubmitted ? (
                        <motion.button
                          key="submit"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onHoverStart={() => setIsHovered(true)}
                          onHoverEnd={() => setIsHovered(false)}
                          className={`absolute right-2 px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2 shadow-xl 
                            ${theme === "dark" ? "bg-white text-black hover:bg-white/90 shadow-white/10" : "bg-gray-900 text-white hover:bg-gray-800 shadow-gray-400/10"}
                          `}
                          type="submit"
                        >
                          Subscribe
                          <motion.span animate={{ x: isHovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
                            <ArrowRight className="w-4 h-4" />
                          </motion.span>
                        </motion.button>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute right-2 bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Subscribed!
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.form>
            </div>

            {/* Social Links */}
            <div className="space-y-6 md:text-right flex flex-col items-start md:items-end">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="flex gap-6 md:justify-end"
              >
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    target="_blank"
                    href={social.href}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                    whileHover={{ y: -4 }}
                    className="group relative p-2"
                  >
                    <span className="absolute inset-0 bg-white/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <img
                      src={social.imageSrc || "/placeholder.svg"}
                      alt={social.label}
                      
                      
                      className={`w-6 h-6 transition-colors duration-300 
                        ${
                          theme === "dark"
                            ? "opacity-90 group-hover:opacity-100 brightness-0 invert"
                            : "opacity-70 group-hover:opacity-100"
                        } ${social.hoverColor}`}
                    />
                  </motion.a>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`text-sm ${theme === "dark" ? "text-white/40" : "text-gray-500"} self-start md:self-end mt-4`}
              >
                © {new Date().getFullYear()} AI Assistant. All rights reserved.
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

