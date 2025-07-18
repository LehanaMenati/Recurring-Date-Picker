'use client';

import { useState, useEffect } from 'react';
import { RecurringDatePicker } from '@/components/recurring-date-picker/RecurringDatePicker';
import { Calendar, Clock, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleDateSelection = (selection: any) => {
    console.log('Selected recurring dates:', selection);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-blue-50 to-cyan-50 p-4 md:p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/20 to-blue-600/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/10 to-pink-600/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="relative">
              <Calendar className="w-12 h-12 text-blue-600 animate-pulse-glow" />
              <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-2 -right-2 animate-bounce" />
            </div>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4 animate-slide-up">
            Smart Recurring
          </h1>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            Date Picker
          </h2>
          <div className="flex items-center justify-center gap-2 mb-4 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Clock className="w-5 h-5 text-gray-600" />
            <p className="text-lg text-gray-600 font-medium">
              Intelligent scheduling made beautiful
            </p>
            <Zap className="w-5 h-5 text-yellow-500" />
          </div>
          <p className="text-gray-500 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.6s' }}>
            Create complex recurring patterns with our advanced date picker. 
            From simple daily repeats to sophisticated monthly patterns like "every second Tuesday" - 
            all with real-time preview and intuitive controls.
          </h1>
        </div>
        
        <div className="relative animate-bounce-in" style={{ animationDelay: '0.8s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-3xl blur-xl opacity-20 animate-pulse-glow"></div>
          <RecurringDatePicker
            onSelectionChange={handleDateSelection}
            className="w-full relative z-10"
          />
        </div>
        
        {/* Feature highlights */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Smart Patterns</h3>
            <p className="text-sm text-gray-600">Complex recurring patterns made simple with intelligent suggestions</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Real-time Preview</h3>
            <p className="text-sm text-gray-600">See your recurring dates instantly with our interactive calendar</p>
          </div>
          
          <div className="text-center p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-white/20 hover:bg-white/70 transition-all duration-300 hover:scale-105">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Beautiful UI</h3>
            <p className="text-sm text-gray-600">Stunning design with smooth animations and intuitive interactions</p>
          </div>
        </div>
      </div>
    </div>
  );
}