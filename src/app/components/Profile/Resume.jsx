"use client";
import React, { useState } from 'react';

const Resume = ({ resumeFile: initialResumeFile, onResumeUpload }) => {
  const [resumeFile, setResumeFile] = useState(initialResumeFile);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size exceeds 2MB limit");
      return;
    }
    
    // Check file format
    const validFormats = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/rtf'];
    if (!validFormats.includes(file.type)) {
      alert("Invalid file format. Please upload doc, docx, rtf, or pdf");
      return;
    }
    
    setUploading(true);
    
    try {
      // Simulate file upload - in a real app, you'd use a form submission or API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newResumeFile = {
        name: file.name,
        uploadDate: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        file: file
      };
      
      setResumeFile(newResumeFile);
      if (onResumeUpload) {
        onResumeUpload(newResumeFile);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this resume?")) {
      setResumeFile(null);
      if (onResumeUpload) {
        onResumeUpload(null);
      }
    }
  };

  // Hidden file input that will be triggered by our buttons
  const fileInputRef = React.createRef();

  return (
    <div className='bg-white rounded-lg shadow-sm '>
     <div className=" ">
      <h2 className="text-xl font-semibold text-center bg-blue-500 text-black ">Resume</h2>
      </div>
      <div className="p-6 rounded-lg shadow-sm mb-4">
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".doc,.docx,.rtf,.pdf"
        className="hidden"
      />
      
      {resumeFile ? (
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-medium">{resumeFile.name}</p>
              <p className="text-sm text-gray-500">Uploaded on {resumeFile.uploadDate}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => fileInputRef.current.click()} 
                className="text-blue-500"
                disabled={uploading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
              </button>
              <button 
                onClick={handleDelete} 
                className="text-red-500"
                disabled={uploading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="mt-4">
            <button 
              onClick={() => fileInputRef.current.click()} 
              className="w-full bg-blue-500 text-white py-2 rounded-md"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Update resume"}
            </button>
            <p className="text-center text-sm text-gray-500 mt-2">
              Supported Formats: doc, docx, rtf, pdf, upto 2 MB
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No resume uploaded yet</p>
          <button 
            onClick={() => fileInputRef.current.click()} 
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Upload Resume"}
          </button>
          <p className="text-sm text-gray-500 mt-2">
            Supported Formats: doc, docx, rtf, pdf, upto 2 MB
          </p>
        </div>
      )}
    </div>
    </div>
  );
};

export default Resume;