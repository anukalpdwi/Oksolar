import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const PartnerWithUs: React.FC = () => {
  // Full state-district mapping (sample, add all for production)
  const stateDistricts: Record<string, string[]> = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Prakasam", "SPSR Nellore", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari"],
    "Madhya Pradesh": [
      "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", "Bhopal", "Burhanpur",
      "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", "Guna", "Gwalior", "Harda", "Hoshangabad",
      "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", "Khargone", "Mandla", "Mandsaur", "Morena", "Narsinghpur",
      "Neemuch", "Panna", "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur",
      "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
    ],
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik", "Aurangabad", "Solapur", "Amravati", "Kolhapur", "Jalgaon", "Satara", "Akola", "Sangli", "Latur", "Dhule", "Ahmednagar", "Chandrapur", "Parbhani", "Nanded", "Ratnagiri", "Gondia", "Osmanabad", "Wardha", "Bhandara", "Yavatmal", "Beed", "Raigad", "Washim", "Hingoli", "Gadchiroli", "Sindhudurg", "Jalna", "Palghar", "Nandurbar"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi", "Central Delhi", "Shahdara", "South East Delhi", "South West Delhi", "North East Delhi", "North West Delhi"],
    // ...add all other states and districts here...
  };

  // API-based pincode handler
  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, pincode: value }));

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const office = data[0].PostOffice[0];
          // Set state and district from API, and update districts dropdown to match state
          setForm((prev) => ({
            ...prev,
            state: office.State,
            district: office.District,
          }));
          setDistricts(stateDistricts[office.State] || []);
        }
      } catch (err) {
        setForm((prev) => ({ ...prev, district: '', state: prev.state }));
        setDistricts([]);
      }
    } else {
      setForm((prev) => ({ ...prev, city: '' }));
      setCities([]);
    }
  };
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    whatsapp: '',
    gstn: '',
    address: '',
    company: '',
    state: '',
    pincode: '',
    district: '',
    city: '',
    message: '',
  });
  const [districts, setDistricts] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // State selection updates districts
    if (name === 'state') {
      setDistricts(stateDistricts[value] || []);
      setForm((prev) => ({ ...prev, district: '', city: '' }));
    }

    // District selection clears city
    if (name === 'district') {
      setForm((prev) => ({ ...prev, city: '' }));
      setCities([]);
    }

    // Remove local pincode logic, now handled by handlePincodeChange
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Build WhatsApp message
    const message = `Partnership Request:%0A` +
      `Name: ${form.name}%0A` +
      `Email: ${form.email}%0A` +
      `Phone: ${form.phone}%0A` +
      `WhatsApp: ${form.whatsapp}%0A` +
      `GSTN: ${form.gstn}%0A` +
      `Address: ${form.address}%0A` +
      `Company: ${form.company}%0A` +
      `State: ${form.state}%0A` +
      `District: ${form.district}%0A` +
      `City: ${form.city}%0A` +
      `Pincode: ${form.pincode}%0A` +
      `Message: ${form.message}`;
    window.open(`https://wa.me/919993511331?text=${message}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section className="section bg-gray-50 min-h-screen flex items-center justify-center mt-24 md:mt-0">
      <div className="container max-w-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="section-title text-center mb-8"
        >
          <h2>Partner With Us</h2>
          <p>Fill out the form below to explore partnership opportunities with Ok Solar India.</p>
        </motion.div>
        <div className="bg-white rounded-lg shadow-md p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center p-8"
            >
              <h3 className="text-2xl font-semibold mb-4">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your partnership inquiry has been received. Our team will contact you soon.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="btn btn-outline"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="gstn" className="block text-sm font-medium text-gray-700 mb-1">
                  GSTN (Required):
                </label>
                <input
                  type="text"
                  id="gstn"
                  name="gstn"
                  required
                  value={form.gstn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="GSTN"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                  Address (Complete address helps in finding your business)
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Business Address"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name*
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number*
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-1">
                  WhatsApp Number:
                </label>
                <input
                  type="tel"
                  id="whatsapp"
                  name="whatsapp"
                  required
                  value={form.whatsapp}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="eg +919981234567"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Your company name"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                  State:
                </label>
                <select
                  id="state"
                  name="state"
                  required
                  value={form.state}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a state</option>
                  {["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland","Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand","West Bengal","Andaman and Nicobar Islands","Chandigarh","Dadra and Nagar Haveli and Daman and Diu","Delhi","Jammu and Kashmir","Ladakh","Lakshadweep","Puducherry"].map((state) => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                  District:
                </label>
                <select
                  id="district"
                  name="district"
                  required
                  value={form.district}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={!form.state}
                >
                  <option value="">Select a district</option>
                  {districts.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div className="mb-6">
                <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-1">
                  Pincode:
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handlePincodeChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter 6-digit pincode"
                  maxLength={6}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                  City:
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your city"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Tell us about your partnership proposal or any specific requirements"
                />
              </div>
              <motion.button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Submit Partnership Request
                <Send className="ml-2 h-5 w-5" />
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;
