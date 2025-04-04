'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Bell, CheckCircle } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Collect Feedback',
    description: 'Attendees share feedback via chats, social media, or forms.',
    icon: MessageSquare,
    color: 'bg-blue-500',
  },
  {
    id: 2,
    title: 'AI Analysis',
    description: 'AI analyzes sentiment and detects trending issues.',
    icon: Brain,
    color: 'bg-purple-500',
  },
  {
    id: 3,
    title: 'Real-Time Alerts',
    description: 'Organizers receive real-time alerts with actionable insights.',
    icon: Bell,
    color: 'bg-yellow-500',
  },
  {
    id: 4,
    title: 'Issue Resolution',
    description: 'Instant issue resolution improves attendee experience.',
    icon: CheckCircle,
    color: 'bg-green-500',
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-6 md:px-8 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            How It Works
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-yellow-400 mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
              className="glass p-6 rounded-xl relative overflow-hidden group"
            >
              <div className="absolute -right-6 -bottom-6 opacity-10 transform group-hover:scale-110 transition-transform duration-500">
                <step.icon className="w-28 h-28" />
              </div>
              
              <div className="flex items-start gap-4">
                <div className={`${step.color} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <step.icon className="h-6 w-6 text-white" />
                </div>
                <div className="z-10">
                  <div className="flex items-center">
                    <span className="text-xl font-bold mr-2 text-gray-800">{step.id}.</span>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">{step.title}</h3>
                  </div>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
