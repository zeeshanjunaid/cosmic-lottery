import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown, Shield, DollarSign, Clock, Trophy, Users, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FAQItem {
  id: string;
  category: string;
  question: string;
  answer: string;
  icon: React.ElementType;
}

const FAQ: React.FC = () => {
  const [openItem, setOpenItem] = useState<string | null>('general-1');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const faqData: FAQItem[] = [
    {
      id: 'general-1',
      category: 'General',
      question: 'What is Cosmic Lottery?',
      answer: 'Cosmic Lottery is a decentralized lottery platform built on blockchain technology. It offers transparent, fair, and secure lottery pools where players can participate using cryptocurrency. All draws are provably fair and automated through smart contracts.',
      icon: HelpCircle
    },
    {
      id: 'general-2',
      category: 'General',
      question: 'How do I get started?',
      answer: 'Getting started is simple! Connect your Web3 wallet (like MetaMask), browse available lottery pools, purchase tickets with USDT or supported tokens, and wait for the draw. If you win, prizes are automatically sent to your wallet.',
      icon: Users
    },
    {
      id: 'security-1',
      category: 'Security',
      question: 'Is Cosmic Lottery safe to use?',
      answer: 'Yes! Our platform uses industry-standard security practices. All transactions are processed through audited smart contracts on the blockchain. We never store your private keys or personal information. Your funds are always under your control.',
      icon: Shield
    },
    {
      id: 'security-2',
      category: 'Security',
      question: 'How are the lottery draws fair?',
      answer: 'We use provably fair algorithms powered by blockchain technology. Random number generation is based on block hashes and other cryptographic methods that can be independently verified. No one can manipulate the results, including us.',
      icon: Shield
    },
    {
      id: 'payments-1',
      category: 'Payments',
      question: 'What cryptocurrencies do you accept?',
      answer: 'Currently, we accept USDT (Tether) as the primary currency for ticket purchases. We plan to add support for ETH, BTC, and other major cryptocurrencies in future updates. All transactions are processed on-chain.',
      icon: DollarSign
    },
    {
      id: 'payments-2',
      category: 'Payments',
      question: 'Are there any fees?',
      answer: 'We charge a 5% platform fee from the total prize pool, which covers operational costs and platform development. This fee is clearly displayed before you purchase tickets. There are no hidden charges or additional fees.',
      icon: DollarSign
    },
    {
      id: 'gameplay-1',
      category: 'Gameplay',
      question: 'When do lottery draws happen?',
      answer: 'Lottery draws occur automatically when either the time limit expires or all tickets are sold, whichever comes first. Each pool displays a countdown timer and progress bar so you know exactly when the draw will happen.',
      icon: Clock
    },
    {
      id: 'gameplay-2',
      category: 'Gameplay',
      question: 'Can I buy multiple tickets?',
      answer: 'Yes! You can purchase multiple tickets for the same lottery pool to increase your chances of winning. Each ticket gives you an equal chance, and there\'s no limit to how many tickets you can buy (subject to pool availability).',
      icon: Clock
    },
    {
      id: 'winnings-1',
      category: 'Winnings',
      question: 'How do I claim my winnings?',
      answer: 'Winnings are automatically distributed! When you win, the prize amount is immediately sent to your connected wallet. No manual claiming required - just wait for the transaction to confirm on the blockchain.',
      icon: Trophy
    },
    {
      id: 'winnings-2',
      category: 'Winnings',
      question: 'How long does it take to receive winnings?',
      answer: 'Winnings are sent instantly after the draw completes. The only delay is the blockchain confirmation time, which typically takes 1-3 minutes depending on network conditions. You\'ll see the transaction in your wallet immediately.',
      icon: Zap
    },
    {
      id: 'technical-1',
      category: 'Technical',
      question: 'Which wallets are supported?',
      answer: 'We support all major Web3 wallets including MetaMask, WalletConnect, Coinbase Wallet, and others. Any wallet that supports Ethereum and can interact with DApps will work with our platform.',
      icon: HelpCircle
    },
    {
      id: 'technical-2',
      category: 'Technical',
      question: 'What if I have connection issues?',
      answer: 'If you experience connection issues, try refreshing the page or switching networks in your wallet. Make sure you\'re connected to the correct blockchain network. If problems persist, contact our support team for assistance.',
      icon: HelpCircle
    }
  ];

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'General', name: 'General', icon: Users },
    { id: 'Security', name: 'Security', icon: Shield },
    { id: 'Payments', name: 'Payments', icon: DollarSign },
    { id: 'Gameplay', name: 'Gameplay', icon: Clock },
    { id: 'Winnings', name: 'Winnings', icon: Trophy },
    { id: 'Technical', name: 'Technical', icon: Zap }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqData 
    : faqData.filter(item => item.category === activeCategory);

  const toggleItem = (id: string) => {
    setOpenItem(openItem === id ? null : id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-4 sm:space-y-6 px-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl shadow-lg">
            <HelpCircle className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            Frequently Asked <span className="text-[#2DE582]">Questions</span>
          </h1>
        </div>
        <p className="text-gray-400 text-sm sm:text-lg max-w-2xl mx-auto leading-relaxed px-4">
          Find answers to common questions about Cosmic Lottery. Can't find what you're looking for? 
          Contact our support team for personalized assistance.
        </p>
      </div>

      {/* Category Filter */}
      <div className="space-y-6">
        <div className="text-center">
          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold">
            BROWSE BY CATEGORY
          </Badge>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <motion.button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[#2DE582] text-black'
                    : 'bg-[#181830]/60 text-white/70 hover:text-white hover:bg-[#181830]'
                } backdrop-blur-xl border ${
                  isActive ? 'border-[#2DE582]' : 'border-white/10 hover:border-white/20'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                <span>{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
          >
            {filteredFAQs.map((item) => {
              const isOpen = openItem === item.id;
              const Icon = item.icon;
              
              return (
                <Card
                  key={item.id}
                  className="bg-[#181830]/60 backdrop-blur-xl border-white/10 hover:border-[#2DE582]/30 transition-all duration-300 overflow-hidden"
                >
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full text-left p-6 focus:outline-none focus:ring-2 focus:ring-[#2DE582]/50 rounded-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="p-2 bg-[#2DE582]/20 rounded-lg flex-shrink-0">
                          <Icon className="w-5 h-5 text-[#2DE582]" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <Badge variant="outline" className={`text-xs px-2 py-1 ${
                              item.category === 'Security' ? 'text-red-400 border-red-400/30' :
                              item.category === 'Payments' ? 'text-yellow-400 border-yellow-400/30' :
                              item.category === 'Gameplay' ? 'text-purple-400 border-purple-400/30' :
                              item.category === 'Winnings' ? 'text-green-400 border-green-400/30' :
                              item.category === 'Technical' ? 'text-blue-400 border-blue-400/30' :
                              'text-gray-400 border-gray-400/30'
                            }`}>
                              {item.category}
                            </Badge>
                          </div>
                          <h3 className="text-lg font-semibold text-white">{item.question}</h3>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0 ml-4"
                      >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                      </motion.div>
                    </div>
                  </button>
                  
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <CardContent className="pt-0 pb-6 px-6">
                          <div className="ml-16 pt-4 border-t border-white/10">
                            <p className="text-gray-300 leading-relaxed">{item.answer}</p>
                          </div>
                        </CardContent>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Contact Section */}
      <div className="text-center space-y-4 sm:space-y-6 py-8 sm:py-12 px-4">
        <div className="bg-gradient-to-r from-[#2DE582]/10 via-blue-500/10 to-purple-500/10 border border-[#2DE582]/20 rounded-2xl p-4 sm:p-8">
          <h2 className="text-xl sm:text-3xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6 max-w-xl mx-auto px-4">
            Can't find the answer you're looking for? Our support team is here to help you 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black font-semibold text-sm sm:text-base shadow-lg hover:shadow-[#2DE582]/25 transition-all duration-300"
            >
              Contact Support
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2DE582]/30 rounded-xl text-white font-semibold text-sm sm:text-base transition-all duration-300"
            >
              Join Community
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FAQ;