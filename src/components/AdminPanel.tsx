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
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10 p-1 sm:p-2 w-full max-w-2xl">
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "ghost"}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 font-semibold transition-all duration-300 hover:scale-102 text-sm sm:text-base w-full sm:w-auto ${
                  activeTab === tab.id
                    ? 'text-black bg-[#2DE582] hover:bg-[#2DE582]/80'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center sm:justify-start space-x-2">
                  <tab.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{tab.name}</span>
                </div>
              </Button>
            ))}
          </div>
        </Card>
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default AdminPanel;