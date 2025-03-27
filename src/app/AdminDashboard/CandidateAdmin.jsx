
"use client"
import React, { useState } from 'react';
import Head from 'next/head';

// Skill Tag Component
const SkillTag = ({ skill }) => (
  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
    {skill}
  </span>
);

// Skills List Component
const SkillsList = ({ skills }) => (
  <div className="flex flex-wrap gap-1">
    {skills.map((skill, index) => (
      <SkillTag key={index} skill={skill} />
    ))}
  </div>
);

// Projects List Component
const ProjectsList = ({ projects }) => (
  <ul className="list-disc list-inside">
    {projects.map((project, index) => (
      <li key={index} className="text-sm">{project}</li>
    ))}
  </ul>
);

// Resume Button Component
const ResumeButton = ({ resumePath }) => {
  const handleResumeDownload = () => {
    if (typeof window !== 'undefined') {
      window.open(resumePath, '_blank');
    }
  };

  return (
    <button 
      onClick={handleResumeDownload}
      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition-colors"
    >
      View Resume
    </button>
  );
};

// Candidate Row Component
const CandidateRow = ({ candidate }) => (
  <tr className="border-b hover:bg-gray-50">
    <td className="px-4 py-3">{candidate.name}</td>
    <td className="px-4 py-3">{candidate.mobile}</td>
    <td className="px-4 py-3">{candidate.email}</td>
    <td className="px-4 py-3">
      <SkillsList skills={candidate.skills} />
    </td>
    <td className="px-4 py-3">{candidate.education}</td>
    <td className="px-4 py-3">
      <ProjectsList projects={candidate.projects} />
    </td>
    <td className="px-4 py-3 text-center">
      <ResumeButton resumePath={candidate.resume} />
    </td>
  </tr>
);

// Main Candidate Admin Component
const CandidateAdmin = () => {
  // Sample candidate data
  const [candidates, setCandidates] = useState([
    {
      id: 1,
      name: 'John Doe',
      mobile: '+91 9876543210',
      email: 'john.doe@example.com',
      skills: ['React', 'Node.js', 'TypeScript', 'Docker'],
      education: 'B.Tech in Computer Science, XYZ University (2022)',
      projects: ['E-commerce Platform', 'Task Management App'],
      resume: '/path/to/john_resume.pdf'
    },
    {
      id: 2,
      name: 'Jane Smith',
      mobile: '+91 8765432109',
      email: 'jane.smith@example.com',
      skills: ['Python', 'Django', 'Machine Learning', 'SQL'],
      education: 'M.Tech in AI, ABC Institute (2023)',
      projects: ['Recommendation System', 'Fraud Detection Model'],
      resume: '/path/to/jane_resume.pdf'
    },
    {
        id: 3,
        name: 'John Doe',
        mobile: '+91 9876543210',
        email: 'john.doe@example.com',
        skills: ['React', 'Node.js', 'TypeScript', 'Docker'],
        education: 'B.Tech in Computer Science, XYZ University (2022)',
        projects: ['E-commerce Platform', 'Task Management App'],
        resume: '/path/to/john_resume.pdf'
      },
      {
        id: 4,
        name: 'Jane Smith',
        mobile: '+91 8765432109',
        email: 'jane.smith@example.com',
        skills: ['Python', 'Django', 'Machine Learning', 'SQL'],
        education: 'M.Tech in AI, ABC Institute (2023)',
        projects: ['Recommendation System', 'Fraud Detection Model'],
        resume: '/path/to/jane_resume.pdf'
      },{
        id: 5,
        name: 'John Doe',
        mobile: '+91 9876543210',
        email: 'john.doe@example.com',
        skills: ['React', 'Node.js', 'TypeScript', 'Docker'],
        education: 'B.Tech in Computer Science, XYZ University (2022)',
        projects: ['E-commerce Platform', 'Task Management App'],
        resume: '/path/to/john_resume.pdf'
      },
      {
        id: 6,
        name: 'Jane Smith',
        mobile: '+91 8765432109',
        email: 'jane.smith@example.com',
        skills: ['Python', 'Django', 'Machine Learning', 'SQL'],
        education: 'M.Tech in AI, ABC Institute (2023)',
        projects: ['Recommendation System', 'Fraud Detection Model'],
        resume: '/path/to/jane_resume.pdf'
      },
      {
        id: 7,
        name: 'John Doe',
        mobile: '+91 9876543210',
        email: 'john.doe@example.com',
        skills: ['React', 'Node.js', 'TypeScript', 'Docker'],
        education: 'B.Tech in Computer Science, XYZ University (2022)',
        projects: ['E-commerce Platform', 'Task Management App'],
        resume: '/path/to/john_resume.pdf'
      },
      {
        id: 8,
        name: 'Jane Smith',
        mobile: '+91 8765432109',
        email: 'jane.smith@example.com',
        skills: ['Python', 'Django', 'Machine Learning', 'SQL'],
        education: 'M.Tech in AI, ABC Institute (2023)',
        projects: ['Recommendation System', 'Fraud Detection Model'],
        resume: '/path/to/jane_resume.pdf'
      }
  ]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Head>
        <title>Candidate Admin Dashboard</title>
      </Head>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Mobile</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Skills</th>
              <th className="px-4 py-3 text-left">Education</th>
              <th className="px-4 py-3 text-left">Projects</th>
              <th className="px-4 py-3 text-center">Resume</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((candidate) => (
              <CandidateRow key={candidate.id} candidate={candidate} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CandidateAdmin;
