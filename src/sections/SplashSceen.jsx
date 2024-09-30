import { splashscreenhero } from "../constants"
import { Link } from "react-router-dom"

const SplashSceen = () => {
    return (
        <section id="splashscreen" className="m-auto flex flex-col items-center">
            <div className="flex flex-col items-center justify-center w-[90%] ">
                <img src={splashscreenhero} />
                <div className="">
                    <h1 className="font-bold text-3xl mt-8 mx-6">Simple solution for your budget.</h1>
                    <p className="text-xl mt-6 mx-6">Count and distribute the income correctly...</p>
                </div>
                <Link to="HomePage" className="h-[42px] w-[194px] text-center flex items-center justify-center text-white bg-black rounded-lg mt-6">Continue</Link>
            </div>
        </section>
    )
}

export default SplashSceen
