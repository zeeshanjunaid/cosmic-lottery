import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Bell, Shield, Palette, Globe, User, Save, DollarSign } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

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
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Bell className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h2 className="text-xl font-bold text-white">Notifications</h2>
            </div>
          </CardHeader>
          <CardContent>
          
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
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <User className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h2 className="text-xl font-bold text-white">Preferences</h2>
            </div>
          </CardHeader>
          <CardContent>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-white font-medium flex items-center space-x-2">
                <Globe className="w-4 h-4 text-[#2DE582]" />
                <span>Language</span>
              </Label>
              <Select
                value={settings.language}
                onValueChange={(value) => handleSelectChange('language', value)}
              >
                <SelectTrigger className="bg-[#1C1C1C]/60 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C1C] border-white/10">
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="spanish">Español</SelectItem>
                  <SelectItem value="french">Français</SelectItem>
                  <SelectItem value="german">Deutsch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-white font-medium">Currency Display</Label>
              <Select
                value={settings.currency}
                onValueChange={(value) => handleSelectChange('currency', value)}
              >
                <SelectTrigger className="bg-[#1C1C1C]/60 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C1C] border-white/10">
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Palette className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h2 className="text-xl font-bold text-white">Appearance</h2>
            </div>
          </CardHeader>
          <CardContent>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-white font-medium">Theme</Label>
              <Select
                value={settings.theme}
                onValueChange={(value) => handleSelectChange('theme', value)}
              >
                <SelectTrigger className="bg-[#1C1C1C]/60 border-white/10 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#1C1C1C] border-white/10">
                  <SelectItem value="dark">Dark Theme</SelectItem>
                  <SelectItem value="light">Light Theme</SelectItem>
                  <SelectItem value="auto">Auto (System)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          </CardContent>
        </Card>

        {/* Gaming */}
        <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[#2DE582]/20 rounded-lg">
                <Shield className="w-5 h-5 text-[#2DE582]" />
              </div>
              <h2 className="text-xl font-bold text-white">Gaming</h2>
            </div>
          </CardHeader>
          <CardContent>
          
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
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-center">
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="px-8 py-4 bg-[#2DE582] hover:bg-[#2DE582]/80 text-black font-semibold"
            variant={isSaving ? "secondary" : "default"}
          >
            <div className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>{isSaving ? 'Saving...' : 'Save Settings'}</span>
            </div>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;