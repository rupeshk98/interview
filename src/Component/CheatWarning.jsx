import { AlertTriangle } from "lucide-react";

export const CheatWarning = ({ probability }) => (
  <div className="absolute inset-0 bg-red-500/70 flex items-center justify-center">
    <div className="text-white text-xl font-bold flex items-center">
      <AlertTriangle className="mr-2" size={32} />
      CHEATING DETECTED (Probability: {(probability * 100).toFixed(2)}%)
    </div>
  </div>
);
