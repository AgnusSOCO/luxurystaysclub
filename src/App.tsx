import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ChevronDown, Star, Shield, Clock, Home, Phone, Mail, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PropertyList from './components/PropertyList';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Hero />
        <PropertyList />
        <Services />
        <About />
        <Contact />
        <Footer />
      </div>
    </QueryClientProvider>
  );
}

export default App;