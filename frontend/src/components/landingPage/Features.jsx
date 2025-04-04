'use client';
import React from "react";
import { motion } from "framer-motion";
import { 
  LineChart, 
  AlertTriangle, 
  LayoutDashboard, 
  Users 
} from "lucide-react";

const features = [
  {
    id: 1,
    title: "Real-Time Sentiment Analysis",
    description: "AI-powered insights from social media, chats, and feedback forms.",
    icon: LineChart,
    color: "bg-blue-100",
    iconColor: "text-blue-500"
  },
  {
    id: 2,
    title: "Live Issue Detection",
    description: "Identify and resolve problems before they escalate.",
    icon: AlertTriangle,
    color: "bg-red-100",
    iconColor: "text-red-500"
  },
  {
    id: 3,
    title: "Seamless Event Management",
    description: "Organizers get a centralized dashboard for sentiment tracking.",
    icon: LayoutDashboard,
    color: "bg-yellow-100",
    iconColor: "text-yellow-500"
  },
  {
    id: 4,
    title: "Attendee Engagement",
    description: "Community forums, live discussions, and direct issue reporting.",
    icon: Users,
    color: "bg-green-100",
    iconColor: "text-green-500"
  }
];

const FeatureCard = ({ feature, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow"
    >
      <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
        <feature.icon className={`h-6 w-6 ${feature.iconColor}`} />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
};

const FeaturesSection = () => {
  return (
    <section id="features" className="py-16 md:py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-white to-yellow-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            Key Features
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-yellow-400 mx-auto mb-6"
          ></motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-700 max-w-2xl mx-auto"
          >
            Our AI-powered platform provides comprehensive tools to monitor and enhance attendee experience at your events.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={feature.id} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
