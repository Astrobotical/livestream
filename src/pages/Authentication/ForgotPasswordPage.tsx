const ForgetPasswordPage = ({ onSwitch }: { onSwitch: (view: "signin" | "signup" | "forgotpassword") => void }) => {
    return (
      <div>
        <h2 className="text-2xl font-bold text-center mb-4">Sign In</h2>
        <form>
          <input type="email" placeholder="Email" className="w-full p-2 mb-2 border rounded" />
          <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded" />
          <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <div className="mt-4 text-center">
          <button className="text-sm text-blue-500" onClick={() => onSwitch("forgotpassword")}>
            Forgot Password?
          </button>
          <p className="text-sm mt-2">
            Don't have an account?{" "}
            <button className="text-blue-500" onClick={() => onSwitch("signup")}>
              Sign Up
            </button>
          </p>
        </div>
      </div>
    );
  };
  
  export default ForgetPasswordPage;