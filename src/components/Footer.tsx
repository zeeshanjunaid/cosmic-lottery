import React from "react";
import { Heart } from "lucide-react";

interface FooterProps {
  onNavigate: (
    page:
      | "home"
      | "admin"
      | "winners"
      | "settings"
      | "my-tickets"
      | "how-it-works"
      | "faq"
      | "terms"
      | "privacy"
  ) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "How It Works", action: () => onNavigate("how-it-works") },
        { name: "FAQ", action: () => onNavigate("faq") },
        { name: "Winners", action: () => onNavigate("winners") },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", action: () => onNavigate("terms") },
        { name: "Privacy Policy", action: () => onNavigate("privacy") },
      ],
    },
    {
      title: "Resources",
      links: [
        {
          name: "Documentation",
          href: "https://docs.ethereum.org",
          external: true,
        },
        {
          name: "Blockchain Explorer",
          href: "https://etherscan.io",
          external: true,
        },
        {
          name: "Web3 Guide",
          href: "https://ethereum.org/en/wallets/",
          external: true,
        },
      ],
    },
  ];

  return (
    <footer className="bg-[#181830]/80 backdrop-blur-xl border-t border-white/10 mt-20 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        {/* Main Footer Content */}
        <div className="py-6 sm:py-8">
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-8">
            {/* Quick Links */}
            {footerLinks.map((section) =>
              section.links.map((link, linkIndex) => (
                <div key={`${section.title}-${linkIndex}`}>
                  {link.action ? (
                    <button
                      onClick={link.action}
                      className="text-gray-400 hover:text-[#2DE582] text-xs sm:text-sm transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
                    >
                      {link.name}
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#2DE582] text-xs sm:text-sm transition-colors duration-200 px-2 py-1 rounded hover:bg-white/5"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-white/10 py-4 sm:py-6 lg:py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-center md:text-left">
              <div className="text-white/60 text-xs sm:text-sm mb-2">
                © 2025 Cosmic Lottery. All rights reserved.
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-1 sm:space-x-2 text-white/50 text-xs">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400 fill-current flex-shrink-0" />
                <span>for the crypto community</span>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-400">
              <span className="px-2 py-1 bg-white/5 rounded whitespace-nowrap">
                Built on Ethereum
              </span>
              <span className="px-2 py-1 bg-white/5 rounded whitespace-nowrap">
                Provably Fair
              </span>
              <span className="px-2 py-1 bg-white/5 rounded whitespace-nowrap">
                Instant Payouts
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
