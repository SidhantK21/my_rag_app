import { motion } from "framer-motion"
import { MessageSquare, Database, Cpu, Send } from "lucide-react"
import { useTheme } from "./Themetoogler/ThemeContext"

export function HowItWorks() {
  const { theme } = useTheme()
  const darkMode = theme === "dark"

  const steps = [
    {
      icon: MessageSquare,
      title: "User Query",
      description: "Enter your question in the AI chatbox for instant assistance",
      color: darkMode ? "from-blue-600/10 to-purple-600/10" : "from-blue-100 to-purple-100",
      iconColor: "text-blue-500",
    },
    {
      icon: Database,
      title: "Retrieval Process",
      description: "AI searches and fetches relevant data from the knowledge base",
      color: darkMode ? "from-purple-600/10 to-pink-600/10" : "from-purple-100 to-pink-100",
      iconColor: "text-purple-500",
    },
    {
      icon: Cpu,
      title: "Response Generation",
      description: "Advanced AI processes the data to create accurate answers",
      color: darkMode ? "from-pink-600/10 to-orange-600/10" : "from-pink-100 to-orange-100",
      iconColor: "text-pink-500",
    },
    {
      icon: Send,
      title: "Final Output",
      description: "Receive a clear, contextual response in the chat interface",
      color: darkMode ? "from-orange-600/10 to-blue-600/10" : "from-orange-100 to-blue-100",
      iconColor: "text-orange-500",
    },
  ]

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  }

  return (
    <section className={`py-24 px-4 relative overflow-hidden ${darkMode ? "bg-black" : "bg-white"}`}>
      {/* Background Elements */}
      <div className={`absolute inset-0 ${darkMode ? "bg-black" : "bg-white"}`} />

      <div className="max-w-7xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <h2 className={`text-4xl font-bold bg-clip-text ${darkMode ? "text-white" : "text-black"} mb-4`}>
              How It Works
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className={`${darkMode ? "text-[#B3B3B3]" : "text-gray-600"} text-lg max-w-2xl mx-auto tracking-tightest`}
          >
            Experience the power of our RAG system through a simple, four-step process designed for optimal results
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView={"visible"}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <motion.div key={step.title} variants={itemVariants} className="relative group">
                {/* Step Number Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div
                    className={`hidden lg:block absolute top-1/2 left-[calc(100%-2rem)] w-full h-[2px] bg-gradient-to-r ${darkMode ? "from-zinc-800" : "from-zinc-300"} to-transparent -translate-y-1/2 z-0`}
                  />
                )}

                {/* Card */}
                <div className="relative z-10 h-full">
                  <div
                    className={`
                    relative rounded-2xl p-6 h-full
                    backdrop-blur-xl bg-gradient-to-br ${step.color}
                    ${
                      darkMode
                        ? "border border-zinc-800/50 hover:border-zinc-700 bg-black/40"
                        : "border border-zinc-200 hover:border-zinc-300 bg-white/90"
                    }
                    transition-all duration-300
                    hover:shadow-lg ${darkMode ? "hover:shadow-black/50" : "hover:shadow-zinc-200/50"}
                  `}
                  >
                    {/* Step Number */}
                    <div
                      className={`absolute -top-4 -left-4 w-8 h-8 rounded-full ${
                        darkMode
                          ? "bg-zinc-900 border border-zinc-800 text-zinc-400"
                          : "bg-white border border-zinc-200 text-zinc-600"
                      } flex items-center justify-center font-bold`}
                    >
                      {index + 1}
                    </div>

                    {/* Icon */}
                    <motion.div
                      initial="initial"
                      whileHover="hover"
                      className={`mb-4 ${step.iconColor}`}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>

                    {/* Content */}
                    <h3 className={`text-xl font-bold ${darkMode ? "text-white" : "text-black"} mb-2`}>{step.title}</h3>
                    <p className={`${darkMode ? "text-zinc-400" : "text-zinc-600"}`}>{step.description}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div> 
      </div>
    </section>
  )
}

