import { ArrowRight, ChevronLeft, ChevronRight, Languages, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { LETTERS, FINAL_ROW_LETTERS, NIKUD, GameItem } from "../data";
import Card from "./Card";

interface Stage1Props {
  onBack: () => void;
}

type Pronunciation = 'sephardi' | 'ashkenazi';

// Audio Sprite configuration
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

// Create an ordered list of all items as they appear in the audio file for Ashkenazi fallback
const ALL_ITEMS_ORDERED = [...LETTERS, ...FINAL_ROW_LETTERS, ...NIKUD];

export default function Stage1({ onBack }: Stage1Props) {
  const [pronunciation, setPronunciation] = useState<Pronunciation>('sephardi');
  const [audioReady, setAudioReady] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  
  const [sliderIndex, setSliderIndex] = useState(0);
  
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
    
    const handleCanPlay = () => {
      console.log("Audio ready to play");
      setAudioReady(true);
      setAudioError(null);
    };

    const handleError = (e: any) => {
      const target = e.target as HTMLAudioElement;
      console.error("Audio error:", target.error);
      setAudioError(`שגיאה בטעינת הקובץ: ${target.src.split('/').pop()}`);
    };

    sephardi.addEventListener('canplaythrough', handleCanPlay);
    sephardi.addEventListener('error', handleError);
    ashkenazi.addEventListener('error', handleError);
    
    // Attempt to load
    sephardi.load();
    ashkenazi.load();

    return () => {
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);
      sephardi.pause();
      ashkenazi.pause();
      sephardi.removeEventListener('canplaythrough', handleCanPlay);
      sephardi.removeEventListener('error', handleError);
      ashkenazi.removeEventListener('error', handleError);
    };
  }, []);

  const activateAudio = async () => {
    try {
      if (audioRefSephardi.current) await audioRefSephardi.current.play().then(() => audioRefSephardi.current?.pause());
      if (audioRefAshkenazi.current) await audioRefAshkenazi.current.play().then(() => audioRefAshkenazi.current?.pause());
      setAudioReady(true);
      setAudioError(null);
      console.log("Audio activated via user gesture");
    } catch (err) {
      console.error("Activation failed:", err);
      setAudioError("הדפדפן חסם את השמע. אנא לחץ שוב על הכפתור.");
    }
  };

  const playFallback = (item: GameItem) => {
    if (!useFallback) return; // Only use fallback if explicitly allowed or as last resort
    
    const nameToSpeak = pronunciation === 'ashkenazi' && item.ashkenaziName ? item.ashkenaziName : item.name;
    const utterance = new SpeechSynthesisUtterance(nameToSpeak);
    utterance.lang = 'he-IL';
    if (pronunciation === 'ashkenazi') {
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
    }
    window.speechSynthesis.speak(utterance);
  };

  const playSound = async (item: GameItem) => {
    if (isMuted) return;

    try {
      // If audio is not ready, try to activate it first
      if (!audioReady) {
        await activateAudio();
      }

      const activeAudio = pronunciation === 'sephardi' ? audioRefSephardi.current : audioRefAshkenazi.current;

      if (!activeAudio) {
        playFallback(item);
        return;
      }

      let startTime = 0;
      let duration = 1.5; // Default duration

      if (pronunciation === 'sephardi') {
        const sprite = SEPHARDI_SPRITES[item.id];
        if (sprite) {
          startTime = sprite.start;
          duration = sprite.duration;
        } else {
          // Fallback for missing sprite
          const index = ALL_ITEMS_ORDERED.findIndex(i => i.id === item.id);
          if (index === -1) return;
          startTime = index * 2.5;
          duration = 2.5;
        }
      } else {
        const sprite = ASHKENAZI_SPRITES[item.id];
        if (sprite) {
          startTime = sprite.start;
          duration = sprite.duration;
        } else {
          // Fallback for missing sprite
          const index = ALL_ITEMS_ORDERED.findIndex(i => i.id === item.id);
          if (index === -1) return;
          startTime = index * 2.5;
          duration = 2.5;
        }
      }

      // Stop any current playback
      activeAudio.pause();
      if (stopTimeoutRef.current) clearTimeout(stopTimeoutRef.current);

      // Jump to start time and play
      activeAudio.currentTime = startTime;
      const playPromise = activeAudio.play();
      
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.error("Playback failed:", error);
          setAudioReady(false); 
          playFallback(item);
        });
      }

      // Stop after duration
      stopTimeoutRef.current = setTimeout(() => {
        activeAudio.pause();
      }, duration * 1000);
    } catch (e) {
      console.error("Audio error:", e);
      playFallback(item);
    }
  };

  const nextItem = () => {
    const newIndex = (sliderIndex + 1) % ALL_ITEMS_ORDERED.length;
    setSliderIndex(newIndex);
    // Small delay to sync with animation
    setTimeout(() => playSound(ALL_ITEMS_ORDERED[newIndex]), 150);
  };
  const prevItem = () => {
    const newIndex = (sliderIndex - 1 + ALL_ITEMS_ORDERED.length) % ALL_ITEMS_ORDERED.length;
    setSliderIndex(newIndex);
    // Small delay to sync with animation
    setTimeout(() => playSound(ALL_ITEMS_ORDERED[newIndex]), 150);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-4">
        <h1 className="text-3xl md:text-5xl font-black text-orange-600">שָׁלָב 1: לוּחַ הַכָּרָה</h1>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={activateAudio}
            className={`px-4 py-2 rounded-xl font-bold shadow-lg transition-all ${audioReady ? 'bg-green-500 text-white' : 'bg-blue-500 text-white animate-pulse'}`}
          >
            {audioReady ? 'שמע מופעל' : 'הפעל שמע'}
          </button>

          {audioError && (
            <div className="text-red-500 text-sm font-bold bg-red-50 px-3 py-1 rounded-lg border border-red-100">
              {audioError}
            </div>
          )}

          <div className="flex items-center gap-2 bg-white px-3 py-1 rounded-xl border border-gray-100">
            <span className="text-xs font-bold text-gray-400">גיבוי ממוחשב:</span>
            <button 
              onClick={() => setUseFallback(!useFallback)}
              className={`w-10 h-6 rounded-full transition-all relative ${useFallback ? 'bg-orange-500' : 'bg-gray-200'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${useFallback ? 'left-5' : 'left-1'}`} />
            </button>
          </div>
          
          <button 
            onClick={() => setIsMuted(!isMuted)}
            className={`p-3 rounded-2xl border-b-4 transition-all shadow-md ${isMuted ? 'bg-red-100 text-red-600 border-red-200' : 'bg-white text-orange-600 border-orange-100'}`}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <div className="flex bg-white p-1 rounded-2xl border-b-4 border-orange-100 shadow-md">
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
            className="flex items-center gap-2 bg-white px-6 py-3 rounded-2xl font-bold text-orange-600 border-b-4 border-orange-100 hover:bg-orange-50 active:translate-y-1 active:border-b-0 transition-all shadow-md"
          >
            חזרה לתפריט
            <ArrowRight size={20} className="rotate-180" />
          </button>
        </div>
      </div>

      <div className="text-center mb-8">
        <p className="text-xl md:text-2xl font-bold text-orange-500 bg-orange-50 py-3 px-6 rounded-full inline-block shadow-sm border border-orange-100">
          לְחַץ עַל אוֹת אוֹ סִימָן נִקּוּד כְּדֵי לִשְׁמֹעַ אֶת הַשֵּׁם שֶׁלּוֹ!
        </p>
      </div>

      {/* Letters Board */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-r-4 border-orange-400 pr-4">אותיות הא'-ב'</h2>
        
        {/* Main Grid 4x7 */}
        <div className="grid grid-cols-7 gap-3 md:gap-4 mb-6">
          {LETTERS.map((letter) => (
            <Card 
              key={letter.id}
              char={letter.char}
              name={letter.name}
              onClick={() => playSound(letter)}
              colorClass="bg-amber-100"
              textColor={letter.color}
              showLabel={false}
            />
          ))}
        </div>

        {/* Final Row Centered */}
        <div className="flex justify-center gap-3 md:gap-4">
          {FINAL_ROW_LETTERS.map((letter) => (
            <div key={letter.id} className="w-1/5 sm:w-auto sm:min-w-[120px]">
              <Card 
                char={letter.char}
                name={letter.name}
                onClick={() => playSound(letter)}
                colorClass="bg-amber-100"
                textColor={letter.color}
                showLabel={false}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Nikud Board */}
      <section className="bg-orange-100/50 p-6 md:p-10 rounded-[3rem] border-4 border-dashed border-orange-200 mb-12">
        <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">סימני הניקוד</h2>
        
        {/* Nikud Grid 2x6 */}
        <div className="grid grid-cols-6 gap-4 md:gap-6">
          {NIKUD.map((item) => (
            <Card 
              key={item.id}
              char={item.char}
              name={item.name}
              onClick={() => playSound(item)}
              colorClass="bg-amber-100"
              textColor="text-red-600"
              showLabel={false}
            />
          ))}
        </div>
      </section>

      {/* Large Item Slider */}
      <section className="bg-white/80 backdrop-blur-sm p-8 md:p-12 rounded-[3rem] border-4 border-orange-100 shadow-xl max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-700 mb-8 text-center">תִּרְגּוּל בְּגָדוֹל</h2>
        
        <div className="flex items-center justify-between gap-4 md:gap-8">
          <button 
            onClick={prevItem}
            className="p-4 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all shadow-md active:scale-95"
            title="הקודם"
          >
            <ChevronRight size={32} />
          </button>

          <div className="flex-1 flex flex-col items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={ALL_ITEMS_ORDERED[sliderIndex].id}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                <button
                  onClick={() => playSound(ALL_ITEMS_ORDERED[sliderIndex])}
                  className="w-full aspect-square bg-amber-100 rounded-[2.5rem] shadow-2xl border-b-8 border-black/10 flex items-center justify-center hover:shadow-orange-200/50 transition-all active:translate-y-2 active:border-b-0 group"
                >
                  <motion.span 
                    whileHover={{ scale: 1.1, y: -10, rotate: 2 }}
                    whileTap={{ scale: 0.9, rotate: -2 }}
                    className={`text-[10rem] md:text-[15rem] font-serif font-black select-none leading-none inline-block transition-colors ${ALL_ITEMS_ORDERED[sliderIndex].id.includes('kamatz') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('patah') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('tsere') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('segol') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('shva') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('holam') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('hiriq') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('kubutz') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('shuruk') || ALL_ITEMS_ORDERED[sliderIndex].id.includes('hataf') ? 'text-red-600' : (ALL_ITEMS_ORDERED[sliderIndex].color || 'text-black')}`}
                  >
                    {ALL_ITEMS_ORDERED[sliderIndex].char.length === 1 && ALL_ITEMS_ORDERED[sliderIndex].char.charCodeAt(0) >= 0x05B0 && ALL_ITEMS_ORDERED[sliderIndex].char.charCodeAt(0) <= 0x05C7 
                      ? `\u00A0${ALL_ITEMS_ORDERED[sliderIndex].char}` 
                      : ALL_ITEMS_ORDERED[sliderIndex].char}
                  </motion.span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <button 
            onClick={nextItem}
            className="p-4 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-all shadow-md active:scale-95"
            title="הבא"
          >
            <ChevronLeft size={32} />
          </button>
        </div>
        
        <div className="mt-8 overflow-x-auto pb-4 scrollbar-hide">
          <div className="flex justify-start md:justify-center gap-2 px-4 min-w-max">
            {ALL_ITEMS_ORDERED.map((item, idx) => (
              <button 
                key={idx}
                onClick={() => {
                  setSliderIndex(idx);
                  setTimeout(() => playSound(item), 150);
                }}
                className={`
                  w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center font-serif text-xl md:text-2xl transition-all
                  ${idx === sliderIndex 
                    ? 'bg-orange-500 text-white shadow-lg scale-110 z-10' 
                    : 'bg-amber-50 text-gray-400 hover:bg-amber-100'}
                `}
              >
                {item.char.length === 1 && item.char.charCodeAt(0) >= 0x05B0 && item.char.charCodeAt(0) <= 0x05C7 
                  ? `\u00A0${item.char}` 
                  : item.char}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
