import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://aptazeslvraekuragkfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdGF6ZXNsdnJhZWt1cmFna2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDc3NTksImV4cCI6MjA2ODQ4Mzc1OX0.mmr_ODdD6NDpBrEuM9GXecl35LZOVKV5qnduCTCgGoQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const stateDistricts: Record<string, string[]> = {
  "Andhra Pradesh": [
    "Alluri Sitharama Raju", "Anakapalli", "Anantapur", "Annamayya", "Bapatla", "Chittoor", "East Godavari", 
    "Eluru", "Guntur", "Kadapa", "Kakinada", "Konaseema", "Krishna", "Kurnool", "Nandyal", "Nellore", 
    "Palnadu", "Parvathipuram Manyam", "Prakasam", "Sri Sathya Sai", "Srikakulam", "Tirupati", 
    "Visakhapatnam", "Vizianagaram", "West Godavari"
  ],
  "Arunachal Pradesh": [
    "Anjaw", "Changlang", "Dibang Valley", "East Kameng", "East Siang", "Itanagar Capital Complex", 
    "Kamle", "Kra Daadi", "Kurung Kumey", "Lepa Rada", "Lohit", "Longding", "Lower Dibang Valley", 
    "Lower Siang", "Lower Subansiri", "Namsai", "Pakke-Kessang", "Papum Pare", "Shi Yomi", "Siang", 
    "Tawang", "Tirap", "Upper Siang", "Upper Subansiri", "West Kameng", "West Siang"
  ],
  "Assam": [
    "Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", 
    "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", 
    "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", 
    "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", 
    "Tinsukia", "Udalguri", "West Karbi Anglong"
  ],
  "Bihar": [
    "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", 
    "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", 
    "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", 
    "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", 
    "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"
  ],
  "Chhattisgarh": [
    "Balod", "Baloda Bazar", "Balrampur-Ramanujganj", "Bastar", "Bemetara", "Bijapur", "Bilaspur", 
    "Dantewada", "Dhamtari", "Durg", "Gariaband", "Gaurela-Pendra-Marwahi", "Janjgir-Champa", 
    "Jashpur", "Kabirdham", "Kanker", "Khairagarh-ChhuiKhadan-Gandai", "Kondagaon", "Korba", 
    "Korea", "Mahasamund", "Manendragarh-Chirmiri-Bharatpur", "Mohla-Manpur-Ambagarh Chowki", 
    "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sakti", "Sarangarh-Bilaigarh", 
    "Sukma", "Surajpur", "Surguja"
  ],
  "Goa": ["North Goa", "South Goa"],
  "Gujarat": [
    "Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", 
    "Chhota Udaipur", "Dahod", "Dang", "Devbhumi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", 
    "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", 
    "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"
  ],
  "Haryana": [
    "Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", 
    "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", 
    "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"
  ],
  "Himachal Pradesh": [
    "Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", 
    "Shimla", "Sirmaur", "Solan", "Una"
  ],
  "Jharkhand": [
    "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", 
    "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", 
    "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahebganj", "Seraikela-Kharsawan", "Simdega", "West Singhbhum"
  ],
  "Karnataka": [
    "Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", 
    "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", 
    "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", 
    "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", 
    "Vijayapura", "Yadgir"
  ],
  "Kerala": [
    "Alappuzha", "Ernakulam", "Idukki", "Kannur", "Kasaragod", "Kollam", "Kottayam", "Kozhikode", 
    "Malappuram", "Palakkad", "Pathanamthitta", "Thiruvananthapuram", "Thrissur", "Wayanad"
  ],
  "Madhya Pradesh": [
    "Agar Malwa", "Alirajpur", "Anuppur", "Ashoknagar", "Balaghat", "Barwani", "Betul", "Bhind", 
    "Bhopal", "Burhanpur", "Chhatarpur", "Chhindwara", "Damoh", "Datia", "Dewas", "Dhar", "Dindori", 
    "Guna", "Gwalior", "Harda", "Hoshangabad", "Indore", "Jabalpur", "Jhabua", "Katni", "Khandwa", 
    "Khargone", "Mandla", "Mandsaur", "Morena", "Narmadapuram", "Neemuch", "Niwari", "Panna", 
    "Raisen", "Rajgarh", "Ratlam", "Rewa", "Sagar", "Satna", "Sehore", "Seoni", "Shahdol", "Shajapur", 
    "Sheopur", "Shivpuri", "Sidhi", "Singrauli", "Tikamgarh", "Ujjain", "Umaria", "Vidisha"
  ],
  "Maharashtra": [
    "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara", "Buldhana", "Chandrapur", 
    "Dhule", "Gadchiroli", "Gondia", "Hingoli", "Jalgaon", "Jalna", "Kolhapur", "Latur", "Mumbai City", 
    "Mumbai Suburban", "Nagpur", "Nanded", "Nandurbar", "Nashik", "Osmanabad", "Palghar", "Parbhani", 
    "Pune", "Raigad", "Ratnagiri", "Sangli", "Satara", "Sindhudurg", "Solapur", "Thane", "Wardha", 
    "Washim", "Yavatmal"
  ],
  "Manipur": [
    "Bishnupur", "Chandel", "Churachandpur", "Imphal East", "Imphal West", "Jiribam", "Kakching", 
    "Kamjong", "Kangpokpi", "Noney", "Pherzawl", "Senapati", "Tamenglong", "Tengnoupal", "Thoubal", "Ukhrul"
  ],
  "Meghalaya": [
    "East Garo Hills", "East Jaintia Hills", "East Khasi Hills", "North Garo Hills", "Ri Bhoi", 
    "South Garo Hills", "South West Garo Hills", "South West Khasi Hills", "West Garo Hills", 
    "West Jaintia Hills", "West Khasi Hills"
  ],
  "Mizoram": [
    "Aizawl", "Champhai", "Hnahthial", "Khawzawl", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", 
    "Saitual", "Serchhip", "Siaha"
  ],
  "Nagaland": [
    "Chumoukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Noklak", 
    "Peren", "Phek", "Tuensang", "Wokha", "Zunheboto"
  ],
  "Odisha": [
    "Angul", "Balangir", "Balasore", "Bargarh", "Bhadrak", "Boudh", "Cuttack", "Deogarh", "Dhenkanal", 
    "Gajapati", "Ganjam", "Jagatsinghpur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", 
    "Kendujhar", "Khordha", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", 
    "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"
  ],
  "Punjab": [
    "Amritsar", "Barnala", "Bathinda", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Gurdaspur", 
    "Hoshiarpur", "Jalandhar", "Kapurthala", "Ludhiana", "Malerkotla", "Mansa", "Moga", "Muktsar", 
    "Pathankot", "Patiala", "Rupnagar", "Sangrur", "SAS Nagar", "Tarn Taran"
  ],
  "Rajasthan": [
    "Ajmer", "Alwar", "Anupgarh", "Balotra", "Banswara", "Baran", "Barmer", "Beawar", "Bharatpur", 
    "Bhilwara", "Bikaner", "Bundi", "Chittorgarh", "Churu", "Dausa", "Deedwana-Kuchaman", "Dholpur", 
    "Dudu", "Dungarpur", "Gangapur City", "Hanumangarh", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", 
    "Jhunjhunu", "Jodhpur", "Karauli", "Kekri", "Khairthal-Tijara", "Kota", "Nagaur", "Neem ka Thana", 
    "Pali", "Phalodi", "Rajsamand", "Salumbar", "Sanchore", "Sawai Madhopur", "Shahpura", "Sikar", 
    "Sirohi", "Sri Ganganagar", "Tonk", "Udaipur"
  ],
  "Sikkim": ["Gangtok", "Mangan", "Namchi", "Pakyong", "Soreng", "Gyalshing"],
  "Tamil Nadu": [
    "Ariyalur", "Chengalpattu", "Chennai", "Coimbatore", "Cuddalore", "Dharmapuri", "Dindigul", 
    "Erode", "Kallakurichi", "Kanchipuram", "Kanyakumari", "Karur", "Krishnagiri", "Madurai", 
    "Mayiladuthurai", "Nagapattinam", "Namakkal", "Nilgiris", "Perambalur", "Pudukkottai", 
    "Ramanathapuram", "Ranipet", "Salem", "Sivaganga", "Tenkasi", "Thanjavur", "Theni", 
    "Thiruvallur", "Thiruvarur", "Thoothukudi", "Tiruchirappalli", "Tirunelveli", "Tirupathur", 
    "Tiruppur", "Tiruvannamalai", "Vellore", "Viluppuram", "Virudhunagar"
  ],
  "Telangana": [
    "Adilabad", "Bhadradri Kothagudem", "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", 
    "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", "Kumuram Bheem Asifabad", "Mahabubabad", 
    "Mahbubnagar", "Mancherial", "Medak", "Medchal-Malkajgiri", "Mulugu", "Nagarkurnool", "Nalgonda", 
    "Narayanpet", "Nirmal", "Nizamabad", "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", 
    "Siddipet", "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri"
  ],
  "Tripura": [
    "Dhalai", "Gomati", "Khowai", "North Tripura", "Sepahijala", "South Tripura", "Unakoti", "West Tripura"
  ],
  "Uttar Pradesh": [
    "Agra", "Aligarh", "Ambedkar Nagar", "Amethi", "Amroha", "Auraiya", "Ayodhya", "Azamgarh", 
    "Baghpat", "Bahraich", "Ballia", "Balrampur", "Banda", "Barabanki", "Bareilly", "Basti", 
    "Bhadohi", "Bijnor", "Budaun", "Bulandshahr", "Chandauli", "Chitrakoot", "Deoria", "Etah", 
    "Etawah", "Farrukhabad", "Fatehpur", "Firozabad", "Gautam Buddha Nagar", "Ghaziabad", "Ghazipur", 
    "Gonda", "Gorakhpur", "Hamirpur", "Hapur", "Hardoi", "Hathras", "Jalaun", "Jaunpur", "Jhansi", 
    "Kannauj", "Kanpur Dehat", "Kanpur Nagar", "Kasganj", "Kaushambi", "Kushinagar", "Lakhimpur Kheri", 
    "Lalitpur", "Lucknow", "Maharajganj", "Mahoba", "Mainpuri", "Mathura", "Mau", "Meerut", "Mirzapur", 
    "Moradabad", "Muzaffarnagar", "Pilibhit", "Pratapgarh", "Prayagraj", "Raebareli", "Rampur", 
    "Saharanpur", "Sambhal", "Sant Kabir Nagar", "Shahjahanpur", "Shamli", "Shravasti", "Siddharthnagar", 
    "Sitapur", "Sonbhadra", "Sultanpur", "Unnao", "Varanasi"
  ],
  "Uttarakhand": [
    "Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Haridwar", "Nainital", "Pauri Garhwal", 
    "Pithoragarh", "Rudraprayag", "Tehri Garhwal", "Udham Singh Nagar", "Uttarkashi"
  ],
  "West Bengal": [
    "Alipurduar", "Bankura", "Birbhum", "Cooch Behar", "Dakshin Dinajpur", "Darjeeling", "Hooghly", 
    "Howrah", "Jalpaiguri", "Jhargram", "Kalimpong", "Kolkata", "Maldah", "Murshidabad", "Nadia", 
    "North 24 Parganas", "Paschim Bardhaman", "Paschim Medinipur", "Purba Bardhaman", "Purba Medinipur", 
    "Purulia", "South 24 Parganas", "Uttar Dinajpur"
  ],
  "Andaman and Nicobar Islands": ["Nicobar", "North and Middle Andaman", "South Andaman"],
  "Chandigarh": ["Chandigarh"],
  "Dadra and Nagar Haveli and Daman and Diu": ["Daman", "Diu", "Dadra and Nagar Haveli"],
  "Delhi": [
    "Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", 
    "Shahdara", "South Delhi", "South East Delhi", "South West Delhi", "West Delhi"
  ],
  "Jammu and Kashmir": [
    "Anantnag", "Bandipora", "Baramulla", "Budgam", "Doda", "Ganderbal", "Jammu", "Kathua", "Kishtwar", 
    "Kulgam", "Kupwara", "Poonch", "Pulwama", "Rajouri", "Ramban", "Reasi", "Samba", "Shopian", 
    "Srinagar", "Udhampur"
  ],
  "Ladakh": ["Kargil", "Leh"],
  "Lakshadweep": ["Lakshadweep"],
  "Puducherry": ["Karaikal", "Mahe", "Puducherry", "Yanam"]
};

