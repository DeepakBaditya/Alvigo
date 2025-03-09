"use client";
// components/AnimatedSubheading.js
import { motion } from "framer-motion";

export default function AnimatedSubheading() {
  const text: string =
    "Visualize algorithms with ease. Ready-to-use, simply copy and paste your code.";
  return (
    <motion.p
      className="text-xl mb-8 relative z-10 opacity-mask"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2.5, ease: "easeOut" }}
    >
      {text}
      <style jsx>{`
        .opacity-mask {
          background: linear-gradient(
            to right,
            transparent 0%,
            white 50%,
            white 100%
          );
          background-clip: text;
          -webkit-background-clip: text;
          color: transparent;
          background-size: 200% 100%;
          animation: reveal 2.5s ease-out forwards;
        }

        @keyframes reveal {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
      `}</style>
    </motion.p>
  );
}
