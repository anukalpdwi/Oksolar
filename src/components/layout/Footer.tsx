import React from 'react';
import { Sun, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center mb-4">
              <img
                src="/eco solar logo.png"
                alt="Eco Solar Logo"
                className="h-8 w-auto mr-2"
              />
            </div>
            <p className="text-gray-400 mb-4">
              Providing sustainable solar solutions for homes and businesses in Madhya Pradesh.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/Oksolarinc" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Facebook size={20} />
              </a>
              {/* <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Twitter size={20} />
              </a> */}
              <a href="https://www.instagram.com/oksolarinc/" className="text-gray-400 hover:text-primary-500 transition-colors" target="_blank" rel="noopener noreferrer">
                <Instagram size={20} />
              </a>
              <a href="https://www.linkedin.com/company/ecosolareindia/" className="text-gray-400 hover:text-primary-500 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary-500 transition-colors">Services</a>
              </li>
              <li>
                <a href="#why-us" className="text-gray-400 hover:text-primary-500 transition-colors">Why Choose Us</a>
              </li>
              <li>
                <a href="#technical" className="text-gray-400 hover:text-primary-500 transition-colors">Technical Specs</a>
              </li>
              <li>
                <a href="#testimonials" className="text-gray-400 hover:text-primary-500 transition-colors">Testimonials</a>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary-500 transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">Solar System Design</li>
              <li className="text-gray-400">Installation Services</li>
              <li className="text-gray-400">Energy Audit & Consultation</li>
              <li className="text-gray-400">Government Subsidy Assistance</li>
              <li className="text-gray-400">Maintenance & Support</li>
              <li className="text-gray-400">Commercial Solar Solutions</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <span className="text-gray-400">+91 99935 11331</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <span className="text-gray-400">oksolar.inc@gmail.com </span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary-500 mr-2 mt-0.5" />
                <span className="text-gray-400">
                  37-A, Bhagat watika , Raj bhawan
                  road, Civil lines, <br/> Jaipur, India 302006
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} OkSolar India. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <a href="#" className="hover:text-primary-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary-500 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
      
      {/* Disclaimer */}
      <div className="bg-gray-950">
        <div className="container py-4 text-xs text-gray-500 text-center">
          *Final bill may vary based on system size and local conditions. The information provided on this website is for general informational purposes only.
        </div>
      </div>
    </footer>
  );
};

export default Footer;