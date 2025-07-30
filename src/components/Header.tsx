import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Wallet, Home, Trophy, Settings, Shield } from 'lucide-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onNavigate: (page: 'home' | 'admin' | 'winners' | 'settings') => void;
  currentPage: 'home' | 'admin' | 'winners' | 'settings';
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

  // Mock admin check - in real app, this would check if connected address is admin
  const isAdmin = address === '0x742d35Cc6634C0532925a3b8D1C7d8B3b19d6B88' || true; // Set to true for demo

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#181830]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleNavClick('home')}>
            <div className="text-2xl lg:text-3xl font-bold text-white">
              Cosmic <span className="text-[#2DE582]">Lottery</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => handleNavClick('home')}
              className={`flex items-center space-x-2 font-medium transition-colors px-4 py-2 rounded-lg ${
                currentPage === 'home' ? 'text-[#2DE582]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => handleNavClick('admin')}
                className={`flex items-center space-x-2 font-medium transition-colors px-4 py-2 rounded-lg ${
                  currentPage === 'admin' ? 'text-[#2DE582]' : 'text-white/70 hover:text-white'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}
            
            <button 
              onClick={() => handleNavClick('winners')}
              className={`flex items-center space-x-2 font-medium transition-colors px-4 py-2 rounded-lg ${
                currentPage === 'winners' ? 'text-[#2DE582]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Winners</span>
            </button>
            <button 
              onClick={() => handleNavClick('settings')}
              className={`flex items-center space-x-2 font-medium transition-colors px-4 py-2 rounded-lg ${
                currentPage === 'settings' ? 'text-[#2DE582]' : 'text-white/70 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
          </nav>

          {/* User Stats & Wallet */}
          <div className="flex items-center space-x-6">
            {/* User Balance */}
            {isConnected && (
              <div className="hidden lg:flex items-center bg-white/5 backdrop-blur-sm border border-white/10 rounded-full px-5 py-2.5">
                <div className="text-sm font-medium">
                  <span className="text-white/70">Balance: </span>
                  <span className="text-[#2DE582] font-bold">6000 USDT</span>
                </div>
              </div>
            )}

            {/* Wallet Button */}
            {isConnected ? (
              <button
                onClick={handleWalletDisconnect}
                disabled={isPending}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-full text-black font-semibold transition-colors disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span className="hidden sm:inline font-mono">{formatAddress(address!)}</span>
              </button>
            ) : (
              <button
                onClick={handleWalletConnect}
                disabled={isPending}
                className="flex items-center space-x-2 px-5 py-2.5 bg-[#2DE582] hover:bg-[#2DE582]/80 rounded-full text-black font-semibold transition-colors disabled:opacity-50"
              >
                <Wallet className="w-4 h-4" />
                <span>{isPending ? 'Connecting...' : 'Connect'}</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2.5 bg-white/10 hover:bg-white/20 rounded-lg"
            >
              {isMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-white/10 py-6 space-y-3"
          >
            <button 
              onClick={() => handleNavClick('home')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                currentPage === 'home' ? 'text-[#2DE582] bg-[#2DE582]/10' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
            
            {isAdmin && (
              <button 
                onClick={() => handleNavClick('admin')}
                className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                  currentPage === 'admin' ? 'text-[#2DE582] bg-[#2DE582]/10' : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                <Shield className="w-4 h-4" />
                <span>Admin</span>
              </button>
            )}
            
            <button 
              onClick={() => handleNavClick('winners')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                currentPage === 'winners' ? 'text-[#2DE582] bg-[#2DE582]/10' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Winners</span>
            </button>
            <button 
              onClick={() => handleNavClick('settings')}
              className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3 ${
                currentPage === 'settings' ? 'text-[#2DE582] bg-[#2DE582]/10' : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Settings</span>
            </button>
            
            {/* Mobile Balance Display */}
            {isConnected && (
              <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg">
                <div className="text-sm font-medium">
                  <span className="text-white/70">Balance: </span>
                  <span className="text-[#2DE582] font-bold">6000 USDT</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;