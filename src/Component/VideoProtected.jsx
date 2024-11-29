import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";
import VideoFeed from "./VideoFeed";
import ActionButtons from "./ActionButtons";

const VideoProtected = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [cheatProbability, setCheatProbability] = useState(0);
  const [isCheating, setIsCheating] = useState(false);
  const [selectedButton, setSelectedButton] = useState(null);
  const [question, setQuestion] = useState("Tell me about yourself");
  const [answer, setAnswer] = useState("");
  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join("");
        setAnswer(transcript);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognitionRef.current = recognition;
    } else {
      console.error("Web Speech API is not supported in this browser.");
    }
  }, []);

  const handleButtonClick = (button) => {
    setSelectedButton(button);
    if (button === "record") {
      setIsRecording(true);
      setAnswer("");
      setCheatProbability(0);
      setIsCheating(false);

      if (recognitionRef.current) {
        recognitionRef.current.start();
        console.log("Speech recognition started.");
      }
    } else if (button === "stop") {
      setIsRecording(false);

      if (recognitionRef.current) {
        recognitionRef.current.stop();
        console.log("Speech recognition stopped.");
      }
    } else if (button === "submit") {
      console.log("Submit clicked with answer:", answer);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6">
        {/* Answer Section  */}
        <div className="mb-4 overflow-auto">
          <p className="text-lg font-semibold text-gray-800">
            {answer ? `Answer: ${answer}` : "Your answer"}
          </p>
        </div>

        {/* Video Feed */}
        <div className="relative">
          <VideoFeed
            isRecording={isRecording}
            cheatProbability={cheatProbability}
            isCheating={isCheating}
            onCheatDetection={(probability) => setCheatProbability(probability)}
          />
        </div>

        {/* Question Section  */}
        <div className="my-4 overflow-auto">
          <p className="text-lg font-medium text-gray-800">
            Question: {question}
          </p>
        </div>

        {/* Action Buttons */}
        <ActionButtons
          selectedButton={selectedButton}
          onButtonClick={handleButtonClick}
        />
      </div>
    </div>
  );
};

export default VideoProtected;
