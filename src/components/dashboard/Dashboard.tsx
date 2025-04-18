import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { usePrescriptions } from '../../context/PrescriptionContext';
import { PlusCircle, ClipboardList, Building2, Bell, Clock } from 'lucide-react';
import PrescriptionStatusCard from './PrescriptionStatusCard';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { prescriptions, notifications } = usePrescriptions();
  
  const unreadNotifications = notifications.filter(notification => !notification.read);
  const recentPrescriptions = prescriptions.slice(0, 3);

  // Get the time of day for greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="min-h-[80vh] bg-gray-50 py-8">
      <div className="container-custom px-4">
        <div className="mb-8 animate-fade-in">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {getGreeting()}, {user?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome to your medication management dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Link to="/prescriptions/upload" className="card hover:shadow-md transition-shadow p-5 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <PlusCircle className="text-primary h-7 w-7" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Upload Prescription</h3>
            <p className="text-gray-600 text-sm">Submit a new prescription for processing</p>
          </Link>

          <Link to="/prescriptions" className="card hover:shadow-md transition-shadow p-5 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-secondary-light flex items-center justify-center mb-3">
              <ClipboardList className="text-secondary h-7 w-7" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">My Prescriptions</h3>
            <p className="text-gray-600 text-sm">View and manage your prescriptions</p>
          </Link>

          <Link to="/pharmacies" className="card hover:shadow-md transition-shadow p-5 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-primary-light flex items-center justify-center mb-3">
              <Building2 className="text-primary h-7 w-7" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Pharmacies</h3>
            <p className="text-gray-600 text-sm">Explore nearby pharmacies</p>
          </Link>

          <Link to="/notifications" className="card hover:shadow-md transition-shadow p-5 flex flex-col items-center justify-center text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-secondary-light flex items-center justify-center mb-3">
              <Bell className="text-secondary h-7 w-7" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">
              Notifications
              {unreadNotifications.length > 0 && (
                <span className="ml-2 text-xs bg-error text-white px-2 py-0.5 rounded-full">
                  {unreadNotifications.length} new
                </span>
              )}
            </h3>
            <p className="text-gray-600 text-sm">Check updates and messages</p>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 animate-fade-in">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Recent Prescriptions</h2>
                <Link to="/prescriptions" className="text-primary text-sm font-medium">
                  View all
                </Link>
              </div>

              {recentPrescriptions.length > 0 ? (
                <div className="space-y-4">
                  {recentPrescriptions.map((prescription) => (
                    <PrescriptionStatusCard key={prescription.id} prescription={prescription} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Clock className="text-gray-400 h-12 w-12 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No prescriptions yet</h3>
                  <p className="text-gray-500 mt-1 max-w-xs">
                    Upload your first prescription to get started with medication delivery
                  </p>
                  <Link to="/prescriptions/upload" className="btn-primary mt-4">
                    Upload Prescription
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="animate-fade-in">
            <div className="card p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Notifications</h2>
                <Link to="/notifications" className="text-primary text-sm font-medium">
                  View all
                </Link>
              </div>

              {unreadNotifications.length > 0 ? (
                <div className="space-y-3">
                  {unreadNotifications.slice(0, 5).map((notification) => (
                    <Link
                      key={notification.id}
                      to={notification.link || '/notifications'}
                      className="block p-3 rounded-lg hover:bg-gray-50 border-l-4 border-primary"
                    >
                      <p className="text-gray-800 font-medium">{notification.message}</p>
                      <p className="text-gray-500 text-sm mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Bell className="text-gray-400 h-12 w-12 mb-3" />
                  <h3 className="text-lg font-medium text-gray-700">No new notifications</h3>
                  <p className="text-gray-500 mt-1">
                    We'll notify you of any updates here
                  </p>
                </div>
              )}
            </div>
            
            <div className="card p-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h2>
              <p className="text-gray-600 mb-4">
                Have questions or need assistance with your medication?
              </p>
              <Link to="/help" className="btn-outline w-full">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;