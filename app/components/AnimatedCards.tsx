import { Transition } from "motion";
import { useInView, motion } from "motion/react";
import { useRef } from "react";

interface CardData {
  title: string;
  description: string;
}

interface AnimatedCardProps extends CardData {
  index: number;
}

// Animated Card Grid with hover effects
const AnimatedCard: React.FC<AnimatedCardProps> = ({ title, description, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const cardTransition: Transition = { 
    duration: 0.6, 
    delay: index * 0.1 
  };

  const hoverTransition: Transition = { 
    duration: 0.3 
  };

  return (
    <motion.div
      ref={ref}
      className="rounded-lg p-6 h-50 flex flex-col justify-center items-center gap-10 text-center"
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={cardTransition}
      whileHover={{ 
        y: -10, 
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        transition: hoverTransition
      }}
    >
        <hr className="w-[100px] bg-white"/>
        <div>
            <motion.h3 
                className="text-2xl font-bold mb-4 text-white"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: (index * 0.1) + 0.3 }}
            >
                {title}
            </motion.h3>
            <motion.p 
                className="text-white"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: (index * 0.1) + 0.4 }}
            >
                {description}
            </motion.p>


        </div>
    </motion.div>
  );
};

interface AnimatedCardGridProps {
  cards: CardData[];
}

const AnimatedCardGrid: React.FC<AnimatedCardGridProps> = ({ cards }) => {
  return (
    <section className="pt-10 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {cards.map((card: CardData, index: number) => (
          <AnimatedCard 
            key={index}
            title={card.title}
            description={card.description}
            index={index}
          />
        ))}
      </div>
    </section>
  );
};

export default AnimatedCardGrid;