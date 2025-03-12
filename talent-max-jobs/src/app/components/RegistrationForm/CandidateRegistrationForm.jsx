"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Updated API function to use the correct endpoint
const registerCandidate = async (formData) => {
  const response = await fetch("http://localhost:5000/api/register", {
    method: "POST",
    body: formData,
  });
  
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || "Registration failed");
  }
  
  const responseData = await response.json();
  console.log("API Response:", responseData); // Log the API response
  return responseData;
};

const CandidateRegistrationForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    password: "",
    confirmPassword: "",
    resumeUpload: null,
  });

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setFormData((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
  
  // Handle gender selection with better accessibility
  const handleGenderSelect = (gender) => {
    setFormData((prevState) => ({
      ...prevState,
      gender,
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    
    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return false;
    }
    
    if (!formData.gender) {
      setError("Please select your gender");
      return false;
    }
    
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    
    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    // Phone validation - assuming Indian 10-digit format
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phone)) {
      setError("Please enter a valid 10-digit phone number");
      return false;
    }

    setError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    setLoading(true);
    setError("");
  
    try {
      // Create FormData object for file upload
      const submitData = new FormData();
  
      // Add all form fields to FormData
      Object.keys(formData).forEach((key) => {
        if (key === "resumeUpload" && formData[key]) {
          submitData.append("resume", formData[key]);
        } else if (key !== "confirmPassword") {
          // Don't send confirmPassword to API
          submitData.append(key, formData[key]);
        }
      });
  
      // Log the form data before sending it to the API
      console.log("Form Data:", formData);
      console.log("Submit Data:", submitData);
  
      const response = await registerCandidate(submitData);
  
      console.log("Registration successful:", response);
  
      // Redirect to login or confirmation page
      alert("Registration successful! Please log in to continue.");
      router.push("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      setError(err.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden">
        {/* Left side - Branding/Image */}
        <div className="w-full md:w-2/5 bg-gray-100 p-12 flex flex-col relative">
          <div className="mb-8">
            <div className="text-white text-3xl font-bold">
              <Image
                src="/companylogo.png"
                alt="Company Logo"
                width={500}
                height={500}
                
              />
            </div>
          </div>

          {/* <div className="bg-blue-700 rounded-lg">
            <div className="bg-white/10 rounded-lg p-6">
              <div className="text-white text-2xl font-bold mb-2">
                Assessments
              </div>
              <div className="text-white/80 text-sm">
                with advance proctoring features
              </div>

              <div className="mt-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7a1 1 0 112 0v3a1 1 0 11-2 0v-3zm0-4a1 1 0 112 0 1 1 0 01-2 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm">Face Proctoring</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm">Geo Tracking</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded-full">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-white"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path
                        fillRule="evenodd"
                        d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-white text-sm">Detect Object</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>

        {/* Right side - Form */}
        <div className="w-full md:w-3/5 bg-white p-8">
          <div className="flex items-center mb-6">
            <button 
              type="button"
              className="text-gray-600 mr-3"
              aria-label="Go back"
              onClick={() => router.back()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Sign up as Candidate
            </h1>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md" role="alert">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  aria-required="true"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder="Enter your Email"
                value={formData.email}
                onChange={handleChange}
                aria-required="true"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 py-2 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                  +91{" "}
                  <svg
                    className="h-5 w-5 ml-1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  required
                  placeholder="10-digit number"
                  value={formData.phone}
                  onChange={handleChange}
                  aria-required="true"
                  className="flex-1 block w-full rounded-none rounded-r-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500">Enter 10-digit number without country code</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Gender <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className={`border rounded-full px-6 py-2 flex items-center gap-2 ${
                    formData.gender === "male"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleGenderSelect("male")}
                  aria-pressed={formData.gender === "male"}
                >
                  <span className="text-lg" aria-hidden="true">♂</span>
                  <span>Male</span>
                </button>

                <button
                  type="button"
                  className={`border rounded-full px-6 py-2 flex items-center gap-2 ${
                    formData.gender === "female"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleGenderSelect("female")}
                  aria-pressed={formData.gender === "female"}
                >
                  <span className="text-lg" aria-hidden="true">♀</span>
                  <span>Female</span>
                </button>

                <button
                  type="button"
                  className={`border rounded-full px-6 py-2 flex items-center gap-2 ${
                    formData.gender === "other"
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:bg-gray-50"
                  }`}
                  onClick={() => handleGenderSelect("other")}
                  aria-pressed={formData.gender === "other"}
                >
                  <span className="text-lg" aria-hidden="true">?</span>
                  <span>More Options</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  value={formData.password}
                  onChange={handleChange}
                  aria-required="true"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  aria-required="true"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="resumeUpload"
                className="block text-sm font-medium text-gray-700"
              >
                Resume Upload
              </label>
              <input
                id="resumeUpload"
                name="resumeUpload"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">
                Accepted formats: PDF, DOC, DOCX
              </p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <a href="/login" className="text-blue-600 font-medium">
                  Login
                </a>
              </p>
              <button
                type="submit"
                disabled={loading}
                className={`px-6 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegistrationForm;