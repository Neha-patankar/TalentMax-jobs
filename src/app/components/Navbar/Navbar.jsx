"use client";
import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Dropdown = ({ title, links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(`.${title.toLowerCase()}-dropdown`)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, title]);

  return (
    <div className={`relative cursor-pointer ${title.toLowerCase()}-dropdown`}>
      <div 
        className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-500 transition-colors" 
        onClick={toggleDropdown}
      >
        <span>{title}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="absolute left-0 top-full mt-2 z-50 flex flex-col md:flex-row shadow-lg rounded-md overflow-hidden">
          <div className="w-64 bg-white p-4 border-b md:border-b-0 md:border-r border-gray-200">
            <h3 className="font-bold text-blue-600 mb-3">Quick Links</h3>
            <ul className="space-y-2">
              {links.left.map((link, index) => (
                <li key={index} className="cursor-pointer hover:text-blue-500 transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div className="w-64 bg-white p-4">
            <h3 className="font-bold text-blue-600 mb-3">Popular Options</h3>
            <ul className="space-y-2">
              {links.right.map((link, index) => (
                <li key={index} className="hover:text-blue-500 cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="px-4 md:px-6 py-3 bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image 
                src="/companylogo.png" 
                alt="Talent Max" 
                width={200} 
                height={200}
                className="mr-2"
              />
             
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-gray-600 focus:outline-none" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <nav className="flex items-center space-x-6">
              <Dropdown
                title="Jobs"
                links={{
                  left: ['Top Locations', 'Top Categories', 'Explore More Jobs', 'Placement Guarantee Courses'],
                  right: ['Work from home', 'Jobs in Delhi', 'Jobs in Mumbai', 'Jobs in Bangalore', 'Jobs in Hyderabad', 'Jobs in Kolkata', 'Jobs in Chennai', 'Jobs in Pune', 'View all jobs']
                }}
              />
              <Dropdown
                title="Companies"
                links={{
                  left: ['Top Employerss', 'Hiring Now', 'Explore Companies', 'Internships'],
                  right: ['MNCs', 'Startups', 'IT Companies', 'Manufacturing', 'Consulting', 'Government Jobs', 'View all companies']
                }}
              />
              <Dropdown
                title="Services"
                links={{
                  left: ['Corporate Meetups', 'Internship', 'Jobs'],
                  right: ['Recruitment', 'Training & Development', 'Consulting']
                }}
              />
            </nav>

            {/* Search Bar */}
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 w-64">
              <input
                type="text"
                placeholder="Search jobs here"
                className="flex-1 outline-none text-sm"
              />
              <button className="bg-blue-500 text-white rounded-full p-1" aria-label="Search">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Auth Buttons */}
            <div className="flex space-x-4">
              <Link href="/login">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-full transition-colors">Login</button>
              </Link>
             
              {/* <Link href="/candidate">
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 text-md text-nowrap rounded transition-colors">Candidate Registration</button>
              </Link>
              <Link href="/recruiter">
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 text-md text-nowrap rounded transition-colors">Recruiter Registration</button>
              </Link> */}
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <nav className="mt-4 space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <Dropdown
                  title="Jobs"
                  links={{
                    left: ['Top Locations', 'Top Categories', 'Explore More Jobs', 'Placement Guarantee Courses'],
                    right: ['Work from home', 'Jobs in Delhi', 'Jobs in Mumbai', 'Jobs in Bangalore', 'Jobs in Hyderabad', 'Jobs in Kolkata', 'Jobs in Chennai', 'Jobs in Pune', 'View all jobs']
                  }}
                />
              </div>
              <div className="border-b border-gray-200 pb-4">
                <Dropdown
                  title="Companies"
                  links={{
                    left: ['Top Employers', 'Hiring Now', 'Explore Companies', 'Internships'],
                    right: ['MNCs', 'Startups', 'IT Companies', 'Manufacturing', 'Consulting', 'Government Jobs', 'View all companies']
                  }}
                />
              </div>
              <div className="border-b border-gray-200 pb-4">
                <Dropdown
                  title="Services"
                  links={{
                    left: ['Corporate Meetups', 'Internship', 'Jobs'],
                    right: ['Recruitment', 'Training & Development', 'Consulting']
                  }}
                />
              </div>
            </nav>
            
            {/* Mobile Search */}
            <div className="mt-4">
              <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
                <input
                  type="text"
                  placeholder="Search jobs here"
                  className="flex-1 outline-none text-sm"
                />
                <button className="bg-blue-500 text-white rounded-full p-1" aria-label="Search">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Mobile Auth Buttons */}
            <div className="mt-4 space-y-2">
              <Link href="/login" className="block">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors">Login</button>
              </Link>
              {/* <Link href="/candidate">
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors">Candidate Registration</button>
              </Link>
              <Link href="/recruiter">
                <button className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded transition-colors">Recruiter Registration</button>
              </Link> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;