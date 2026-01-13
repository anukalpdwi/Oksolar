import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Zap, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

const projects = [
  {
    id: 1,
    title: "PM KUSUM Yojana",
    location: "Mandsaur, Madhya Pradesh",
    capacity: "2.4MWp",
    image: "/projects/project-1.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 2,
    title: "PM KUSUM Yojana",
    location: "Mokha Charnan, Bikaner, Rajasthan",
    capacity: "3.6MWp",
    image: "/projects/project-2.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 3,
    title: "PM KUSUM Yojana",
    location: "Sujasar, Bikaner, Rajasthan",
    capacity: "3.06 MWp",
    image: "/projects/project-3.jpg",
    type: "On-Grid Solar PV"
  },
  {
    id: 4,
    title: "PM KUSUM Yojana",
    location: "Dausa, Rajasthan",
    capacity: "2.0 MW",
    image: "/projects/project-4.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 5,
    title: "PM KUSUM Yojana",
    location: "Tonk, Rajasthan",
    capacity: "1.7 MW",
    image: "/projects/project-5.jpg",
    type: "Ground-Mounted"
  }
];

const ProjectsSection: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="projects" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
            Our Portfolio
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Projects
          </h2>
          <div className="w-20 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Delivering excellence in solar EPC with high-performance installations across India.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-blue-700 shadow-sm">
                  {project.capacity}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-500 mt-0.5" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                    <span>{project.type}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a
            href="/our-projects"
            className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors group"
          >
            View All Projects 
            <ArrowRight className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
