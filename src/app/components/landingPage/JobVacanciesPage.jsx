import React from 'react';
import Head from 'next/head';

const jobRoles = [
  'UI Designer', 'Laravel Developer', 'Telecalling Executive', 'Mechanical Engineer', 
  'Business Development Executive', 'Telemarketing', 'SEO Executive', 'General Dentist', 
  'Back Office Executive', 'BPO Executive', 'iOS Developer', 'Python Developer', 
  'Receptionist', 'Android Developer', 'Electronics Engineer', 'Electrical Engineer', 
  'Accounts Executive', 'Hardware Engineer', 'Physiotherapist', 'HR Executive', 
  'PHP Developer', 'Graphic Designer', 'Medical Representative', 'Area Sales Manager', 
  'Computer Operator', 'Sales Executive', 'Java Developer', 'General Physician', 
  'Sales Representative', 'Customer Care Executive'
];

  const JobVacanciesPage = ()  =>{
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Find Vacancies by Job Role</title>
        <meta name="description" content="Find job vacancies by selecting your desired role" />
      </Head>
      
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Find Vacancies by Job Role
        </h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {jobRoles.map((role, index) => (
            <button 
              key={index}
              className="bg-white shadow-md rounded-lg px-4 py-2 text-sm text-gray-700 
                         hover:bg-blue-50 hover:text-blue-600 transition-colors 
                         focus:outline-none focus:ring-2 focus:ring-blue-300"
            >
              {role}
            </button>
          ))}
        </div>
        
        <div className="text-center mt-6">
          <button 
            className="bg-blue-500 text-white px-6 py-2 rounded-full 
                       hover:bg-blue-600 transition-colors 
                       focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            More Jobs Role &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

 export default JobVacanciesPage;