import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import RoutesClient from './routes/routes';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-white dark:bg-black transition-colors duration-300">
          <Navbar />
          <main className="grow">
            <RoutesClient />
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
