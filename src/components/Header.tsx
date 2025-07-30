import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, Crown } from 'lucide-react';
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
      className="bg-black/20 backdrop-blur-xl border-b border-pink-500/20 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="p-2 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-xl shadow-lg">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-pink-400 to-fuchsia-400 bg-clip-text text-transparent">
                Cosmic Lottery
              </h1>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <button className="text-pink-400 font-medium hover:text-pink-300 transition-colors">
              Pools
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              My Tickets
            </button>
            <button className="text-white/70 hover:text-white transition-colors">
              Winners
            </button>
          </nav>

          {/* Wallet & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Wallet Button */}
            {isConnected ? (
              <motion.button
                onClick={handleWalletDisconnect}
                className="px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-lg text-white font-medium transition-all duration-300 shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {formatAddress(address!)}
              </motion.button>
            ) : (
              <motion.button
                onClick={handleWalletConnect}
                className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-lg text-white font-medium transition-all duration-300 shadow-lg"
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
            className="md:hidden border-t border-pink-500/20 py-4 space-y-2"
          >
            <button className="w-full text-left px-4 py-2 text-pink-400 font-medium hover:bg-pink-500/10 rounded-lg transition-colors">
              Pools
            </button>
            <button className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              My Tickets
            </button>
            <button className="w-full text-left px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
              Winners
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;