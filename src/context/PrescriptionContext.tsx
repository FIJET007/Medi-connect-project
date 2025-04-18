import React, { createContext, useContext, useState } from 'react';
import { Prescription, Pharmacy, Notification } from '../types';

interface PrescriptionContextType {
  prescriptions: Prescription[];
  pharmacies: Pharmacy[];
  notifications: Notification[];
  uploadPrescription: (imageFile: File) => Promise<void>;
  selectPharmacy: (prescriptionId: string, pharmacyId: string) => void;
  getNotifications: () => Notification[];
  markNotificationAsRead: (id: string) => void;
}

const PrescriptionContext = createContext<PrescriptionContextType | undefined>(undefined);

export const usePrescriptions = () => {
  const context = useContext(PrescriptionContext);
  if (context === undefined) {
    throw new Error('usePrescriptions must be used within a PrescriptionProvider');
  }
  return context;
};

// Mock data
const mockPharmacies: Pharmacy[] = [
  { id: '1', name: 'MediCare Pharmacy', address: '123 Health St', phone: '555-123-4567', distance: '0.8 miles', rating: 4.7 },
  { id: '2', name: 'Family Care Pharmacy', address: '456 Wellness Ave', phone: '555-987-6543', distance: '1.2 miles', rating: 4.5 },
  { id: '3', name: 'Community Health Pharmacy', address: '789 Medical Blvd', phone: '555-456-7890', distance: '2.3 miles', rating: 4.8 },
];

export const PrescriptionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const uploadPrescription = async (imageFile: File) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Create a new prescription with mock data
    const newPrescription: Prescription = {
      id: Date.now().toString(),
      userId: '1', // In a real app, this would be the current user's ID
      imageUrl: URL.createObjectURL(imageFile), // In a real app, this would be a URL to the uploaded image
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    setPrescriptions(prev => [newPrescription, ...prev]);
    
    // Add a notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: '1',
      message: 'Your prescription has been uploaded successfully.',
      read: false,
      createdAt: new Date().toISOString(),
      type: 'success',
      link: `/prescriptions/${newPrescription.id}`,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const selectPharmacy = (prescriptionId: string, pharmacyId: string) => {
    const selectedPharmacy = mockPharmacies.find(p => p.id === pharmacyId);
    
    if (!selectedPharmacy) return;
    
    setPrescriptions(prev => 
      prev.map(p => 
        p.id === prescriptionId 
          ? { 
              ...p, 
              pharmacyId, 
              pharmacy: selectedPharmacy, 
              status: 'processing',
              updatedAt: new Date().toISOString(),
              deliveryDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days from now
            } 
          : p
      )
    );
    
    // Add a notification
    const newNotification: Notification = {
      id: Date.now().toString(),
      userId: '1',
      message: `Your prescription is being processed by ${selectedPharmacy.name}.`,
      read: false,
      createdAt: new Date().toISOString(),
      type: 'info',
      link: `/prescriptions/${prescriptionId}`,
    };
    
    setNotifications(prev => [newNotification, ...prev]);
  };

  const getNotifications = () => {
    return notifications;
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true } 
          : notification
      )
    );
  };

  return (
    <PrescriptionContext.Provider value={{ 
      prescriptions, 
      pharmacies: mockPharmacies,
      notifications,
      uploadPrescription, 
      selectPharmacy,
      getNotifications,
      markNotificationAsRead,
    }}>
      {children}
    </PrescriptionContext.Provider>
  );
};