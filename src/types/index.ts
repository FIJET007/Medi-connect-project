export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
}

export interface Prescription {
  id: string;
  userId: string;
  imageUrl: string;
  status: 'pending' | 'processing' | 'ready' | 'delivered';
  createdAt: string;
  updatedAt: string;
  pharmacy?: Pharmacy;
  pharmacyId?: string;
  deliveryDate?: string;
  medications?: Medication[];
}

export interface Pharmacy {
  id: string;
  name: string;
  address: string;
  phone: string;
  distance?: string;
  rating?: number;
}

export interface Medication {
  id: string;
  name: string;
  dosage: string;
  instructions: string;
  refillable: boolean;
  remainingRefills?: number;
}

export interface Notification {
  id: string;
  userId: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
}