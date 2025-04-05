'use client';
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import DashboardMockup from "./DashboardMockup";
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { signInWithGoogle } from '@/firebase/auth';

import { setRole } from '@/config/slices/userSlice';

const HeroSection = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = (role) => {
    dispatch(setRole(role)); // Just set role in Redux
    signInWithGoogle(dispatch, router); // Don't pass it to auth anymore
  };
  return (
    <section className="py-16 md:py-20 lg:py-24 px-6 md:px-8 lg:px-12 w-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-start"
        >
          <h1 className="px-6 md:px-0 text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
            Real-Time Event Sentiment Monitoring
            <span className="text-orange-400 block mt-2">Stay Ahead of Attendee Experience</span>
          </h1>
          <p className="px-6 md:px-0 text-lg text-gray-700 mb-8 max-w-lg">
            AI-powered insights to track attendee feedback, detect issues instantly, and enhance event satisfaction.
          </p>
          <div className="flex flex-col md:flex-row gap-4">
            <Button variant="outline" className="bg-orange-200  hover:bg-transparent hover:text-black text-white border-yellow-400 font-bold px-2 sm:px-6 py-6 text-lg h-auto" onClick={() => {
              dispatch(setRole('organiser'));
              signInWithGoogle(dispatch, router);
            }}>
              Get Started – Monitor Your Event Now
            </Button>
            <Button variant="outline" className="bg-orange-200 hover:bg-tranparent hover:text-black border-yellow-400 text-white font-bold  hover:bg-transparent px-2 sm:px-6  py-6 text-lg h-auto" onClick={() => {
              dispatch(setRole('attendee'));
              signInWithGoogle(dispatch, router);
            }}>
              Join an Event – Share Your Experience
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=""
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
