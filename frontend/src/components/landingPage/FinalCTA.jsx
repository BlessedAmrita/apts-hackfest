'use client';

import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FinalCTASection = () => {
  return (
    <section className="py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-gradient-to-r from-orange-100 to-orange-200 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-orange-100/80 to-orange-200/80 backdrop-blur-sm"></div>
      
      <div className="max-w-5xl mx-auto text-center glass relative z-10 py-12 px-6 rounded-2xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
        >
          Transform Your Events with AI-Driven Insights!
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-gray-800/90 mb-8 max-w-2xl mx-auto"
        >
          Join thousands of event organizers who are delivering exceptional experiences with real-time sentiment monitoring.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button className="bg-white hover:bg-gray-100 font-bold text-orange-400 text-lg py-6 px-8 h-auto shadow-lg group backdrop-blur-sm">
            Get Started – Monitor Your Event Now
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
