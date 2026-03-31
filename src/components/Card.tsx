import { motion } from "motion/react";

interface CardProps {
  key?: string | number;
  char: string;
  name: string;
  onClick: () => void;
  colorClass?: string;
  textColor?: string;
  showLabel?: boolean;
}

export default function Card({ char, name, onClick, colorClass = "bg-white", textColor = "text-black", showLabel = false }: CardProps) {
  // For nikud, we might need a non-breaking space to prevent dotted circles in some browsers
  const displayChar = char.length === 1 && char.charCodeAt(0) >= 0x05B0 && char.charCodeAt(0) <= 0x05C7 
    ? `\u00A0${char}` 
    : char;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        ${colorClass}
        flex flex-col items-center justify-center
        p-2 md:p-4
        rounded-2xl md:rounded-3xl
        border-b-4 border-black/20
        shadow-lg hover:shadow-xl
        transition-all duration-150
        active:translate-y-1 active:border-b-0
        aspect-square
        min-h-[80px] md:min-h-[140px]
      `}
    >
      <div className={`text-5xl md:text-8xl font-serif ${textColor} select-none leading-none flex items-center justify-center h-full font-black`}>
        {displayChar}
      </div>
      {showLabel && (
        <span className="text-xs md:text-lg font-bold text-gray-700 select-none mt-2">
          {name}
        </span>
      )}
    </motion.button>
  );
}
