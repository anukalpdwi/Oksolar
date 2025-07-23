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
import PartnerWithUs from './components/sections/PartnerWithUs';
import FindUsNearYou from './components/sections/FindUsNearYou';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={
              <>
                <Hero />
                <Services />
                <WhyChooseUs />
                <TechnicalSpecs />
                <Testimonials />
                <Contact />
              </>
            } />
            <Route path="/partner-with-us" element={<PartnerWithUs />} />
            <Route path="/find-us-near-you" element={<FindUsNearYou />} />
          </Routes>
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </Router>
  );
};

export default App;