import { Camera } from 'lucide-react';
import { useState } from 'react';

interface PhotoItem {
  id: number;
  src?: string;
  label: string;
}

// Daftar foto yang akan ditampilkan
const photos: PhotoItem[] = [
  { id: 1, src: '/photos/image.png', label: '3 Juni 2025' },
  { id: 2, src: '/photos/image.png', label: 'Mei 2025' },
  { id: 3, src: '/photos/image.png', label: 'April 2025' },
  { id: 4, src: '/photos/image.png', label: 'Juli 2025' },
];

function PhotoGallery() {
  // State untuk tracking foto yang gagal dimuat
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  // Fungsi ketika ada foto yang gagal dimuat
  const handleImageError = (photoId: number) => {
    setImageErrors((prev) => ({ ...prev, [photoId]: true }));
    console.error(`Failed to load image ${photoId}`);
  };

  return (
    <div className="mb-12">
      {/* Header dengan icon kamera */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <Camera className="w-8 h-8 text-pink-500" />
        <h2 className="text-3xl font-bold text-purple-600">Galeri Kenangan</h2>
        <Camera className="w-8 h-8 text-pink-500" />
      </div>

      {/* Grid foto */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 hover:-rotate-2"
          >
            {/* Container gambar */}
            <div className="w-full h-48 bg-gradient-to-br from-pink-200 to-purple-200 flex items-center justify-center">
              {photo.src && !imageErrors[photo.id] ? (
                <img
                  src={photo.src}
                  alt={photo.label}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(photo.id)}
                />
              ) : (
                // Icon ketika foto tidak ada
                <div className="text-6xl">📷</div>
              )}
            </div>

            {/* Label foto */}
            <div className="p-4">
              <p className="text-center text-gray-600 font-semibold">
                {photo.label}
                {imageErrors[photo.id] && ' (Not found)'}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Quote inspiratif */}
      <p className="text-center text-gray-500 text-sm mt-6">
        ✨ "Foto bukan hanya susunan piksel, tapi sebuah kenangan yang tak akan hilang." ✨
      </p>
    </div>
  );
}

export default PhotoGallery;
