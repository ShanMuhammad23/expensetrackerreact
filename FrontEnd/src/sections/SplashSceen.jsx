import { splashscreenhero } from "../constants"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const SplashSceen = () => {
    return (
        <section id="splashscreen" className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
            <div className="max-w-md w-full px-6 py-12">
                <motion.img 
                    src={splashscreenhero} 
                    alt="Splash" 
                    className="w-full h-auto object-contain mb-12"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <div className="space-y-6">
                    <motion.h1 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="font-bold text-4xl tracking-tight text-gray-900"
                    >
                        Simple solution for your budget.
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-lg text-gray-600 leading-relaxed"
                    >
                        Count and distribute the income correctly...
                    </motion.p>
                </div>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                >
                    <Link 
                        to="HomePage" 
                        className="mt-8 w-full inline-flex items-center justify-center px-6 py-3.5 text-base font-medium text-white bg-black hover:bg-gray-900 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                        Continue
                    </Link>
                </motion.div>
            </div>
        </section>
    )
}

export default SplashSceen
