import React, { useEffect, useRef, useState } from "react";

const VideoPlayer = ({ src, status, onEvent }) => {
  const videoRef = useRef(null);
  const intervalRef = useRef(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showPlayButton, setShowPlayButton] = useState(true);
  const isProgressMode = status === "progress";

  const startTracking = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      if (videoRef.current && isProgressMode) {
        const time = videoRef.current.currentTime;
        const duration = videoRef.current?.duration ?? 0;
        onEvent?.("timeUpdate", parseInt(Math.floor(time)), parseInt(duration));
      }
    }, 60000);
  };

  const stopTracking = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused || videoRef.current.ended) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  };

  const handlePlay = () => {
    setShowPlayButton(false);
    if(isProgressMode) {
      startTracking();
    }
  };

  const handlePause = () => {
    setShowPlayButton(true);
    stopTracking();
    if (videoRef.current && isProgressMode) {
      const duration = videoRef.current?.duration ?? 0;
      onEvent?.("pause", parseInt(videoRef.current.currentTime), parseInt(duration));
    }
  };

  const handleEnded = () => {
    setIsCompleted(true);
    setShowPlayButton(true);
    stopTracking();
    if (videoRef.current && isProgressMode) {
      const duration = videoRef.current?.duration ?? 0;
      onEvent?.("completed", parseInt(videoRef.current.currentTime), parseInt(duration));
    }
  };

  const handleSeeking = () => {
    if (isProgressMode && videoRef.current) {
      videoRef.current.currentTime = videoRef.current.seeking ? videoRef.current.currentTime : 0;
    }
  };

  useEffect(() => {
    return () => stopTracking();
  }, []);

  if (status === "locked") return ( <div className="locked-video" > 🔒 This video is locked </div> );

  return (
    <div className="video-main-div"onClick={isProgressMode ? togglePlayPause : undefined} >

      <video ref={videoRef} src={src} controls={!isProgressMode}
        width="100%" height="400" style={{ display: "block", backgroundColor: "black" }}
        onPlay={handlePlay} onPause={handlePause} onEnded={handleEnded} onSeeking={handleSeeking}
        disablePictureInPicture controlsList="nodownload noplaybackrate" />

      {/* Big play button overlay */}
      {showPlayButton && (
        <div className="video-play-btn" onClick={(e) => {
            e.stopPropagation(); // prevent triggering outer toggle
            togglePlayPause();
          }} >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="40" height="40" fill="white" >
            <polygon points="24,16 24,48 48,32" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;



// import React, { useEffect, useRef, useState } from "react";

// const VideoPlayer = ({ src, status, onEvent }) => {
//   const videoRef = useRef(null);
//   const intervalRef = useRef(null);
//   const [isCompleted, setIsCompleted] = useState(false);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [showPlayButton, setShowPlayButton] = useState(true); // Show big play button overlay

//   const startTracking = () => {
//     if (intervalRef.current) return;
//     intervalRef.current = setInterval(() => {
//       if (videoRef.current) {
//         const time = videoRef.current.currentTime;
//         onEvent?.("timeUpdate", Math.floor(time));
//       }
//     }, 60000);
//   };

//   const stopTracking = () => {
//     if (intervalRef.current) {
//       clearInterval(intervalRef.current);
//       intervalRef.current = null;
//     }
//   };

//   // Play video
//   const playVideo = () => {
//     if (videoRef.current) {
//       videoRef.current.play();
//     }
//   };

//   // Pause video
//   const pauseVideo = () => {
//     if (videoRef.current) {
//       videoRef.current.pause();
//     }
//   };

//   // Toggle play/pause on click
//   const togglePlayPause = () => {
//     if (!videoRef.current) return;

//     if (videoRef.current.paused || videoRef.current.ended) {
//       playVideo();
//     } else {
//       pauseVideo();
//     }
//   };

//   // Event handlers
//   const handlePlay = () => {
//     setIsPlaying(true);
//     setShowPlayButton(false);
//     startTracking();
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//     setShowPlayButton(true);
//     stopTracking();
//     if (videoRef.current) {
//       onEvent?.("pause", videoRef.current.currentTime);
//     }
//   };

//   const handleEnded = () => {
//     setIsPlaying(false);
//     setIsCompleted(true);
//     setShowPlayButton(true);
//     stopTracking();
//     if (videoRef.current) {
//       onEvent?.("completed", videoRef.current.currentTime);
//     }
//   };

//   // Prevent seeking in progress mode
//   const handleSeeking = () => {
//     if (status === "progress" && videoRef.current) {
//       // Revert to previous time to block seeking
//       videoRef.current.currentTime = videoRef.current.seeking ? videoRef.current.currentTime : 0;
//     }
//   };

//   useEffect(() => {
//     return () => {
//       stopTracking();
//     };
//   }, []);

//   if (status === "locked") {
//     return (
//       <div
//         style={{
//           width: "100%",
//           height: "400px",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           background: "#000",
//           color: "#fff",
//           fontSize: "20px",
//         }}
//       >
//         🔒 This video is locked
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         maxWidth: "100%",
//         height: 400,
//         backgroundColor: "black",
//         cursor: "pointer",
//         userSelect: "none",
//       }}
//       onClick={togglePlayPause}
//     >
//       <video
//         ref={videoRef}
//         src={src}
//         width="100%"
//         height="400"
//         controls={status !== "progress"}
//         onPlay={handlePlay}
//         onPause={handlePause}
//         onEnded={handleEnded}
//         onSeeking={handleSeeking}
//         style={{ display: "block", backgroundColor: "black" }}
//         disablePictureInPicture
//         controlsList="nodownload noplaybackrate "
//       />

//       {/* Big play button overlay */}
//       {showPlayButton && (
//         <div
//           style={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 80,
//             height: 80,
//             backgroundColor: "rgba(0,0,0,0.6)",
//             borderRadius: "50%",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             pointerEvents: "none", // So clicks pass through to container div
//             userSelect: "none",
//           }}
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             viewBox="0 0 64 64"
//             width="40"
//             height="40"
//             fill="white"
//           >
//             <polygon points="24,16 24,48 48,32" />
//           </svg>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VideoPlayer;



// // import React, { useEffect, useRef, useState } from "react";
// // import YouTube from "react-youtube";

// // const YouTubeVideoPlayer = ({ videoId, status, onEvent }) => {
// //   const playerRef = useRef(null);
// //   const intervalRef = useRef(null);
// //   const [isCompleted, setIsCompleted] = useState(false);
  

// //   const startTracking = () => {
// //     if (intervalRef.current) return;
// //     intervalRef.current = setInterval(() => {
// //       const time = playerRef.current?.getCurrentTime();
// //       if (time) {
// //         onEvent?.("timeUpdate", Math.floor(time));
// //       }
// //     }, 60000);
// //   };

// //   const stopTracking = () => {
// //     if (intervalRef.current) {
// //       clearInterval(intervalRef.current);
// //       intervalRef.current = null;
// //     }
// //   };

// //   const handleStateChange = (event) => {
// //     const ytState = event.data;
// //     switch (ytState) {
// //       case window.YT.PlayerState.PLAYING:
// //         startTracking();
// //         break;
// //       case window.YT.PlayerState.PAUSED:
// //         stopTracking();
// //         onEvent?.("pause", playerRef.current?.getCurrentTime());
// //         break;
// //       case window.YT.PlayerState.ENDED:
// //         stopTracking();
// //         setIsCompleted(true);
// //         onEvent?.("completed", playerRef.current?.getCurrentTime());
// //         break;
// //       default:
// //         break;
// //     }
// //   };

// //   const onReady = (event) => {
// //     playerRef.current = event.target;
// //   };

// //   useEffect(() => {
// //     return () => stopTracking();
// //   }, []);

// //   if (status === "locked") {
// //     return (
// //       <div
// //         style={{
// //           width: "100%",
// //           height: "400px",
// //           display: "flex",
// //           alignItems: "center",
// //           justifyContent: "center",
// //           background: "#000",
// //           color: "#fff",
// //           fontSize: "20px",
// //         }}
// //       >
// //         🔒 This video is locked
// //       </div>
// //     );
// //   }

// //   const opts = {
// //     width: "100%",
// //     height: "400",
// //     playerVars: {
// //       autoplay: 0,
// //       controls: status === "progress" ? 0 : 1, // no controls in progress mode
// //       modestbranding: 1,
// //       rel: 0,
// //       playlist: videoId,
// //       fs: 0,
// //       disablekb: 1,
// //       iv_load_policy: 3,
// //     },
// //   };

// //   return (
// //     <YouTube
// //       videoId={videoId}
// //       opts={opts}
// //       onReady={onReady}
// //       onStateChange={handleStateChange}
// //     />
// //   );
// // };

// // export default YouTubeVideoPlayer;
