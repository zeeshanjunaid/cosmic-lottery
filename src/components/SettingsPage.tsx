import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Palette, Globe, User, Save } from 'lucide-react';
import toast from 'react-hot-toast';

interface SettingsFormData {
  notifications: boolean;
  emailUpdates: boolean;
  language: string;
  currency: string;
  theme: string;
  autoPlay: boolean;
}

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<SettingsFormData>({
    notifications: true,
    emailUpdates: false,
    language: 'english',
    currency: 'USDT',
    theme: 'dark',
    autoPlay: false,
  });

  const [isSaving, setIsSaving] = useState(false);

  const handleToggle = (key: keyof SettingsFormData) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSelectChange = (key: keyof SettingsFormData, value: string) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    toast.loading('Saving settings...', { id: 'save-settings' });
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Settings saved successfully!', { id: 'save-settings' });
      setIsSaving(false);
    }, 1500);
  };

  const ToggleSwitch: React.FC<{ enabled: boolean; onChange: () => void }> = ({ enabled, onChange }) => (
    <button
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-[#2DE582]' : 'bg-gray-600'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center space-x-3">
          <div className="p-3 bg-[#2DE582] rounded-xl">
            <Settings className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-4xl font-bold text-white">
            App <span className="text-[#2DE582]">Settings</span>
          </h1>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Customize your Cosmic Lottery experience with these personalized settings.
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        
        {/* Notifications */}
        <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <Bell className="w-5 h-5 text-[#2DE582]" />
            </div>
            <h2 className="text-xl font-bold text-white">Notifications</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Push Notifications</div>
                <div className="text-gray-400 text-sm">Get notified about lottery results and new pools</div>
              </div>
              <ToggleSwitch 
                enabled={settings.notifications} 
                onChange={() => handleToggle('notifications')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Email Updates</div>
                <div className="text-gray-400 text-sm">Receive weekly summaries and special offers</div>
              </div>
              <ToggleSwitch 
                enabled={settings.emailUpdates} 
                onChange={() => handleToggle('emailUpdates')} 
              />
            </div>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <User className="w-5 h-5 text-[#2DE582]" />
            </div>
            <h2 className="text-xl font-bold text-white">Preferences</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-white font-medium flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#2DE582]" />
                <span>Language</span>
              </label>
              <select
                value={settings.language}
                onChange={(e) => handleSelectChange('language', e.target.value)}
                className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2DE582] transition-all duration-300"
              >
                <option value="english">English</option>
                <option value="spanish">Español</option>
                <option value="french">Français</option>
                <option value="german">Deutsch</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-white font-medium">Currency Display</label>
              <select
                value={settings.currency}
                onChange={(e) => handleSelectChange('currency', e.target.value)}
                className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2DE582] transition-all duration-300"
              >
                <option value="USDT">USDT</option>
                <option value="ETH">ETH</option>
                <option value="BTC">BTC</option>
                <option value="USD">USD</option>
              </select>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <Palette className="w-5 h-5 text-[#2DE582]" />
            </div>
            <h2 className="text-xl font-bold text-white">Appearance</h2>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-white font-medium">Theme</label>
              <select
                value={settings.theme}
                onChange={(e) => handleSelectChange('theme', e.target.value)}
                className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2DE582] transition-all duration-300"
              >
                <option value="dark">Dark Theme</option>
                <option value="light">Light Theme</option>
                <option value="auto">Auto (System)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Gaming */}
        <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-[#2DE582]/20 rounded-lg">
              <Shield className="w-5 h-5 text-[#2DE582]" />
            </div>
            <h2 className="text-xl font-bold text-white">Gaming</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-medium">Auto-Play Mode</div>
                <div className="text-gray-400 text-sm">Automatically participate in selected lottery pools</div>
              </div>
              <ToggleSwitch 
                enabled={settings.autoPlay} 
                onChange={() => handleToggle('autoPlay')} 
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              isSaving
                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                : 'bg-[#2DE582] hover:bg-[#2DE582]/80 text-black'
            }`}
          >
            <div className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;