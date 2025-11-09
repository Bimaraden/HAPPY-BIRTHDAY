import { useState, useEffect } from 'react';
import { Mail, Heart } from 'lucide-react';

function LetterCard() {
  const [isOpen, setIsOpen] = useState(false);
  const [displayedText, setDisplayedText] = useState('');

  const letterContent = `Halo Asha yang ceria dan hebat! 🌟
Di hari spesial ini, Kaka ingin mengucapkan selamat ulang tahun yang penuh dengan kebahagiaan dan semua hal baik yang kamu impikan.

Semoga tahun ini membawa banyak kebahagiaan, pencapaian yang membanggakan, dan momen-momen tak terlupakan. Kamu pantas mendapatkan semua yang terbaik di dunia ini karena kamu adalah orang yang luar biasa.
Terima kasih sudah menjadi dirimu yang indah, ceria, dan menyenangkan. Kehadiranmu membuat suasana di sekitar kamu menjadi lebih baik dan penuh warna.

Selamat ulang tahun sekali lagi! Semoga hari ini dan setiap hari ke depannya dipenuhi dengan senyuman, tawa, dan kebahagiaan yang tak ada habisnya.

Dari Kaka dengan doa terbaik, ✨`;

  useEffect(() => {
    if (!isOpen) {
      setDisplayedText('');
      return;
    }

    let index = 0;
    const timer = setInterval(() => {
      if (index <= letterContent.length) {
        setDisplayedText(letterContent.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 20);

    return () => clearInterval(timer);
  }, [isOpen]);

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Mail className="w-8 h-8 text-purple-500" />
        <h2 className="text-3xl font-bold text-pink-600">Surat Spesial</h2>
        <Mail className="w-8 h-8 text-purple-500" />
      </div>

      <div className="relative">
        {!isOpen ? (
          <div
            onClick={() => setIsOpen(true)}
            className="bg-gradient-to-br from-pink-200 to-purple-200 rounded-3xl p-8 shadow-2xl cursor-pointer hover:shadow-3xl transition-all transform hover:scale-105"
          >
            <div className="text-center">
              <div className="text-6xl mb-4">💌</div>
              <p className="text-xl font-semibold text-purple-700">
                Klik untuk membuka amplop
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
            <div className="bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400 p-6">
              <div className="flex items-center justify-center gap-2 text-white">
                <Heart className="w-6 h-6 fill-white" />
                <h3 className="text-2xl font-bold">Untuk Ashadewi aryani prasojo</h3>
                <Heart className="w-6 h-6 fill-white" />
              </div>
            </div>

            <div className="p-8 max-h-96 overflow-y-auto">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed font-medium">
                {displayedText}
                {displayedText.length < letterContent.length && (
                  <span className="inline-block w-2 h-5 ml-1 bg-pink-500 animate-pulse"></span>
                )}
              </div>
            </div>

            <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6">
              <div className="flex justify-center gap-3 text-3xl">
                <span className="animate-pulse">💖</span>
                <span className="animate-pulse delay-100">✨</span>
                <span className="animate-pulse delay-200">🌸</span>
                <span className="animate-pulse delay-300">✨</span>
                <span className="animate-pulse delay-400">💖</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LetterCard;
