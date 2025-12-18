'use client'

import { motion } from "motion/react"
import Image from "next/image"

export function OurChannelSection() {
    return (
        <section className="py-20 text-white">
            <div className="w-full max-w-7xl mx-auto px-6 space-y-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wider text-center">
                        OUR CHANNELS
                    </h2>
                </motion.div>

                {/* UWA */}
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left column - Banner and Video */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className=""
                    >
                        {/* YouTube Banner */}
                        <div className="relative w-full overflow-hidden">
                            <Image
                                src="/channels/uwa_youtube_banner.jpg"
                                alt="YouTube Channel Banner"
                                width={800}
                                height={200}
                                className="w-full h-auto object-cover"
                            />
                        </div>

                        {/* YouTube Video Embed */}
                        <div className="relative aspect-video bg-blue-900 overflow-hidden">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/7g9nrqfG06E?si=B38LElSpb--PF8tY" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </motion.div>

                    {/* Right column - Title and Description */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold">
                            &lt;우와 UWA KITADERA&gt;
                        </h3>

                        <div className="space-y-4 text-sm md:text-lg leading-relaxed">
                            <p>
                                우와(UWA)의 일상부터 뷰티, 패션,<br/>
                                그리고 국내 방송 출연까지!<br/>
                                우와의 모든 매력을 담은 공식 유튜브 채널입니다.
                            </p>

                            <p>
                                멋진 모습부터 사랑스러운 매력까지,<br/>
                                지금 바로 우와의 다채로운 이야기를 만나보세요!
                            </p>
                        </div>
                    </motion.div>
                </div>

                <hr className="bg-gray-400"/>

                {/* Yumeki */}
                <div className="grid md:grid-cols-2 gap-8 items-center">

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        viewport={{ once: true }}
                        className="space-y-6 text-center"
                    >
                        <h3 className="text-3xl md:text-4xl font-bold">
                            &lt;유메키 YUMEKI&gt;
                        </h3>

                        <div className="space-y-4 text-sm md:text-lg leading-relaxed">
                            <p>
                                보이즈2플래닛 출연자 유메키(YUMEKI)!<br/>
                                유메키의 일과 일상을 담은 공식 유튜브 채널입니다.
                            </p>

                            <p>
                                댄서 유메키의 비하인드와 일상<br/>
                                일상 이야기를 만나보세요!
                            </p>
                        </div>
                    </motion.div>

                    
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className=""
                    >
                        {/* YouTube Banner */}
                        {/* <div className="relative w-full overflow-hidden">
                            <Image
                                src="/channels/uwa_youtube_banner.jpg"
                                alt="YouTube Channel Banner"
                                width={800}
                                height={200}
                                className="w-full h-auto object-cover"
                            />
                        </div> */}

                        {/* YouTube Video Embed */}
                        <div className="relative aspect-video bg-blue-900 overflow-hidden">
                            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/8Lfj8cE7i5U" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
