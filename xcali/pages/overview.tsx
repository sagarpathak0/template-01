import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Red', 'Blue', 'Yellow'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const Overview: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Pie Chart Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Overview</h2>
        <div className="w-64 h-64 mx-auto">
          <Pie data={data} />
        </div>
      </div>

      {/* User Information Section */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 mb-4"></div>
        <h3 className="text-lg font-semibold">John Doe</h3>
        <p className="text-gray-600">johndoe@example.com</p>
        <p className="text-gray-600">Location: New York, USA</p>
        <p className="text-gray-600">Member since: January 2022</p>
      </div>
    </div>
  );
};

export default Overview;
