import React, { useEffect, useRef, useState } from 'react';
import Livestream from './Livestream';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { echo } from '../../echo'; // Ensure the echo import path is correct

const MainScreen = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [isStreamAvailable, setStatus] = useState(false);
  const [streamIsActive, setStreamStatus] = useState(false);
  const [countdownTime, setCountdownTime] = useState(60);
  const countdownRef = useRef<number | null>(null);

  const calculateRemainingTime = (targetDateTime: string) => {
    const targetDate = new Date(targetDateTime);
    const targetDateLocal = new Date(targetDate.toLocaleString('en-US', { timeZone: 'America/Jamaica' }));
    const currentTime = new Date().getTime();
    const differenceInSeconds = Math.floor((targetDateLocal.getTime() - currentTime) / 1000);
    return differenceInSeconds > 0 ? differenceInSeconds : 0;
  };

  const startCountDown = (remainingTime: number) => {
    if (remainingTime > 0) {
      setCountdownTime(remainingTime);
      countdownRef.current = window.setInterval(() => {
        setCountdownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(countdownRef.current!);
            countdownRef.current = null;
            setStreamStatus(true);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  useEffect(() => {
    document.title = "Watch | Stream";

    const getTodaysStream = async () => {
      const response = await fetch(`https://livestreamdemo.romarioburke.me/api/getNextStream`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenSaved}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setStreamStatus(false);
        if (data.stream == null) {
          setStatus(false);
        } else {
          setStatus(true);
          const remainingTime = calculateRemainingTime(data.stream['stream_time']);
          startCountDown(remainingTime);
        }
      }
    };

    getTodaysStream();

    // Subscribe to the 'streams' channel and listen for the 'StreamStarted' event
    echo.channel('streams').listen('StreamStarted', (event: any) => {
      console.log('Stream started event received:', event);
      setStreamStatus(true); // Update the state to indicate the stream has started
    });

    // Cleanup interval and unsubscribe from Echo on component unmount
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      echo.leaveChannel('streams');
    };
  }, [tokenSaved]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');
    return `${formattedHours} hrs: ${formattedMinutes} mins: ${formattedSeconds} left!`;
  };

  return (
    <>
      {isStreamAvailable ? (
        streamIsActive ? (
          <div className="flex flex-col md:flex-row h-screen">
            <Livestream />
            <Buttons />
          </div>
        ) : countdownTime > 0 ? (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
            <h1 className="text-4xl text-center text-white">Stream will start in:</h1>
            <p className="text-4xl font-bold text-white">{formatTime(countdownTime)}</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
            <h1 className="text-4xl text-center text-white">Awaiting stream start...</h1>
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
          <h1 className="text-4xl text-center text-white">There is no Stream Today</h1>
        </div>
      )}
    </>
  );
};

export default MainScreen;