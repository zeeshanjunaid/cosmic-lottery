import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181830]/60 backdrop-blur-sm border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-white/60 text-sm">
            © 2025 Cosmic Lottery. All rights reserved.
          </div>
          <div className="flex items-center space-x-1 text-white/60 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-red-400 fill-current" />
            <span>for the crypto community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;