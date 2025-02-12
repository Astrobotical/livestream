import { useState } from "react";
import { FaEyeSlash, FaEye, FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const SignUpPage = ({ onSwitch }: { onSwitch: (view: "signin" | "signup" | "forgotpassword") => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            <div className="flex w-full h-full bg-gray-800">
                <div className=" hidden md:flex  w-[50%]  bg-indigo-500 flex flex-col items-center justify-center">
                    <h2 className="text-3xl font-bold text-white">New Here?</h2>
                    <p className="text-white mt-4">Create an account</p>
                    <button className="bg-purple-500 text-white py-3 px-6 rounded-lg mt-6 hover:bg-purple-600" onClick={() => onSwitch("signup")}>Sign Up</button>
                </div>
                <div className="w-full md:w-1/2 p-8 flex flex-col justify-center ">
                    <h2 className="text-3xl font-bold text-indigo-500">Sign Up</h2>
                    <p className="text-white mt-4">Sign-in to your account</p>
                    <form className="mt-6 flex flex-col gap-4">
                        <input
                            type="email"
                            placeholder="E-mail"
                            className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400" />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                name="password"
                                value={password || ""}
                                onChange={(e) => setPassword(e.target.value)}
                                className="p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 " />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center justify-center text-gray-600"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <div className="flex justify-between items-center">
                            <label className="flex items-center gap-2">
                                <input type="checkbox" className="h-4 w-4 text-indigo-500 checked:bg-indigo-500" />
                                <span className="text-sm text-white">Remember me</span>
                            </label>
                            <a href="#" className="text-sm text-indigo-500 hover:underline">Forgot password?</a>
                        </div>
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
                        <p className="text-white text-center mt-4">Already have an account?          <span className="text-indigo-500 hover:underline" onClick={() => onSwitch("signin")}>Sign In</span></p>
                    </form>
                </div>
            </div></>
    );
};
export default SignUpPage;