import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import ButtonsPage from './pages/ButtonsPage';
import AlertsPage from './pages/AlertsPage';

// Define the sections for the sidebar and scroll spy
const sections = [
  {
    id: 'buttons',
    title: 'Buttons',
  },
  {
    id: 'alerts',
    title: 'Alerts',
  },
];

function App() {
  // Handle initial hash in URL
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          window.scrollTo({
            top: element.offsetTop - 100,
            behavior: 'smooth',
          });
        }, 100);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <div className="flex">
        <Sidebar sections={sections} />
        
        <main className="flex-1 container mx-auto px-4 py-8 md:px-8 max-w-5xl">
          <ButtonsPage />
          <AlertsPage />
        </main>
      </div>
    </div>
  );
}

export default App;