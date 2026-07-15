import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Mic, CheckCircle2, XCircle, Loader2, MicOff, Volume2 } from 'lucide-react';
import { SIMPLE_WORDS, Word } from '../data';

interface Stage3Props {
  onBack: () => void;
}

const normalizeHebrew = (value: string) => value
  .normalize('NFD')
  .replace(/[\u0591-\u05C7]/g, '')
  .replace(/[^\u05D0-\u05EA]/g, '');

const playFeedbackTone = (isCorrect: boolean) => {
  const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioContextClass) return;
  const context = new AudioContextClass();
  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.type = isCorrect ? 'sine' : 'triangle';
  oscillator.frequency.setValueAtTime(isCorrect ? 523 : 260, context.currentTime);
  oscillator.frequency.setValueAtTime(isCorrect ? 659 : 190, context.currentTime + 0.1);
  gain.gain.setValueAtTime(0.08, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.3);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.3);
  oscillator.onended = () => context.close();
};

const speakWord = (word: Word) => {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(word.nikudText);
  utterance.lang = 'he-IL';
  utterance.rate = 0.7;
  window.speechSynthesis.speak(utterance);
};

const Stage3: React.FC<Stage3Props> = ({ onBack }) => {
  const [selectedWord, setSelectedWord] = useState<Word | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>('קמץ-פתח');
  const [error, setError] = useState<string | null>(null);
  const [attempts, setAttempts] = useState(0);
  
  const recognitionRef = useRef<any>(null);
  const selectedWordRef = useRef<Word | null>(null);

  const categories = Array.from(new Set(SIMPLE_WORDS.map(w => w.category)));
  const filteredWords = SIMPLE_WORDS.filter(w => w.category === activeCategory);

  // Keep ref in sync with state
  useEffect(() => {
    selectedWordRef.current = selectedWord;
  }, [selectedWord]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'he-IL';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsRecording(true);
      setFeedback(null);
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript.trim();
      console.log('Transcript:', transcript);
      
      const currentWord = selectedWordRef.current;
      if (currentWord) {
        const normalizedTranscript = normalizeHebrew(transcript);
        const normalizedTarget = normalizeHebrew(currentWord.text);
        const isCorrect = normalizedTranscript.length > 0 && normalizedTranscript === normalizedTarget;
        
        if (isCorrect) {
          setFeedback('correct');
          setAttempts(0);
        } else {
          setFeedback('wrong');
          setAttempts(prev => {
            const newAttempts = prev + 1;
            if (newAttempts >= 3) {
              speakWord(currentWord);
              return 0; // Reset after playing
            }
            return newAttempts;
          });
        }
        
        playFeedbackTone(isCorrect);
      }
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsRecording(false);
      
      if (event.error === 'not-allowed') {
        setError('יש לאשר גישה למיקרופון בהגדרות הדפדפן');
      } else if (event.error === 'no-speech') {
        // "no-speech" is not really an error, just a failed attempt
        setFeedback('wrong');
        setAttempts(prev => {
          const newAttempts = prev + 1;
          if (newAttempts >= 3) {
            const currentWord = selectedWordRef.current;
            if (currentWord) {
              speakWord(currentWord);
            }
            return 0;
          }
          return newAttempts;
        });
        setError('לא נשמע דיבור, נסה שוב');
      } else if (event.error === 'aborted') {
        // Aborted is often harmless, just reset state
        setError(null);
      } else if (event.error === 'network') {
        setError('שגיאת רשת - וודא שאתה מחובר לאינטרנט');
      } else {
        setError('שגיאה במיקרופון, נסה לרענן את הדף');
      }
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const startRecording = () => {
    if (!recognitionRef.current) return;
    
    // If already recording, stop it first
    if (isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (e) {}
      return;
    }

    setFeedback(null);
    setError(null);
    
    try {
      recognitionRef.current.start();
    } catch (e) {
      console.error('Failed to start recognition:', e);
      setIsRecording(false);
      setError('לא ניתן להתחיל את ההקלטה. נסה שוב.');
    }
  };

  const handleSelectWord = (word: Word) => {
    setSelectedWord(word);
    setFeedback(null);
    setError(null);
    setAttempts(0);
    // Stop recording if active when switching words
    if (isRecording && recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (e) {}
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] p-4 md:p-8 font-sans" dir="rtl">
      {/* Header */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-4 py-2 bg-[#FCECD5] rounded-xl shadow-sm hover:shadow-md transition-all text-gray-700 font-bold border-2 border-orange-100"
          >
            <Home size={20} className="text-orange-500" />
            <span>חזרה לתפריט</span>
          </button>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-black text-orange-600 drop-shadow-sm">קְרִיאַת מִילִּים פְּשׁוּטוֹת</h1>
        <div className="hidden md:block w-32"></div> {/* Spacer */}
      </div>

      {/* Categories Tabs */}
      <div className="max-w-6xl mx-auto mb-8 overflow-x-auto pb-2 scrollbar-hide">
        <div className="flex gap-3 min-w-max">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedWord(null);
                setFeedback(null);
              }}
              className={`
                px-6 py-3 rounded-2xl font-bold text-lg transition-all border-2
                ${activeCategory === cat 
                  ? 'bg-orange-500 text-white border-orange-500 shadow-lg scale-105' 
                  : 'bg-white text-gray-600 border-orange-100 hover:border-orange-300'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto pb-32">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {filteredWords.map((word) => (
            <motion.button
              key={word.id}
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleSelectWord(word)}
              className={`
                relative p-6 rounded-3xl transition-all border-b-8 shadow-xl
                flex flex-col items-center justify-center gap-3
                ${selectedWord?.id === word.id 
                  ? `bg-white border-orange-400 ring-4 ring-orange-200` 
                  : `bg-white border-gray-100 hover:border-orange-100`}
              `}
            >
              <span className={`text-3xl md:text-4xl font-black tracking-wide ${word.color}`}>
                {word.nikudText}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Word Detail / Large View */}
      <AnimatePresence>
        {selectedWord && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl rounded-4xl shadow-2xl p-8 border-8 border-orange-100 z-50 flex flex-col items-center gap-6 bg-white`}
          >
            <button 
              onClick={() => setSelectedWord(null)}
              className="absolute top-4 left-4 text-gray-400 hover:text-gray-600 bg-gray-100 p-2 rounded-full transition-colors"
            >
              ✕
            </button>
            
            <div className={`text-7xl md:text-9xl font-black drop-shadow-sm ${selectedWord.color}`}>
              {selectedWord.nikudText}
            </div>

            <button onClick={() => speakWord(selectedWord)} className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-blue-50 text-blue-700 font-bold hover:bg-blue-100 transition-colors">
              <Volume2 size={24} />
              שמע את המילה והשווה לקריאה שלך
            </button>

            <div className="flex flex-col items-center gap-4 w-full">
              {isSupported ? (
                <div className="flex flex-col items-center gap-3">
                  <button
                    onClick={startRecording}
                    disabled={isRecording}
                    className={`
                      flex items-center gap-3 px-12 py-5 rounded-3xl font-black text-2xl shadow-2xl transition-all active:scale-95
                      ${isRecording 
                        ? 'bg-red-500 text-white animate-pulse ring-8 ring-red-100' 
                        : 'bg-orange-500 text-white hover:bg-orange-600 hover:shadow-orange-200'}
                    `}
                  >
                    {isRecording ? <Loader2 className="animate-spin" size={32} /> : <Mic size={32} />}
                    <span>{isRecording ? 'מקשיב...' : 'בדיקת קריאה'}</span>
                  </button>
                  
                  {error && (
                    <div className="flex items-center gap-2 text-red-500 font-bold bg-red-50 px-4 py-2 rounded-xl">
                      <MicOff size={18} />
                      <span>{error}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center text-sm text-gray-500 font-bold bg-gray-50 px-5 py-3 rounded-xl">
                  זיהוי דיבור אינו נתמך בדפדפן זה. קרא בקול והשתמש בכפתור השמע להשוואה.
                </div>
              )}
            </div>

            {/* Feedback Message */}
            <AnimatePresence mode="wait">
              {feedback && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center gap-2"
                >
                  <div className={`flex items-center gap-3 text-2xl font-black ${feedback === 'correct' ? 'text-green-500' : 'text-red-500'}`}>
                    {feedback === 'correct' ? (
                      <>
                        <CheckCircle2 size={32} />
                        <span>כל הכבוד! צדקת!</span>
                      </>
                    ) : (
                      <>
                        <XCircle size={32} />
                        <span>נסה שוב...</span>
                      </>
                    )}
                  </div>
                  {feedback === 'wrong' && attempts > 0 && (
                    <div className="text-sm text-gray-400 font-bold">
                      נסיון {attempts} מתוך 3 (אחרי 3 נסיונות המחשב יקריא את המילה)
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Stage3;
