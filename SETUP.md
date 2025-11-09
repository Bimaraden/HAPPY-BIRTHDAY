# Setup Galeri Foto dan Audio

## Menambahkan Foto ke Galeri

1. Letakkan file foto PNG di folder `public/photos/`
2. Edit file `src/components/PhotoGallery.tsx`
3. Update array `photos` dengan path foto Anda:

```typescript
const photos: PhotoItem[] = [
  { id: 1, src: '/photos/foto1.png', label: 'Foto 1' },
  { id: 2, src: '/photos/foto2.png', label: 'Foto 2' },
  { id: 3, src: '/photos/foto3.png', label: 'Foto 3' },
  { id: 4, src: '/photos/foto4.png', label: 'Foto 4' },
  { id: 5, src: '/photos/foto5.png', label: 'Foto 5' },
  { id: 6, src: '/photos/foto6.png', label: 'Foto 6' },
];
```

**Ukuran foto**: Semua foto akan ditampilkan dalam kontainer 48rem x 192px (h-48) dengan `object-cover`, jadi dimensi asli tidak berpengaruh.

## Menambahkan Lagu ke Music Player

1. Letakkan file MP3 Anda di folder `public/audio/`
2. Edit file `src/components/BirthdayPage.tsx`
3. Update array `songs` dengan lagu Anda:

```typescript
const songs: Song[] = [
  {
    id: 1,
    title: 'Happy Birthday',
    artist: 'Birthday Song',
    url: '/audio/birthday-song.mp3',
  },
  {
    id: 2,
    title: 'Nama Lagu 2',
    artist: 'Nama Artist',
    url: '/audio/lagu2.mp3',
  },
  {
    id: 3,
    title: 'Nama Lagu 3',
    artist: 'Nama Artist',
    url: '/audio/lagu3.mp3',
  },
];
```

**Fitur Music Player:**
- Play/Pause dengan tombol di tengah
- Skip forward/backward untuk lagu berikutnya/sebelumnya
- Progress bar yang bisa di-klik untuk loncat ke bagian tertentu
- Kontrol volume dengan slider
- Playlist yang bisa di-expand/collapse
- Menampilkan durasi dan waktu yang sudah diputar
- Highlight lagu yang sedang diputar di playlist

**Format**: MP3 dengan durasi dan bitrate apapun. Player akan otomatis loop ke lagu pertama setelah lagu terakhir selesai.
