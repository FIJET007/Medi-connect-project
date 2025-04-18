import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle2, Truck, Building2, FileText, AlertCircle } from 'lucide-react';
import { Prescription } from '../../types';

interface PrescriptionStatusCardProps {
  prescription: Prescription;
}

const PrescriptionStatusCard: React.FC<PrescriptionStatusCardProps> = ({ prescription }) => {
  const getStatusIcon = () => {
    switch (prescription.status) {
      case 'pending':
        return <Clock className="text-warning h-5 w-5" />;
      case 'processing':
        return <Building2 className="text-secondary h-5 w-5" />;
      case 'ready':
        return <CheckCircle2 className="text-success h-5 w-5" />;
      case 'delivered':
        return <Truck className="text-success h-5 w-5" />;
      default:
        return <AlertCircle className="text-error h-5 w-5" />;
    }
  };

  const getStatusText = () => {
    switch (prescription.status) {
      case 'pending':
        return 'Waiting for pharmacy selection';
      case 'processing':
        return 'Being processed by pharmacy';
      case 'ready':
        return 'Ready for delivery';
      case 'delivered':
        return 'Delivered to your address';
      default:
        return 'Unknown status';
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="border border-gray-100 rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="relative flex-shrink-0 w-14 h-14 bg-gray-100 rounded-lg overflow-hidden">
          {prescription.imageUrl ? (
            <img 
              src={prescription.imageUrl} 
              alt="Prescription" 
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="text-gray-400 h-6 w-6" />
            </div>
          )}
        </div>
        
        <div className="flex-grow">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h3 className="font-medium text-gray-900">
                Prescription #{prescription.id.slice(-4)}
              </h3>
              <p className="text-gray-500 text-sm">
                Uploaded on {formatDate(prescription.createdAt)}
              </p>
            </div>
            
            <div className="flex items-center gap-1.5 px-3 py-1 bg-gray-100 rounded-full text-sm">
              {getStatusIcon()}
              <span className="font-medium">{getStatusText()}</span>
            </div>
          </div>
          
          {prescription.pharmacy && (
            <div className="mt-2 flex items-center text-sm text-gray-700">
              <Building2 className="mr-1 h-4 w-4 text-gray-500" />
              <span>{prescription.pharmacy.name}</span>
              {prescription.deliveryDate && (
                <span className="ml-3 flex items-center text-sm text-gray-700">
                  <Truck className="mr-1 h-4 w-4 text-gray-500" />
                  <span>Delivery by {new Date(prescription.deliveryDate).toLocaleDateString()}</span>
                </span>
              )}
            </div>
          )}
          
          <div className="mt-3">
            <Link 
              to={`/prescriptions/${prescription.id}`} 
              className="text-primary text-sm font-medium"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionStatusCard;