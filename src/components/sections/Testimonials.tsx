import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface TestimonialProps {
  name: string;
  role: string;
  company?: string;
  location: string;
  image: string;
  content: string;
  rating: number;
}

const testimonials: TestimonialProps[] = [
  {
    name: "Rajesh Sharma",
    role: "Homeowner",
    location: "Jaipur",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Ok Solar India helped me reduce my electricity bill by 90%. The installation was professional and completed within the promised timeframe. Their team was very knowledgeable and helped me understand the entire process.",
    rating: 5
  },
  {
    name: "Priya Patel",
    role: "Business Owner",
    company: "Patel Textiles",
    location: "Bhopal",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "We installed a 25kW system for our textile factory and the results have been remarkable. Our production costs have decreased significantly, and the ROI is already exceeding our expectations. Highly recommended!",
    rating: 5
  },
  {
    name: "Sunil Reddy",
    role: "IT Professional",
    location: "Indore",
    image: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "The entire process from consultation to installation was smooth and transparent. The team was professional and the system has been working flawlessly for over a year now. Great service and support!",
    rating: 4
  },
  {
    name: "Ananya Desai",
    role: "School Principal",
    company: "Green Valley School",
    location: "Ahemdabad",
    image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    content: "Our school installed solar panels as part of our sustainability initiative. The team at Ok Solar made the process educational for our students and the system has been providing clean energy reliably. We're now saving on electricity while teaching our students about renewable energy.",
    rating: 5
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="section-title"
        >
          <h2>Customer Testimonials</h2>
          <p>Hear from our satisfied customers across India</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto mt-12">
          <div className="flex justify-between absolute top-1/2 -translate-y-1/2 w-full px-4 z-10">
            <button
              onClick={prevTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors focus:outline-none"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-6 w-6 text-gray-600" />
            </button>
            <button
              onClick={nextTestimonial}
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors focus:outline-none"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-6 w-6 text-gray-600" />
            </button>
          </div>

          <div className="overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              key={currentIndex}
              className="bg-white rounded-xl shadow-lg p-6 md:p-8"
            >
              <div className="flex justify-center mb-6">
                <Quote className="h-12 w-12 text-primary-200" />
              </div>
              
              <div className="text-center mb-8">
                <p className="text-gray-700 text-lg italic mb-6">"{testimonials[currentIndex].content}"</p>
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonials[currentIndex].rating
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-16 h-16 rounded-full object-cover mb-4"
                />
                <div className="text-center">
                  <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                  <p className="text-gray-600">
                    {testimonials[currentIndex].role}
                    {testimonials[currentIndex].company && ` at ${testimonials[currentIndex].company}`}
                  </p>
                  <p className="text-gray-500 text-sm">{testimonials[currentIndex].location}</p>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 mx-1 rounded-full transition-colors ${
                  currentIndex === index ? 'bg-primary-500' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;