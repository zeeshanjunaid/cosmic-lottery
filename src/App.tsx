import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background';
import Header from './components/Header';
import LotteryPools from './components/LotteryPools';
import AdminPanel from './components/AdminPanel';
import WinnersPage from './components/WinnersPage';
import SettingsPage from './components/SettingsPage';

type PageType = 'home' | 'admin' | 'winners' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <LotteryPools />;
      case 'admin':
        return <AdminPanel />;
      case 'winners':
        return <WinnersPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <LotteryPools />;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <Background />
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderCurrentPage()}
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