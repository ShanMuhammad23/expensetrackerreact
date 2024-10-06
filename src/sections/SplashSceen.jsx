import { splashscreenhero } from "../constants"
import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const SplashSceen = () => {
    return (
        <section id="splashscreen" className="m-auto flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-[90%] ">
                <motion.img src={splashscreenhero} alt="Splash" 
                initial={{translateY:-200}}
                whileInView={{translateY:0}}
                />
                <div className="">
                    <motion.h1 
                    initial={{translateX:-100}}
                    whileInView={{translateX:0}}
                    className="font-bold text-3xl mt-8 mx-6">Simple solution for your budget.</motion.h1>
                    <motion.p
                    initial={{translateX:-100}}
                    whileInView={{translateX:0,animationDelay:0.5}}
                    className="text-xl mt-6 mx-6">Count and distribute the income correctly...</motion.p>
                </div>
                <Link to="HomePage" className="h-[42px] w-[194px] text-center flex items-center justify-center text-white bg-black rounded-lg mt-6">Continue</Link>
            </div>
        </section>
    )
}

export default SplashSceen
