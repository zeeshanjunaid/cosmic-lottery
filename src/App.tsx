import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background';
import Header from './components/Header';
import LotteryPools from './components/LotteryPools';
import AdminPanel from './components/AdminPanel';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'admin'>('home');

  const handleNavigate = (page: 'home' | 'admin') => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
        {currentPage === 'home' ? <LotteryPools /> : <AdminPanel />}
      </main>
      <Toaster 
        position="top-right"
        toastOptions={{
          style: {
            background: '#181830',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
      />
    </div>
  );
}

export default App;