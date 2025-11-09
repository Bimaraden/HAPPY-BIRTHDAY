import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import Confetti from './Confetti';
import PhotoGallery from './PhotoGallery';
import LetterCard from './LetterCard';
import MusicPlayer from './MusicPlayer';

interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
}

function BirthdayPage() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [showSurprise, setShowSurprise] = useState(false);
  const [titleText, setTitleText] = useState('');
  const fullTitle = 'Selamat Ulang Tahun, Asha! 🎉💖';

  const songs: Song[] = [
    {
    id: 1,
    title: 'Memori',
    artist: 'Maliq & D Essentials',
    url: '/audio/lagu1.mp3',
  },
  {
    id: 2,
    title: 'Serta Mulia',
    artist: 'Sal Priadi',
    url: '/audio/lagu2.mp3',
  },
  {
    id: 3,
    title: 'Amin Paling Serius',
    artist: 'Sal Priadi & Nadin Amizah',
    url: '/audio/lagu3.mp3',
  },
  ];

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= fullTitle.length) {
        setTitleText(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 100);

    setTimeout(() => setShowConfetti(false), 8000);

    return () => clearInterval(timer);
  }, []);

  const handleSurprise = () => {
    setShowSurprise(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowSurprise(false);
      setShowConfetti(false);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 relative overflow-hidden">
      {showConfetti && <Confetti />}

      <div className="floating-balloons">
        <div className="balloon balloon-1">🎈</div>
        <div className="balloon balloon-2">🎈</div>
        <div className="balloon balloon-3">🎈</div>
        <div className="balloon balloon-4">🎈</div>
        <div className="balloon balloon-5">🎈</div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="mb-8 flex justify-center">
            <div className="relative animate-bounce-slow">
              <div className="text-8xl">🐻</div>
              <div className="absolute -top-4 -right-4 text-4xl animate-pulse">❤️</div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4 min-h-[4rem]">
            {titleText}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            Hari spesial untuk orang yang spesial 💝
          </p>
        </div>

        <PhotoGallery />

        <MusicPlayer songs={songs} />

        <LetterCard />

        <div className="text-center mt-12">
          <button
            onClick={handleSurprise}
            className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-2xl transition-all transform hover:scale-110 flex items-center gap-3 mx-auto"
          >
            <Sparkles className="w-6 h-6" />
            Klik untuk kejutan!
            <Sparkles className="w-6 h-6" />
          </button>
        </div>

        {showSurprise && (
          <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
            <div className="text-center animate-bounce-in">
              <div className="text-9xl mb-4">🎊</div>
              <h2 className="text-5xl font-bold text-pink-500 bg-white px-8 py-4 rounded-full shadow-2xl">
                Asha is the best 💕
              </h2>
              <div className="mt-4 flex justify-center gap-4">
                <span className="text-6xl animate-spin-slow">✨</span>
                <span className="text-6xl animate-spin-slow delay-100">💖</span>
                <span className="text-6xl animate-spin-slow delay-200">⭐</span>
              </div>
            </div>
          </div>
        )}

        <div className="mt-16 text-center">
          <div className="flex justify-center gap-4 text-5xl">
            <span className="animate-wiggle">🎁</span>
            <span className="animate-wiggle delay-100">🎂</span>
            <span className="animate-wiggle delay-200">🎉</span>
            <span className="animate-wiggle delay-300">🎊</span>
            <span className="animate-wiggle delay-400">🎈</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BirthdayPage;
