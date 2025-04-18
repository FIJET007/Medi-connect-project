import React from 'react';
import { Shield, Clock, FileCheck, Mail, Pill, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturesSection: React.FC = () => {
  return (
    <div className="py-16 bg-white">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Features Designed for Your Convenience
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            MediConnect makes medication management simple and stress-free for patients receiving home care.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <FileCheck className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Prescription Upload</h3>
            <p className="text-gray-600">
              Quickly upload your prescription using your smartphone camera or from your files.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mb-4">
              <Shield className="text-secondary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Secure and Private</h3>
            <p className="text-gray-600">
              Your health information is protected with industry-standard security and privacy measures.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <Clock className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-gray-600">
              Monitor the status of your prescription from processing to delivery in real-time.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mb-4">
              <Mail className="text-secondary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Delivery Notifications</h3>
            <p className="text-gray-600">
              Receive updates about your prescription status and delivery through email or SMS.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <Pill className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Medication History</h3>
            <p className="text-gray-600">
              Keep track of all your medications and prescription history in one convenient place.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="p-6 rounded-xl bg-gray-50 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 rounded-full bg-secondary-light flex items-center justify-center mb-4">
              <MessageSquare className="text-secondary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Pharmacy Communication</h3>
            <p className="text-gray-600">
              Easily communicate with pharmacists to ask questions about your medications.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;