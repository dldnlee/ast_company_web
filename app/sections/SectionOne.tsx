import { motion } from "motion/react"
import { GradualSpacing } from "../components/GradualSpacing"

export function SectionOne() {
    return (
        <section className="relative w-full h-screen overflow-hidden bg-gradient-to-bl from-purple-800 to-black">
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
        src="/videos/earth.mp4" // Replace with your video path
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="relative z-10 flex flex-col justify-center h-full px-8 max-w-7xl mx-auto overflow-hidden">
        <motion.p 
        initial={{
            opacity: 0
        }}
        animate={{
            opacity: 1
        }}
        transition={{
            duration: 1.5
        }}
        className="text-white text-xl mb-4">브랜드를 콘텐츠로 세상과 연결하다</motion.p>
        <GradualSpacing text="AST Company"/>
      </div>

      {/* Optional: Overlay Background Tint */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40 z-0" />
    </section>
    )
}