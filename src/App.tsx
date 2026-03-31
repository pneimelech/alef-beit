/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import MainMenu from './components/MainMenu';
import Stage1 from './components/Stage1';
import Stage2 from './components/Stage2';
import Stage3 from './components/Stage3';
import JewishBackground from './components/JewishBackground';

export default function App() {
  const [currentStage, setCurrentStage] = useState<number | null>(null);

  return (
    <div 
      dir="rtl" 
      className="min-h-screen bg-amber-50 font-sans text-gray-900 selection:bg-orange-200"
    >
      <JewishBackground />

      <main className="relative z-10 py-8">
        {!currentStage ? (
          <MainMenu onSelectStage={(id) => setCurrentStage(id)} />
        ) : (
          currentStage === 1 ? (
            <Stage1 onBack={() => setCurrentStage(null)} />
          ) : currentStage === 2 ? (
            <Stage2 onBack={() => setCurrentStage(null)} />
          ) : currentStage === 3 ? (
            <Stage3 onBack={() => setCurrentStage(null)} />
          ) : (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
              <h1 className="text-3xl font-bold mb-4">שלב זה עדיין לא זמין</h1>
              <button 
                onClick={() => setCurrentStage(null)}
                className="bg-orange-500 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-all"
              >
                חזרה לתפריט
              </button>
            </div>
          )
        )}
      </main>

      <footer className="relative z-10 py-8 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} משחק לימוד קריאה - שיטת החדר
      </footer>
    </div>
  );
}

