
interface CardData {
  title: string;
  description: string;
}

const AnimatedCardGrid: React.FC<{ cards: CardData[] }> = ({ cards }) => {
  // Define colors for each card (matching the image)
  const colors = [
    'bg-gradient-to-r from-purple-500 to-purple-600', // Purple for 콘텐츠 제작
    'bg-gradient-to-r from-blue-500 to-blue-600',     // Blue for 광고 캠페인
    'bg-gradient-to-r from-cyan-500 to-cyan-600'      // Cyan for 브랜드 매니지먼트
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-lg overflow-hidden w-[300px] mx-auto transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
        >
          {/* Colored divider bar */}
          <div className={`mx-auto h-1 w-16 rounded-full ${colors[index % colors.length]}`}></div>
          
          {/* Card content */}
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold text-white mb-4">
              {card.title}
            </h3>
            <p className="text-gray-300 leading-relaxed">
              {card.description}
            </p>
          </div>  
        </div>
      ))}
    </div>
  );
};

export default AnimatedCardGrid;