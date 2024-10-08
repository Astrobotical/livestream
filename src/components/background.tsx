import React from 'react';

const BackgroundVideo = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      <video className="absolute top-0 left-0 w-full h-full object-cover" autoPlay muted loop>
        <source src="testvideo.mp4" type="video/mp4" />
        Your browser does not support
      </video>
      <div className="relative z-10 flex items-center justify-center h-full bg-opacity-50 bg-black">
        <div className="text-center text-white p-4">
          <h1 className="text-4xl font-bold mb-4">Yaardie Vybz</h1>
          <p className="text-lg">Enjoy the video background!</p>
          <button className="btn btn-accent mt-4">Login</button>
        </div>
      </div> 
    </div>
  );
};

export default BackgroundVideo;