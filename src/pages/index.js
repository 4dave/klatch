import "@fontsource/roboto/300.css"
import "@fontsource/roboto/400.css"
import "@fontsource/roboto/500.css"
import "@fontsource/roboto/700.css"
import { motion } from "framer-motion"

export default function Home() {
  return (
    <div className="bg-violet-200 flex justify-center items-center mx-auto w-screen h-screen">
      <motion.h1
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          duration: 1.5,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="font-extrabold text-transparent md:text-8xl text-6xl bg-clip-text bg-gradient-to-r from-violet-400 to-pink-600"
      >
        Klatch!
      </motion.h1>
      <motion.div
        initial={{
          opacity: 0,
          y: 100,
          scale: 0.5,
          rotate: 180,
          skew: 45,
          x: -100,
        }}
        animate={{ opacity: 1, y: 0, scale: 1, rotate: 0, skew: 0, x: 0 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
        className="md:text-8xl text-6xl cursor-pointer"
      >
        🚀
      </motion.div>
    </div>
  )
}
