import React from 'react';
import { motion } from 'framer-motion';
import { FileUp, Building2, Package, Truck } from 'lucide-react';

const HowItWorks: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Upload Your Prescription',
      description: 'Take a photo or upload an image of your prescription using your smartphone or computer.',
      icon: <FileUp className="h-6 w-6 text-white" />,
      color: 'bg-primary',
      lightColor: 'bg-primary-light',
    },
    {
      id: 2,
      title: 'Select a Pharmacy',
      description: 'Choose from our network of trusted local pharmacies to fill your prescription.',
      icon: <Building2 className="h-6 w-6 text-white" />,
      color: 'bg-secondary',
      lightColor: 'bg-secondary-light',
    },
    {
      id: 3,
      title: 'Prescription Processing',
      description: 'The pharmacy prepares your medications according to your prescription.',
      icon: <Package className="h-6 w-6 text-white" />,
      color: 'bg-primary',
      lightColor: 'bg-primary-light',
    },
    {
      id: 4,
      title: 'Home Delivery',
      description: 'Your medications are delivered safely to your doorstep at your convenience.',
      icon: <Truck className="h-6 w-6 text-white" />,
      color: 'bg-secondary',
      lightColor: 'bg-secondary-light',
    },
  ];

  return (
    <div className="py-16 bg-white" id="how-it-works">
      <div className="container-custom px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How MediConnect Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A simple four-step process to get your medications delivered directly to your door.
          </p>
        </div>
        
        <div className="relative">
          {/* Line connector for desktop */}
          <div className="hidden md:block absolute top-24 left-1/2 w-[70%] h-0.5 bg-gray-200 -translate-x-1/2 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 ${step.lightColor} rounded-full flex items-center justify-center mb-6 relative`}>
                  <div className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center`}>
                    {step.icon}
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm">
                    <span className="text-sm font-bold text-gray-900">{step.id}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-primary-light p-8 rounded-xl inline-block max-w-3xl">
              <h3 className="text-2xl font-semibold mb-4 text-gray-900">
                Ready to simplify your medication management?
              </h3>
              <p className="text-gray-700 mb-6">
                Join thousands of patients who have made managing their prescriptions easier with MediConnect.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/signup" className="btn-primary">
                  Get Started
                </a>
                <a href="/contact" className="btn-outline">
                  Contact Us
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;