"use client";  // Ensure this is the first line without quotes or other characters

import React from 'react';
import { useRouter } from 'next/navigation';
import ProfileHeader from './ProfileHeader';
import Contact from './Contact';
import Skills from './Skills';
import Experience from './Experience';
import Education from './Education';
import Resume from './Resume';
import Projects from './Project';
import Link from 'next/link';

const Main = () => {
  const router = useRouter();

  // Navigation handler for quick links
  const handleQuickLinkNavigation = (route) => {
    router.push(route);
  };

  // Sample data that would normally come from an API
  const profileData = {
    name: "John Sharma",
    title: "MERN Stack Developer",
    company: "ABC Pvt. Ltd.",
    location: "Bhopal, INDIA",
    profileImage: "/api/placeholder/120/120",
    salary: "₹ 30,000",
    experience: "1 Year",
    lastUpdated: "22 Mar, 2025",
    noticePeriod: "15 Days or less notice period",
    phone: "79987005",
    email: "john122@gmail.com",
    skills: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "HTML5", "CSS3", "Git"],
    experiences: [
      {
        title: "MERN Stack Developer",
        company: "ABC Pvt. Ltd.",
        duration: "Apr 2024 - Present",
        description: "Working on full-stack web applications using the MERN stack."
      }
    ],
    educations: [
      {
        degree: "B.Tech in Computer Science",
        institution: "Example University",
        duration: "2020 - 2024"
      }
    ],
    resumeFile: {
      name: "nehaj.pdf",
      uploadDate: "Mar 21, 2025"
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        <ProfileHeader 
          name={profileData.name}
          title={profileData.title}
          company={profileData.company}
          location={profileData.location}
          profileImage={profileData.profileImage}
          salary={profileData.salary}
          experience={profileData.experience}
          lastUpdated={profileData.lastUpdated}
          noticePeriod={profileData.noticePeriod}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <h2 className="text-xl font-semibold mb-4">Quick links</h2>
              <ul className="space-y-3">
                <li className="flex justify-between items-center">
                  <Link href="#resume">
                    <span className="text-gray-700">Resume</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/resume-upload')}
                  >
                    Update
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#resume-headline">
                    <span className="text-gray-700">Resume headline</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/resume-headline')}
                  >
                    Edit
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#skills">
                    <span className="text-gray-700">Key skills</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/key-skills')}
                  >
                    Edit
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#employment">
                    <span className="text-gray-700">Employment</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/employment')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#education">
                    <span className="text-gray-700">Education</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/education')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#experience">
                    <span className="text-gray-700">Experience</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/experience')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#projects">
                    <span className="text-gray-700">Projects</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/projects')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#contact">
                    <span className="text-gray-700">Contact Details</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/contact-details')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#awards">
                    <span className="text-gray-700">Award/Certificates</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/awards')}
                  >
                    Add
                  </button>
                </li>
                <li className="flex justify-between items-center">
                  <Link href="#hobbies">
                    <span className="text-gray-700">Hobby</span>
                  </Link>
                  <button 
                    className="text-blue-500"
                    onClick={() => handleQuickLinkNavigation('/profile/hobbies')}
                  >
                    Add
                  </button>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div id="resume">
              <Resume resumeFile={profileData.resumeFile} />
            </div>
            <div id="skills">
              <Skills skills={profileData.skills} />
            </div>
            <div id="experience">
              <Experience experiences={profileData.experiences} />
            </div>
            <div id="education">
              <Education educations={profileData.educations} />
            </div>
            <div id="projects">
              <Projects />
            </div>
            <div id="contact">
              <Contact phone={profileData.phone} email={profileData.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
