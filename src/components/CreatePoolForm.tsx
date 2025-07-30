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

    // Mock creation delay
    setTimeout(() => {
      toast.success(`"${formData.name}" pool created successfully!`, { id: 'create-pool' });
      setIsSubmitting(false);
      
      // Reset form
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-br from-slate-800/40 to-purple-900/40 backdrop-blur-md border border-purple-500/20 rounded-2xl p-8"
      >
        <div className="flex items-center space-x-4 mb-8">
          <div className="p-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white">Create New Lottery Pool</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Pool Name */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  <span>Pool Name</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Stellar Jackpot"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </motion.div>

              {/* Ticket Price */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="space-y-2"
              >
                <label className="text-white font-semibold flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span>Ticket Price (USDT)</span>
                </label>
                <input
                  type="number"
                  value={formData.ticketPrice}
                  onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                  placeholder="10"
                  step="0.01"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </motion.div>

              {/* Max Tickets */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-2"
              >
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Users className="w-4 h-4 text-blue-400" />
                  <span>Maximum Tickets</span>
                </label>
                <input
                  type="number"
                  value={formData.maxTickets}
                  onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                  placeholder="100"
                  className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                />
              </motion.div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Duration */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-2"
              >
                <label className="text-white font-semibold flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-orange-400" />
                  <span>Duration</span>
                </label>
                <div className="flex space-x-3">
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="24"
                    min="1"
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  />
                  <select
                    value={formData.durationType}
                    onChange={(e) => handleInputChange('durationType', e.target.value as 'hours' | 'days')}
                    className="px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                </div>
              </motion.div>

              {/* Preview Information */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30 rounded-xl p-4 space-y-3"
              >
                <h3 className="text-white font-semibold">Pool Preview</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Prize Pool:</span>
                    <span className="text-emerald-400 font-semibold">${estimatedPrizePool} USDT</span>
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
              </motion.div>
            </div>
          </div>

          {/* Submit Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-6"
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-blue-500/25'
              }`}
              whileHover={!isSubmitting ? { scale: 1.02 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{isSubmitting ? 'Creating Pool...' : 'Create Lottery Pool'}</span>
              </div>
            </motion.button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreatePoolForm;