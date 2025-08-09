import AnimatedCardGrid from "../components/AnimatedCards";


interface CardData {
  title: string;
  description: string;
}


const sectionItems: CardData[] = [
    {
    title: "콘텐츠 제작",
    description:
        "브랜드의 가치를 담은 고품질 영상 콘텐츠를 제작합니다.",
    },
    {
    title: "광고 캠페인",
    description:
        "효과적인 광고 전략으로 브랜드의 인지도를 높입니다.",
    },
    {
    title: "브랜드 매니지먼트",
    description:
        "종합적인 브랜드 관리 서비스를 제공합니다.",
    },
];


export function SectionTwo() {
    return (
        <section className="py-16">
            <h2 className="text-center mb-10 flex flex-col items-center gap-5">
                <p className="text-5xl text-purple-600 font-bold">
                    ABOUT
                    <span className="text-white text-5xl"> US</span>
                </p> 
                <p className="text-xl w-[350px] text-center text-white/70">소비자를 사로잡는 콘텐츠 광고주에게 돌아오는 확실한 가치</p>
            </h2>
            <AnimatedCardGrid cards={sectionItems} />
        </section>
    )
}