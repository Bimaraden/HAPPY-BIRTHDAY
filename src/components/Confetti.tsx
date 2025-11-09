import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  color: string;
}

function Confetti() {
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    const colors = ['#ff69b4', '#ff1493', '#da70d6', '#ba55d3', '#87ceeb', '#4169e1'];
    const pieces: ConfettiPiece[] = [];

    for (let i = 0; i < 50; i++) {
      pieces.push({
        id: i,
        left: Math.random() * 100,
        animationDuration: 2 + Math.random() * 3,
        animationDelay: Math.random() * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setConfetti(pieces);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-3 h-3 opacity-80"
          style={{
            left: `${piece.left}%`,
            top: '-10px',
            backgroundColor: piece.color,
            animation: `fall ${piece.animationDuration}s linear ${piece.animationDelay}s forwards`,
            transform: 'rotate(45deg)',
          }}
        />
      ))}
    </div>
  );
}

export default Confetti;
