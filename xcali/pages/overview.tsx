import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import Link from 'next/link';

// Register required elements
ChartJS.register(ArcElement, Tooltip, Legend);

const pieData = {
  labels: ['TypeScript', 'Next.js', 'React.js'],
  datasets: [
    {
      label: 'Tech Stack Distribution',
      data: [30, 30, 40],
      backgroundColor: ['#3178c6', '#0070f3', '#61dafb'],
      hoverBackgroundColor: ['#3178c6', '#0070f3', '#61dafb'],
    },
  ],
};

const Overview: React.FC = () => {
  return (
    <div className='flex min-h-screen bg-gray-50'>
      <div className="w-64 p-6 bg-indigo-600 text-white fixed h-full">
                <h2 className="text-2xl font-bold mb-6">User Overview</h2>
                <ul>
                    <li className="mb-4">
                        <Link href="/dashboard" className="text-lg hover:text-indigo-300">Dashboard</Link>
                    </li>
                    <li className="mb-4">
                        <Link href="setting" className="text-lg hover:text-indigo-300">Settings</Link>
                    </li>
                    <li className="mb-4">
                        <Link href="/faq" className="text-lg hover:text-indigo-300">Support</Link>
                    </li>
                </ul>
      </div>
      <div className="flex items-center justify-center mx-auto bg-gray-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center">Tech Stack Usage</h2>
          <div className="w-96 h-96 mx-auto">
            <Pie data={pieData} />
          </div>
          <p className="text-center mt-4">This chart shows the distribution of the tech stack used in projects.</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
