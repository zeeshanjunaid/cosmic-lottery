import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, User, Wallet, Settings, Trophy, Star, Zap, Crown } from 'lucide-react';
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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative z-50 bg-black/20 backdrop-blur-xl border-b border-pink-500/20"
    >
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/5 to-purple-500/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Section */}
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative">
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-pink-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(236, 72, 153, 0.3)',
                    '0 0 30px rgba(236, 72, 153, 0.5)',
                    '0 0 20px rgba(236, 72, 153, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Crown className="w-7 h-7 text-white" />
              </motion.div>
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Star className="w-2 h-2 text-white fill-current" />
              </motion.div>
            </div>
            
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-400 via-fuchsia-400 to-orange-400 bg-clip-text text-transparent">
                Cosmic Lottery
              </h1>
              <div className="flex items-center space-x-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs text-green-400 font-medium">LIVE</span>
              </div>
            </div>
          </motion.div>

          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
            {[
              { name: 'Pools', icon: Trophy, active: true },
              { name: 'My Tickets', icon: Star },
              { name: 'Winners', icon: Crown },
              { name: 'Admin', icon: Settings, admin: true }
            ].map((item, index) => (
              <motion.button
                key={item.name}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  item.active 
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                    : item.admin
                    ? 'text-orange-400 hover:text-orange-300 hover:bg-orange-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
                {item.admin && (
                  <div className="px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
                    <span className="text-xs font-bold text-orange-300">ADMIN</span>
                  </div>
                )}
              </motion.button>
            ))}
          </nav>

          {/* Wallet Section */}
          <div className="flex items-center space-x-4">
            {/* Balance Display */}
            {isConnected && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl"
              >
                <div className="w-2 h-2 bg-emerand-400 rounded-full" />
                <span className="text-emerald-400 font-bold">$1,250.00</span>
                <span className="text-emerald-400/70 text-sm">USDT</span>
              </motion.div>
            )}

            {/* Wallet Connection */}
            {isConnected ? (
              <motion.div className="flex items-center space-x-3">
                <motion.button
                  onClick={handleWalletDisconnect}
                  className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-xl text-white font-medium shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">{formatAddress(address!)}</span>
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                </motion.button>
              </motion.div>
            ) : (
              <motion.button
                onClick={handleWalletConnect}
                className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 rounded-xl text-white font-bold shadow-lg transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.02, boxShadow: '0 10px 25px rgba(236, 72, 153, 0.3)' }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -skew-x-12"
                  animate={{ x: [-200, 200] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                />
                <Wallet className="w-4 h-4 relative z-10" />
                <span className="relative z-10">Connect Wallet</span>
                <Zap className="w-4 h-4 relative z-10" />
              </motion.button>
            )}

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-colors"
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isMenuOpen ? 'auto' : 0, opacity: isMenuOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden border-t border-pink-500/20 mt-4"
        >
          <div className="py-4 space-y-2">
            {[
              { name: 'Pools', icon: Trophy, active: true },
              { name: 'My Tickets', icon: Star },
              { name: 'Winners', icon: Crown },
              { name: 'Admin', icon: Settings, admin: true }
            ].map((item) => (
              <motion.button
                key={item.name}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                  item.active 
                    ? 'bg-pink-500/20 text-pink-400 border border-pink-500/30' 
                    : item.admin
                    ? 'text-orange-400 hover:bg-orange-500/10'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.name}</span>
                {item.admin && (
                  <div className="ml-auto px-2 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-lg">
                    <span className="text-xs font-bold text-orange-300">ADMIN</span>
                  </div>
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;