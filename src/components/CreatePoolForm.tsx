import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Users, Clock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

interface PoolFormData {
  name: string;
  ticketPrice: string;
  maxTickets: string;
  duration: string;
  durationType: 'hours' | 'days';
}

const CreatePoolForm: React.FC = () => {
  const [formData, setFormData] = useState<PoolFormData>({
    name: '',
    ticketPrice: '',
    maxTickets: '',
    duration: '',
    durationType: 'hours',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.ticketPrice || !formData.maxTickets || !formData.duration) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    toast.loading('Creating lottery pool...', { id: 'create-pool' });

    setTimeout(() => {
      toast.success(`"${formData.name}" pool created successfully!`, { id: 'create-pool' });
      setIsSubmitting(false);
      
      setFormData({
        name: '',
        ticketPrice: '',
        maxTickets: '',
        duration: '',
        durationType: 'hours',
      });
    }, 2500);
  };

  const handleInputChange = (field: keyof PoolFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateEndTime = () => {
    if (!formData.duration) return '';
    
    const now = new Date();
    const duration = parseInt(formData.duration);
    const multiplier = formData.durationType === 'days' ? 24 : 1;
    const endTime = new Date(now.getTime() + duration * multiplier * 60 * 60 * 1000);
    
    return endTime.toLocaleDateString() + ' ' + endTime.toLocaleTimeString();
  };

  const estimatedPrizePool = formData.ticketPrice && formData.maxTickets 
    ? (parseFloat(formData.ticketPrice) * parseInt(formData.maxTickets) * 0.95).toFixed(0)
    : '0';

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-[#181830]/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-[#2DE582] rounded-xl">
            <Plus className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create New Lottery Pool</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Pool Name */}
              <div className="space-y-2">
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#2DE582]" />
                  <span>Pool Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Stellar Jackpot"
                  className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#2DE582] transition-all duration-300"
                />
              </div>

              {/* Ticket Price */}
              <div className="space-y-2">
                <label className="text-white font-semibold flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-[#2DE582]" />
                  <span>Ticket Price (USDT)</span>
                </label>
                <input
                  type="number"
                  value={formData.ticketPrice}
                  onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                  placeholder="10"
                  step="0.01"
                  className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#2DE582] transition-all duration-300"
                />
              </div>

              {/* Max Tickets */}
              <div className="space-y-2">
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#2DE582]" />
                  <span>Maximum Tickets</span>
                </label>
                <input
                  type="number"
                  value={formData.maxTickets}
                  onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#2DE582] transition-all duration-300"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Duration */}
              <div className="space-y-2">
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#2DE582]" />
                  <span>Duration</span>
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="24"
                    min="1"
                    className="flex-1 px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-[#2DE582] transition-all duration-300"
                  />
                  <select
                    value={formData.durationType}
                    onChange={(e) => handleInputChange('durationType', e.target.value as 'hours' | 'days')}
                    className="px-4 py-3 bg-[#1C1C1C]/60 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[#2DE582] transition-all duration-300"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </div>

              {/* Preview Information */}
              <div className="bg-[#1C1C1C]/60 border border-white/10 rounded-xl p-4 space-y-3">
                <h3 className="text-white font-semibold">Pool Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Prize Pool:</span>
                    <span className="text-[#2DE582] font-semibold">${estimatedPrizePool} USDT</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Platform Fee (5%):</span>
                    <span className="text-red-400">${(parseFloat(estimatedPrizePool) * 0.0526).toFixed(0) || '0'}</span>
                  </div>
                  {calculateEndTime() && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Ends At:</span>
                      <span className="text-blue-400">{calculateEndTime()}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : 'bg-[#2DE582] hover:bg-[#2DE582]/80 text-black'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{isSubmitting ? 'Creating Pool...' : 'Create Lottery Pool'}</span>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePoolForm;