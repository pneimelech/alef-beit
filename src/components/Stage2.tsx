import { ArrowRight, Languages, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LETTERS, FINAL_ROW_LETTERS, NIKUD, GameItem } from "../data";

interface Stage2Props {
  onBack: () => void;
}

type Pronunciation = 'sephardi' | 'ashkenazi';

// Audio Sprite configuration (Shared with Stage 1)
const SEPHARDI_SPRITES: Record<string, { start: number, duration: number }> = {
  'alef': { start: 1.166, duration: 0.8 },
  'bet_d': { start: 2.5, duration: 0.8 },
  'bet': { start: 3.666, duration: 0.7 },
  'gimel': { start: 5.083, duration: 0.8 },
  'dalet': { start: 6.5, duration: 0.8 },
  'he': { start: 7.916, duration: 0.7 },
  'vav': { start: 9.083, duration: 0.9 },
  'zayin': { start: 10.333, duration: 1.1 },
  'het': { start: 11.666, duration: 1.1 },
  'tet': { start: 13.0, duration: 1.0 },
  'yod': { start: 14.416, duration: 0.9 },
  'kaf_d': { start: 15.666, duration: 1.1 },
  'kaf': { start: 17.083, duration: 1.0 },
  'kaf_s': { start: 18.333, duration: 1.2 },
  'lamed': { start: 20.0, duration: 0.8 },
  'mem': { start: 21.416, duration: 0.7 },
  'mem_s': { start: 22.666, duration: 1.1 },
  'nun': { start: 24.333, duration: 0.7 },
  'nun_s': { start: 25.583, duration: 1.0 },
  'samech': { start: 26.916, duration: 1.0 },
  'ayin': { start: 28.333, duration: 0.7 },
  'pe_d': { start: 29.75, duration: 0.6 },
  'pe': { start: 31.0, duration: 0.7 },
  'pe_s': { start: 32.25, duration: 1.0 },
  'tsadi': { start: 33.75, duration: 0.8 },
  'tsadi_s': { start: 35.0, duration: 1.1 },
  'qof': { start: 36.583, duration: 0.8 },
  'resh': { start: 37.583, duration: 1.2 },
  'shin': { start: 39.0, duration: 0.7 },
  'sin': { start: 40.166, duration: 0.8 },
  'tav_d': { start: 41.666, duration: 0.8 },
  'tav': { start: 42.916, duration: 0.8 },
  'kamatz': { start: 45.25, duration: 1.1 },
  'patah': { start: 46.666, duration: 1.0 },
  'tsere': { start: 48.333, duration: 0.9 },
  'segol': { start: 50.666, duration: 0.9 },
  'shva': { start: 51.916, duration: 0.9 },
  'holam': { start: 53.0, duration: 1.2 },
  'hiriq': { start: 54.583, duration: 1.0 },
  'kubutz': { start: 56.083, duration: 0.8 },
  'shuruk': { start: 57.416, duration: 1.1 },
  'hataf_kamatz': { start: 58.583, duration: 1.5 },
  'hataf_patah': { start: 60.666, duration: 1.2 },
  'hataf_segol': { start: 62.25, duration: 1.3 }
};

const ASHKENAZI_SPRITES: Record<string, { start: number, duration: number }> = {
  'alef': { start: 1.166, duration: 0.583 },
  'bet_d': { start: 2.833, duration: 0.666 },
  'bet': { start: 4.5, duration: 0.666 },
  'gimel': { start: 6.083, duration: 1.0 },
  'dalet': { start: 7.75, duration: 0.75 },
  'he': { start: 9.25, duration: 0.583 },
  'vav': { start: 10.833, duration: 0.666 },
  'zayin': { start: 12.333, duration: 0.666 },
  'het': { start: 13.833, duration: 0.833 },
  'tet': { start: 15.5, duration: 0.666 },
  'yod': { start: 16.916, duration: 0.5 },
  'kaf_d': { start: 19.333, duration: 0.583 },
  'kaf': { start: 20.833, duration: 0.666 },
  'kaf_s': { start: 22.666, duration: 0.916 },
  'lamed': { start: 26.75, duration: 0.583 },
  'mem': { start: 28.166, duration: 0.5 },
  'mem_s': { start: 29.666, duration: 0.916 },
  'nun': { start: 31.416, duration: 0.916 },
  'nun_s': { start: 33.166, duration: 0.916 },
  'samech': { start: 36.5, duration: 0.75 },
  'ayin': { start: 37.75, duration: 0.583 },
  'pe_d': { start: 39.083, duration: 0.416 },
  'pe': { start: 40.333, duration: 0.583 },
  'pe_s': { start: 41.666, duration: 1.0 },
  'tsadi': { start: 43.25, duration: 0.75 },
  'tsadi_s': { start: 44.583, duration: 1.083 },
  'qof': { start: 46.583, duration: 0.583 },
  'resh': { start: 47.916, duration: 0.75 },
  'shin': { start: 49.416, duration: 1.083 },
  'sin': { start: 50.916, duration: 1.083 },
  'tav_d': { start: 52.416, duration: 0.583 },
  'tav': { start: 53.666, duration: 0.666 },
  'kamatz': { start: 56.25, duration: 0.833 },
  'patah': { start: 59.333, duration: 0.666 },
  'tsere': { start: 60.75, duration: 1.0 },
  'segol': { start: 62.166, duration: 0.75 },
  'shva': { start: 63.916, duration: 0.583 },
  'holam': { start: 65.5, duration: 1.0 },
  'hiriq': { start: 67.083, duration: 0.75 },
  'kubutz': { start: 71.166, duration: 0.666 },
  'shuruk': { start: 74.916, duration: 0.666 },
  'hataf_kamatz': { start: 76.916, duration: 1.333 },
  'hataf_patah': { start: 78.916, duration: 1.166 },
  'hataf_segol': { start: 80.833, duration: 1.5 }
};

