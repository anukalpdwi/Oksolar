import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Phone, Mail, MapPin, Send, Check } from 'lucide-react';
import { useForm, ValidationError } from '@formspree/react';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("myzjzlbo"); // <-- Your Formspree endpoint ID

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2>Get Your Free Solar Consultation</h2>
          <p>Take the first step towards energy independence and savings</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center h-full text-center p-8"
              >
                <div className="bg-primary-100 rounded-full p-4 mb-6">
                  <Check className="h-12 w-12 text-primary-500" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
                <p className="text-gray-600 mb-6">
                  Your consultation request has been received. One of our solar experts will contact you within 24 hours to discuss your solar requirements.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="btn btn-outline"
                >
                  Submit Another Request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                  <ValidationError prefix="Name" field="name" errors={state.errors} />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address*
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number*
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      placeholder="+91 XXXXX XXXXX"
                    />
                    <ValidationError prefix="Phone" field="phone" errors={state.errors} />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="interestType" className="block text-sm font-medium text-gray-700 mb-1">
                    I'm interested in solar for:
                  </label>
                  <select
                    id="interestType"
                    name="interestType"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="residential">Residential Property</option>
                    <option value="commercial">Commercial Building</option>
                    <option value="industrial">Industrial Facility</option>
                    <option value="other">Other</option>
                  </select>
                  <ValidationError prefix="InterestType" field="interestType" errors={state.errors} />
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message (Optional)
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Tell us about your energy needs and any specific requirements"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} />
                </div>
                
                <div className="mb-6">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      className="mt-1 mr-2"
                    />
                    <span className="text-sm text-gray-600">
                      I agree to receive communications about solar solutions. I understand I can unsubscribe at any time.
                    </span>
                  </label>
                </div>
                
                <motion.button
                  type="submit"
                  className="btn btn-primary w-full flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={state.submitting}
                >
                  Get Free Consultation
                  <Send className="ml-2 h-5 w-5" />
                </motion.button>
              </form>
            )}
          </div>
          
          <div>
            <div className="bg-secondary-500 text-white rounded-lg shadow-md p-6 md:p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Phone</h4>
                    <p className="text-white/90">+91 99935 11331</p>  
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Email</h4>
                    <p className="text-white/90">oksolar.inc@gmail.com </p>
                    <p className="text-white/70 text-sm">We respond within 24 hours</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 mr-4 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1">Office</h4>
                    <p className="text-white/90">
                     57, Shree Rameshwaram Bagmugaliya
                  <br />Bhopal, Madhya Pradesh 462043
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h4 className="font-medium mb-4">Our Service Areas</h4>
                <div className="flex flex-wrap gap-2">
                  {['Pan India', 'Madhya Pradesh', 'Uttar Pradesh', 'Maharastra', 'Chattisgarh', 'Gujrat', 'Goa'].map((city) => (
                    <span key={city} className="bg-white/10 px-3 py-1 rounded-full text-sm">
                      {city}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;