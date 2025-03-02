import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa6";
import DOMPurify from "dompurify";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/userSlice";
import { setToken } from "../../redux/authSlice";
import SignInPage from "./signInPage";
import SignUpPage from "./signUpPage";
import ForgotPasswordPage from "./ForgotPasswordPage";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthenticationPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [view, setView] = useState<"signin" | "signup" | "forgotpassword">("signin");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Yardie";
  }, []);

  /* 
  Might Migrate to a standalone component
  // Handle User Signup
  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}auth/signup`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sanitizedEmail, password }),
        }
      );
      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        dispatch(
          logIn({
            token: data.token,
            user: data.userRole,
            userID: data.userID,
          })
        );
        navigate("/");
      } else {
        setHasAccount(false);
      }
    } catch (error) {
      console.error("Signup error:", error);
      setIsLoading(false);
    }
  };
*/
  // Handle User Login
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}auth/login`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: sanitizedEmail, password }),
        }
      );
      setIsLoading(false);

      if (response.ok) {
        const data = await response.json();
        dispatch(setToken(data.token));
        setHasAccount(true);
        navigate("/");
      } else {
        setHasAccount(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      setIsLoading(false);
    }
  };

  // Handle Initial Form Submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}auth/validate`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      setIsLoading(false);

      if (response.ok) {
        setCheckedUser(true);
        setHasAccount(true);
      } else {
        setCheckedUser(false);
      }
    } catch (error) {
      console.error("Validation error:", error);
      setIsLoading(false);
    }
  };
  const clientId= "189791029115-orogb7etpchbgpe6947m9g9pnbna8utj.apps.googleusercontent.com";
//"h-full w-full rounded-3xl shadow-lg overflow-hidden"
  return (
  <GoogleOAuthProvider clientId={clientId}>
    <div className="h-[100vh]  w-screen flex justify-center items-center bg-gray-700 overflow-hidden">
    <div className="h-[80vh] w-4/5 max-w-5xl rounded-3xl shadow-lg flex  bg-gray-800">
      <AnimatePresence mode="wait">
        <motion.div
          key={view} // Ensures correct animation transitions
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 50 }}
          transition={{ duration: 0.3 }}
          className="h-full w-full rounded-3xl shadow-lg overflow-hidden"
        >
          {view === "signin" && <SignInPage onSwitch={setView} />}
          {view === "signup" && <SignUpPage onSwitch={setView} />}
          {view === "forgotpassword" && <ForgotPasswordPage onSwitch={setView} />}
        </motion.div>
      </AnimatePresence>
    </div>
  </div>
  </GoogleOAuthProvider>
  );
};

export default AuthenticationPage;