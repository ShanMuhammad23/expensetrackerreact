import { motion } from "framer-motion"
const Alert = ({message, type}) => {
  return (
    <motion.div 
      initial={{opacity: 0, y: -20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: -20}}
      transition={{duration: 0.3}}
      className="fixed top-4 right-4 z-50"
    >
      <div className={`
        px-6 py-4 rounded-lg shadow-lg
        backdrop-blur-md bg-white/90
        border border-gray-100
        flex items-center gap-3 min-w-[320px]
        transform transition-all
        hover:scale-102 hover:shadow-xl
      `}>
        <svg className="w-5 h-5 text-emerald-500" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        
        <div className="flex-1">
          <p className="text-gray-800 font-medium text-sm">
            {message}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Alert
