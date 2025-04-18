import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MapPin, Phone, Star, Building2, Loader, Search } from 'lucide-react';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { motion } from 'framer-motion';

const SelectPharmacy: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { pharmacies, selectPharmacy } = usePrescriptions();
  const [selectedPharmacyId, setSelectedPharmacyId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  if (!id) {
    navigate('/prescriptions');
    return null;
  }

  const filteredPharmacies = pharmacies.filter(pharmacy => 
    pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectPharmacy = (pharmacyId: string) => {
    setSelectedPharmacyId(pharmacyId);
  };

  const handleSubmit = async () => {
    if (!selectedPharmacyId) return;
    
    setIsSubmitting(true);
    try {
      // Process the selection
      selectPharmacy(id, selectedPharmacyId);
      navigate(`/prescriptions/${id}`);
    } catch (error) {
      console.error('Error selecting pharmacy:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8">
      <div className="container-custom px-4">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Select a Pharmacy
          </h1>
          <p className="text-gray-600 mt-2">
            Choose a pharmacy to process your prescription
          </p>
        </div>
        
        <div className="card p-6 mb-6 animate-fade-in">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-6">
            <div className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search pharmacies by name or location..."
                className="form-input pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          {filteredPharmacies.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPharmacies.map((pharmacy) => (
                <motion.div
                  key={pharmacy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedPharmacyId === pharmacy.id 
                        ? 'border-primary bg-primary-light' 
                        : 'border-gray-200'
                    }`}
                    onClick={() => handleSelectPharmacy(pharmacy.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{pharmacy.name}</h3>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <MapPin size={16} className="mr-1 text-gray-500" />
                          <span>{pharmacy.address}</span>
                        </div>
                        
                        <div className="flex items-center mt-2 text-sm text-gray-600">
                          <Phone size={16} className="mr-1 text-gray-500" />
                          <span>{pharmacy.phone}</span>
                        </div>
                        
                        {pharmacy.distance && (
                          <div className="mt-3 text-sm">
                            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              {pharmacy.distance} away
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {pharmacy.rating && (
                        <div className="flex items-center gap-1 bg-white px-2 py-1 rounded-lg shadow-sm">
                          <Star size={16} className="text-warning" fill="#F59E0B" />
                          <span className="font-medium">{pharmacy.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    {selectedPharmacyId === pharmacy.id && (
                      <div className="mt-3 text-primary text-sm font-medium">
                        Selected
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Building2 className="text-gray-400 h-12 w-12 mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No pharmacies found</h3>
              <p className="text-gray-500 mt-1">
                Try adjusting your search query
              </p>
            </div>
          )}
          
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-end">
            <button
              className="btn-outline"
              onClick={() => navigate(`/prescriptions/${id}`)}
            >
              Cancel
            </button>
            <button
              className="btn-primary"
              disabled={!selectedPharmacyId || isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <Loader className="animate-spin h-5 w-5" />
              ) : (
                <>
                  Confirm Selection
                </>
              )}
            </button>
          </div>
        </div>
        
        <div className="card p-6 animate-fade-in">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            What happens next?
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">1</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Pharmacy Review</h3>
                <p className="text-gray-600 text-sm">
                  The selected pharmacy will review your prescription
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">2</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Medication Preparation</h3>
                <p className="text-gray-600 text-sm">
                  They will prepare your medications according to the prescription
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">3</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Delivery Scheduling</h3>
                <p className="text-gray-600 text-sm">
                  We'll arrange delivery to your doorstep
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                <span className="text-primary font-bold">4</span>
              </div>
              <div>
                <h3 className="font-medium text-gray-800">Delivery Confirmation</h3>
                <p className="text-gray-600 text-sm">
                  You'll receive a notification when your medications are delivered
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectPharmacy;