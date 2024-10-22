import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash } from "react-icons/fa6";
import { FaEye } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import DOMPurify from 'dompurify';
import { useDispatch} from 'react-redux';
import { logIn } from '../../redux/userSlice';
import { setToken } from '../../redux/authSlice';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hasAccount, setStatus] = useState(false);
  const [checkedUser, setCheckUser] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "Login | Yardie";
  }
  , []);
  const handleUserSignup = async (e: React.FormEvent)=>{
    e.preventDefault();
    const sanitizedPassword = password;
    const sanizatedEmail = DOMPurify.sanitize(email);

    try{
     const response =  await fetch('http://localhost:8000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:sanizatedEmail,password:password}),
    });
    if(!response.ok){}
      switch(response.status){
        case 201:
        console.log(response.body);
        const data = await response.json();
        logIn({ token: data.token, user: data.userRole,userID: data.userID})
          navigate('/');
        break;
        case 204:
          setStatus(false);
        break;
      }
    }catch(error){

    }
    
  }
  const handleUserLogin = async (e: React.FormEvent)=>{
    e.preventDefault();
    const sanitizedPassword = password;
    const sanizatedEmail = DOMPurify.sanitize(email);

    try{
     const response =  await fetch('http://localhost:8000/api/auth/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email:sanizatedEmail,password:sanitizedPassword}),
    });
    if(!response.ok){}
      switch(response.status){
        case 200:
          const data = await response.json();
          console.log(data.token);
          setStatus(true)
          logIn({ token: data.token, user: data.userRole, userID: data.userID}) //Entry for token will be removed
          dispatch(setToken(data.token));
          navigate('/');
        break;
        case 204:
          setStatus(false);
        break;
      }
    }catch(error){

    }

    console.log("User Login");
  }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // userChecked();
    // Add logic to handle form submission, such as sending the data to the server
    const loginData = { email, password };
    //console.log('Login submitted:', loginData);
    try {
      const response = await fetch('http://localhost:8000/api/auth/validate', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
      setCheckUser(true);
      if(!response.ok){}
      switch(response.status){
        case 200:
          setStatus(true)
        break;
        case 204:
          setStatus(false);
        break;
      }
   
    } catch (error) {
     
    }
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-600">
      <div
        className="bg-gray-700 p-8 rounded-lg shadow-md w-full max-w-sm border mt-20 border-gray-300"
        style={{ borderRadius: '15px' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-white">User Authentication</h2>

        {/* Form */}
        <form onSubmit={checkedUser ? hasAccount ? handleUserLogin:handleUserSignup:handleSubmit} className="space-y-4 ">
          <div>
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              className="input input-bordered w-full text-white"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}

            />
          </div>

          {/* Password Field with Show/Hide */}
          <div className={checkedUser ? 'block' : 'hidden'}>
            <label className="block text-white">Password</label>
            <div className="flex items-center relative">
              <input
                type={showPassword ? 'text' : 'password'}
                className="input input-bordered w-full pr-10"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={checkedUser}
              />
              <button
                type="button"
                className="absolute right-2 text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button type="submit" className="btn btn-primary w-full text-white">{checkedUser ? hasAccount ? 'Login' : 'Register' : 'Continue'} </button>
          </div>

          {/* Google Login */}
          <div className="text-center">
            <p className="text-white mb-3">Or continue with</p>
            <button type="button" className="btn btn-outline w-full text-white">
              Google <FcGoogle size={40} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;