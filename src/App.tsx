import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Background from './components/Background';
import Header from './components/Header';
import Footer from './components/Footer';
import LotteryPools from './components/LotteryPools';
import AdminPanel from './components/AdminPanel';
import WinnersPage from './components/WinnersPage';
import SettingsPage from './components/SettingsPage';
import HowItWorks from './components/HowItWorks';
import FAQ from './components/FAQ';
import Terms from './components/Terms';
import Privacy from './components/Privacy';

type PageType = 'home' | 'admin' | 'winners' | 'settings' | 'how-it-works' | 'faq' | 'terms' | 'privacy';

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
      case 'how-it-works':
        return <HowItWorks />;
      case 'faq':
        return <FAQ />;
      case 'terms':
        return <Terms />;
      case 'privacy':
        return <Privacy />;
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
      <Footer />
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