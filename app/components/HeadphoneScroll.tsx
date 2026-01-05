"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const frameCount = 40;
const frames = Array.from({ length: frameCount }, (_, i) =>
    `/headphone-sequence/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`
);

export default function HeadphoneScroll() {
    // Use a longer container to allow sufficient scrolling space
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Track scroll progress within this component
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress (0 to 1) to frame index (0 to 39)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    // Text Opacity Transforms
    const text1Opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25, 0.35], [0, 1, 1, 0]);
    const text2Opacity = useTransform(scrollYProgress, [0.40, 0.50, 0.60, 0.70], [0, 1, 1, 0]);
    const text3Opacity = useTransform(scrollYProgress, [0.75, 0.85, 0.95, 1.0], [0, 1, 1, 0]);

    // Preload images
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        frames.forEach((src) => {
            const img = new Image();
            img.src = src;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) {
                    setImagesLoaded(true);
                }
            };
            imgs.push(img);
        });
        setImages(imgs);
    }, []);

    // Drive the canvas rendering
    useEffect(() => {
        if (!imagesLoaded || !canvasRef.current) return;

        const context = canvasRef.current.getContext("2d");
        if (!context) return;

        // Set canvas dimensions to match the first image (or fixed aspect ratio)
        // Assuming all frames are same size
        const firstImg = images[0];
        canvasRef.current.width = firstImg.width;
        canvasRef.current.height = firstImg.height;

        // Render loop helper
        const render = (index: number) => {
            // Clamp index and ensure integer
            const frameToRender = Math.min(
                frameCount - 1,
                Math.max(0, Math.round(index))
            );
            context.clearRect(0, 0, canvasRef.current!.width, canvasRef.current!.height);
            context.drawImage(images[frameToRender], 0, 0);
        };

        // Listen to frameIndex changes
        const unsubscribe = frameIndex.on("change", (latest) => {
            render(latest);
        });

        // Initial render
        render(frameIndex.get());

        return () => unsubscribe();
    }, [imagesLoaded, frameIndex, images]);

    return (
        <section
            ref={containerRef}
            className="relative w-full bg-black"
            style={{ height: "400vh" }} // 4x screen height for scrolling space
        >
            <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center overflow-hidden">
                {!imagesLoaded ? (
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                        <p className="text-sm uppercase tracking-widest text-white/50">Loading Assets...</p>
                    </div>
                ) : (
                    <>
                        <canvas
                            ref={canvasRef}
                            className="max-w-full max-h-full object-contain pointer-events-none"
                        />

                        {/* Overlay Texts absolutely positioned */}
                        <motion.div
                            style={{ opacity: text1Opacity }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="text-center">
                                <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                                    Precision Crafted
                                </h2>
                                <p className="mt-4 text-xl text-white/70">Engineered for the audiophile elite.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ opacity: text2Opacity }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="text-center">
                                <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                                    Sonic Purity
                                </h2>
                                <p className="mt-4 text-xl text-white/70">Distortion-free sound at any volume.</p>
                            </div>
                        </motion.div>

                        <motion.div
                            style={{ opacity: text3Opacity }}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        >
                            <div className="text-center">
                                <h2 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">
                                    Zenith X
                                </h2>
                                <p className="mt-4 text-xl text-white/70">Experience the impossible.</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </div>
        </section>
    );
}

