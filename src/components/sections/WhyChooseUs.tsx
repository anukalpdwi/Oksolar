import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, CheckCircle, Clock } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import CountUp from 'react-countup';

interface StatCardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  suffix?: string;
  index: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon, value, label, suffix = "", index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow p-6 text-center"
    >
      <div className="inline-flex items-center justify-center p-3 bg-secondary-50 rounded-full mb-4">
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-2">
        {inView ? (
          <CountUp end={value} duration={2.5} suffix={suffix} />
        ) : (
          0
        )}
      </div>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
};

interface FeatureItemProps {
  title: string;
  description: string;
  index: number;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex mb-6"
    >
      <div className="mr-4 mt-1">
        <CheckCircle className="h-6 w-6 text-primary-500" />
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const WhyChooseUs: React.FC = () => {
  const stats = [
    {
      icon: <Clock className="h-6 w-6 text-secondary-500" />,
      value: 200,
      label: "Projects Completed",
      suffix: "+",
    },
    {
      icon: <Users className="h-6 w-6 text-secondary-500" />,
      value: 100,
      label: "Happy Customers",
      suffix: "+",
    },
    {
      icon: <Award className="h-6 w-6 text-secondary-500" />,
      value: 30,
      label: "Locations",
      suffix: "+",
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-secondary-500" />,
      value: 500,
      label: "kW Installed",
      suffix: "+",
    },
  ];

  const features = [
    {
      title: "Local Expertise",
      description: "Deep understanding of India's climate and solar potential, ensuring optimal system design for maximum efficiency."
    },
    {
      title: "Competitive Pricing",
      description: "We offer the best value for your investment with transparent pricing and assistance in securing government subsidies."
    },
    {
      title: "Quality Equipment",
      description: "We use only high-quality, certified solar panels and components from trusted manufacturers."
    },
    {
      title: "Dedicated Support",
      description: "Our responsive team provides excellent customer service and ongoing maintenance support."
    },
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="why-us" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2>Why Choose Us</h2>
          <p>Your trusted local partner for solar solutions in India</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
              index={index}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-6">Your Local Solar Energy Expert</h3>
              <div className="space-y-6">
                {features.map((feature, index) => (
                  <FeatureItem
                    key={index}
                    title={feature.title}
                    description={feature.description}
                    index={index}
                  />
                ))}
              </div>
            </div>

            <div className="relative flex justify-center items-center">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative group"
              >
                <div className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <img
                  src="/iso-certificate-flyer.png"
                  alt="Ok Solar ISO 9001:2015 Certified Company"
                  className="relative rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 w-full max-w-md mx-auto"
                />
              </motion.div>
            </div>
        </div>
            {/* Partner with us button */}
            <div className="flex justify-center mt-12">
              <a href="/partner-with-us" className="btn btn-primary text-lg px-8 py-4 rounded-full shadow-lg hover:bg-primary-600 transition-colors">
                Partner with us
              </a>
            </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;