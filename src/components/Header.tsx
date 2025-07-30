import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Wallet, Crown } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';

const Header = () => {
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
      className="bg-black/30 backdrop-blur-xl border-b border-pink-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-lg flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Cosmic Lottery
              </h1>
              <div className="flex items-center space-x-1">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400">LIVE</span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-pink-400 font-medium px-3 py-2 rounded-lg bg-pink-500/20 border border-pink-500/30">
              Pools
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              My Tickets
            </button>
            <button className="text-gray-300 hover:text-white transition-colors">
              Winners
            </button>
          </nav>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Button */}
            {isConnected ? (
              <button
                onClick={handleWalletDisconnect}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-lg text-white font-medium transition-all"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">{formatAddress(address!)}</span>
              </button>
            ) : (
              <button
                onClick={handleWalletConnect}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-lg text-white font-medium transition-all"
              >
                <Wallet className="w-4 h-4" />
                <span>Connect</span>
              </button>
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
            className="md:hidden border-t border-pink-500/20 py-4"
          >
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-pink-400 font-medium bg-pink-500/20 border border-pink-500/30 rounded-lg">
                Pools
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                My Tickets
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                Winners
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;