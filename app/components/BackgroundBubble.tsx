'use client';

export default function BackgroundBubbles() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-3xl opacity-30 animate-float bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400"
          style={{
            width: `${100 + Math.random() * 150}px`,
            height: `${100 + Math.random() * 150}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`
          }}
        />
      ))}
    </div>
  );
}
