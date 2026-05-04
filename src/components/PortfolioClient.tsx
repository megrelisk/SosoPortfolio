"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import styles from "./Portfolio.module.css";

// Milestones - Ordered from 2026 to 2016
const milestones = [
  { id: 1, title: "The Horizon", year: "2026", desc: "What's next? Defying gravity in every new dimension.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 2, title: "The Expansion", year: "2025", desc: "Building the ecosystem. Projects that rise above the noise.", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop" },
  { id: 3, title: "The Synergy", year: "2024", desc: "Integrating Gemini. Transforming data into fluid motion.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
  { id: 4, title: "The Shift", year: "2023", desc: "Adapting to a rapidly evolving digital landscape.", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop" },
  { id: 5, title: "The Foundation", year: "2022", desc: "Establishing core principles of weightless design.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 6, title: "The Breakthrough", year: "2021", desc: "Reaching new heights with AI-driven creativity.", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop" },
  { id: 7, title: "The Adaptation", year: "2020", desc: "Navigating uncertainty with agile solutions.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
  { id: 8, title: "The Momentum", year: "2019", desc: "Gaining speed and accelerating innovation.", img: "https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=800&auto=format&fit=crop" },
  { id: 9, title: "The Elevation", year: "2018", desc: "Lifting our standards and expanding our reach.", img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop" },
  { id: 10, title: "The Discovery", year: "2017", desc: "Exploring uncharted territories in web design.", img: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=800&auto=format&fit=crop" },
  { id: 11, title: "The Launch", year: "2016", desc: "Initial spark. Breaking free from traditional constraints.", img: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop" },
];

export default function PortfolioClient() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wrapper: containerRef.current,
      content: containerRef.current.querySelector('div'), // Usually Lenis works best on a scrollable child
      lerp: 0.1,
      wheelMultiplier: 1,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  const sectionCount = milestones.length + 2; // Intro + Milestones + Footer
  const sectionFraction = 1 / sectionCount;

  // Video shrinks to center (corners round out) and disappears
  const videoScale = useTransform(scrollYProgress, [0, sectionFraction], [1, 0.2]);
  const videoBorderRadius = useTransform(scrollYProgress, [0, sectionFraction], ["0vw", "50vw"]);
  const videoOpacity = useTransform(scrollYProgress, [0, sectionFraction, sectionFraction * 1.2], [1, 1, 0]);
  
  const heroOpacity = useTransform(scrollYProgress, [0, sectionFraction * 0.8], [1, 0]);

  return (
    <div className={styles.snapContainer} ref={containerRef}>
      {/* Scrollable content wrapper for Lenis */}
      <div>
        {/* FIXED LOGO */}
        <div className={styles.logo}>SOSO KARTOZIA</div>

        {/* FIXED VIDEO BACKGROUND */}
        <motion.div
          className={styles.fixedVideoContainer}
          style={{
            scale: videoScale,
            borderRadius: videoBorderRadius,
            opacity: videoOpacity,
            overflow: "hidden",
          }}
        >
          <div className={styles.overlay} />
          <video
            className={styles.videoElement}
            src="/testvideo.mp4"
            autoPlay
            loop
            muted
            playsInline
          />
        </motion.div>

        {/* SECTION 1: INTRO */}
        <section className={styles.snapSection}>
          <motion.div 
            className={styles.heroText}
            style={{ opacity: heroOpacity }}
          >
            <h1 className={styles.heroHeadline}>Defying the Gravity of the Ordinary.</h1>
            <p className={styles.heroSubheadline}>
              Where human creativity meets Gemini&apos;s intelligence. We don&apos;t just build; we elevate.
            </p>
          </motion.div>
        </section>

        {/* TIMELINE SECTIONS */}
        {milestones.map((milestone, index) => (
          <section className={styles.snapSection} key={milestone.id}>
            <TimelineItem milestone={milestone} index={index} />
          </section>
        ))}

        {/* FOOTER SECTION */}
        <section className={styles.snapSection}>
          <Footer />
        </section>
      </div>
    </div>
  );
}

function TimelineItem({ milestone, index }: { milestone: any; index: number }) {
  const isLeft = index % 2 === 0;

  return (
    <div className={`${styles.timelineItemContainer} ${isLeft ? styles.alignLeft : styles.alignRight}`}>
      {/* Animated Vertical Line Segment */}
      <motion.div 
        className={`${styles.verticalLine} ${isLeft ? styles.lineLeft : styles.lineRight}`}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ amount: 0.1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />

      {/* Timeline Content */}
      <motion.div 
        className={styles.timelineContentCard}
        initial={{ opacity: 0, x: isLeft ? 100 : -100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ amount: 0.4 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className={styles.milestoneTextContent}>
          <span className={styles.milestoneYear}>{milestone.year}</span>
          <h2 className={styles.milestoneTitle}>{milestone.title}</h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={milestone.img} alt={milestone.title} className={styles.milestoneImage} />
          <p className={styles.milestoneDesc}>{milestone.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <motion.div 
        className={styles.glowingProfile}
        initial={{ scale: 0.8, opacity: 0, filter: "brightness(0.5) blur(20px)" }}
        whileInView={{ scale: 1, opacity: 1, filter: "brightness(1) blur(0px)" }}
        viewport={{ amount: 0.5 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="https://images.unsplash.com/photo-1504257432389-523431e51ce4?q=80&w=800&auto=format&fit=crop" alt="Soso Kartozia" className={styles.profileImg} />
        <div className={styles.glowEffect} />
      </motion.div>
      
      <motion.h2 
        className={styles.footerTitle}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        SOSO KARTOZIA
      </motion.h2>
      
      <motion.p 
        className={styles.footerSubtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        The Future is Weightless.
      </motion.p>
    </div>
  );
}

