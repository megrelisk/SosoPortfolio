"use client";

import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import styles from "./Portfolio.module.css";

// Milestones - Matching the visual style from the user's image
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

  const sectionCount = milestones.length + 2; 
  const sectionFraction = 1 / sectionCount;

  // Background shrinks and fades
  const bgScale = useTransform(scrollYProgress, [0, sectionFraction], [1, 0.4]);
  const bgOpacity = useTransform(scrollYProgress, [0, sectionFraction, sectionFraction * 1.5], [1, 0.8, 0]);
  
  const heroOpacity = useTransform(scrollYProgress, [0, sectionFraction * 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, sectionFraction * 0.5], [0, -100]);

  return (
    <div className={styles.snapContainer} ref={containerRef}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <motion.h1 
            className={styles.nameFancy}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            SOSO KARTOZIA
          </motion.h1>
          <motion.div 
            className={styles.contactInfo}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <span>555367770</span>
            <span>kartoziasoso@gmail.com</span>
          </motion.div>
        </div>
        <div className={styles.headerRight}>
          <motion.img 
            src="/soso.png" 
            alt="Soso" 
            className={styles.headerProfileImg}
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
          />
        </div>
      </header>

      <div>
        {/* BACKGROUND IMAGE (Replaced video) */}
        <motion.div
          className={styles.fixedBgContainer}
          style={{
            scale: bgScale,
            opacity: bgOpacity,
          }}
        >
          <div className={styles.overlay} />
          <img
            className={styles.bgImage}
            src="/soso.png"
            alt="Background"
          />
        </motion.div>

        {/* SECTION 1: HERO */}
        <section className={styles.snapSection}>
          <motion.div 
            className={styles.heroText}
            style={{ opacity: heroOpacity, y: heroY }}
          >
            <h1 className={styles.heroHeadline}>Defying Gravity.</h1>
          </motion.div>
        </section>

        {/* TIMELINE */}
        <div style={{ position: "relative" }}>
          <div className={styles.centerLine} />
          {milestones.map((milestone, index) => (
            <section className={styles.snapSection} key={milestone.id}>
              <TimelineItem milestone={milestone} index={index} />
            </section>
          ))}
        </div>

        {/* FOOTER */}
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
    <div className={styles.timelineContainer}>
      <div className={`${styles.timelineItem} ${isLeft ? styles.timelineItemLeft : styles.timelineItemRight}`}>
        {/* Card Side */}
        <motion.div 
          className={styles.timelineCardWrapper}
          initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <div 
            className={styles.timelineCard} 
            style={{ backgroundImage: `url(${milestone.img})` }}
          >
            <div className={styles.cardOverlay} />
            <span className={styles.cardYear}>{milestone.year}</span>
          </div>
        </motion.div>

        {/* Dot on Line */}
        <motion.div 
          className={styles.timelineDot}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ amount: 0.8 }}
        />

        {/* Info Side */}
        <motion.div 
          className={styles.timelineInfo}
          initial={{ opacity: 0, x: isLeft ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <h2 className={styles.infoYear}>{milestone.year}</h2>
          <p className={styles.infoDesc}>{milestone.desc}</p>
        </motion.div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className={styles.footerContainer}>
      <motion.h2 
        className={styles.footerTitle}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1 }}
      >
        SOSO KARTOZIA
      </motion.h2>
      
      <motion.p 
        className={styles.footerSubtitle}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.8 }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        Pushing the boundaries of what&apos;s possible.
      </motion.p>
    </div>
  );
}

