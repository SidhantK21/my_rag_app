import { motion } from "framer-motion";
import { useTheme } from "./Themetoogler/ThemeContext";
import { Spotlight } from "./ui/SpotLightHero";
import { NumberTicker } from "./ui/Ticker";

// Animation variants for consistent animations
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const stats = [
  {
    label: "Active Users",
    value: 20,
    suffix: "",
    description: "Across 20+ countries"
  },
  {
    label: "Documents Processed",
    value: 100,
    suffix: "",
    description: "With 99.9% accuracy"
  },
  {
    label: "Time Saved",
    value: 100,
    suffix: "+",
    description: "For our customers monthly"
  }
];

export function NewHero() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section className={`relative min-h-screen w-full overflow-hidden ${isDark ? "bg-black" : "bg-white"}`}>
      {/* Background spotlight effect */}
      <Spotlight />

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-30 pb-16 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-6xl mx-auto"
        >
          <div className="flex flex-col items-center text-center space-y-12 md:space-y-16">
            {/* Hero Title */}
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.2 }}
              variants={fadeIn}
              className="space-y-6 px-2"
            >
              <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight ${
                isDark ? "text-white" : "text-black"
              }`}>
                PDF READER
              </h1>

              <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
                isDark ? "text-white/70" : "text-black/70"
              }`}>
                Experience the future of document analysis with our advanced AI-powered platform.
                Extract insights, analyze content, and make data-driven decisions effortlessly.
              </p>
            </motion.div>

            {/* Call to Action Buttons */}
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.4 }}
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 px-2"
            >
              <button 
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 ${
                  isDark
                    ? "bg-white text-black hover:bg-white/90 hover:shadow-lg hover:shadow-white/10"
                    : "bg-black text-white hover:bg-black/90 hover:shadow-lg hover:shadow-black/20"
                }`}
                aria-label="Get Started"
              >
                Get Started
              </button>
              <button 
                className={`px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-medium text-base sm:text-lg transition-all duration-300 ${
                  isDark
                    ? "border border-white/20 text-white hover:bg-white/10 hover:border-white/30"
                    : "border border-black/20 text-black hover:bg-black/5 hover:border-black/30"
                }`}
                aria-label="Learn More"
              >
                Learn More
              </button>
            </motion.div>

            {/* Statistics Section */}
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, delay: 0.6 }}
              variants={fadeIn}
              className="w-full max-w-4xl px-4 py-10"
            >
              <div 
                className={`rounded-xl p-6 md:p-8 backdrop-blur-md ${
                  isDark
                    ? "bg-white/5 border border-white/10 shadow-xl shadow-white/2"
                    : "bg-black/5 border border-black/10 shadow-xl shadow-black/3"
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                      className={`flex flex-col items-center p-4 ${
                        index < stats.length - 1
                          ? "border-b md:border-b-0 md:border-r"
                          : ""
                      } ${
                        isDark
                          ? "border-white/10"
                          : "border-black/10"
                      }`}
                    >
                      <div className={`text-3xl md:text-4xl font-bold mb-2 flex items-center ${
                        isDark ? "text-white" : "text-black"
                      }`}>
                        <NumberTicker value={stat.value} decimalPlaces={0} />
                        <span>{stat.suffix}</span>
                      </div>
                      <div className={`text-base md:text-lg font-medium mb-1 ${
                        isDark ? "text-white/80" : "text-black/80"
                      }`}>
                        {stat.label}
                      </div>
                      <div className={`text-sm ${
                        isDark ? "text-white/50" : "text-black/50"
                      }`}>
                        {stat.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ duration: 1.5 }}
          className={`absolute top-1/4 left-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl ${
            isDark ? "bg-indigo-900/30" : "bg-indigo-200/30"
          }`} 
        />
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.4 }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className={`absolute bottom-1/3 right-1/4 w-64 md:w-96 h-64 md:h-96 rounded-full blur-3xl ${
            isDark ? "bg-purple-900/20" : "bg-purple-200/20"
          }`} 
        />
      </div>
    </section>
  );
}