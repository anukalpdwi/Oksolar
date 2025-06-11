import React from 'react';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import Services from './components/sections/Services';
import WhyChooseUs from './components/sections/WhyChooseUs';
import TechnicalSpecs from './components/sections/TechnicalSpecs';
import Testimonials from './components/sections/Testimonials';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';

const App: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <Hero />
        <Services />
        <WhyChooseUs />
        <TechnicalSpecs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default App;