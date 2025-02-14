import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
const ForgetPasswordPage = ({ onSwitch }: { onSwitch: (view: "signin" | "signup" | "forgotpassword") => void }) => {
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="p-6 w-full h-full bg-gray-800">
        <div>
          <ul className="steps mx-auto flex justify-center text-white">
            <li className="step step-primary before:white mr-4">Register</li>
            <li className="step">Verify</li>
            <li className="step ml-5">Update Password</li>
          </ul>
          <form  className="flex flex-col items-center mt-4">
          <MdLockReset size={200} className="text-indigo-500"/>
          <h2 className="text-2xl font-bold text-center mb-4">Forget Password</h2>
          <span className="md:text-2x1 mb-2">Please provide your account's email!</span>
            <label className="input input-bordered flex items-center w-full gap-2 mx-6">
              <MdOutlineEmail className="h-4 w-4 opacity-70" />
              <input type="text" className="grow" placeholder="Please enter your name"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="bg-indigo-500 text-white p-2 rounded mt-5 w-2/3 mx-auto">Reset Password</button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm mt-2">
              Don't have an account?
              <button className="ml-1 text-indigo-500" onClick={() => onSwitch("signup")}>
                Sign Up
              </button>
            </p>
          </div>
        </div>
      </div>
    </>

  );
};

export default ForgetPasswordPage;