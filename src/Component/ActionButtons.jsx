import { Mic, StopCircle, Send } from "lucide-react";

const ActionButtons = ({ selectedButton, onButtonClick }) => (
  <div className="flex justify-center space-x-4">
    {/* Record Response Button */}
    <button
      onClick={() => onButtonClick("record")}
      className={`flex items-center gap-2 font-medium py-2 px-4 rounded focus:outline-none transition duration-200 ${
        selectedButton === "record"
          ? "bg-red-600 text-white shadow-lg"
          : "bg-red-400 text-white "
      }`}
    >
      <Mic /> Record Response
    </button>

    {/* Stop Recording Button */}
    <button
      onClick={() => onButtonClick("stop")}
      className={`flex items-center gap-2 font-medium py-2 px-4 rounded focus:outline-none transition duration-200 ${
        selectedButton === "stop"
          ? "bg-red-600 text-white shadow-lg"
          : "bg-red-400 text-white "
      }`}
    >
      <StopCircle /> Stop Recording
    </button>

    {/* Submit Button */}
    <button
      onClick={() => onButtonClick("submit")}
      className={`flex items-center gap-2 font-medium py-2 px-4 rounded focus:outline-none transition duration-200 ${
        selectedButton === "submit"
          ? //   ? "bg-blue-600 text-white shadow-lg"
            //   : "bg-blue-200 text-blue-600"

            "bg-blue-600 text-white shadow-lg"
          : "bg-blue-400 text-white "
      }`}
    >
      <Send /> Submit
    </button>
  </div>
);

export default ActionButtons;
