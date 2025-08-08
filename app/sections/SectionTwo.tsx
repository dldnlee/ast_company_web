
type SectionItem = {
    title: string;
    content: string;
};

const sectionItems: SectionItem[] = [
    {
    title: "콘텐츠 제작",
    content:
        "브랜드의 가치를 담은 고품질 영상 콘텐츠를 제작합니다.",
    },
    {
    title: "광고 캠페인",
    content:
        "효과적인 광고 전략으로 브랜드의 인지도를 높입니다.",
    },
    {
    title: "브랜드 매니지먼트",
    content:
        "종합적인 브랜드 관리 서비스를 제공합니다.",
    },
];


export function SectionTwo() {
    return (
        <section className=" py-20">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-400">
                {sectionItems.map((item, index) => (
                    <div key={index} className="md:w-1/3 px-6 py-6 md:py-0">
                    <h3 className="text-3xl font-bold mb-4">{item.title}</h3>
                    <p className="text-lg text-white leading-relaxed">
                        {item.content}
                    </p>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}