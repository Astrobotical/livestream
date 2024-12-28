import React, { useEffect, useRef, useState } from 'react';
import Livestream from './Livestream';
import Buttons from './Buttons';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { echo } from '../../echo'; // Ensure the echo import path is correct
import Pusher from "pusher-js";

import streamModel from "../Models/Streams/streamModel";
import { set } from 'react-datepicker/dist/date_utils';
import { Stream } from 'stream';

const MainScreen = () => {
  const tokenSaved = useSelector((state: RootState) => state.auth.token);
  const [isStreamAvailable, setStatus] = useState(false);
  const [streamIsActive, setStreamStatus] = useState(false);
  const [countdownTime, setCountdownTime] = useState(60);
  const countdownRef = useRef<number | null>(null);
  const [streamEnded, setStreamEnded] = useState(false);
  const [streamMetaData, setStreamMetaData] = useState<streamModel | null>(null);
  
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
            setStreamStatus(true);  // Automatically start the stream
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
        if(data.stream['stream_status']=== 'passed'){
          setStreamEnded(true);
        }
        if(data.stream['is_live'] === 1){
          setStreamStatus(true);
        }
        if (data.stream == null) {
          setStatus(false);
        } else {
          setStreamMetaData(data.stream);
          
          setStatus(true);
          const remainingTime = calculateRemainingTime(data.stream['stream_time']);
          startCountDown(remainingTime);
        }
      }
    };
   
    getTodaysStream();

    
    const pusher = new Pusher('e997cc8249e3376f97b2', {
      cluster: 'us2',
      forceTLS: true, // Ensure the connection is secure
    });


    const channel = pusher.subscribe('streams');
    channel.bind('StreamStarted', (data: { message: string; }) => {

      setStreamStatus(true);
    });
    channel.bind('streamEnded', (data: { message: string; }) => {
      console.log('Stream ended event received:', data);
      setStreamEnded(true);
      setStreamStatus(false);
    });
    return () => {
      if (countdownRef.current) {
        clearInterval(countdownRef.current);
      }
      //echo.leaveChannel('streams');
    };
  }, [tokenSaved]);

  const formatTime = (seconds: number) => {
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    let formattedTime = '';
    if (days > 0) {
      formattedTime += `${days} days `;
    }
    formattedTime += `${hours.toString().padStart(2, '0')} hrs: `;
    formattedTime += `${minutes.toString().padStart(2, '0')} mins: `;
    formattedTime += `${secs.toString().padStart(2, '0')} secs left!`;

    return formattedTime;
  };

  return (
    <>
      {isStreamAvailable ? (
        streamEnded ?(
          <div className="flex flex-col items-center justify-center h-screen bg-gray-600">
            <h1 className="text-4xl text-center text-white">The Stream has ended thanks for watching!</h1>
          </div>
        ):
        streamIsActive ? (
          <div className="flex flex-col md:flex-row h-screen">
            <Livestream streamURL={streamMetaData?.stream_url || ''} />
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
          <h1 className="text-4xl text-center streamText">There is no Stream Today</h1>
        </div>
      )}
    </>
  );
};

export default MainScreen;