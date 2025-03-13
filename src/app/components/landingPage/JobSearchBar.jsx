
"use client"
import React, { useState } from 'react';

const JobSearchBar = () => {
  const [skills, setSkills] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('Select experience');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Searching for: Skills: ${skills}, Location: ${location}, Experience: ${experience}`);
  };
  
  const experienceOptions = [
    'Fresher', 
    '1-3 years', 
    '3-5 years', 
    '5-10 years', 
    '10+ years'
  ];
  
  return (
    <div className="w-full max-w-4xl mx-auto p-6 text-center">
      <h1 className="text-4xl font-bold mb-2 text-gray-900">Find your dream job 
        <span className='text-orange-600'> @ Talent </span><span className='text-blue-950'>Max</span></h1>
      <p className="text-lg mb-8 text-gray-700">5 lakh+ jobs for you to explore</p>
      
      <div className="bg-white rounded-full shadow-lg p-2">
        <form onSubmit={handleSubmit} className="flex flex-wrap md:flex-nowrap items-center">
          <div className="flex items-center w-full md:w-auto border-r border-gray-200 px-3 py-2">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <input
              type="text"
              placeholder="Enter skills / designations / companies"
              className="ml-2 w-full outline-none text-gray-600"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
          
          <div className="relative w-full md:w-auto border-r border-gray-200 px-3 py-2">
            <button 
              type="button" 
              className="flex items-center justify-between w-full text-left text-gray-600"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {experience}
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-full bg-white border border-gray-200 rounded shadow-lg z-10">
                {experienceOptions.map((option) => (
                  <div 
                    key={option} 
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => {
                      setExperience(option);
                      setIsDropdownOpen(false);
                    }}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="w-full md:w-auto px-3 py-2">
            <input
              type="text"
              placeholder="Enter location"
              className="w-full outline-none text-gray-600"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          
          <button 
            type="submit"
            className="w-full md:w-auto bg-blue-900 hover:bg-blue-300 text-white font-medium py-2 px-6 rounded-full ml-2"
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default JobSearchBar;