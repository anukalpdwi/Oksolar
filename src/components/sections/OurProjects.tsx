import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Zap, X, Phone, Mail, Clock } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: "PM KUSUM Yojana",
    location: "Mandsaur, Madhya Pradesh",
    capacity: "2.4MWp",
    description: "A PM KUSUM Yojana ground-mounted solar plant bringing sustainable energy to rural Madhya Pradesh.",
    image: "/projects/project-1.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 2,
    title: "PM KUSUM Yojana",
    location: "Mokha Charnan, Bikaner, Rajasthan",
    capacity: "3.6MWp",
    description: "A Ground-Mounted PV Plant under PM KUSUM Yojana to empower rural India with renewable power.",
    image: "/projects/project-2.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 3,
    title: "PM KUSUM Yojana",
    location: "Sujasar, Bikaner, Rajasthan",
    capacity: "3.06 MWp",
    description: "On-grid solar PV project under PM KUSUM Yojana, Rajasthan.",
    image: "/projects/project-3.jpg",
    type: "On-Grid Solar PV"
  },
  {
    id: 4,
    title: "PM KUSUM Yojana",
    location: "Dausa, Rajasthan",
    capacity: "2.0 MW",
    description: "Under PM Kusum-A ground mounted solar plant.",
    image: "/projects/project-4.jpg",
    type: "Ground-Mounted"
  },
  {
    id: 5,
    title: "PM KUSUM Yojana",
    location: "Tonk, Rajasthan",
    capacity: "1.7 MW",
    description: "Under PM Kusum-A ground mounted solar plant.",
    image: "/projects/project-5.jpg",
    type: "Ground-Mounted"
  }
];

const OurProjects: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section className="min-h-screen bg-gray-50 py-20 mt-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-blue-600 font-semibold text-sm tracking-wider uppercase mb-2 block">
            Our Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Key Projects
          </h2>
          <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Showcasing our commitment to a sustainable future through our successfully commissioned solar EPC projects across India.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group border border-gray-100 flex flex-col"
            >
              {/* Image Container */}
              <div 
                className="relative h-64 overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(project.image)}
              >
                <img 
                  src={project.image} 
                  alt={`${project.title} at ${project.location}`}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                  <span className="opacity-0 group-hover:opacity-100 text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm transition-opacity duration-300">
                    View Image
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-blue-700 shadow-sm border border-blue-100 z-10">
                  {project.capacity}
                </div>
              </div>

              {/* Content Container */}
              <div className="p-8 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors">
                  {project.title}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start text-gray-600">
                    <MapPin className="w-5 h-5 mr-3 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm font-medium">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Zap className="w-5 h-5 mr-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-gray-800">Capacity: {project.capacity}</span>
                  </div>
                </div>

                <p className="text-gray-600 leading-relaxed text-sm border-t border-gray-100 pt-4 mt-auto">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Details Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-blue-600 p-10 md:p-16 text-white relative overflow-hidden">
               <div className="absolute inset-0 bg-blue-700/50 mix-blend-multiply"></div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold mb-6">Contact Us</h3>
                 <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                   Interested in our solar EPC services? Reach out to us for a consultation or to learn more about our projects.
                 </p>
                 <div className="space-y-6">
                   <div className="flex items-start">
                     <Phone className="w-6 h-6 mr-4 text-yellow-400 mt-1" />
                     <div>
                       <p className="font-semibold text-lg">Call Us</p>
                       <p className="text-blue-100">+91 99935 11331</p>
                     </div>
                   </div>
                   <div className="flex items-start">
                     <Mail className="w-6 h-6 mr-4 text-yellow-400 mt-1" />
                     <div>
                       <p className="font-semibold text-lg">Email Us</p>
                       <p className="text-blue-100">oksolar.inc@gmail.com</p>
                     </div>
                   </div>
                   <div className="flex items-start">
                     <Clock className="w-6 h-6 mr-4 text-yellow-400 mt-1" />
                     <div>
                       <p className="font-semibold text-lg">Working Hours</p>
                       <p className="text-blue-100">Mon - Sat: 9:00 AM - 6:00 PM</p>
                     </div>
                   </div>
                 </div>
               </div>
            </div>
            
            <div className="p-10 md:p-16 bg-gray-50 flex flex-col justify-center">
              <div className="flex items-start mb-6">
                <MapPin className="w-8 h-8 mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Head Office</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    37-A, Bhagat Watika,<br />
                    Raj Bhawan Road, Civil Lines,<br />
                    Jaipur, India 302006
                  </p>
                </div>
              </div>

              <div className="flex items-start mb-6">
                <MapPin className="w-8 h-8 mr-4 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Corporate Office</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    57, Harvash Vihar,<br />
                    Danish Nagar, Bagmugalia,<br />
                    Bhopal, MP 462043
                  </p>
                </div>
              </div>
              <div className="mt-8">
                 <iframe 
                   src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3557.568469376175!2d75.7905!3d26.912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db47000000001%3A0x0!2zMjbCsDU0JzQzLjIiTiA3NcKwNDcnMjUuOCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                   width="100%" 
                   height="250" 
                   style={{ border: 0, borderRadius: '1rem' }} 
                   allowFullScreen 
                   loading="lazy" 
                   referrerPolicy="no-referrer-when-downgrade"
                   title="Office Location"
                 ></iframe>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 backdrop-blur-sm"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors bg-white/10 p-2 rounded-full"
              onClick={() => setSelectedImage(null)}
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              src={selectedImage}
              alt="Project View"
              className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default OurProjects;
