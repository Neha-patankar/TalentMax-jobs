
"use client"
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const RegistrationForm = ()  => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    mobile: '',
    workStatus: '',
    receiveUpdates: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center p-4 ">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Create your Talent Max Jobs profile</h1>
          <p className="text-gray-600 text-sm">Search & apply to jobs from India's No.1 Job Site</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="mb-4">
            <label htmlFor="fullName" className="block text-gray-800 font-medium mb-1">
              Full name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="What is your name?"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email ID */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-800 font-medium mb-1">
              Email ID<span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Tell us your Email ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <p className="text-xs text-gray-500 mt-1">We'll send relevant jobs and updates to this email</p>
          </div>

          {/* Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-800 font-medium mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="(Minimum 6 characters)"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
            <p className="text-xs text-gray-500 mt-1">This helps your account stay protected</p>
          </div>

          {/* Mobile Number */}
          <div className="mb-6">
            <label htmlFor="mobile" className="block text-gray-800 font-medium mb-1">
              Mobile number<span className="text-red-500">*</span>
            </label>
            <div className="flex">
              <div className="bg-gray-100 border border-gray-300 rounded-l-md px-3 py-2 text-gray-600 flex items-center">
                +91
              </div>
              <input
                type="tel"
                id="mobile"
                name="mobile"
                placeholder="Enter your mobile number"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.mobile}
                onChange={handleChange}
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Recruiters will contact you on this number</p>
          </div>

          {/* Work Status */}
          <div className="mb-6">
            <label className="block text-gray-800 font-medium mb-2">
              Work status<span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className={`border rounded-md p-3 cursor-pointer flex items-center justify-between ${formData.workStatus === 'experienced' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                <div>
                  <input
                    type="radio"
                    name="workStatus"
                    value="experienced"
                    className="hidden"
                    onChange={handleChange}
                    checked={formData.workStatus === 'experienced'}
                    required
                  />
                  <p className="font-medium text-gray-800">I'm experienced</p>
                  <p className="text-xs text-gray-600">I have work experience (excluding internships)</p>
                </div>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </label>
              
              <label className={`border rounded-md p-3 cursor-pointer flex items-center justify-between ${formData.workStatus === 'fresher' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}>
                <div>
                  <input
                    type="radio"
                    name="workStatus"
                    value="fresher"
                    className="hidden"
                    onChange={handleChange}
                    checked={formData.workStatus === 'fresher'}
                  />
                  <p className="font-medium text-gray-800">I'm a fresher</p>
                  <p className="text-xs text-gray-600">I am a student/ Haven't worked after graduation</p>
                </div>
                <div className="text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </label>
            </div>
          </div>

          {/* Updates Checkbox */}
          <div className="mb-6 flex items-start">
            <input
              type="checkbox"
              id="receiveUpdates"
              name="receiveUpdates"
              className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
              checked={formData.receiveUpdates}
              onChange={handleChange}
            />
            <label htmlFor="receiveUpdates" className="ml-2 block text-sm text-gray-700">
              Send me important updates & promotions via SMS, email, and 
              <span className="inline-flex items-center ml-1 text-green-600">
                <svg className="w-4 h-4 mr-1" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.498 14.382c-.301-.15-1.767-.867-2.04-.966-.273-.101-.473-.15-.673.15-.2.3-.767.966-.94 1.164-.173.199-.347.223-.647.075-.3-.15-1.267-.465-2.414-1.485-.896-.795-1.498-1.77-1.674-2.07-.173-.3-.018-.465.13-.614.136-.135.301-.345.452-.523.151-.172.2-.296.3-.495.099-.198.05-.372-.05-.521-.1-.148-.673-1.62-.92-2.219-.242-.584-.487-.51-.673-.51-.172-.008-.371-.01-.571-.01-.2 0-.523.074-.797.372-.274.3-1.045.999-1.045 2.447 0 1.447 1.047 2.844 1.196 3.043.148.199 2.09 3.198 5.062 4.48.706.308 1.259.491 1.69.629.712.227 1.36.194 1.871.118.57-.085 1.756-.721 1.999-1.421.248-.7.248-1.298.173-1.422-.074-.124-.272-.198-.572-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22.5c-5.799 0-10.5-4.701-10.5-10.5S6.201 1.5 12 1.5 22.5 6.201 22.5 12 17.799 22.5 12 22.5z"/>
                </svg>
                WhatsApp
              </span>
            </label>
          </div>

          {/* Terms and Register Button */}
          <div className="mb-4 text-xs text-gray-600">
            By clicking Register, you agree to the{' '}
            <Link href="#" className="text-blue-600 hover:underline">
              Terms and Conditions
            </Link>
            {' & '}
            <Link href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
            {' of Naukri.com'}
          </div>

          <button
            type="submit"
            className="w-auto px-6 py-2 bg-blue-100 text-blue-600 font-medium rounded-full hover:bg-blue-200 transition-colors"
          >
            Register now
          </button>

          {/* Or Divider */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500 text-sm">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Google Sign-in */}
          <button 
            type="button"
            className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-full shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </form>
      </div>
    </div>
  );
}
export default  RegistrationForm ;