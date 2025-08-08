import InfiniteScrollPartners from "../components/InfiniteScroll";
import {motion} from "framer-motion";


export function SectionThree() {
    return (
        <section id="partner-channel" className="bg-black text-center">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <InfiniteScrollPartners />
            </motion.div>
        </section>
    )
}