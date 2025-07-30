import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, Home, Trophy, Settings } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = () => {
    const connector = connectors[0];
    if (connector) {
      connect({ connector });
      toast.success('Wallet connected!');
    }
  };

  const handleWalletDisconnect = () => {
    disconnect();
    toast.success('Wallet disconnected!');
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#181830]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="text-2xl font-bold text-white">
              Cosmic <span className="text-[#2DE582]">Lottery</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="flex items-center space-x-2 text-[#2DE582] font-medium hover:text-white transition-colors">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Trophy className="w-4 h-4" />
              <span>Winners</span>
            </button>
            <button className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>

          {/* User Stats & Wallet */}
          <div className="flex items-center space-x-4">
            {/* User Balance */}
            {isConnected && (
              <div className="hidden sm:flex items-center space-x-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2">
                <div className="text-sm">
                  <span className="text-white/70">Balance: </span>
                  <span className="text-[#2DE582] font-bold">6000</span>
                </div>
              </div>
            )}

            {/* Wallet Button */}
            {isConnected ? (
              <motion.button
                onClick={handleWalletDisconnect}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-full text-black font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline">{formatAddress(address!)}</span>
              </motion.button>
            ) : (
              <motion.button
                onClick={handleWalletConnect}
                className="flex items-center space-x-2 px-4 py-2 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-full text-black font-semibold transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Wallet className="w-4 h-4" />
                <span>Connect</span>
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-4 space-y-2"
          >
            <button className="w-full text-left px-4 py-2 text-[#2DE582] font-medium hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            <button className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Winners</span>
            </button>
            <button className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors flex items-center space-x-2">
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;