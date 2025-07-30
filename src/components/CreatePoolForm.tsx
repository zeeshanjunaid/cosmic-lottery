import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, DollarSign, Users, Clock, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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
      <Card className="bg-[#181830]/60 backdrop-blur-xl border-white/10">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-[#2DE582] rounded-xl">
              <Plus className="w-6 h-6 text-black" />
            </div>
            <h2 className="text-2xl font-bold text-white">Create New Lottery Pool</h2>
          </div>
        </CardHeader>
        <CardContent>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-6">
              {/* Pool Name */}
              <div className="space-y-2">
                <Label className="text-white font-semibold flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-[#2DE582]" />
                  <span>Pool Name</span>
                </Label>
                <Input
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  placeholder="e.g., Stellar Jackpot"
                  className="bg-[#1C1C1C]/60 border-white/10 text-white placeholder-gray-400 focus:border-[#2DE582]"
                />
              </div>

              {/* Ticket Price */}
              <div className="space-y-2">
                <Label className="text-white font-semibold flex items-center space-x-2">
                  <DollarSign className="w-4 h-4 text-[#2DE582]" />
                  <span>Ticket Price (USDT)</span>
                </Label>
                <Input
                  type="number"
                  value={formData.ticketPrice}
                  onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                  placeholder="10"
                  step="0.01"
                  className="bg-[#1C1C1C]/60 border-white/10 text-white placeholder-gray-400 focus:border-[#2DE582]"
                />
              </div>

              {/* Max Tickets */}
              <div className="space-y-2">
                <Label className="text-white font-semibold flex items-center space-x-2">
                  <Users className="w-4 h-4 text-[#2DE582]" />
                  <span>Maximum Tickets</span>
                </Label>
                <Input
                  type="number"
                  value={formData.maxTickets}
                  onChange={(e) => handleInputChange('maxTickets', e.target.value)}
                  placeholder="100"
                  className="bg-[#1C1C1C]/60 border-white/10 text-white placeholder-gray-400 focus:border-[#2DE582]"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Duration */}
              <div className="space-y-2">
                <Label className="text-white font-semibold flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-[#2DE582]" />
                  <span>Duration</span>
                </Label>
                <div className="flex space-x-3">
                  <Input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    placeholder="24"
                    min="1"
                    className="flex-1 bg-[#1C1C1C]/60 border-white/10 text-white placeholder-gray-400 focus:border-[#2DE582]"
                  />
                  <Select
                    value={formData.durationType}
                    onValueChange={(value) => handleInputChange('durationType', value as 'hours' | 'days')}
                  >
                    <SelectTrigger className="w-24 bg-[#1C1C1C]/60 border-white/10 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1C1C1C] border-white/10">
                      <SelectItem value="hours">Hours</SelectItem>
                      <SelectItem value="days">Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Preview Information */}
              <Card className="bg-[#1C1C1C]/60 border-white/10">
                <CardHeader>
                  <h3 className="text-white font-semibold">Pool Preview</h3>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
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
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button
              type="submit" 
              disabled={isSubmitting}
              className="w-full py-4 bg-gradient-to-r from-[#2DE582] to-green-400 hover:from-[#2DE582]/90 hover:to-green-400/90 text-black font-semibold shadow-lg hover:shadow-[#2DE582]/25 transition-all duration-300 hover:scale-102"
              variant={isSubmitting ? "secondary" : "default"}
            >
              <div className="flex items-center justify-center space-x-2">
                <Plus className="w-5 h-5" />
                <span>{isSubmitting ? 'Creating Pool...' : 'Create Lottery Pool'}</span>
              </div>
            </Button>
          </div>
        </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreatePoolForm;