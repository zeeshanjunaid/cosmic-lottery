import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Plus, BarChart3, Zap } from 'lucide-react';
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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-center space-y-4"
      >
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Manage your Cosmic Lottery platform with complete control over pools, analytics, and system settings.
        </p>
      </motion.div>

      {/* Tab Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-xl">
          <div className="flex space-x-2">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative flex items-center space-x-2">
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.name}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-[600px]"
      >
        {renderTabContent()}
      </motion.div>
    </motion.div>
  );
};

export default AdminPanel;