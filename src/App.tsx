import React from 'react';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background';
import Header from './components/Header';
import LotteryPools from './components/LotteryPools';

function App() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <Header />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8">
        <LotteryPools />
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#1f2937',
            color: '#fff',
            border: '1px solid #ef4444',
          },
        }}
      />
    </div>
  );
}

export default App;