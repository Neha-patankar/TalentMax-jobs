"use client";
import React, { useState } from 'react';

const Education = ({ initialEducations = [] }) => {
  const [educations, setEducations] = useState(initialEducations);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      institution: '',
      degree: '',
      startDate: '',
      endDate: '',
      description: ''
    });
  };

  const handleAddClick = () => {
    resetForm();
    setShowAddForm(true);
    setEditIndex(null);
  };

  const handleEditClick = (index) => {
    const education = {...educations[index]};
    // Convert duration to start and end dates if it exists in old format
    if (education.duration && !education.startDate) {
      const dates = education.duration.split('-');
      if (dates.length === 2) {
        education.startDate = dates[0].trim();
        education.endDate = dates[1].trim();
      }
      delete education.duration;
    }
    setFormData(education);
    setEditIndex(index);
    setShowAddForm(false);
  };

  const handleDeleteClick = (index) => {
    const updatedEducations = [...educations];
    updatedEducations.splice(index, 1);
    setEducations(updatedEducations);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const formatDuration = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    if (startDate && endDate) return `${startDate} - ${endDate}`;
    if (startDate) return `${startDate} - Present`;
    return `Until ${endDate}`;
  };

  const handleSubmitAdd = (e) => {
    e.preventDefault();
    
    // Create a new education object
    const newEducation = {
      ...formData,
      duration: formatDuration(formData.startDate, formData.endDate)
    };
    
    setEducations([...educations, newEducation]);
    setShowAddForm(false);
    resetForm();
  };

  const handleSubmitEdit = (e) => {
    e.preventDefault();
    
    // Update the education object
    const updatedEducation = {
      ...formData,
      duration: formatDuration(formData.startDate, formData.endDate)
    };
    
    const updatedEducations = [...educations];
    updatedEducations[editIndex] = updatedEducation;
    setEducations(updatedEducations);
    setEditIndex(null);
    resetForm();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditIndex(null);
    resetForm();
  };

  const EducationForm = ({ isEditing = false }) => (
    <form onSubmit={isEditing ? handleSubmitEdit : handleSubmitAdd} className="border p-4 rounded-lg mb-4 bg-gray-50">
      <h3 className="text-lg font-medium mb-3">{isEditing ? 'Edit Education' : 'Add Education'}</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Institution</label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Degree</label>
          <input
            type="text"
            name="degree"
            value={formData.degree}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
            required
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <div className="relative">
              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <div className="relative">
              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-300 focus:border-blue-500 outline-none"
            rows="3"
          />
        </div>
      </div>
      
      <div className="mt-6 flex space-x-3">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
        >
          {isEditing ? 'Save Changes' : 'Add Education'}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-md transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );

  return (
    <div className="bg-white rounded-lg shadow-sm mb-4">
        <div className=" ">
         <h2 className="text-xl font-semibold text-center bg-blue-500 text-black ">Education</h2>
         </div>
      <div className='p-6 '> 
      <div className="flex justify-between items-center mb-4 ">
        <h2 className="text-xl font-semibold"></h2>
        <button 
          className="text-blue-500 font-medium hover:text-blue-700 transition-colors"
          onClick={handleAddClick}
        >
          Add
        </button>
      </div>
      
      {showAddForm && <EducationForm isEditing={false} />}
      {editIndex !== null && <EducationForm isEditing={true} />}
      
      {educations.length > 0 ? (
        <div className="space-y-4">
          {educations.map((edu, index) => (
            <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-lg">{edu.degree}</h3>
                  <p className="text-gray-600">{edu.institution}</p>
                  <p className="text-gray-500 text-sm">{edu.duration}</p>
                </div>
                <div className="flex space-x-3">
                  <button 
                    className="text-blue-500 hover:text-blue-700 transition-colors"
                    onClick={() => handleEditClick(index)}
                  >
                    Edit
                  </button>
                  <button 
                    className="text-red-500 hover:text-red-700 transition-colors"
                    onClick={() => handleDeleteClick(index)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {edu.description && <p className="mt-2 text-gray-700">{edu.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500 mb-3">No education added yet</p>
          <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
            onClick={handleAddClick}
          >
            Add Education
          </button>
        </div>
      )}
      </div>  
    </div>
  );
};

export default Education;