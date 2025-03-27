"use client";
import React, { useState } from 'react';

const Experience = ({ experiences: initialExperiences = [], onExperiencesChange }) => {
  const [experiences, setExperiences] = useState(initialExperiences);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentExperience, setCurrentExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    description: ''
  });
  const [currentIndex, setCurrentIndex] = useState(null);

  const openAddModal = () => {
    setIsEditing(false);
    setCurrentExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    });
    setShowModal(true);
  };

  const openEditModal = (exp, index) => {
    setIsEditing(true);
    setCurrentExperience({...exp});
    setCurrentIndex(index);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentExperience({
      ...currentExperience,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const formatDuration = (experience) => {
    let duration = '';
    if (experience.startDate) {
      duration += experience.startDate;
    }
    
    duration += ' - ';
    
    if (experience.currentlyWorking) {
      duration += 'Present';
    } else if (experience.endDate) {
      duration += experience.endDate;
    }
    
    return duration;
  };

  const handleSaveExperience = () => {
    // Validation
    if (!currentExperience.title || !currentExperience.company || !currentExperience.startDate) {
      alert('Please fill in all required fields: Job Title, Company, and Start Date');
      return;
    }

    let updatedExperiences;
    const formattedExperience = {
      ...currentExperience,
      duration: formatDuration(currentExperience)
    };

    if (isEditing) {
      // Update existing experience
      updatedExperiences = [...experiences];
      updatedExperiences[currentIndex] = formattedExperience;
    } else {
      // Add new experience
      updatedExperiences = [...experiences, formattedExperience];
    }

    setExperiences(updatedExperiences);
    if (onExperiencesChange) {
      onExperiencesChange(updatedExperiences);
    }
    
    closeModal();
  };

  const handleDeleteExperience = (index) => {
    if (window.confirm('Are you sure you want to delete this experience?')) {
      const updatedExperiences = experiences.filter((_, i) => i !== index);
      setExperiences(updatedExperiences);
      
      if (onExperiencesChange) {
        onExperiencesChange(updatedExperiences);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Employment</h2>
        <button 
          className="text-blue-500 font-medium"
          onClick={openAddModal}
        >
          Add
        </button>
      </div>
      
      {experiences.length > 0 ? (
        <div className="space-y-4">
          {experiences.map((exp, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{exp.title}</h3>
                  <p className="text-gray-600">{exp.company}</p>
                  {exp.location && <p className="text-gray-600 text-sm">{exp.location}</p>}
                  <p className="text-gray-500 text-sm">{exp.duration}</p>
                </div>
                <div className="flex space-x-2">
                  <button 
                    className="text-blue-500"
                    onClick={() => openEditModal(exp, index)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-500"
                    onClick={() => handleDeleteExperience(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-2 text-gray-700">{exp.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No experience added yet</p>
          <button 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={openAddModal}
          >
            Add Experience
          </button>
        </div>
      )}

      {/* Experience Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">
                {isEditing ? 'Edit Experience' : 'Add Experience'}
              </h3>
              <button 
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Job Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={currentExperience.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Software Developer"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Company <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="company"
                  value={currentExperience.company}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. ABC Technologies"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={currentExperience.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. New York, NY"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="month"
                    name="startDate"
                    value={currentExperience.startDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-1">
                    End Date
                  </label>
                  <input
                    type="month"
                    name="endDate"
                    value={currentExperience.endDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={currentExperience.currentlyWorking}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="currentlyWorking"
                  name="currentlyWorking"
                  checked={currentExperience.currentlyWorking}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="currentlyWorking" className="ml-2 block text-gray-700">
                  I currently work here
                </label>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={currentExperience.description}
                  onChange={handleInputChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe your responsibilities and achievements"
                ></textarea>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveExperience}
                  className="px-4 py-2 bg-blue-500 rounded text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {isEditing ? 'Update Experience' : 'Add Experience'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;