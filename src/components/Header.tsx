import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, Home, Trophy, Settings, Shield, Star, HelpCircle, FileText } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigate: (page: 'home' | 'admin' | 'winners' | 'settings' | 'how-it-works' | 'faq' | 'terms' | 'privacy') => void;
  currentPage: 'home' | 'admin' | 'winners' | 'settings' | 'how-it-works' | 'faq' | 'terms' | 'privacy';
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = () => {
    const connector = connectors.find(c => c.name.includes('MetaMask')) || connectors[0];
    if (connector) {
      connect({ connector }, {
        onSuccess: () => {
          toast.success('Wallet connected successfully!');
        },
        onError: (error) => {
          toast.error('Failed to connect wallet: ' + error.message);
        }
      });
    } else {
      toast.error('No wallet connector available');
    }
  };

  const handleWalletDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected!');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleNavClick = (page: 'home' | 'admin' | 'winners' | 'settings') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleInfoNavClick = (page: 'how-it-works' | 'faq' | 'terms' | 'privacy') => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  // Mock admin check - in real app, this would check if connected address is admin
  const isAdmin = address === '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88' || true; // Set to true for demo

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    ...(isAdmin ? [{ id: 'admin', label: 'Admin', icon: Shield }] : []),
    { id: 'winners', label: 'Winners', icon: Trophy },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#181830]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
    >
      {/* Main Header Content */}
      <div className="w-full px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          
          {/* Logo Section */}
          <motion.div 
            className="flex items-center cursor-pointer group py-4" 
            onClick={() => handleNavClick('home')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg group-hover:shadow-[#2DE582]/25 transition-all duration-300">
                <Star className="w-6 h-6 text-black fill-current" />
              </div>
              <div className="text-2xl lg:text-3xl font-bold text-white group-hover:text-[#2DE582] transition-colors duration-300">
                Cosmic <span className="text-[#2DE582]">Lottery</span>
              </div>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as any)}
                    className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                      isActive 
                        ? 'text-[#2DE582]' 
                        : 'text-white/70 hover:text-white'
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon className={`w-4 h-4 transition-colors duration-300 ${
                      isActive ? 'text-[#2DE582]' : 'text-white/60 group-hover:text-white'
                    }`} />
                    <span className="transition-colors duration-300">{item.label}</span>
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#2DE582] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    
                    {/* Hover indicator */}
                    {!isActive && (
                      <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </nav>

          {/* User Section */}
          <div className="flex items-center space-x-6">
            {/* User Balance - Desktop Only */}
            {isConnected && (
              <div className="hidden xl:flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl px-6 py-3">
                <div className="text-sm font-medium">
                  <span className="text-white/70">Balance: </span>
                  <span className="text-[#2DE582] font-bold text-lg">6,000 USDT</span>
                </div>
              </div>
            )}

            {/* Wallet Button */}
            <motion.div whileTap={{ scale: 0.98 }}>
              {isConnected ? (
                <button
                  onClick={handleWalletDisconnect}
                  disabled={isPending}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black text-sm font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono">{formatAddress(address!)}</span>
                  <span className="sm:hidden">Wallet</span>
                </button>
              ) : (
                <button
                  onClick={handleWalletConnect}
                  disabled={isPending}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black text-sm font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isPending ? 'Connecting...' : 'Connect Wallet'}</span>
                </button>
              )}
            </motion.div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-3 text-white hover:bg-white/10 rounded-xl border border-white/10"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden border-t border-white/10 py-8"
          >
            <div className="space-y-4">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                
                return (
                  <motion.button
                    key={item.id}
                    onClick={() => handleNavClick(item.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                      isActive 
                        ? 'text-black bg-[#2DE582] shadow-lg' 
                        : 'text-white/80 hover:text-white hover:bg-white/10'
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="font-medium">{item.label}</span>
                  </motion.button>
                );
              })}
              
              {/* Mobile Balance Display */}
              {isConnected && (
                <div className="mx-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                  <div className="text-center">
                    <span className="text-white/70 text-sm">Balance: </span>
                    <span className="text-[#2DE582] font-bold text-lg">6,000 USDT</span>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;