"use client";
import React from "react";
import { motion } from "framer-motion";

const AnimatedHeading = () => {
  return (
    <motion.h1
      initial={{ y: -50, opacity: 0 }} // Start slightly above and invisible
      animate={{ y: 0, opacity: 1 }} // Drop down to normal position and fade in
      transition={{ duration: 0.8, ease: "easeOut" }} // Smooth transition
      className="text-6xl font-bold mb-4 relative z-10"
    >
      Algorithm Visualizer
    </motion.h1>
  );
};

export default AnimatedHeading;
