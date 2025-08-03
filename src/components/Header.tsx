import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Menu,
  X,
  Wallet,
  Home,
  Trophy,
  Settings,
  Shield,
  Star,
  Ticket,
} from "lucide-react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface HeaderProps {
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
  currentPage:
    | "home"
    | "admin"
    | "winners"
    | "settings"
    | "my-tickets"
    | "how-it-works"
    | "faq"
    | "terms"
    | "privacy";
}

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  const handleWalletConnect = () => {
    const connector =
      connectors.find((c) => c.name.includes("MetaMask")) || connectors[0];
    if (connector) {
      connect(
        { connector },
        {
          onSuccess: () => {
            toast.success("Wallet connected successfully!");
          },
          onError: (error) => {
            toast.error("Failed to connect wallet: " + error.message);
          },
        }
      );
    } else {
      toast.error("No wallet connector available");
    }
  };

  const handleWalletDisconnect = () => {
    disconnect();
    toast.success("Wallet disconnected!");
  };

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const handleNavClick = (page: "home" | "admin" | "winners" | "settings") => {
    onNavigate(page);
    setIsMenuOpen(false);
  };

  const handleMyTicketsClick = () => {
    onNavigate("my-tickets");
    setIsMenuOpen(false);
  };

  // Mock admin check - in a real app, this would check if the connected address is the admin
  const isAdmin = isConnected; // For demo purposes, any connected user is an admin

  const navItems = [
    { id: "home", label: "Home", icon: Home },
    ...(isAdmin ? [{ id: "admin", label: "Admin", icon: Shield }] : []),
    { id: "my-tickets", label: "My Tickets", icon: Ticket },
    { id: "winners", label: "Winners", icon: Trophy },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full bg-[#181830]/95 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50"
    >
      {/* Main Header Content */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo Section */}
          <motion.div
            className="flex items-center cursor-pointer group py-4"
            onClick={() => handleNavClick("home")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg group-hover:shadow-[#2DE582]/25 transition-all duration-300">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 text-black fill-current" />
              </div>
              <div className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-[#2DE582] transition-colors duration-300">
                <span className="hidden sm:inline">Cosmic </span>
                <span className="text-[#2DE582]">Lottery</span>
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
                    onClick={() => item.id === "my-tickets" ? handleMyTicketsClick() : handleNavClick(item.id as any)}
                    className={`relative flex items-center space-x-2 px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? "text-[#2DE582]"
                        : "text-white/70 hover:text-white"
                    }`}
                    whileTap={{ scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Icon
                      className={`w-4 h-4 transition-colors duration-300 ${
                        isActive
                          ? "text-[#2DE582]"
                          : "text-white/60 group-hover:text-white"
                      }`}
                    />
                    <span className="transition-colors duration-300">
                      {item.label}
                    </span>

                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-[#2DE582] rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}

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
            {/* Wallet Button */}
            <motion.div whileTap={{ scale: 0.98 }}>
              {isConnected ? (
                <button
                  onClick={handleWalletDisconnect}
                  disabled={isPending}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  <span className="hidden sm:inline font-mono">
                    {formatAddress(address!)}
                  </span>
                  <span className="sm:hidden">Wallet</span>
                </button>
              ) : (
                <button
                  onClick={handleWalletConnect}
                  disabled={isPending}
                  className="flex items-center space-x-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black text-sm sm:text-base font-semibold transition-all duration-300 shadow-lg disabled:opacity-50"
                >
                  <Wallet className="w-4 h-4" />
                  <span>{isPending ? "Connecting..." : "Connect Wallet"}</span>
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
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden border-t border-white/10 bg-[#181830]/95 backdrop-blur-xl"
          >
            <div className="py-4 px-4 space-y-2">
              {navItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;

                return (
                  <motion.button
                    key={`mobile-nav-${item.id}-${index}`}
                    onClick={() => item.id === "my-tickets" ? handleMyTicketsClick() : handleNavClick(item.id as any)}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05, ease: "easeOut" }}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive
                        ? "text-black bg-gradient-to-r from-[#2DE582] to-green-400 shadow-lg shadow-[#2DE582]/25"
                        : "text-white/80 hover:text-white hover:bg-white/10 border border-transparent hover:border-white/20"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Icon className="w-5 h-5 flex-shrink-0" />
                    <span>{item.label}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;
