import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Plus, BarChart3, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AnalyticsDashboard from './AnalyticsDashboard';
import CreatePoolForm from './CreatePoolForm';
import PoolManagement from './PoolManagement';

type AdminTab = 'analytics' | 'create' | 'manage';

const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AdminTab>('analytics');

  const tabs = [
    { id: 'analytics' as AdminTab, name: 'Analytics', icon: BarChart3 },
    { id: 'create' as AdminTab, name: 'Create Pool', icon: Plus },
    { id: 'manage' as AdminTab, name: 'Manage Pools', icon: Settings },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'create':
        return <CreatePoolForm />;
      case 'manage':
        return <PoolManagement />;
      default:
        return <AnalyticsDashboard />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      {/* Admin Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-[#2DE582] rounded-xl">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-black" />
          </div>
          <h1 className="text-2xl sm:text-4xl font-bold text-white">
            Admin <span className="text-[#2DE582]">Dashboard</span>
          </h1>
        </div>
        <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto px-4">
          Manage your Cosmic Lottery platform with complete control over pools, analytics, and system settings.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="relative bg-gradient-to-r from-[#181830]/80 via-[#1C1C1C]/80 to-[#181830]/80 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl shadow-black/40 overflow-hidden w-full sm:w-fit max-w-2xl">
          {/* Animated background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <div className="relative flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-1 p-2 sm:p-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative group px-4 sm:px-6 py-3 sm:py-3.5 font-semibold transition-all duration-300 rounded-xl text-sm sm:text-base w-full sm:w-auto overflow-hidden ${
                  activeTab === tab.id
                    ? 'text-black bg-gradient-to-r from-[#2DE582] to-green-400 shadow-lg shadow-[#2DE582]/25'
                    : 'text-white hover:text-[#2DE582]'
                }`}
              >
                {/* Button background effects */}
                {activeTab !== tab.id && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#2DE582]/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                )}
                
                {/* Active state glow */}
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-gradient-to-r from-[#2DE582] to-green-400 rounded-xl"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.5 }}
                  />
                )}
                
                <div className="relative flex items-center justify-center space-x-2 z-10">
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="font-bold tracking-wide">{tab.name}</span>
                </div>
                
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default AdminPanel;