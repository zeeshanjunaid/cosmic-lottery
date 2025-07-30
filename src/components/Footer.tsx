import React from 'react';
import { Heart, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'how-it-works' | 'faq' | 'terms' | 'privacy') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerLinks = [
    {
      title: 'Platform',
      links: [
        { name: 'How It Works', action: () => onNavigate('how-it-works') },
        { name: 'FAQ', action: () => onNavigate('faq') },
        { name: 'Winners', href: '#winners' },
        { name: 'Support', href: '#support', external: true }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', action: () => onNavigate('terms') },
        { name: 'Privacy Policy', action: () => onNavigate('privacy') },
        { name: 'Disclaimer', href: '#disclaimer' },
        { name: 'Responsible Gaming', href: '#responsible' }
      ]
    },
    {
      title: 'Community',
      links: [
        { name: 'Discord', href: '#discord', external: true },
        { name: 'Twitter', href: '#twitter', external: true },
        { name: 'Telegram', href: '#telegram', external: true },
        { name: 'GitHub', href: '#github', external: true }
      ]
    }
  ];

  return (
    <footer className="bg-[#181830]/80 backdrop-blur-xl border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
                  <Heart className="w-6 h-6 text-black fill-current" />
                </div>
                <div className="text-2xl font-bold text-white">
                  Cosmic <span className="text-[#2DE582]">Lottery</span>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                The most fair and transparent decentralized lottery platform. 
                Join thousands of players in our cosmic journey to the stars.
              </p>
            </div>

            {/* Footer Links */}
            {footerLinks.map((section, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-white font-semibold text-sm uppercase tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      {link.action ? (
                        <button
                          onClick={link.action}
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1 group text-left"
                        >
                          <span>{link.name}</span>
                        </button>
                      ) : (
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 flex items-center space-x-1 group"
                        >
                          <span>{link.name}</span>
                          {link.external && (
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                          )}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-white/60 text-sm mb-2">
                © 2025 Cosmic Lottery. All rights reserved.
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-2 text-white/50 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400 fill-current" />
                <span>for the crypto community</span>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-400">
              <span className="px-2 py-1 bg-white/5 rounded">Built on Ethereum</span>
              <span className="px-2 py-1 bg-white/5 rounded">Provably Fair</span>
              <span className="px-2 py-1 bg-white/5 rounded">Instant Payouts</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;