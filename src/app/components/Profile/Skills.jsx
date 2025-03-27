"use client";
import React, { useState } from 'react';

const Skills = ({ skills: initialSkills = [], onSkillsChange }) => {
  const [skills, setSkills] = useState(initialSkills);
  const [showModal, setShowModal] = useState(false);
  const [newSkill, setNewSkill] = useState('');
  const [skillSuggestions] = useState([
    'JavaScript', 'React', 'Node.js', 'Express', 'MongoDB', 'HTML5', 
    'CSS3', 'TypeScript', 'Angular', 'Vue.js', 'Python', 'Django', 
    'Flask', 'Java', 'Spring Boot', 'C#', '.NET', 'PHP', 'Laravel', 
    'SQL', 'Git', 'Docker', 'AWS', 'Azure', 'REST API', 'GraphQL'
  ]);

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      
      if (onSkillsChange) {
        onSkillsChange(updatedSkills);
      }
      
      setNewSkill('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    const updatedSkills = skills.filter(skill => skill !== skillToRemove);
    setSkills(updatedSkills);
    
    if (onSkillsChange) {
      onSkillsChange(updatedSkills);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    if (!skills.includes(suggestion)) {
      const updatedSkills = [...skills, suggestion];
      setSkills(updatedSkills);
      
      if (onSkillsChange) {
        onSkillsChange(updatedSkills);
      }
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setNewSkill('');
  };

  return (
    <div className="bg-white  rounded-lg shadow-sm mb-4">
         <div className=" ">
         <h2 className="text-xl font-semibold text-center bg-blue-500 text-black ">Key Skills</h2>
         </div>
    
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold"></h2>
        <button 
          className="text-blue-500 font-medium pr-4"
          onClick={openModal}
        >
         Add
        </button>
      </div>
      
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2  p-6">
          {skills.map((skill, index) => (
            <span 
              key={index} 
              className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
            >
              {skill}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No skills added yet</p>
          <button 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={openModal}
          >
            Add Skills
          </button>
        </div>
      )}

      {/* Skills Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Edit Skills</h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-4">
              <div className="flex">
                <input
                  type="text"
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a new skill"
                  className="flex-1 border border-gray-300 rounded-l px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleAddSkill}
                  className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-1">Press Enter to add a skill</p>
            </div>

            <div className="mb-4">
              <h4 className="font-medium mb-2">Your Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, index) => (
                    <div 
                      key={index} 
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{skill}</span>
                      <button 
                        onClick={() => handleRemoveSkill(skill)}
                        className="ml-1 text-blue-800 hover:text-red-500 focus:outline-none"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Popular Skills</h4>
              <div className="flex flex-wrap gap-2">
                {skillSuggestions.slice(0, 10).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSelectSuggestion(suggestion)}
                    className={`px-2 py-1 rounded-full text-sm ${
                      skills.includes(suggestion)
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                    disabled={skills.includes(suggestion)}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={closeModal}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Skills;