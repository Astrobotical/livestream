import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import DOMPurify from "dompurify";
import { useDispatch } from "react-redux";
import { logIn } from "../../redux/userSlice";
import { setToken } from "../../redux/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [hasAccount, setHasAccount] = useState(false);
  const [checkedUser, setCheckedUser] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Login | Yardie";
  }, []);

  // Handle User Signup
  const handleUserSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://livestreamdemo.romarioburke.me/api/auth/signup`,
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

  // Handle User Login
  const handleUserLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitizedEmail = DOMPurify.sanitize(email);

    try {
      setIsLoading(true);
      const response = await fetch(
        `https://livestreamdemo.romarioburke.me/api/auth/login`,
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
        `https://livestreamdemo.romarioburke.me/api/auth/validate`,
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

  return (
    <div className="flex justify-center items-start h-screen bg-gray-600">
      <div
        className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm border mt-20 border-gray-300"
        style={{ borderRadius: "15px" }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          User Authentication
        </h2>

        <form
          onSubmit={
            checkedUser
              ? hasAccount
                ? handleUserLogin
                : handleUserSignup
              : handleSubmit
          }
          className="space-y-4"
        >
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered bg-gray-800 w-full text-white"
              placeholder="Enter your email"
              name="email"
              value={email || ""}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {checkedUser && (
            <div>
              <label className="block text-white mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="input input-bordered bg-gray-800 w-full pr-10 text-white"
                  placeholder="Enter your password"
                  name="password"
                  value={password || ""}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute right-2 top-2 text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>
          )}

          <div>
            <button
              type="submit"
              className={`btn btn-primary w-full text-white flex items-center justify-center ${
                isLoading ? "cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : checkedUser ? (hasAccount ? "Login" : "Register") : "Continue"}
            </button>
          </div>

          <div className="text-center">
            <p className="text-white mb-3">Or continue with</p>
            <button type="button" className="btn btn-outline w-full text-white">
              Google <FcGoogle size={20} className="ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;