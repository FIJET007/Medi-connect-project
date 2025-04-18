import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, FileUp, Clock, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <div className="bg-gradient-to-b from-primary-light to-white py-16 md:py-20">
      <div className="container-custom px-4">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center bg-white px-4 py-2 rounded-full shadow-sm mb-6">
                <Heart className="text-primary h-5 w-5 mr-2" />
                <span className="text-gray-700 font-medium">Simplifying Medication Management</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Easy Prescription Delivery to Your Doorstep
              </h1>
              
              <p className="text-lg text-gray-700 mb-8 max-w-lg">
                Upload your prescriptions, choose a pharmacy, and get medications delivered directly to your home. Designed for patients who need care at home.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup" className="btn-primary">
                  Get Started
                </Link>
                <Link to="/how-it-works" className="btn-outline">
                  How It Works
                </Link>
              </div>
            </motion.div>
          </div>
          
          <div className="md:w-1/2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.pexels.com/photos/7579831/pexels-photo-7579831.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Senior patient with medication" 
                  className="w-full h-auto object-cover"
                />
              </div>
              
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-success flex items-center justify-center">
                    <Package className="text-white h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Medication Delivered</p>
                    <p className="font-medium">2,500+ Prescriptions</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <FileUp className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Upload Prescription</h3>
            <p className="text-gray-600">
              Simply take a photo or upload an image of your prescription. It's quick and easy.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <Clock className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Quick Processing</h3>
            <p className="text-gray-600">
              Our network of pharmacies ensures your prescription is processed quickly and accurately.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="bg-white p-6 rounded-xl shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center mb-4">
              <Package className="text-primary h-6 w-6" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Home Delivery</h3>
            <p className="text-gray-600">
              Get your medications delivered safely to your doorstep, saving you time and effort.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;