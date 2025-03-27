"use client";
import React, { useMemo, useState } from "react";
import { Edit2 } from "lucide-react";

const ProfileHeader = ({
  name,
  title,
  company,
  location,
  salary,
  experience,
  lastUpdated,
  noticePeriod,
  education = [],
  skills = [],
  projects = [],
  workExperience = [],
}) => {
  // State for handling image upload
  const [uploadedImage, setUploadedImage] = useState(null);

  // States for edit mode and field values
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingCompany, setIsEditingCompany] = useState(false);
  const [newName, setNewName] = useState(name || "Your Name");
  const [newTitle, setNewTitle] = useState(title || "Your Title");
  const [newCompany, setNewCompany] = useState(company || "Company Name");

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

  // Handle field updates
  const handleNameClick = () => setIsEditingName(true);
  const handleTitleClick = () => setIsEditingTitle(true);
  const handleCompanyClick = () => setIsEditingCompany(true);

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleTitleChange = (event) => setNewTitle(event.target.value);
  const handleCompanyChange = (event) => setNewCompany(event.target.value);

  const handleNameBlur = () => setIsEditingName(false);
  const handleTitleBlur = () => setIsEditingTitle(false);
  const handleCompanyBlur = () => setIsEditingCompany(false);

  // Calculate profile completion percentage
  const profileCompletionData = useMemo(() => {
    const sections = [
      { name: "Basic Info", weight: 15, isComplete: Boolean(newName && newTitle) },
      { name: "Profile Image", weight: 10, isComplete: Boolean(uploadedImage) },
      { name: "Current Company", weight: 10, isComplete: Boolean(newCompany) },
      { name: "Location", weight: 5, isComplete: Boolean(location) },
      { name: "Experience", weight: 10, isComplete: Boolean(experience) },
      { name: "Salary", weight: 5, isComplete: Boolean(salary) },
      { name: "Notice Period", weight: 5, isComplete: Boolean(noticePeriod) },
      { name: "Education", weight: 15, isComplete: education.length > 0 },
      { name: "Skills", weight: 10, isComplete: skills.length > 0 },
      { name: "Projects", weight: 5, isComplete: projects.length > 0 },
      { name: "Work Experience", weight: 10, isComplete: workExperience.length > 0 },
    ];

    const totalWeight = sections.reduce((sum, section) => sum + section.weight, 0);
    const completedWeight = sections
      .filter((section) => section.isComplete)
      .reduce((sum, section) => sum + section.weight, 0);

    const percentage = Math.round((completedWeight / totalWeight) * 100);
    const incompleteSections = sections
      .filter((section) => !section.isComplete)
      .map((section) => section.name);

    return {
      percentage,
      completedSections: sections.filter((section) => section.isComplete).length,
      totalSections: sections.length,
      incompleteSections,
    };
  }, [
    newName,
    newTitle,
    uploadedImage,
    newCompany,
    location,
    experience,
    salary,
    noticePeriod,
    education,
    skills,
    projects,
    workExperience,
  ]);

  // Determine color based on percentage
  const getCompletionColor = (percentage) => {
    if (percentage < 40) return "border-red-500 bg-red-500";
    if (percentage < 70) return "border-yellow-500 bg-yellow-500";
    return "border-green-500 bg-green-500";
  };

  const completionColor = getCompletionColor(profileCompletionData.percentage);
  const borderColor = completionColor.split(" ")[0];
  const bgColor = completionColor.split(" ")[1];

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
      <div className="flex-col md:flex-row items-center justify-center">
        <div className="relative mb-4 md:mb-0 md:mr-6 flex flex-col items-center text-center">
          <label htmlFor="image-upload" className="cursor-pointer">
            <div
              className={`rounded-full border-4 border-blue-500 p-1 flex justify-center items-center`}
            >
              <img
                src={uploadedImage || "/api/placeholder/120/120"}
                alt={newName}
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
            {/* Image upload input hidden */}
            <input
              type="file"
              id="image-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div className="flex-1 text-center">
          <div className="justify-between items-start">
            <div>
              <div className="items-center">
                {/* Name Editing */}
                <div className="flex items-center justify-center gap-2">
                  {isEditingName ? (
                    <input
                      type="text"
                      value={newName}
                      onChange={handleNameChange}
                      onBlur={handleNameBlur}
                      className="text-2xl font-bold border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <>
                      <h1
                        className="text-2xl font-bold cursor-pointer"
                        onClick={handleNameClick}
                      >
                        {newName}
                      </h1>
                      <Edit2 
                        className="text-gray-500 cursor-pointer" 
                        size={16} 
                        onClick={handleNameClick}
                      />
                    </>
                  )}
                </div>

                {/* Title Editing */}
                <div className="flex items-center justify-center gap-2">
                  {isEditingTitle ? (
                    <input
                      type="text"
                      value={newTitle}
                      onChange={handleTitleChange}
                      onBlur={handleTitleBlur}
                      className="text-lg text-gray-700 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <>
                      <h2
                        className="text-lg text-gray-700 cursor-pointer"
                        onClick={handleTitleClick}
                      >
                        {newTitle}
                      </h2>
                      <Edit2 
                        className="text-gray-500 cursor-pointer" 
                        size={16} 
                        onClick={handleTitleClick}
                      />
                    </>
                  )}
                </div>

                {/* Company Editing */}
                <div className="flex items-center justify-center gap-2">
                  {isEditingCompany ? (
                    <input
                      type="text"
                      value={newCompany}
                      onChange={handleCompanyChange}
                      onBlur={handleCompanyBlur}
                      className="text-gray-600 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                      autoFocus
                    />
                  ) : (
                    <>
                      {newCompany && (
                        <p className="text-gray-600 text-nowrap">
                          at {newCompany}
                        </p>
                      )}
                      {newCompany && (
                        <Edit2 
                          className="text-gray-500 cursor-pointer" 
                          size={16} 
                          onClick={handleCompanyClick}
                        />
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;