const PartnerWithUs: React.FC = () => {
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
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePincodeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, pincode: value }));

    if (value.length === 6) {
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${value}`);
        const data = await res.json();
        if (data[0].Status === "Success" && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const office = data[0].PostOffice[0];
          setForm((prev) => ({
            ...prev,
            state: office.State,
            district: office.District,
            city: office.Name,
          }));
          setDistricts(stateDistricts[office.State] || []);
        } else {
          setForm((prev) => ({ ...prev, district: '', state: '', city: '' }));
          setDistricts([]);
          setError('Invalid pincode');
        }
      } catch (err) {
        setForm((prev) => ({ ...prev, district: '', state: '', city: '' }));
        setDistricts([]);
        setError('Invalid pincode');
      }
    } else {
      setForm((prev) => ({ ...prev, district: '', state: '', city: '' }));
      setDistricts([]);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError(null);

    if (name === 'state') {
      setDistricts(stateDistricts[value] || []);
      setForm((prev) => ({ ...prev, district: '', city: '' }));
    }

    if (name === 'district') {
      setForm((prev) => ({ ...prev, city: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Save to Supabase
    const { error } = await supabase.from('partners').insert([form]);

    if (error) {
      setError('Error submitting form. Please try again.');
      setIsLoading(false);
      return;
    }

    // Save to Google Sheets if name, address, and phone are provided
    if (form.name && form.address && form.phone) {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbx1234567890/exec', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name: form.name,
            Address: `${form.address}, ${form.city}, ${form.district}, ${form.state} - ${form.pincode}`,
            Phone: form.phone,
          }),
        });

        if (!response.ok) {
          console.error('Failed to save to Google Sheets');
        }
      } catch (err) {
        console.error('Error saving to Google Sheets:', err);
      }
    }

    setSubmitted(true);
    setIsLoading(false);

    const whatsappNumber = '919993511331';
    const whatsappMessage = `New Partner Inquiry:
Name: ${form.name}
Company: ${form.company}
Email: ${form.email}
Phone: ${form.phone}
WhatsApp: ${form.whatsapp}
GSTN: ${form.gstn}
Address: ${form.address}, ${form.city}, ${form.district}, ${form.state} - ${form.pincode}
Message: ${form.message}`;

    window.open(
      `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`,
      '_blank'
    );
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12 md:py-24 mt-28 md:mt-0">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Partner With Us</h2>
          <p className="text-lg text-gray-600">Join Ok Solar India to explore exciting partnership opportunities.</p>
        </motion.div>
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center h-full text-center p-8"
            >
              <h3 className="text-2xl font-semibold text-green-600 mb-4">Thank You!</h3>
              <p className="text-gray-600 mb-6">
                Your partnership inquiry has been received. Our team will contact you soon.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({
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
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Another Inquiry
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name*
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email*
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-700 mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    id="whatsapp"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="gstn" className="block text-sm font-medium text-gray-700 mb-2">
                  GSTN*
                </label>
                <input
                  type="text"
                  id="gstn"
                  name="gstn"
                  required
                  value={form.gstn}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="GSTN"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  Address*
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  required
                  value={form.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Business Address"
                />
              </div>
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                  Company/Organization
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={form.company}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your company name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="pincode" className="block text-sm font-medium text-gray-700 mb-2">
                    Pincode*
                  </label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    required
                    value={form.pincode}
                    onChange={handlePincodeChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter 6-digit pincode"
                    maxLength={6}
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-2">
                    State*
                  </label>
                  <select
                    id="state"
                    name="state"
                    required
                    value={form.state}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="">Select a state</option>
                    {Object.keys(stateDistricts).map((state) => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-2">
                    District*
                  </label>
                  <select
                    id="district"
                    name="district"
                    required
                    value={form.district}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={!form.state}
                  >
                    <option value="">Select a district</option>
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                    City*
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    required
                    value={form.city}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Enter your city"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message (Optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tell us about your partnership proposal"
                />
              </div>
              <motion.button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                  isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                } transition-colors`}
                whileHover={{ scale: isLoading ? 1 : 1.02 }}
                whileTap={{ scale: isLoading ? 1 : 0.98 }}
              >
                {isLoading ? 'Submitting...' : 'Submit Partnership Request'}
                {!isLoading && <Send className="ml-2 h-5 w-5" />}
              </motion.button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default PartnerWithUs;