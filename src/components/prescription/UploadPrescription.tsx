import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Camera, X, Image, FileText, Loader } from 'lucide-react';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { motion } from 'framer-motion';

const UploadPrescription: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploadPrescription } = usePrescriptions();
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    
    if (!file) return;
    
    // Check file type
    if (!file.type.includes('image/')) {
      setUploadError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }
    
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError('File size should be less than 5MB');
      return;
    }
    
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const clearSelectedFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }
    
    setIsUploading(true);
    setUploadError(null);
    
    try {
      await uploadPrescription(selectedFile);
      navigate('/prescriptions');
    } catch (error) {
      setUploadError('An error occurred while uploading. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8">
      <div className="container-custom px-4">
        <div className="mb-6 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Upload Prescription
          </h1>
          <p className="text-gray-600 mt-2">
            Take a photo or upload an image of your prescription
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="card p-6 animate-fade-in">
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Upload your prescription
                </h2>
                <p className="text-gray-600">
                  Please ensure the prescription is clearly visible and all details are readable
                </p>
              </div>
              
              {uploadError && (
                <div className="bg-error-light text-error p-3 rounded-lg mb-4 text-sm">
                  {uploadError}
                </div>
              )}
              
              {!selectedFile ? (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-8 flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center mb-4">
                    <Upload className="text-primary h-8 w-8" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">
                    Drag and drop your prescription
                  </h3>
                  <p className="text-gray-600 text-center mb-6 max-w-md">
                    Upload a clear image of your prescription. Supported formats: JPEG, PNG, GIF (Max 5MB)
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4">
                    <label className="btn-primary cursor-pointer">
                      <Image size={18} />
                      Select File
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                      />
                    </label>
                    
                    <button 
                      className="btn-outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Camera size={18} />
                      Take Photo
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border border-gray-200 rounded-lg overflow-hidden"
                >
                  <div className="relative">
                    <img 
                      src={previewUrl!} 
                      alt="Prescription preview" 
                      className="w-full object-contain max-h-[400px]"
                    />
                    <button 
                      onClick={clearSelectedFile}
                      className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                    >
                      <X size={18} className="text-gray-700" />
                    </button>
                  </div>
                  
                  <div className="p-4 bg-gray-50 border-t border-gray-200">
                    <div className="flex items-center">
                      <FileText size={18} className="text-gray-500 mr-2" />
                      <span className="text-gray-700 font-medium truncate">
                        {selectedFile.name}
                      </span>
                      <span className="ml-2 text-sm text-gray-500">
                        ({(selectedFile.size / 1024).toFixed(0)} KB)
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div className="mt-6 flex justify-end">
                <button
                  className="btn-primary w-full sm:w-auto"
                  onClick={handleSubmit}
                  disabled={!selectedFile || isUploading}
                >
                  {isUploading ? (
                    <Loader className="animate-spin h-5 w-5" />
                  ) : (
                    <>
                      <Upload size={18} />
                      Upload Prescription
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Guidelines
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Clear Image</h3>
                    <p className="text-gray-600 text-sm">
                      Ensure all text is clearly visible and not blurry
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Complete Information</h3>
                    <p className="text-gray-600 text-sm">
                      Include all details such as medication name, dosage, and doctor's signature
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Proper Lighting</h3>
                    <p className="text-gray-600 text-sm">
                      Take photos in good lighting to avoid shadows and glare
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary-light flex items-center justify-center flex-shrink-0">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">Include Date</h3>
                    <p className="text-gray-600 text-sm">
                      Ensure the prescription date is visible
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-primary-light rounded-lg">
                <p className="text-gray-800 text-sm">
                  <strong>Need help?</strong> If you have any difficulty uploading your prescription, please contact our support team at support@mediconnect.com or call (555) 123-4567.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPrescription;