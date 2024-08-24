import React from 'react';
import { useRouter } from 'next/router';

const Settings: React.FC = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/auth/signUp');
  };

  return (
    <div className="w-screen h-screen p-8 bg-white">
      <h2 className="text-3xl font-bold text-center mb-6 text-black">Settings</h2>

      {/* Update Profile Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md">
        <h3 className="text-xl font-bold mb-4 text-black">Update Profile</h3>
        <div className="space-y-4">
          {/* Update Name */}
          <div className="p-4 bg-white rounded-lg shadow-inner flex justify-between items-center">
            <span className="text-lg text-black">Update Name</span>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Update</button>
          </div>
          {/* Update Email */}
          <div className="p-4 bg-white rounded-lg shadow-inner flex justify-between items-center">
            <span className="text-lg text-black">Update Email</span>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Update</button>
          </div>
          {/* Update Password */}
          <div className="p-4 bg-white rounded-lg shadow-inner flex justify-between items-center">
            <span className="text-lg text-black">Update Password</span>
            <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg">Update</button>
          </div>
        </div>
      </div>

      {/* Delete Profile Section */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
        <h3 className="text-xl font-bold text-black">Delete Profile</h3>
        <button onClick={handleRedirect} className="px-4 py-2 bg-red-600 text-white rounded-lg">Delete</button>
      </div>

      {/* Logout Section */}
      <div className="p-4 bg-gray-100 rounded-lg shadow-md flex justify-between items-center">
        <h3 className="text-xl font-bold text-black">Logout of Profile</h3>
        <button onClick={handleRedirect} className="px-4 py-2 bg-red-600 text-white rounded-lg">Logout</button>
      </div>
    </div>
  );
};

export default Settings;
