import React from 'react';
import { Github, Twitter, Globe, Heart, Shield, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#181830]/80 backdrop-blur-xl border-t border-white/10 mt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="text-2xl font-bold text-white">
              Cosmic <span className="text-[#2DE582]">Lottery</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">
              Experience the future of decentralized gaming with fair, transparent, and secure lottery pools.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-white/60 hover:text-[#2DE582] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#2DE582] transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-[#2DE582] transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Active Pools
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                How it Works
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Winners
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                FAQ
              </a>
            </div>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Resources</h3>
            <div className="space-y-2">
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Documentation
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Smart Contracts
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                API Reference
              </a>
              <a href="#" className="block text-white/60 hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <span>support@cosmiclottery.app</span>
              </div>
              <div className="flex items-center space-x-2 text-white/60 text-sm">
                <Shield className="w-4 h-4" />
                <span>Security Audited</span>
              </div>
            </div>
            <div className="pt-2">
              <button className="bg-[#2DE582]/20 hover:bg-[#2DE582]/30 border border-[#2DE582]/40 text-[#2DE582] px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Join Community
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 pt-8">
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
      </div>
    </footer>
  );
};

export default Footer;