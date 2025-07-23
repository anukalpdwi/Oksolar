import React, { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { Phone, MessageCircle, X } from 'lucide-react';

const supabaseUrl = 'https://aptazeslvraekuragkfa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwdGF6ZXNsdnJhZWt1cmFna2ZhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI5MDc3NTksImV4cCI6MjA2ODQ4Mzc1OX0.mmr_ODdD6NDpBrEuM9GXecl35LZOVKV5qnduCTCgGoQ';
const supabase = createClient(supabaseUrl, supabaseKey);

const FindUsNearYou: React.FC = () => {
  const [partners, setPartners] = useState<any[]>([]);
  const [filters, setFilters] = useState({ state: '', district: '', city: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showContactForm, setShowContactForm] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<any | null>(null);
  const [contactType, setContactType] = useState<'phone' | 'whatsapp' | null>(null);
  const [userForm, setUserForm] = useState({ name: '', address: '', phone: '' });
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [revealedContacts, setRevealedContacts] = useState<Record<string, { phone: boolean; whatsapp: boolean }>>({});

  useEffect(() => {
    const fetchPartners = async () => {
      setIsLoading(true);
      const { data, error } = await supabase.from('partners').select('*');
      if (error) {
        setPartners([]);
      } else if (data) {
        setPartners(data);
      }
      setIsLoading(false);
    };
    fetchPartners();
  }, []);

  const filteredPartners = partners.filter(
    (partner) =>
      (!filters.state || partner.state === filters.state) &&
      (!filters.district || partner.district === filters.district) &&
      (!filters.city || partner.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
      partner.name &&
      partner.address &&
      partner.phone
  );

  const states = Array.from(new Set(partners.map((p) => p.state).filter(Boolean))).sort();
  const districts = Array.from(
    new Set(
      partners
        .filter((p) => !filters.state || p.state === filters.state)
        .map((p) => p.district)
        .filter(Boolean)
    )
  ).sort();

  const handleShowContact = (partner: any, type: 'phone' | 'whatsapp') => {
    setSelectedPartner(partner);
    setContactType(type);
    setShowContactForm(true);
  };

  const handleUserFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.name || !userForm.address || !userForm.phone) {
      setFormError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    // Save user data to Google Sheets
    try {
      await fetch('https://script.google.com/macros/s/AKfycbxHOdA371PAnJIH9soU58Rb6uHTKM9jeNIqgns6uzt8hqIO6EHclTnJCIwx_Hf6EeG-hQ/exec', {
        method: 'POST',
        mode: 'no-cors', // Bypass CORS
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: userForm.name,
          Address: userForm.address,
          Phone: userForm.phone,
        }),
      });

      // Since mode is 'no-cors', response is opaque; assume success if no error
      setRevealedContacts((prev) => ({
        ...prev,
        [selectedPartner?.id || '']: {
          ...prev[selectedPartner?.id || ''],
          [contactType!]: true,
        },
      }));
      setShowContactForm(false);
      setUserForm({ name: '', address: '', phone: '' });
      setIsSubmitting(false);
    } catch (err: any) {
      console.error('Error saving to Google Sheets:', err);
      setFormError('Failed to submit. Please try again later.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-12 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-gray-800 text-center mb-12">Find Us Near You</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-12 justify-center">
          <select
            value={filters.state}
            onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value, district: '' }))}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full md:w-64"
          >
            <option value="">All States</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          <select
            value={filters.district}
            onChange={(e) => setFilters((f) => ({ ...f, district: e.target.value }))}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white w-full md:w-64"
            disabled={!filters.state}
          >
            <option value="">All Districts</option>
            {districts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Search by city"
            value={filters.city}
            onChange={(e) => setFilters((f) => ({ ...f, city: e.target.value }))}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full md:w-64"
          />
        </div>
        {isLoading ? (
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : filteredPartners.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">No partners found for the selected location.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPartners.map((partner, idx) => (
              <div key={partner.id || idx} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{partner.company || partner.name}</h3>
                <p className="text-gray-600 mb-3">
                  {partner.address}, {partner.city}, {partner.district}, {partner.state} - {partner.pincode}
                </p>
                {partner.phone && (
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="h-5 w-5 text-gray-500" />
                    {revealedContacts[partner.id]?.phone ? (
                      <span className="text-gray-700">{partner.phone}</span>
                    ) : (
                      <button
                        onClick={() => handleShowContact(partner, 'phone')}
                        className="text-blue-600 hover:underline"
                      >
                        Show Number
                      </button>
                    )}
                  </div>
                )}
                <div className="flex gap-4">
                  {partner.phone && (
                    <a
                      href={revealedContacts[partner.id]?.phone ? `tel:${partner.phone}` : '#'}
                      className={`flex-1 px-4 py-2 text-white rounded-lg text-center transition-colors ${
                        revealedContacts[partner.id]?.phone ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-400 cursor-not-allowed'
                      }`}
                      onClick={(e) => !revealedContacts[partner.id]?.phone && e.preventDefault()}
                    >
                      Call Now
                    </a>
                  )}
                  {partner.whatsapp && (
                    <div className="flex items-center gap-2">
                      <MessageCircle className="h-5 w-5 text-gray-500" />
                      {revealedContacts[partner.id]?.whatsapp ? (
                        <a
                          href={`https://wa.me/${partner.whatsapp}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-700 flex-1"
                        >
                          {partner.whatsapp}
                        </a>
                      ) : (
                        <button
                          onClick={() => handleShowContact(partner, 'whatsapp')}
                          className="text-blue-600 hover:underline"
                        >
                          Show WhatsApp
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        {showContactForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-md w-full relative">
              <button
                onClick={() => {
                  setShowContactForm(false);
                  setUserForm({ name: '', address: '', phone: '' });
                  setFormError(null);
                  setIsSubmitting(false);
                }}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <X className="h-6 w-6" />
              </button>
              <h3 className="text-2xl font-semibold text-gray-800 mb-6">Enter Your Details</h3>
              <form onSubmit={handleUserFormSubmit} className="space-y-4">
                {formError && <p className="text-red-500 text-sm">{formError}</p>}
                <div>
                  <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-2">
                    Name*
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userForm.name}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Address*
                  </label>
                  <input
                    type="text"
                    id="userAddress"
                    value={userForm.address}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, address: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Your address"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userPhone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number*
                  </label>
                  <input
                    type="tel"
                    id="userPhone"
                    value={userForm.phone}
                    onChange={(e) => setUserForm((prev) => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 text-white rounded-lg transition-colors ${
                    isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FindUsNearYou;