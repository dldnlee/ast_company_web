

export function SectionOne() {
    return (
        <section id="home" className="pt-24 min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
            <h1 id="hero-title" className="text-3xl md:text-5xl font-bold text-purple-400 mb-4">
            브랜드를 콘텐츠로 세상과 연결하다
            </h1>
            <p className="text-lg md:text-xl font-semibold text-white/90 mb-6">
            We Create, We Connect, We Convert,<br />At the Same Time
            </p>
            <div className="flex gap-4 flex-wrap justify-center">
                <a href="#portfolio" className="bg-purple-500 hover:opacity-90 px-6 py-2 rounded-full font-semibold">VIEW PORTFOLIO</a>
                <a href="#contact" className="bg-white/10 border border-white/20 px-6 py-2 rounded-full font-semibold hover:bg-white/20">CONTACT US</a>
            </div>
        </section>
    )
}