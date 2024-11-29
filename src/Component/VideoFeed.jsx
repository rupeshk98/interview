import React, { useRef, useEffect, useState } from "react";
import { CheatWarning } from "./CheatWarning";

// const VideoFeed = ({
//   isRecording,
//   cheatProbability,
//   isCheating,
//   onCheatDetection,
// }) => {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     let intervalId;
//     if (isRecording) {
//       intervalId = setInterval(() => {
//         const randomCheatFactor = Math.random();
//         const probability = Math.min(
//           1,
//           cheatProbability + randomCheatFactor * 0.1
//         );
//         onCheatDetection(probability);
//       }, 2000);
//     }
//     return () => clearInterval(intervalId);
//   }, [isRecording, cheatProbability, onCheatDetection]);

//   useEffect(() => {
//     if (isRecording) {
//       navigator.mediaDevices
//         .getUserMedia({ video: true, audio: true })
//         .then((stream) => {
//           videoRef.current.srcObject = stream;
//         });
//     } else if (videoRef.current.srcObject) {
//       const tracks = videoRef.current.srcObject.getTracks();
//       tracks.forEach((track) => track.stop());
//       videoRef.current.srcObject = null;
//     }
//   }, [isRecording]);

//   return (
//     <div className="relative w-full aspect-video bg-black mb-4 mx-auto">
//       <video
//         ref={videoRef}
//         autoPlay
//         muted
//         className="w-full h-full object-cover"
//       />
//       <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded">
//         Cheat Probability: {(cheatProbability * 100).toFixed(2)}%
//       </div>
//       {isCheating && <CheatWarning />}
//     </div>
//   );
// };

// export default VideoFeed;

const VideoFeed = ({
  isRecording,
  initialCheatProbability = 0,
  onCheatDetection,
}) => {
  const videoRef = useRef(null);
  const [cheatProbability, setCheatProbability] = useState(
    initialCheatProbability
  );
  const [isCheating, setIsCheating] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRecording) {
      intervalId = setInterval(() => {
        const randomCheatFactor = Math.random() * 0.1;
        const newProbability = Math.min(
          1,
          cheatProbability + randomCheatFactor
        );

        setCheatProbability(newProbability);
        onCheatDetection(newProbability);

        setIsCheating(newProbability > 0.7);
      }, 2000);
    }
    return () => clearInterval(intervalId);
  }, [isRecording, cheatProbability, onCheatDetection]);

  useEffect(() => {
    const setupVideoStream = async () => {
      if (isRecording && videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false,
          });
          videoRef.current.srcObject = stream;
        } catch (error) {
          console.error("Error accessing video stream:", error);
          onCheatDetection(1);
        }
      } else if (videoRef.current?.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
      }
    };

    setupVideoStream();
  }, [isRecording, onCheatDetection]);

  return (
    <div className="relative w-full aspect-video bg-black mb-4 mx-auto">
      <video
        ref={videoRef}
        autoPlay
        muted
        className="w-full h-full object-cover"
      />
      <div className="absolute top-2 right-2 bg-black/70 text-white px-3 py-1 rounded">
        Cheat Probability: {(cheatProbability * 100).toFixed(2)}%
      </div>
      {isCheating && <CheatWarning probability={cheatProbability} />}
    </div>
  );
};

export default VideoFeed;
