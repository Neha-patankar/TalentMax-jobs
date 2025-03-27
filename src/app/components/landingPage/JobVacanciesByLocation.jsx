import React from 'react';
import Head from 'next/head';

const JobVacanciesByLocation = () => {
  const locations = [
    'Bangalore', 'Mumbai', 'Kolkata', 'Chennai', 'Delhi', 'Hyderabad', 'Pune', 'Ahmedabad', 'Gurgaon',
    'Noida', 'Coimbatore', 'Indore', 'Lucknow', 'Jaipur', 'Bhubaneswar', 'Surat', 'Navi Mumbai', 'Chandigarh',
    'Thane', 'Nashik', 'Patna', 'Mohali', 'Vadodara', 'Ranchi', 'Nagpur', 'Faridabad', 'Greater Noida',
    'Ludhiana', 'Ghaziabad', 'Guwahati', 'Bhopal', 'Kanpur', 'Rajkot', 'Dehradun', 'Madurai', 'Kochi'
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Find Job Vacancies by Location</title>
        <meta name="description" content="Find job vacancies in various cities across India" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Find Job Vacancies by Location
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {locations.map((location, index) => (
            <button 
              key={index}
              className="bg-white shadow-md rounded-lg px-4 py-2 text-sm text-gray-700 
                         hover:bg-blue-50 hover:text-blue-600 transition-colors 
                         focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {location}
            </button>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-full 
                       hover:bg-blue-600 transition-colors 
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            View All City &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobVacanciesByLocation;