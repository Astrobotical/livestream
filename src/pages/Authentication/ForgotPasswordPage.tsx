import { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdLockReset } from "react-icons/md";
const ForgetPasswordPage = ({ onSwitch }: { onSwitch: (view: "signin" | "signup" | "forgotpassword") => void }) => {
  const [email, setEmail] = useState("");
  const [currentStep, setCurrentStep] = useState(1);

  const handleInitial = async (e: React.FormEvent) => {
      e.preventDefault();
    setCurrentStep(currentStep + 1);
  }
  return (
    <>
      <div className="p-6 w-full h-full bg-gray-800">
        <div>
        <ul className="steps  w-full grid grid-cols-3 md:w-3/4 md:mx-auto text-white [&_li.step:before]:text-white">
          <li className={`step ${currentStep >= 1 ? "step-primary" : ""}`}>Register</li>
          <li className={`step ${currentStep >= 2 ? "step-primary" : ""}`}>Verify</li>
          <li className={`step ${currentStep >= 3 ? "step-primary" : ""}`}>Update Password</li>
          </ul>
          <form  className="flex flex-col items-center mt-4">
          <MdLockReset size={200} className="text-indigo-500"/>
          <h2 className="text-2xl font-bold text-center mb-4">Forget Password</h2>
          <span className="md:text-2x1 mb-2">Please provide your account's email!</span>
            <label className="input input-bordered flex items-center w-full gap-2 mx-6">
              <MdOutlineEmail className="h-4 w-4 opacity-70" />
              <input type="text" className="grow" placeholder="Please the email associated with your account"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button className="bg-indigo-500 text-white p-2 rounded mt-5 w-2/3 mx-auto" onClick={(E)=>handleInitial(E)}>Reset Password</button>
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