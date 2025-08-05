
export function SectionTwo() {
    return (
        <section id="about" className="py-20 bg-gradient-to-b from-neutral-900 to-black">
            <div className="max-w-6xl mx-auto text-center px-4">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="text-purple-400">ABOUT</span> US
                </h2>
                <p className="text-white/80 mb-12 text-lg">소비자를 사로잡는 콘텐츠, 광고주에게 돌아오는 확실한 가치</p>
                <div className="grid md:grid-cols-3 gap-6">
                    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="text-purple-400 text-3xl mb-2">🎥</div>
                        <h3 className="text-xl font-semibold mb-2">콘텐츠 제작</h3>
                        <p className="text-sm text-white/80">브랜드의 가치를 담은 고품질 영상 콘텐츠를 제작합니다.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="text-purple-400 text-3xl mb-2">📢</div>
                        <h3 className="text-xl font-semibold mb-2">광고 캠페인</h3>
                        <p className="text-sm text-white/80">효과적인 광고 전략으로 브랜드의 인지도를 높입니다.</p>
                    </div>
                    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="text-purple-400 text-3xl mb-2">👥</div>
                        <h3 className="text-xl font-semibold mb-2">브랜드 매니지먼트</h3>
                        <p className="text-sm text-white/80">종합적인 브랜드 관리 서비스를 제공합니다.</p>
                    </div>
                </div>
            </div>
      </section>
    )
}