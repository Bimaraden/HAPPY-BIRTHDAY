import { Camera } from 'lucide-react';
import { useState } from 'react';

interface PhotoItem {
  id: number;
  src?: string;
  label: string;
  emoji?: string;
}

const photos: PhotoItem[] = [
  { id: 1, src: '/photos/foto1.png', label: '3 Juni 2025' },
  { id: 2, src: '/photos/foto2.png', label: 'No Date' },
  { id: 3, src: '/photos/foto3.png', label: 'No Date' },
  { id: 4, src: '/photos/foto4.png', label: 'Juli 2025' },
  { id: 5, src: '/photos/foto5.png', label: 'Januari 2025' },
  { id: 6, src: '/photos/foto6.png', label: '20 September 2025' },
  { id: 7, src: '/photos/foto7.png', label: 'No Date' },
  { id: 8, src: '/photos/foto8.png', label: 'No Date' },
  { id: 9, src: '/photos/foto9.png', label: 'No Date' },
];

function PhotoGallery() {
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (photoId: number) => {
    setImageErrors((prev) => ({ ...prev, [photoId]: true }));
    console.error(`Failed to load image ${photoId}`);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-center gap-3 mb-8">
        <Camera className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl font-bold text-purple-600">Galeri Kenangan</h2>
        <Camera className="w-8 h-8 text-pink-500" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-2"
          >
            <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              {photo.src && !imageErrors[photo.id] ? (
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(photo.id)}
                />
              ) : (
                <div className="text-6xl">📷</div>
              )}
            </div>
            <div className="p-4">
              <p className="text-center text-gray-600 font-semibold">
                {photo.label}
                {imageErrors[photo.id] && ' (Image not found)'}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        ✨ "Foto bukan hanya susunan piksel, tapi sebuah kenangan yang tidak akan hilang." ✨
      </p>
    </div>
  );
}

export default PhotoGallery;
