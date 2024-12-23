import React, { useEffect, useRef, useState } from 'react';
import Livestream from './Livestream';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const MainScreen = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [isStreamAvailable, setStatus] = useState(false);
  const [streamIsActive, setStreamStatus] = useState(false);
  const [countdownTime, setCountdownTime] = useState(60);
  const countdownRef = useRef<number | null>(null);

  // Function to calculate the remaining time until the target date
  const calculateRemainingTime = (targetDateTime: string) => {
    const targetDate = new Date(targetDateTime).getTime(); // Get the target date in milliseconds
    const currentTime = new Date().getTime(); // Get the current time in milliseconds
    const differenceInSeconds = Math.floor((targetDate - currentTime) / 1000); // Difference in seconds
    return differenceInSeconds > 0 ? differenceInSeconds : 0; // Return remaining time or 0 if the date has passed
  };

  // Helper function to format the time as HH:MM:SS

  // Modified countDown function
  const startCountDown = (remainingTime: number) => {
    if (remainingTime > 0) {
      setCountdownTime(remainingTime);

      // Start the countdown if not already running
      countdownRef.current = window.setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current!); // Stop countdown at 0
            countdownRef.current = null;
            setStreamStatus(true); // Mark stream as active when countdown finishes
            return 0;
          }
          return prevTime - 1; // Decrement time
        });
      }, 1000);
    }
  };
  useEffect(() => {
    // Set page title
    document.title = "Watch | Stream";

    const getTodaysStream = async () => {
      const response = await fetch('http://localhost:8000/api/getNextStream', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSaved}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStreamStatus(false);
        if(data.stream == null){

        }else{
          setStatus(true);
        const remainingTime = calculateRemainingTime(data.stream['stream_time']);
        startCountDown(remainingTime);
      }
    }
    };

    getTodaysStream();

    // Cleanup interval on component unmount
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
    };
  }, [tokenSaved]); // Run only once when tokenSaved is available
  
    // Function to format countdown time (minutes:seconds)
    const formatTime = (seconds: number) => {
      const hours = Math.floor(seconds / 3600); // Get the hours
      const minutes = Math.floor((seconds % 3600) / 60); // Get the minutes
      const secs = seconds % 60; // Get the remaining seconds
  
      // Format hours, minutes, and seconds with leading zeros if necessary
      const formattedHours = hours.toString().padStart(2, '0');
      const formattedMinutes = minutes.toString().padStart(2, '0');
      const formattedSeconds = secs.toString().padStart(2, '0');
  
      return `${formattedHours} hrs: ${formattedMinutes} mins:${formattedSeconds} left!`;
    };
  
    return (
      <>
      {
      isStreamAvailable ?(
      streamIsActive ? (
        // When stream is active, no need to show countdown
        <div>Stream is now active!</div>
      ) : countdownTime > 0 ? (
        // Show the countdown timer if stream isn't active and time > 0
        <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
          <h1 className="text-4xl text-center text-white">Stream will start in:</h1>
          <p className="text-4xl font-bold text-white">{formatTime(countdownTime)}</p>
        </div>
      ) : (
        // When the countdown finishes, show the Livestream and Buttons component
        <div className="flex flex-col md:flex-row h-screen">
          <Livestream />
          <Buttons />
        </div>
      )):(
        <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
          <h1 className="text-4xl text-center text-white">There is no Stream Today</h1>
        </div>  
      )
      }
    </>
    )
}
export default MainScreen;