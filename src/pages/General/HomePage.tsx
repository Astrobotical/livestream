// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../redux/store';

const HomePage = () => {
  const navigate = useNavigate();
  const userLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.title = "Home | Yardie";
    // Reset the body overflow style when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const handleCTAClick = () => {
    navigate('/stream'); // Redirect to the stream page
  };
  const handleLoginRedirect = () => {
    navigate('/login'); // Redirect to the login page
  }
  return (
    <div className="h-screen flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('https://admin.jamaicaexperiences.com//img/domains/jamaican_party_torch.jpg')" }}>
        <div className="text-center text-white bg-black bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-bold mb-6">
            Welcome to the Stream!
          </h1>
          <p className="text-xl mb-8">
            Join us for exclusive live streaming content.
          </p>
          <button 
            className="btn btn-accent text-lg text-white"
            onClick={userLoggedIn?handleCTAClick:handleLoginRedirect}
          >
           {userLoggedIn ? 'Watch the Stream':'Login to Watch'} 
          </button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;