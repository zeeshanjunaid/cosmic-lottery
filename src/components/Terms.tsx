import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Shield, AlertTriangle, CheckCircle, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Terms: React.FC = () => {
  const sections = [
    {
      title: 'Acceptance of Terms',
      icon: CheckCircle,
      content: [
        'By accessing and using Cosmic Lottery, you accept and agree to be bound by the terms and provision of this agreement.',
        'If you do not agree to abide by the above, please do not use this service.',
        'These terms apply to all visitors, users, and others who access or use the service.',
        'We reserve the right to update these terms at any time without prior notice.'
      ]
    },
    {
      title: 'Eligibility and Account Requirements',
      icon: Shield,
      content: [
        'You must be at least 18 years old to use our platform.',
        'You must have legal capacity to enter into binding agreements.',
        'You are responsible for maintaining the security of your wallet and private keys.',
        'You may not use our service if you are located in a jurisdiction where online gambling is prohibited.',
        'One account per person is permitted.'
      ]
    },
    {
      title: 'Platform Rules and Fair Play',
      icon: Scale,
      content: [
        'All lottery draws are conducted using provably fair algorithms.',
        'Manipulation of results or exploitation of system vulnerabilities is strictly prohibited.',
        'We reserve the right to investigate suspicious activities and void fraudulent transactions.',
        'Players found violating fair play rules may have their accounts suspended or terminated.',
        'Random number generation is based on blockchain technology and cannot be manipulated.'
      ]
    },
    {
      title: 'Financial Terms and Responsibilities',
      icon: FileText,
      content: [
        'All transactions are processed in cryptocurrency and are irreversible.',
        'Players are responsible for understanding the risks associated with cryptocurrency transactions.',
        'We charge a 5% platform fee from each prize pool, clearly disclosed before ticket purchase.',
        'Winnings are automatically distributed to the winner\'s connected wallet address.',
        'We are not responsible for losses due to user error, including sending funds to wrong addresses.'
      ]
    },
    {
      title: 'Prohibited Activities',
      icon: AlertTriangle,
      content: [
        'Using multiple accounts to circumvent participation limits.',
        'Attempting to manipulate lottery outcomes through technical means.',
        'Engaging in money laundering or other illegal financial activities.',
        'Using the platform for any purpose other than participating in legitimate lottery games.',
        'Reverse engineering, decompiling, or attempting to extract source code.',
        'Creating automated bots or scripts to interact with the platform.'
      ]
    },
    {
      title: 'Disclaimers and Limitation of Liability',
      icon: Shield,
      content: [
        'Cosmic Lottery is provided "as is" without warranties of any kind.',
        'We do not guarantee continuous, uninterrupted access to the platform.',
        'We are not liable for losses due to technical failures, network issues, or smart contract bugs.',
        'Users participate in lotteries at their own risk and discretion.',
        'Our liability is limited to the amount of your ticket purchase for any specific lottery.',
        'We are not responsible for tax implications of winnings in your jurisdiction.'
      ]
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
            <FileText className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            Terms of <span className="text-[#2DE582]">Service</span>
          </h1>
        </div>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
          Please read these Terms of Service carefully before using Cosmic Lottery. 
          By using our platform, you agree to comply with these terms and conditions.
        </p>
        <div className="flex justify-center">
          <Badge className="bg-blue-500/20 border-blue-500/30 text-blue-400 px-4 py-2 text-sm font-semibold">
            Last Updated: January 2025
          </Badge>
        </div>
      </div>

      {/* Quick Summary */}
      <Card className="bg-gradient-to-r from-[#2DE582]/10 via-blue-500/10 to-purple-500/10 border border-[#2DE582]/20">
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-[#2DE582]" />
            </div>
            <h2 className="text-2xl font-bold text-white">Quick Summary</h2>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Fair Play:</span> All draws use provably fair blockchain technology
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Age Requirement:</span> Must be 18+ and legally eligible to participate
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Platform Fee:</span> 5% fee clearly disclosed before purchase
              </p>
            </div>
            <div className="space-y-3">
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Instant Payouts:</span> Winnings automatically sent to your wallet
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ Your Responsibility:</span> Secure your wallet and private keys
              </p>
              <p className="text-gray-300">
                <span className="text-[#2DE582] font-semibold">✓ No Manipulation:</span> Strict rules against system exploitation
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Terms Sections */}
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
                      section.title.includes('Prohibited') || section.title.includes('Disclaimers')
                        ? 'bg-red-500/20 border border-red-500/30'
                        : section.title.includes('Financial')
                        ? 'bg-yellow-500/20 border border-yellow-500/30'
                        : 'bg-[#2DE582]/20 border border-[#2DE582]/30'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        section.title.includes('Prohibited') || section.title.includes('Disclaimers')
                          ? 'text-red-400'
                          : section.title.includes('Financial')
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

      {/* Important Notice */}
      <Card className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border border-red-500/20">
        <CardContent className="p-8">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-red-500/20 rounded-xl border border-red-500/30 flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">Important Legal Notice</h3>
              <div className="space-y-3 text-gray-300">
                <p>
                  <strong className="text-red-400">Risk Disclosure:</strong> Participating in lottery games involves financial risk. 
                  Only participate with funds you can afford to lose. Cryptocurrency transactions are irreversible.
                </p>
                <p>
                  <strong className="text-orange-400">Jurisdiction:</strong> These terms are governed by the laws of [Jurisdiction]. 
                  Users are responsible for compliance with local laws and regulations regarding online gambling.
                </p>
                <p>
                  <strong className="text-yellow-400">Changes to Terms:</strong> We reserve the right to modify these terms at any time. 
                  Continued use of the platform after changes constitutes acceptance of new terms.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <div className="text-center space-y-6 py-8">
        <h2 className="text-2xl font-bold text-white">Questions About These Terms?</h2>
        <p className="text-gray-400 max-w-xl mx-auto">
          If you have any questions about these Terms of Service, please contact our legal team 
          for clarification and assistance.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 rounded-xl text-black font-semibold shadow-lg hover:shadow-[#2DE582]/25 transition-all duration-300"
        >
          Contact Legal Team
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Terms;