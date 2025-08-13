
import Link from "next/link"
import { AnimatedTabs } from "../components/AnimatedTabs"
import { FaArrowRight } from "react-icons/fa"

export function PortfolioSection() {
    return (
        <section className="w-full flex flex-col items-center justify-center py-16">
            <h2 className="text-3xl font-bold">OUR WORKS</h2>
            <AnimatedTabs />
            <Link href="/videos" className='border mt-5 px-5 py-2 flex justify-center items-center group hover:text-purple-600'>
                <p>전체보기</p>
                <FaArrowRight className='inline ml-2 group-hover:translate-x-2 transition-all' />
            </Link>
        </section>
    )
}