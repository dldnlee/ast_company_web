

export function SectionOne() {
    return (
        <section className="relative w-full h-screen overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/background.mp4" // Replace with your video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 max-w-7xl mx-auto">
        <p className="text-white text-xl mb-4">브랜드를 콘텐츠로 세상과 연결하다</p>
        <h1 className="text-white text-7xl font-black">AST Company</h1>
      </div>

      {/* Optional: Overlay Background Tint */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />
    </section>
    )
}