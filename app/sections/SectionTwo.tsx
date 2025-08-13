import AnimatedCardGrid from "../components/AnimatedCards";


interface CardData {
  title: string;
  description: string;
}


const sectionItems: CardData[] = [
    {
    title: "We Create",
    description:
        "브랜드의 가치를 담아 이야기하며,\n소비자를 움직이는 콘텐츠를 기획 및 제작합니다.",
    },
    {
    title: "We Connect",
    description:
        "브랜드와 어울리는 콘텐츠 파트너십을 디자인.\nAST는 브랜드와 소비자 간의 접점을 만듭니다.",
    },
    {
    title: "We Convert",
    description:
        "퍼포먼스로 증명하는 콘텐츠 마케팅.\n성공적인 캠페인부터 실제 전환까지의 가치를 제공합니다.",
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
                <div>
                    <p className="text-xl text-center text-white/70">소비자를 사로잡는 콘텐츠</p>
                    <p className="text-xl text-center text-white/70">광고주에게 돌아오는 확실한 가치</p>
                </div>
            </h2>
            <div className="flex items-center justify-center">
                <AnimatedCardGrid cards={sectionItems} />
            </div>
        </section>
    )
}