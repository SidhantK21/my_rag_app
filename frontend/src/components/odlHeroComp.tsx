import { motion } from "framer-motion"
import { useTheme } from "./Themetoogler/ThemeContext"

const titleVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut",
      delay: 0.3,
    },
  },
}

const floatingVariants = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  },
}

export const Hero = () => {
  const { theme,  } = useTheme()
  const darkMode = theme === "dark"

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-300 ${
        darkMode ? "bg-black" : "bg-white"
      }`}
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0">
        <div
          className={`absolute top-1/4 left-1/4 w-96 h-96 ${darkMode ? "bg-blue-500/20" : "bg-blue-500/10"} rounded-full blur-[128px]`}
        />
        <div
          className={`absolute bottom-1/4 right-1/4 w-96 h-96 ${darkMode ? "bg-purple-500/20" : "bg-purple-500/10"} rounded-full blur-[128px]`}
        />
      </div>

      {/* Grid pattern with dots */}
      <motion.div className="absolute inset-0" variants={gridVariants} initial="hidden" animate="visible">
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.25)_2px,_transparent_2px)]"
              : "bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.15)_2px,_transparent_2px)]"
          } [background-size:48px_48px]`}
        />
        <div
          className={`absolute inset-0 ${
            darkMode
              ? "bg-[linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)]"
              : "bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]"
          } bg-[size:48px_48px]`}
        />
      </motion.div>

      {/* Radial gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${
          darkMode ? "from-black via-black/50 to-black" : "from-white via-white/50 to-white"
        }`}
      ></div>
      <div
        className={`absolute inset-0 ${
          darkMode
            ? "bg-[radial-gradient(circle_at_center,transparent_35%,black)]"
            : "bg-[radial-gradient(circle_at_center,transparent_35%,white)]"
        }`}
      ></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <motion.div className="text-center" variants={titleVariants} initial="hidden" animate="visible">
          <motion.div variants={floatingVariants} initial="initial" animate="animate" className="mb-8">
            <div
              className={`inline-flex items-center px-6 py-2 rounded-full ${
                darkMode ? "border border-white/10 bg-white/5" : "border border-black/10 bg-black/5"
              } backdrop-blur-sm`}
            >
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse mr-2" />
              <span className={`text-sm ${darkMode ? "text-white/80" : "text-black/80"}`}>AI-Powered</span>
            </div>
          </motion.div>

          <h1 className="text-6xl md:text-8xl font-extrabold tracking-tight mb-6 relative">
            <span className="absolute -inset-x-8 inset-y-0 hidden md:block">
              <div
                className={`w-full h-full b bg-gradient-to-r from-transparent ${
                  darkMode ? "via-white/15" : "via-black/10"
                } to-transparent skew-y-[-8deg] rounded-xl`}
              />
            </span>
            <span
              className={`relative bg-gradient-to-b ${
                darkMode ? "from-white via-white to-white/50" : "from-black via-black to-black/80"
              } bg-clip-text text-transparent`}
            >
             SMMRY
            </span>
          </h1>
          <p className={`text-xl ${darkMode ? "text-white/60" : "text-black/70"} max-w-2xl mx-auto font-light`}>
            Experience the future of intelligent assistance, powered by advanced AI technology
          </p>

          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* in this add the signin and the signup route as well  */}
            <button
              className={`px-8 py-4 rounded-full ${
                darkMode ? "border border-gray-800 text-white" : "border border-gray-200 text-black"
              } backdrop-blur-3xl font-medium hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-200 hover:-translate-y-0.5`}
            >
              Get Started
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Animated gradient lines */}
      <motion.div
        className="absolute inset-0 opacity-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div
          className={`absolute left-1/4 top-0 w-px h-full bg-gradient-to-b from-transparent ${
            darkMode ? "via-blue-500" : "via-blue-400"
          } to-transparent animate-pulse`}
        ></div>
        <div
          className={`absolute left-2/4 top-0 w-px h-full bg-gradient-to-b from-transparent ${
            darkMode ? "via-purple-500" : "via-purple-400"
          } to-transparent animate-pulse [animation-delay:200ms]`}
        ></div>
        <div
          className={`absolute left-3/4 top-0 w-px h-full bg-gradient-to-b from-transparent ${
            darkMode ? "via-cyan-500" : "via-cyan-400"
          } to-transparent animate-pulse [animation-delay:400ms]`}
        ></div>
      </motion.div>
    </div>
  )
}

