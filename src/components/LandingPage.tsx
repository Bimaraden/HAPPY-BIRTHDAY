import { useState } from 'react';
import { Heart } from 'lucide-react';

interface LandingPageProps {
  onAuthenticate: () => void;
}

function LandingPage({ onAuthenticate }: LandingPageProps) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.trim().toLowerCase() === 'asha') {
      onAuthenticate();
    } else {
      setError('Eh, ini cuma untuk Asha aja 😝');
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
        setError('');
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="mb-8 animate-bounce">
          <Heart className="w-24 h-24 mx-auto text-pink-400 fill-pink-400" />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-pink-500 mb-4">
          Ada Sesuatu Untukmu! 🎁
        </h1>

        <p className="text-xl text-purple-600 mb-8">
          Masukkan nama kamu dulu yuk!
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className={`bg-white rounded-full shadow-lg p-2 flex gap-2 ${isShaking ? 'animate-shake' : ''}`}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nama kamu..."
              className="flex-1 px-6 py-3 rounded-full focus:outline-none text-gray-700"
            />
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-400 to-purple-400 text-white px-8 py-3 rounded-full font-semibold hover:from-pink-500 hover:to-purple-500 transition-all transform hover:scale-105"
            >
              Masuk
            </button>
          </div>

          {error && (
            <p className="mt-4 text-lg font-semibold text-red-500 bg-white px-6 py-3 rounded-full inline-block">
              {error}
            </p>
          )}
        </form>

        <div className="mt-12 flex justify-center gap-4">
          <span className="text-4xl animate-pulse">🎈</span>
          <span className="text-4xl animate-pulse delay-100">🎂</span>
          <span className="text-4xl animate-pulse delay-200">🎉</span>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
