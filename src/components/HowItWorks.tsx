import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wallet, 
  Search, 
  CreditCard, 
  Trophy, 
  Shield, 
  Users, 
  Clock, 
  Zap,
  CheckCircle,
  Star,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
  details: string[];
}

const Step: React.FC<StepProps> = ({ number, title, description, icon: Icon, details }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="relative"
  >
    <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 hover:border-[#2DE582]/30 transition-all duration-500 h-full">
      <CardContent className="p-8">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl flex items-center justify-center text-black font-bold text-lg shadow-lg">
              {number}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Icon className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>
            <ul className="space-y-2">
              {details.map((detail, index) => (
                <li key={index} className="flex items-start space-x-2 text-sm text-gray-400">
                  <CheckCircle className="w-4 h-4 text-[#2DE582] mt-0.5 flex-shrink-0" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  </motion.div>
);

const HowItWorks: React.FC = () => {
  const steps: StepProps[] = [
    {
      number: '1',
      title: 'Connect Your Wallet',
      description: 'Start by connecting your Web3 wallet to access the Cosmic Lottery platform.',
      icon: Wallet,
      details: [
        'Supports MetaMask, WalletConnect, and more',
        'Secure connection with industry standards',
        'No personal information required',
        'Instant access once connected'
      ]
    },
    {
      number: '2',
      title: 'Browse Lottery Pools',
      description: 'Explore our various lottery pools with different prize amounts and ticket prices.',
      icon: Search,
      details: [
        'Quick Draw pools for instant action',
        'High Stakes pools for bigger prizes',
        'Featured jackpots with mega rewards',
        'Real-time pool statistics and progress'
      ]
    },
    {
      number: '3',
      title: 'Purchase Tickets',
      description: 'Choose your favorite pool and buy tickets using USDT or other supported tokens.',
      icon: CreditCard,
      details: [
        'Transparent pricing with no hidden fees',
        'Instant ticket confirmation on blockchain',
        'Multiple tickets allowed per pool',
        'Secure smart contract transactions'
      ]
    },
    {
      number: '4',
      title: 'Wait for Results',
      description: 'Sit back and wait for the lottery draw when the pool ends or fills up completely.',
      icon: Clock,
      details: [
        'Automated draw process using blockchain',
        'Provably fair random number generation',
        'Real-time countdown and notifications',
        'Transparent winner selection process'
      ]
    },
    {
      number: '5',
      title: 'Claim Your Prize',
      description: 'If you win, claim your prize directly to your wallet with one click.',
      icon: Trophy,
      details: [
        'Instant prize distribution to winners',
        'No waiting periods or delays',
        'Full prize amount minus platform fee',
        'Transaction records on blockchain'
      ]
    }
  ];

  const features = [
    {
      icon: Shield,
      title: 'Provably Fair',
      description: 'All draws use blockchain-based randomness that can be verified by anyone.'
    },
    {
      icon: Zap,
      title: 'Instant Payouts',
      description: 'Winners receive their prizes automatically without any manual intervention.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built for the crypto community with transparent operations and fair gameplay.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-12"
    >
      {/* Header */}
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-[#2DE582] rounded-xl">
            <Star className="w-8 h-8 text-black fill-current" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            How It <span className="text-[#2DE582]">Works</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Get started with Cosmic Lottery in just 5 simple steps. Our decentralized platform ensures 
          fair, transparent, and secure lottery experiences for everyone.
        </p>
      </div>

      {/* Steps */}
      <div className="space-y-8">
        <div className="text-center">
          <Badge className="bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582] px-4 py-2 text-sm font-semibold">
            STEP BY STEP GUIDE
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <div key={step.number} className="relative">
              <Step {...step} />
              {index < steps.length - 1 && index % 2 === 0 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <div className="w-8 h-8 bg-[#2DE582]/20 rounded-full flex items-center justify-center border border-[#2DE582]/30">
                    <ArrowRight className="w-4 h-4 text-[#2DE582]" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2 text-sm font-semibold">
            WHY CHOOSE US
          </Badge>
          <h2 className="text-3xl font-bold text-white">
            Built on <span className="text-[#2DE582]">Trust</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Our platform is designed with security, fairness, and transparency at its core.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 hover:border-blue-500/30 transition-all duration-500 h-full text-center">
                <CardContent className="p-8">
                  <div className="p-4 bg-blue-500/20 rounded-xl w-fit mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6 py-12">
        <div className="bg-gradient-to-r from-[#2DE582]/10 via-blue-500/10 to-purple-500/10 border border-[#2DE582]/20 rounded-2xl p-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Playing?
          </h2>
          <p className="text-gray-400 mb-6 max-w-xl mx-auto">
            Join thousands of players in our cosmic lottery pools. Connect your wallet and 
            start your journey to the stars!
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black font-bold text-lg shadow-lg hover:shadow-[#2DE582]/25 transition-all duration-300"
          >
            Get Started Now
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default HowItWorks;