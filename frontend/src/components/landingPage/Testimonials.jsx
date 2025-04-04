'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Event Director, TechConf',
    quote: 'EventPulseAI transformed how we manage our tech conferences. We identified and fixed issues in real-time, resulting in 40% higher satisfaction scores!',
    stars: 5,
  },
  {
    id: 2,
    name: 'Mark Thompson',
    role: 'Festival Organizer',
    quote: 'The real-time sentiment analysis helped us understand exactly what our attendees wanted. We could respond to concerns before they became problems.',
    stars: 5,
  },
  {
    id: 3,
    name: 'Priya Patel',
    role: 'Corporate Events Manager',
    quote: 'Our annual company summit had never run so smoothly. The insights we gained have completely changed how we approach event planning.',
    stars: 4,
  },
];

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100"
    >
      <div className="flex mb-3">
        {Array.from({ length: testimonial.stars }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
      <div>
        <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};

const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="py-16 md:py-20 px-6 md:px-8 lg:px-12 bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            What Our Users Say
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="w-24 h-1 bg-yellow-400 mx-auto mb-6"
          ></motion.div>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
