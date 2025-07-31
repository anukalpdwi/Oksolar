import React from 'react';
import { motion } from 'framer-motion';
import { PanelTop, Gauge, FileSearch, Wrench, ExternalLink } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="inline-flex items-center justify-center p-3 bg-primary-50 rounded-lg mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <a 
        href="#contact" 
        className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600 transition-colors"
      >
        Learn more
        <ExternalLink className="ml-1 h-4 w-4" />
      </a>
    </motion.div>
  );
};

const Services: React.FC = () => {
  const services = [
    {
      icon: <PanelTop className="h-6 w-6 text-primary-500" />,
      title: "Solar System Design & Installation",
      description: "Custom-designed solar systems for your specific needs, with professional installation by our certified technicians."
    },
    {
      icon: <Gauge className="h-6 w-6 text-primary-500" />,
      title: "Energy Audit & Consultation",
      description: "Comprehensive energy assessment to determine the optimal solar solution for your home or business."
    },
    {
      icon: <FileSearch className="h-6 w-6 text-primary-500" />,
      title: "Government Subsidy Assistance",
      description: "Complete support for navigating and applying for all available government subsidies and incentives."
    },
    {
      icon: <Wrench className="h-6 w-6 text-primary-500" />,
      title: "Maintenance Services",
      description: "Regular maintenance and support services to ensure your solar system performs optimally for years to come."
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="section bg-gray-50">
      <div className="container">
        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2>Our Services</h2>
          <p>Comprehensive solar solutions for homes and businesses across India</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          ))}
        </div>

        {/* Place this button below your services list or grid, wherever you want it to appear in the Our Services section: */}
        <div className="flex justify-center mt-8">
          <a
            href="/find-us-near-you"
            className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors"
          >
            Find Us Near You
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;