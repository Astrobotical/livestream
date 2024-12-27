import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux';
import { unMute,Mute } from '../../redux/streamSlice';
import { RootState } from '../../redux/store';
interface LivestreamProps {
  streamURL: string;
}

const Livestream: React.FC<LivestreamProps> = ({ streamURL }) => {
  const ismuted = useSelector((state: RootState) => state.stream.isMuted);
  const dispatch = useDispatch();
  const [playing, setPlaying] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [isFullscreened, setisFullscreened] = useState(false);
  const playerRef = useRef<HTMLDivElement | null>(null); // For fullscreen reference

  // Fullscreen handler
  const handleFullscreen = () => {
    if (playerRef.current) {
      if (document.fullscreenElement) {
        setisFullscreened(false);
        document.exitFullscreen();
      } else {
        setisFullscreened(true);
        playerRef.current.requestFullscreen();
      }
    }
  };

  // Callback for when the video starts playing
  const handlePlay = () => {
    setPlaying(true);
  };

  // Callback for when the video is paused
  const handlePause = () => {
    setPlaying(false);
  };

  // Callback for when the video finishes playing
  const handleEnded = () => {
    setPlaying(false);
  };

  const handleMuteUnmute = () => {
    ismuted ? dispatch(unMute()) : dispatch(Mute());
  };

  const handlePlayPause = () => {
    playing ? handlePause() : handlePlay();
  };

  // Callback to monitor video progress
  const handleProgress = (state: { playedSeconds: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  return (
    <div ref={playerRef} className="flex-1 bg-black relative">
      <ReactPlayer
        className="w-full h-full object-cover"
        playing={playing} // Controls whether the video is playing
        controls={false} // Disable default controls
        muted={ismuted} // Control mute state
        onPlay={handlePlay} // Callback when playing
        onPause={handlePause} // Callback when paused
        url={streamURL} // Video URL
        onProgress={handleProgress} // Callback for progress
        width="100%"
        height="100%"L
      />

      {/* Overlay with Control bar */}
      <div className="absolute inset-0 flex items-end justify-center bg-black bg-opacity-0">
        {/* Control bar */}
        <div className="flex space-x-4 p-4 bg-black bg-opacity-60 w-full justify-center">
          {/* Play/Pause Button */}
          <button onClick={handlePlayPause} className="btn btn-accent mb-4 text-white">
            {playing ? "Pause" : "Play"}
          </button>

          {/* Mute/Unmute Button */}
          <button onClick={handleMuteUnmute} className="btn btn-accent mb-4 text-white">
            {ismuted ? "Unmute" : "Mute"}
          </button>

          {/* Fullscreen Button */}
          <button onClick={handleFullscreen} className="btn btn-accent mb-4 text-white">
            {isFullscreened?'Exit Fullscreen':'Fullscreen'}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Livestream;