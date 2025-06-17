import React from "react"
import { Bot, Menu, X, Sun, Moon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "./Themetoogler/ThemeContext"

interface NavbarProps {
  onGetStarted: () => void
}

export function Navbar({ onGetStarted }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const { theme, toggleTheme } = useTheme()

  const darkMode = theme === "dark"

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const navItems = [
    { href: "#features", label: "Features" },
    { href: "#pricing", label: "Pricing" },
    { href: "#about", label: "About" },
  ]

  return (
    <div className="fixed w-full flex justify-center z-50 px-4 top-6">
      <motion.nav
        className={`${darkMode ? "bg-black/30 text-white border-white/10" : "bg-white/80 text-black border-gray-200"} backdrop-blur-lg border rounded-2xl px-6 py-3 w-full max-w-4xl`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-between w-full">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <Bot className={`h-5 w-5 ${darkMode ? "text-white" : "text-black"}`} />
              <span className={`ml-2 text-sm font-medium ${darkMode ? "text-white/90" : "text-black/90"}`}>
                SMMRY
              </span>
            </div>

            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className={`text-sm ${darkMode ? "text-white/75 hover:text-white" : "text-black/75 hover:text-black"} transition-colors`}
                // whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
                <motion.div
                  className="absolute bottom-0 left-0 w-0 h-px bg-white/50 group-hover:w-full"
                  transition={{ duration: 0.2 }}
                  whileHover={{ width: "100%" }}
                />
              </motion.a>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`${darkMode ? "text-white/75 hover:text-white" : "text-black/75 hover:text-black"} transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={onGetStarted}
              className={`text-sm ${darkMode ? "bg-white/10 hover:bg-white/20 text-white border-white/10" : "bg-black/5 hover:bg-black/10 text-black border-black/10"} px-4 py-1.5 rounded-full border transition-colors`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center justify-between w-full">
          <motion.div className="flex items-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Bot className={`h-5 w-5 ${darkMode ? "text-white" : "text-black"}`} />
            <span className={`ml-2 text-sm font-medium ${darkMode ? "text-white/90" : "text-black/90"}`}>
              AI Assistant
            </span>
          </motion.div>

          <div className="flex items-center space-x-4">
            <motion.button
              onClick={toggleTheme}
              className={`${darkMode ? "text-white/75 hover:text-white" : "text-black/75 hover:text-black"} transition-colors p-1.5`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {theme === "dark" ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            <motion.button
              onClick={toggleMenu}
              className={`${darkMode ? "text-white/75 hover:text-white bg-white/10" : "text-black/75 hover:text-black bg-black/5"} focus:outline-none p-1.5 rounded-full`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-5 w-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-5 w-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-x-0 top-[5.5rem] px-4 md:hidden"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className={`${darkMode ? "bg-black/30 border-white/10" : "bg-white/80 border-gray-200"} backdrop-blur-xl border rounded-xl overflow-hidden shadow-lg`}
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="p-4 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.href}
                    href={item.href}
                    className={`flex items-center w-full py-2.5 px-3 text-base font-medium ${darkMode ? "text-white/80 hover:text-white hover:bg-white/5" : "text-black/80 hover:text-black hover:bg-black/5"} rounded-lg transition-colors`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => setIsMenuOpen(false)}
                    whileTap={{ scale: 0.98 }}
                  >
                    {item.label}
                  </motion.a>
                ))}
                <motion.div
                  className="pt-2 pb-1 px-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.2 }}
                >
                  <motion.button
                    onClick={() => {
                      onGetStarted()
                      setIsMenuOpen(false)
                    }}
                    className={`w-full flex justify-center ${darkMode ? "text-white bg-white/10 hover:bg-white/15 border-white/10" : "text-black bg-black/5 hover:bg-black/10 border-black/10"} px-4 py-3 rounded-lg border transition-colors font-medium`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Get Started
                  </motion.button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

