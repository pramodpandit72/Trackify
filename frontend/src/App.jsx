import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/layouts/Navbar';
import Footer from './components/layouts/Footer';
import RoutesClient from './routes/routes';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="grow">
          <RoutesClient />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
