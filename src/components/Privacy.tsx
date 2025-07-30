import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database, UserCheck, Globe, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Privacy: React.FC = () => {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        'Wallet addresses when you connect to our platform',
        'Transaction data related to lottery participation',
        'Basic usage analytics to improve our service',
        'Technical information like browser type and IP address for security',
        'No personal identification information is collected or stored'
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: UserCheck,
      content: [
        'Process lottery transactions and distribute winnings',
        'Provide customer support and technical assistance',
        'Analyze platform usage to improve user experience',
        'Detect and prevent fraud or suspicious activities',
        'Comply with legal requirements and blockchain regulations',
        'Send important platform updates and security notifications'
      ]
    },
    {
      title: 'Data Storage and Security',
      icon: Lock,
      content: [
        'All transaction data is stored on the blockchain and is publicly verifiable',
        'We use industry-standard encryption for any off-chain data',
        'Regular security audits and penetration testing',
        'Access controls and authentication for our systems',
        'We never store your private keys or seed phrases',
        'Data backups are encrypted and stored securely'
      ]
    },
    {
      title: 'Information Sharing',
      icon: Globe,
      content: [
        'We do not sell, trade, or rent your information to third parties',
        'Blockchain transaction data is publicly available by nature',
        'We may share data with law enforcement if legally required',
        'Service providers who help us operate the platform (under strict agreements)',
        'Analytics data may be shared in aggregated, anonymous form',
        'No sharing of personally identifiable information'
      ]
    },
    {
      title: 'Your Privacy Rights',
      icon: Eye,
      content: [
        'Right to access what data we have about you',
        'Right to request correction of inaccurate data',
        'Right to request deletion of your data (where legally possible)',
        'Right to object to certain data processing activities',
        'Right to data portability and transparency',
        'Right to withdraw consent for optional data collection'
      ]
    },
    {
      title: 'Cookies and Tracking',
      icon: AlertCircle,
      content: [
        'We use essential cookies for platform functionality',
        'Analytics cookies to understand user behavior (can be opted out)',
        'No advertising or third-party tracking cookies',
        'Session cookies for maintaining your connection',
        'You can control cookie preferences in your browser',
        'Local storage for user interface preferences'
      ]
    }
  ];

  const principles = [
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'We built our platform with privacy as a core principle, not an afterthought.'
    },
    {
      icon: Lock,
      title: 'Minimal Data Collection',
      description: 'We only collect data that is absolutely necessary for platform operation.'
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'You always know what data we collect and how we use it.'
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
            <Shield className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Privacy <span className="text-[#2DE582]">Policy</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Your privacy is important to us. This policy explains how we collect, use, and protect 
          your information when you use Cosmic Lottery platform.
        </p>
        <div className="flex justify-center">
          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2 text-sm font-semibold">
            Last Updated: January 2025
          </Badge>
        </div>
      </div>

      {/* Privacy Principles */}
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <Badge className="bg-[#2DE582]/20 border-[#2DE582]/30 text-[#2DE582] px-4 py-2 text-sm font-semibold">
            OUR PRIVACY PRINCIPLES
          </Badge>
          <h2 className="text-3xl font-bold text-white">
            Built on <span className="text-[#2DE582]">Trust</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((principle, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 hover:border-[#2DE582]/30 transition-all duration-500 h-full text-center">
                <CardContent className="p-8">
                  <div className="p-4 bg-[#2DE582]/20 rounded-xl w-fit mx-auto mb-6">
                    <principle.icon className="w-8 h-8 text-[#2DE582]" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-4">{principle.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{principle.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Key Points Summary */}
      <Card className="bg-gradient-to-r from-[#2DE582]/10 via-blue-500/10 to-purple-500/10 border border-[#2DE582]/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <Eye className="w-6 h-6 text-[#2DE582]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Key Privacy Points</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ No Personal Data:</span> We only collect wallet addresses and transaction data
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Blockchain Transparency:</span> All lottery data is publicly verifiable
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ No Data Selling:</span> We never sell or trade your information
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Secure Storage:</span> Industry-standard encryption and security practices
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Your Control:</span> You control your wallet and private keys
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Essential Cookies Only:</span> No advertising or tracking cookies
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Privacy Sections */}
      <div className="space-y-8">
        {sections.map((section, index) => {
          const Icon = section.icon;
          
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${
                      section.title.includes('Security') || section.title.includes('Rights')
                        ? 'bg-green-500/20 border border-green-500/30'
                        : section.title.includes('Sharing') || section.title.includes('Cookies')
                        ? 'bg-yellow-500/20 border border-yellow-500/30'
                        : 'bg-[#2DE582]/20 border border-[#2DE582]/30'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        section.title.includes('Security') || section.title.includes('Rights')
                          ? 'text-green-400'
                          : section.title.includes('Sharing') || section.title.includes('Cookies')
                          ? 'text-yellow-400'
                          : 'text-[#2DE582]'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{section.title}</h3>
                      <div className="text-sm text-gray-400 mt-1">
                        Section {index + 1} of {sections.length}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {section.content.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-[#2DE582] rounded-full mt-2 flex-shrink-0" />
                        <p className="text-gray-300 leading-relaxed">{item}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Blockchain Notice */}
      <Card className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-indigo-500/10 border border-blue-500/20">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-blue-500/20 rounded-xl border border-blue-500/30 flex-shrink-0">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Blockchain Transparency Notice</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-blue-400">Public Blockchain:</strong> All lottery transactions are recorded on public blockchain 
                  networks. This means wallet addresses, transaction amounts, and timestamps are publicly visible and permanent.
                </p>
                <p>
                  <strong className="text-purple-400">Wallet Privacy:</strong> While wallet addresses are public, they are pseudonymous. 
                  We do not collect or store personal information that could link these addresses to real identities.
                </p>
                <p>
                  <strong className="text-indigo-400">Decentralized Nature:</strong> The decentralized nature of blockchain technology 
                  means that some data cannot be deleted or modified, even if requested by users.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-2xl font-bold text-white">Privacy Questions or Concerns?</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          If you have questions about this Privacy Policy or want to exercise your privacy rights, 
          please contact our privacy team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black font-semibold shadow-lg hover:shadow-[#2DE582]/25 transition-all duration-300"
          >
            Contact Privacy Team
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#2DE582]/30 rounded-xl text-white font-semibold transition-all duration-300"
          >
            Data Request Form
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default Privacy;