const AUDIO_URLS = {
  sephardi: "/sfard.mp3",
  ashkenazi: "/ashkenaz.mp3"
};

// Filter out final letters for Stage 2
const STAGE2_LETTERS = [...LETTERS, ...FINAL_ROW_LETTERS].filter(l => !l.id.endsWith('_s'));

export default function Stage2({ onBack }: Stage2Props) {
  const [pronunciation, setPronunciation] = useState<Pronunciation>('sephardi');
  const [selectedNikud, setSelectedNikud] = useState<GameItem>(NIKUD[0]); // Default to Kamatz
  const [sliderIndex, setSliderIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playingPart, setPlayingPart] = useState<'nikud' | 'letter' | 'combination' | null>(null);

  const audioRefSephardi = useRef<HTMLAudioElement | null>(null);
  const audioRefAshkenazi = useRef<HTMLAudioElement | null>(null);
  const stopTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const sephardi = new Audio(AUDIO_URLS.sephardi);
    const ashkenazi = new Audio(AUDIO_URLS.ashkenazi);
    sephardi.preload = "auto";
    ashkenazi.preload = "auto";
    audioRefSephardi.current = sephardi;
    audioRefAshkenazi.current = ashkenazi;

    return () => {
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      sephardi.pause();
      ashkenazi.pause();
    };
  }, []);

  const getNikudStyle = (nikudId: string, isLarge: boolean = false) => {
    switch (nikudId) {
      case 'holam':
        return isLarge 
          ? 'translate-y-[-0.48em] translate-x-[-0.2em]' 
          : 'translate-y-[-0.42em] translate-x-[-0.15em]';
      case 'shuruk':
        return isLarge
          ? 'translate-x-[-0.45em] scale-125'
          : 'translate-x-[-0.4em]';
      case 'kubutz':
        return isLarge
          ? 'translate-y-[0.45em] translate-x-[-0.15em]'
          : 'translate-y-[0.4em] translate-x-[-0.1em]';
      default:
        return isLarge ? 'translate-y-[0.32em]' : 'translate-y-[0.28em]';
    }
  };

  const nextItem = () => {
    const newIndex = (sliderIndex + 1) % STAGE2_LETTERS.length;
    setSliderIndex(newIndex);
    // Small delay to sync with animation
    setTimeout(() => playPart('combination'), 150);
  };

  const prevItem = () => {
    const newIndex = (sliderIndex - 1 + STAGE2_LETTERS.length) % STAGE2_LETTERS.length;
    setSliderIndex(newIndex);
    // Small delay to sync with animation
    setTimeout(() => playPart('combination'), 150);
  };

  const playSprite = async (itemId: string) => {
    const activeAudio = pronunciation === 'sephardi' ? audioRefSephardi.current : audioRefAshkenazi.current;
    if (!activeAudio) return;

    const sprites = pronunciation === 'sephardi' ? SEPHARDI_SPRITES : ASHKENAZI_SPRITES;
    const sprite = sprites[itemId];
    if (!sprite) return;

    // Stop any current playback
    activeAudio.pause();
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);

    // Jump to start time and play
    activeAudio.currentTime = sprite.start;
    try {
      await activeAudio.play();
      stopTimeoutRef.current = setTimeout(() => {
        activeAudio.pause();
      }, sprite.duration * 1000);
    } catch (e) {
      console.error("Audio playback failed:", e);
    }
  };

  const playPart = async (type: 'nikud' | 'letter' | 'combination') => {
    if (isMuted) return;
    setPlayingPart(type);
    
    const letter = STAGE2_LETTERS[sliderIndex];
    
    if (type === 'nikud') {
      await playSprite(selectedNikud.id);
    } else if (type === 'letter') {
      await playSprite(letter.id);
    } else {
      // Combination sound - currently using SpeechSynthesis as placeholder until new file is uploaded
      const text = `${letter.char}${selectedNikud.char}`;
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'he-IL';
      utterance.rate = 0.85;
      utterance.onend = () => setPlayingPart(null);
      window.speechSynthesis.speak(utterance);
      return; // SpeechSynthesis handles its own end
    }
    
    setPlayingPart(null);
  };

  const playFullSequence = async () => {
    if (isMuted) return;
    
    // Stop any current speech or audio
    window.speechSynthesis.cancel();
    if (audioRefSephardi.current) audioRefSephardi.current.pause();
    if (audioRefAshkenazi.current) audioRefAshkenazi.current.pause();
    if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);

    const sprites = pronunciation === 'sephardi' ? SEPHARDI_SPRITES : ASHKENAZI_SPRITES;
    const nikudSprite = sprites[selectedNikud.id];
    const letterSprite = sprites[STAGE2_LETTERS[sliderIndex].id];

    // 1. Play Nikud
    setPlayingPart('nikud');
    await playSprite(selectedNikud.id);
    await new Promise(r => setTimeout(r, (nikudSprite?.duration || 1) * 1000 + 200));

    // 2. Play Letter
    setPlayingPart('letter');
    await playSprite(STAGE2_LETTERS[sliderIndex].id);
    await new Promise(r => setTimeout(r, (letterSprite?.duration || 1) * 1000 + 200));

    // 3. Play Combination
    setPlayingPart('combination');
    const letter = STAGE2_LETTERS[sliderIndex];
    const utt = new SpeechSynthesisUtterance(`${letter.char}${selectedNikud.char}`);
    utt.lang = 'he-IL';
    utt.rate = 0.85;
    utt.onend = () => setPlayingPart(null);
    window.speechSynthesis.speak(utt);
  };

  const playCombinedSound = (letter: GameItem, nikud: GameItem, fullReading: boolean = true) => {
    if (isMuted) return;

    if (fullReading) {
      playFullSequence();
      return;
    }

    const textToSpeak = `${letter.char}${nikud.char}`;
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'he-IL';
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
        <h1 className="text-3xl md:text-5xl font-black text-orange-600">שָׁלָב 2: צֵירוּפֵי אוֹתִיּוֹת</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setPronunciation(p => p === 'sephardi' ? 'ashkenazi' : 'sephardi')}
            className="flex items-center gap-2 px-6 py-3 bg-[#FCECD5] rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-orange-100 font-bold text-gray-700"
          >
            <Languages size={20} className="text-orange-500" />
            הגייה: {pronunciation === 'sephardi' ? 'ספרדית' : 'אשכנזית'}
          </button>

          <button 
            onClick={() => setIsMuted(!isMuted)}
            className="p-3 bg-[#FCECD5] rounded-2xl shadow-md hover:shadow-lg transition-all border-2 border-orange-100 text-gray-700"
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <div className="flex bg-[#FCECD5] p-1 rounded-2xl border-b-4 border-orange-100 shadow-md">
            <button
              onClick={() => setPronunciation('sephardi')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${pronunciation === 'sephardi' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-orange-50'}`}
            >
              ספרדי
            </button>
            <button
              onClick={() => setPronunciation('ashkenazi')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${pronunciation === 'ashkenazi' ? 'bg-orange-500 text-white' : 'text-gray-500 hover:bg-orange-50'}`}
            >
              אשכנזי
            </button>
          </div>

          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-2xl shadow-lg hover:bg-orange-600 transition-all font-bold"
          >
            <ArrowRight size={20} />
            חזרה לתפריט
          </button>
        </div>
      </div>

      {/* Nikud Selector (TOP) */}
      <section className="bg-orange-50 p-6 rounded-[2.5rem] border-4 border-orange-100 mb-8 overflow-x-auto scrollbar-hide">
        <h2 className="text-xl font-bold text-gray-700 mb-4 text-center">בְּחַר נִיקּוּד לְתִרְגּוּל:</h2>
        <div className="flex justify-start md:justify-center gap-4 min-w-max px-4">
          {NIKUD.map((n) => (
            <button
              key={n.id}
              onClick={() => {
                setSelectedNikud(n);
              }}
              className={`
                w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-3xl md:text-4xl transition-all font-sans
                ${selectedNikud.id === n.id 
                  ? 'bg-orange-500 text-white shadow-xl scale-110 border-b-4 border-orange-700' 
                  : 'bg-[#FCECD5] text-red-600 hover:bg-[#F9EBD7] shadow-md border-b-4 border-orange-100'}
              `}
            >
              <span className="leading-none">{n.char}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Large Item Slider (Redesigned) */}
      <section 
        onClick={() => playFullSequence()}
        className="bg-[#FFF9E5] p-8 md:p-12 rounded-[3rem] border-4 border-orange-200 shadow-xl max-w-5xl mx-auto mb-12 relative overflow-hidden cursor-pointer hover:bg-amber-50 transition-colors group"
      >
        <div className="flex items-center justify-between gap-4 md:gap-8 relative z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); prevItem(); }}
            className="p-4 rounded-full bg-[#FCECD5]/50 text-orange-600 hover:bg-[#FCECD5] transition-all shadow-md active:scale-95 z-20"
          >
            <ChevronRight size={40} />
          </button>

          <div className="flex-1 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${STAGE2_LETTERS[sliderIndex].id}-${selectedNikud.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <div className="flex items-center justify-center gap-4 md:gap-8 w-full py-4" dir="ltr">
                  {/* 3. The Combination (Left) */}
                  <motion.div 
                    animate={playingPart === 'combination' ? { scale: 1.05, borderColor: '#f97316', backgroundColor: '#fef3c7' } : { scale: 1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={(e) => { e.stopPropagation(); playPart('combination'); }}
                    className="flex flex-col items-center justify-center bg-[#FCECD5] rounded-[3rem] p-4 md:p-8 shadow-md border-2 border-orange-200 w-[140px] h-[180px] md:w-[240px] md:h-[300px] transition-all cursor-pointer hover:bg-[#F9EBD7]"
                  >
                    <div 
                      className="grid grid-cols-1 grid-rows-1 place-items-center font-black select-none"
                      style={{ fontFamily: "'Arial', sans-serif" }}
                    >
                      {/* Base Letter (Blue) */}
                      <motion.span 
                        animate={playingPart === 'combination' || playingPart === 'letter' ? { 
                          y: [0, -10, 0],
                          scale: [1, 1.05, 1]
                        } : { y: 0, scale: 1 }}
                        transition={{ duration: 0.5, repeat: playingPart ? 1 : 0 }}
                        className="col-start-1 row-start-1 text-[7rem] md:text-[11rem] text-blue-600 leading-none"
                      >
                        {STAGE2_LETTERS[sliderIndex].char}
                      </motion.span>
                      {/* Nikud (Red) */}
                      <motion.span 
                        animate={playingPart === 'combination' || playingPart === 'nikud' ? { 
                          y: [0, -5, 0],
                          scale: [1, 1.1, 1]
                        } : { y: 0, scale: 1 }}
                        transition={{ duration: 0.5, repeat: playingPart ? 1 : 0, delay: playingPart === 'combination' ? 0.1 : 0 }}
                        className={`col-start-1 row-start-1 text-[5rem] md:text-[8rem] text-red-600 leading-none ${getNikudStyle(selectedNikud.id, true)}`}
                      >
                        {selectedNikud.char}
                      </motion.span>
                    </div>
                  </motion.div>

                  {/* 2. The Letter (Middle) */}
                  <motion.div 
                    animate={playingPart === 'letter' ? { scale: 1.05, borderColor: '#f97316', backgroundColor: '#fef3c7' } : { scale: 1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={(e) => { e.stopPropagation(); playPart('letter'); }}
                    className="flex flex-col items-center justify-center bg-[#FCECD5] rounded-[3rem] p-4 md:p-8 shadow-md border-2 border-orange-200 w-[140px] h-[180px] md:w-[240px] md:h-[300px] transition-all cursor-pointer hover:bg-[#F9EBD7]"
                  >
                    <motion.span 
                      animate={playingPart === 'letter' ? { 
                        y: [0, -15, 0],
                        scale: [1, 1.1, 1],
                        rotate: [0, -2, 2, 0]
                      } : { y: 0, scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6 }}
                      className="text-[7rem] md:text-[11rem] font-black leading-none text-blue-600"
                      style={{ fontFamily: "'Arial', sans-serif" }}
                    >
                      {STAGE2_LETTERS[sliderIndex].char}
                    </motion.span>
                  </motion.div>

                  {/* 1. The Nikud (Right) */}
                  <motion.div 
                    animate={playingPart === 'nikud' ? { scale: 1.05, borderColor: '#f97316', backgroundColor: '#fef3c7' } : { scale: 1 }}
                    whileHover={{ scale: 1.02, y: -5 }}
                    onClick={(e) => { e.stopPropagation(); playPart('nikud'); }}
                    className="flex flex-col items-center justify-center bg-[#FCECD5] rounded-[3rem] p-4 md:p-8 shadow-md border-2 border-orange-200 w-[140px] h-[180px] md:w-[240px] md:h-[300px] transition-all cursor-pointer hover:bg-[#F9EBD7]"
                  >
                    <div 
                      className="grid grid-cols-1 grid-rows-1 place-items-center font-black"
                      style={{ fontFamily: "'Arial', sans-serif" }}
                    >
                      {/* Invisible placeholder circle */}
                      <span className="col-start-1 row-start-1 text-[7rem] md:text-[11rem] text-transparent leading-none">
                        {'\u25CC'}
                      </span>
                      <motion.span 
                        animate={playingPart === 'nikud' ? { 
                          scale: [1, 1.2, 1],
                          y: [0, -10, 0],
                        } : { scale: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`col-start-1 row-start-1 text-[5rem] md:text-[8rem] text-red-600 leading-none ${getNikudStyle(selectedNikud.id, true)}`}
                      >
                        {selectedNikud.char}
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
            <span className="text-xl font-bold text-orange-600 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">לְחַץ לִשְׁמֹעַ הַכֹּל</span>
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); nextItem(); }}
            className="p-4 rounded-full bg-[#FCECD5]/50 text-orange-600 hover:bg-[#FCECD5] transition-all shadow-md active:scale-95 z-20"
          >
            <ChevronLeft size={40} />
          </button>
        </div>
      </section>

      {/* Combinations Grid */}
      <section className="bg-[#FFF9E5] p-6 md:p-10 rounded-[3rem] border-4 border-orange-200 shadow-xl">
        <h2 className="text-2xl font-bold text-orange-600 mb-8 text-center">
          תִּרְגּוּל קְרִיאָה עִם {selectedNikud.name}
        </h2>
        
        {/* Main Grid (First 21 letters) */}
        <div className="grid grid-cols-7 gap-4 md:gap-6 mb-6">
          {STAGE2_LETTERS.slice(0, 21).map((letter, idx) => (
            <motion.button
              key={letter.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSliderIndex(idx);
                playCombinedSound(letter, selectedNikud, false); // Play only combination sound
              }}
              className={`aspect-square rounded-[2rem] shadow-lg border-b-4 border-black/10 flex items-center justify-center hover:shadow-orange-200/50 transition-all group ${idx === sliderIndex ? 'ring-4 ring-orange-500 ring-inset bg-[#FCECD5]' : 'bg-[#FCECD5]'}`}
            >
              <div 
                className={`grid grid-cols-1 grid-rows-1 place-items-center font-black ${letter.color || 'text-blue-600'}`}
                style={{ fontFamily: "'Arial', sans-serif" }}
              >
                <span className="col-start-1 row-start-1 text-4xl md:text-6xl leading-none">{letter.char}</span>
                <span className={`col-start-1 row-start-1 text-4xl md:text-6xl leading-none ${getNikudStyle(selectedNikud.id)}`}>{selectedNikud.char}</span>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Centered Last Row (From Qof onwards) */}
        <div className="flex justify-center gap-4 md:gap-6">
          {STAGE2_LETTERS.slice(21).map((letter, idx) => {
            const actualIdx = idx + 21;
            return (
              <motion.button
                key={letter.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSliderIndex(actualIdx);
                  playCombinedSound(letter, selectedNikud, false);
                }}
                className={`w-[14%] aspect-square rounded-[2rem] shadow-lg border-b-4 border-black/10 flex items-center justify-center hover:shadow-orange-200/50 transition-all group ${actualIdx === sliderIndex ? 'ring-4 ring-orange-500 ring-inset bg-[#FCECD5]' : 'bg-[#FCECD5]'}`}
              >
                <div 
                  className={`grid grid-cols-1 grid-rows-1 place-items-center font-black ${letter.color || 'text-blue-600'}`}
                  style={{ fontFamily: "'Arial', sans-serif" }}
                >
                  <span className="col-start-1 row-start-1 text-4xl md:text-6xl leading-none">{letter.char}</span>
                  <span className={`col-start-1 row-start-1 text-4xl md:text-6xl leading-none ${getNikudStyle(selectedNikud.id)}`}>{selectedNikud.char}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </section>
    </div>
  );
}
