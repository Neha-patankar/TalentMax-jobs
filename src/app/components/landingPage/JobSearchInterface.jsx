"use client" ;
import React, { useState } from 'react';
import { Search, MapPin, Briefcase } from 'lucide-react';

export default function JobSearchInterface() {
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('');

  const experienceOptions = [
    'Experience', '0-1 years', '1-3 years', 
    '3-5 years', '5-10 years', '10+ years'
  ];

  const jobCategories = [
    'BROWSE JOBS', 'Location', 'Role', 
    'Fresher Jobs', 'Walk-in Jobs', 
    'Female Jobs', 'International', 'Gulf', 'Companies'
  ];

  const handleSearch = () => {
    // Implement search logic here
    console.log('Searching with:', { skills, location, experience });
  };

  return (
    <div className=" bg-gradient-to-b from-blue-950 to-blue-800 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
       
        <h1 className="text-4xl font-bold mb-2 text-white text-center">Find your dream job 
        <span className='text-orange-600'> @ Talent </span><span className='text-white'>Max</span></h1>
         <p className="text-2xl text-bold mb-8 text-orange-600 text-center">5 lakh+ jobs for you to explore</p>
        
        <div className="bg-white rounded-full flex items-center p-2 shadow-2xl">
          <div className="flex items-center flex-grow px-4">
            <Search className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Enter Skills, Designation, etc"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
          </div>
          
          <div className="flex items-center flex-grow px-4 border-x border-gray-200">
            <MapPin className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full outline-none text-gray-700"
            />
          </div>
          
          <div className="flex items-center flex-grow px-4">
            <Briefcase className="text-gray-400 mr-2" />
            <select 
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full outline-none text-gray-700"
            >
              {experienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            onClick={handleSearch}
            className="bg-blue-950 text-white px-6 py-3 rounded-full hover:bg-red-800 transition-colors"
          >
            Search
          </button>
        </div>
        
        <div className="flex justify-center mt-6 space-x-4 flex-wrap">
          {jobCategories.map((category, index) => (
            <button 
              key={index}
              className="bg-orange-700 text-white px-4 py-2 rounded-full text-sm hover:bg-orange-700 transition-colors m-1"
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}