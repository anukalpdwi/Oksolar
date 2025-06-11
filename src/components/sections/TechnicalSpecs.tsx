import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckSquare, Zap, ChevronDown, ChevronUp } from 'lucide-react';
import RoiCalculator from '../ui/RoiCalculator';

interface AccordionItemProps {
  title: string;
  children: React.ReactNode;
  isOpen: boolean;
  toggleAccordion: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ 
  title, 
  children, 
  isOpen, 
  toggleAccordion 
}) => {
  return (
    <div className="border-b border-gray-200">
      <button
        className="flex justify-between items-center w-full py-4 px-6 text-left font-medium focus:outline-none"
        onClick={toggleAccordion}
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-5 w-5 text-primary-500" />
        ) : (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="p-6 pt-0 bg-gray-50">
          {children}
        </div>
      )}
    </div>
  );
};

const TechnicalSpecs: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<number>(0);
  
  const toggleAccordion = (index: number) => {
    setOpenAccordion(openAccordion === index ? -1 : index);
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const solarSystemTypes = [
    {
      title: "On-Grid Solar System",
      description: "Connected to the utility grid, allowing excess power to be exported back to the grid.",
      features: [
        "Grid-connected without batteries",
        "Exports excess electricity to the grid",
        "Requires net metering arrangement",
        "Most cost-effective solution",
        "10-15% annual returns on investment",
      ],
      brands: ["Waaree", "Tata Power Solar", "Luminous", "Havells"]
    },
    {
      title: "Off-Grid Solar System",
      description: "Operates independently from the utility grid, using batteries to store energy for later use.",
      features: [
        "Works without grid connection",
        "Includes battery storage",
        "Complete energy independence",
        "Ideal for remote locations",
        "No electricity bills"
      ],
      brands: ["Luminous", "Microtek", "Sukam", "Exide"]
    },
    {
      title: "Hybrid Solar System",
      description: "Combines features of both on-grid and off-grid systems for maximum flexibility and reliability.",
      features: [
        "Connected to grid with battery backup",
        "Prioritizes self-consumption",
        "Provides power during grid outages",
        "Intelligent energy management",
        "Best of both worlds"
      ],
      brands: ["Growatt", "SolarEdge", "ABB", "Delta"]
    },
    {
      title: "Solar Water Heaters",
      description: "Dedicated systems designed specifically for water heating applications.",
      features: [
        "Evacuated tube collectors",
        "Flat plate collectors available",
        "80-120 liters capacity options",
        "60-80°C water temperature",
        "5-7 year warranty"
      ],
      brands: ["V-Guard", "Racold", "Bajaj", "Crompton"]
    }
  ];

  const warranties = [
    { component: "Solar Panels", period: "25 years performance warranty, 10 years product warranty" },
    { component: "Inverters", period: "5-10 years standard warranty (extendable)" },
    { component: "Mounting Structures", period: "10 years warranty against manufacturing defects" },
    { component: "Batteries (if applicable)", period: "2-5 years warranty depending on type" },
    { component: "Installation Workmanship", period: "5 years comprehensive warranty" }
  ];

  return (
    <section id="technical" className="section bg-gray-50">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2>Technical Specifications</h2>
          <p>Discover our range of high-quality solar systems and their specifications</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {solarSystemTypes.map((system, index) => (
                <AccordionItem
                  key={index}
                  title={system.title}
                  isOpen={openAccordion === index}
                  toggleAccordion={() => toggleAccordion(index)}
                >
                  <p className="text-gray-600 mb-4">{system.description}</p>
                  
                  <h4 className="font-medium text-gray-800 mb-2">Key Features:</h4>
                  <ul className="mb-4">
                    {system.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start mb-2">
                        <CheckSquare className="h-5 w-5 text-primary-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h4 className="font-medium text-gray-800 mb-2">Recommended Brands:</h4>
                  <div className="flex flex-wrap gap-2">
                    {system.brands.map((brand, idx) => (
                      <span key={idx} className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-secondary-50 text-secondary-600">
                        <Zap className="h-4 w-4 mr-1" />
                        {brand}
                      </span>
                    ))}
                  </div>
                </AccordionItem>
              ))}
            </div>

            <div className="mt-8 bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Warranty Information</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="py-3 px-4 text-left font-medium text-gray-700">Component</th>
                      <th className="py-3 px-4 text-left font-medium text-gray-700">Warranty Period</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {warranties.map((item, index) => (
                      <tr key={index}>
                        <td className="py-3 px-4">{item.component}</td>
                        <td className="py-3 px-4">{item.period}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div>
            <RoiCalculator />
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicalSpecs;