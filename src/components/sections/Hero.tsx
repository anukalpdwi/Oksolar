import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen bg-[url('/bg1.jpg')] bg-cover bg-center pt-28 md:pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-black/50 to-transparent"></div>
      
      <div className="container relative h-full flex flex-col lg:flex-row items-center justify-between">
        {/* Left: Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl z-10"
        >
          <span className="inline-block bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium mb-4">
            <span className="font-extrabold text-primary-900">Ok Solar</span> Sustainable Energy Solutions
          </span>
          
          <h1 className="text-white font-bold mb-6 text-3xl md:text-4xl lg:text-5xl">
            Reduce Your Electricity Bill to <span className="text-primary-400">₹0</span>*
          </h1>
          
          <p className="text-white/90 text-lg md:text-xl mb-8 max-w-xl">
            Join thousands of homes and businesses benefiting from clean, renewable solar energy while saving money.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <motion.a
              href="#contact"
              className="btn btn-primary group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Solar Consultation
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </motion.a>
            
            <motion.a
              href="#technical"
              className="btn btn-outline border-white text-white hover:bg-white/10"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Solar ROI Calculator
            </motion.a>
          </div>
          
          <div className="mt-8 flex flex-wrap gap-6">
            <div className="flex items-center">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKc9QwbtZ3mbJP9ZaExSkVEDFB-xJPsnXoEA&s" 
                alt="Government Certified" 
                className="h-12 w-12 object-contain mr-2 bg-white rounded-full p-1"
              />
              <span className="text-white text-sm">Government Certified</span>
            </div>
            <div className="flex items-center">
              <img 
                src="https://static.vecteezy.com/system/resources/previews/007/126/811/non_2x/golden-five-stars-icon-free-vector.jpg" 
                alt="5-Star Rated" 
                className="h-12 w-12 object-contain mr-2 bg-white rounded-full p-1"
              />
              <span className="text-white text-sm">5-Star Customer Rating</span>
            </div>
            <div className="flex items-center">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ06NCr94dZsYd1oQIKcQduEN3IUHHdqBl9g&s" 
                alt="Trusted Brands" 
                className="h-12 w-12 object-contain mr-2 bg-white rounded-full p-1"
              />
              <span className="text-white text-sm">Trusted Brands</span>
            </div>
          </div>
        </motion.div>

        {/* Right: Large Image */}
        <div className="hidden lg:flex flex-1 justify-center items-center">
          <img
            src="/bg21.PNG"
            alt="Ok Solar"
            className="h-[400px] w-[400px] object-contain shadow-2xl border-2 border-white rounded-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;