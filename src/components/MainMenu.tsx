import { motion } from "motion/react";
import { Lock } from "lucide-react";
import { STAGES } from "../data";

interface MainMenuProps {
  onSelectStage: (stageId: number) => void;
  unlockedStage: number;
}

export default function MainMenu({ onSelectStage, unlockedStage }: MainMenuProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-4xl md:text-6xl font-black text-orange-600 mb-12 text-center drop-shadow-sm"
      >
        בְּרוּכִים הַבָּאִים לַ"חֶדֶר"
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {STAGES.map((stage, index) => {
          const isLocked = !stage.available || stage.id > unlockedStage;
          return (
          <motion.button
            key={stage.id}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            disabled={isLocked}
            onClick={() => onSelectStage(stage.id)}
            className={`
              relative flex flex-col items-center justify-center p-8
              rounded-3xl border-b-8 transition-all
              ${isLocked
                ? "bg-gray-200 border-gray-300 cursor-not-allowed opacity-70" 
                : "bg-white border-orange-200 hover:bg-orange-50 active:translate-y-2 active:border-b-0 shadow-xl"
              }
            `}
          >
            {isLocked && (
              <div className="absolute top-4 right-4 text-gray-400">
                <Lock size={24} />
              </div>
            )}
            <span className="text-5xl mb-4">
              {stage.id === 1 ? "📖" : stage.id === 2 ? "🧩" : stage.id === 3 ? "🍎" : stage.id === 4 ? "📝" : "🎓"}
            </span>
            <h2 className="text-2xl font-bold text-gray-800">
              שָׁלָב {stage.id}: {stage.name}
            </h2>
            {!stage.available && <span className="mt-3 text-sm font-bold text-gray-500">בקרוב</span>}
          </motion.button>
          );
        })}
      </div>
    </div>
  );
}
