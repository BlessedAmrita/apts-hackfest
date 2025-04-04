'use client';
import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 px-6 md:px-8 lg:px-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              Event<span className="text-yellow-400">Pulse</span><span className="text-blue-400">AI</span>
            </h3>
            <p className="text-gray-400 mb-4">
              Real-time event sentiment monitoring powered by AI to enhance attendee experiences.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-yellow-400">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Product</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Case Studies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Reviews</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Documentation</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Guides</a></li>
              <li><a href="#" className="text-gray-400 hover:text-yellow-400">Support</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-gray-400" />
                <a href="mailto:info@eventpulseai.com" className="text-gray-400 hover:text-yellow-400">
                  info@eventpulseai.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-gray-400" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-yellow-400">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 mt-8 text-sm text-gray-500 flex flex-col md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} EventPulseAI. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-yellow-400">Privacy Policy</a>
            <a href="#" className="hover:text-yellow-400">Terms of Service</a>
            <a href="#" className="hover:text-yellow-400">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;