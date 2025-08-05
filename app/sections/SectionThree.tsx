


export function SectionThree() {
    return (
        <section id="partner-channel" className="py-20 bg-black text-center">
            <h2 className="text-3xl font-bold mb-4">PARTNER CHANNEL</h2>
            <p className="text-gray-400 mb-8">협력 미디어/채널</p>
            <div className="max-w-4xl mx-auto space-y-6">
            {['gabee.jpg','yuna.jpg','solomon.jpg','ibuki2.png','minji.jpg','hankki.jpg','tarzan.jpg','kwontwins.jpg'].map((img, i) => (
                <img key={i} src={`/PartnerChannel/${img}`} alt={img} className="w-full rounded-lg shadow-md hover:scale-[1.02] transition-transform duration-300" />
            ))}
            </div>
      </section>
    )
}