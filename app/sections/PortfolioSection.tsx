
import { AnimatedTabs } from "../components/AnimatedTabs"

export function PortfolioSection() {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16">
            <h2 className="text-3xl font-bold">PORTFOLIO</h2>
            <p>진행 사례</p>
            <AnimatedTabs />
        </section>
    )
}