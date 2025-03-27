"use client";
import React, { useState } from 'react';

const Projects = ({ initialProjects = [] }) => {
  const [projects, setProjects] = useState(initialProjects);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    role: '',
    startDate: '',
    endDate: '',
    description: ''
  });

  const resetForm = () => {
    setFormData({
      title: '',
      role: '',
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
    const project = { ...projects[index] };
    if (project.duration && !project.startDate) {
      const dates = project.duration.split('-');
      if (dates.length === 2) {
        project.startDate = dates[0].trim();
        project.endDate = dates[1].trim();
      }
      delete project.duration;
    }
    setFormData(project);
    setEditIndex(index);
    setShowAddForm(true);
  };

  const handleDeleteClick = (index) => {
    const updatedProjects = [...projects];
    updatedProjects.splice(index, 1);
    setProjects(updatedProjects);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const formatDuration = (startDate, endDate) => {
    if (!startDate && !endDate) return '';
    if (startDate && endDate) return `${startDate} - ${endDate}`;
    if (startDate) return `${startDate} - Present`;
    return `Until ${endDate}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newProject = {
      ...formData,
      duration: formatDuration(formData.startDate, formData.endDate),
    };

    if (editIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editIndex] = newProject;
      setProjects(updatedProjects);
      setEditIndex(null);
    } else {
      setProjects([...projects, newProject]);
    }
    setShowAddForm(false);
    resetForm();
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditIndex(null);
    resetForm();
  };

  return (
    <div className="bg-white rounded-lg shadow-md mb-6 p-6">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Projects</h2>
        <button
          onClick={handleAddClick}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          {showAddForm ? 'Close Form' : 'Add Project'}
        </button>
      </div>

      {showAddForm && (
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded-lg bg-gray-50"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Project Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Role</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium">Start Date</label>
              <input
                type="month"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">End Date</label>
              <input
                type="month"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows="3"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              {editIndex !== null ? 'Save Changes' : 'Add Project'}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {projects.length > 0 ? (
        <div className="space-y-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="border-b pb-4 last:border-b-0 last:pb-0"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-600">{project.role}</p>
                  <p className="text-gray-500">{project.duration}</p>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleEditClick(index)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
              {project.description && (
                <p className="mt-2 text-gray-700">{project.description}</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          No project details added yet.
        </div>
      )}
    </div>
  );
};

export default Projects;
