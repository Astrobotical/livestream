import { useState } from "react";
import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { TbLockPassword } from "react-icons/tb";
const SignUpPage = ({ onSwitch }: { onSwitch: (view: "signin" | "signup" | "forgotpassword") => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <>
            <div className="flex w-full h-full bg-gray-800">
                <div className=" hidden md:flex  w-[50%]  bg-indigo-500 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">New Here?</h2>
                    <p className="text-white mt-4 text-lg text-center">Create an account to unlock exclusive features and stay updated with the latest news.</p>
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center ">
                    <h2 className="text-3xl font-bold text-indigo-500">Sign Up</h2>
                    <p className="text-white mt-4">Sign up to create your account</p>
                    <form className="mt-6 flex flex-col gap-4">
                        <label className="input input-bordered flex items-center gap-2">
                            <FaRegUser className="h-4 w-4 opacity-70" />
                            <input type="text" className="grow" placeholder="Please enter your name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <MdOutlineEmail className="h-4 w-4 opacity-70" />
                            <input type="text" className="grow" placeholder="Please enter your name"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>

                        <label className="input input-bordered flex items-center w-full gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                            <TbLockPassword className="h-4 w-4 opacity-70" />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                className="grow  " />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </label>
                        <label className="input input-bordered flex items-center w-full gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                            <TbLockPassword className="h-4 w-4 opacity-70" />
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                name="password"
                                value={confirmPassword || ""}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="grow" />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </label>
                        <button className="bg-indigo-500 text-white py-3 rounded-lg hover:bg-purple-600">Sign In</button>
                        <div className="flex items-center w-full">
                            <div className="flex-1 border-t border-white"></div>
                            <span className="px-3 text-white font-medium">or continue with</span>
                            <div className="flex-1 border-t border-white"></div>
                        </div>
                        <div className="flex justify-center items-center gap-4">
                            <button className="bg-indigo-500 text-white py-3 px-6 rounded-xl mt-6 hover:bg-purple-600 flex items-center justify-center gap-2">
                                <FcGoogle size={40} />
                            </button>
                            <button className="bg-indigo-500 text-white py-3 px-6 rounded-xl mt-6 hover:bg-purple-600 flex items-center justify-center gap-2">
                                <FaFacebook size={40} />
                            </button>
                        </div>
                        <p className="text-white text-center mt-4">Already have an account?  <span className="text-indigo-500 hover:underline hover:text-purple-600" onClick={() => onSwitch("signin")}>Sign In</span></p>
                    </form>
                </div>
            </div></>
    );
};
export default SignUpPage;