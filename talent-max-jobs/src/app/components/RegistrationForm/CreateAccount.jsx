// pages/registration.js
"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState("candidate");

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Yellow background with mentorship info */}
        <div className="w-full md:w-5/12 bg-yellow-400 p-8 relative">
          {/* Company logo */}
          <div className="mb-6">
            <Image
              src="/companylogo.png"
              alt="Talent Max"
              width={200}
              height={200}
              className="mr-2"
            />
          </div>

          {/* Mentor profiles */}
          {/* <div className="mt-32 relative">
            <div className="bg-white rounded-lg p-4 shadow-md mb-4 w-4/5 ml-auto">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
                    <Image
                      src="/placeholder-mentor1.jpg"
                      alt="Vraj Shah"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-sm">Vraj Shah</p>
                  <p className="text-xs text-gray-600">Software Engineer</p>
                  <p className="text-xs flex items-center">
                    <Image
                      src="/google-logo.png"
                      alt="Google"
                      width={40}
                      height={12}
                    />
                  </p>
                </div>
              </div>
              <button className="mt-2 bg-gray-800 text-white text-xs rounded-full px-3 py-1">
                Book Now
              </button>
            </div>

            {/* Another Mentor 
            <div className="absolute left-8 top-24">
              <span className="bg-yellow-500 text-white text-xs rounded-full px-2 py-1">
                4.9/5
              </span>
            </div>

            <div className="bg-white rounded-lg p-4 shadow-md w-4/5 mr-auto">
              <div className="flex items-center">
                <div className="relative">
                  <div className="h-12 w-12 rounded-full bg-gray-300 overflow-hidden">
                    <Image
                      src="/placeholder-mentor2.jpg"
                      alt="Nitya Mohta"
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 h-5 w-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs">
                    ✓
                  </div>
                </div>
                <div className="ml-3">
                  <p className="font-semibold text-sm">Nitya Mohta</p>
                  <p className="text-xs text-gray-600">Program Manager II</p>
                  <p className="text-xs flex items-center">
                    <Image
                      src="/amazon-logo.png"
                      alt="Amazon"
                      width={40}
                      height={12}
                    />
                  </p>
                </div>
              </div>
              <button className="mt-2 bg-gray-800 text-white text-xs rounded-full px-3 py-1">
                Book Now
              </button>
            </div>
          </div> */}

          {/* <div className="absolute bottom-8 left-0 right-0 text-center">
            <h2 className="text-blue-900 text-2xl font-bold">Mentorship</h2>
            <p className="text-blue-900">from top mentors</p>
          </div> */}
        </div>

        {/* Right side - Registration form */}
        <div className="w-full md:w-7/12 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Create a new account
            </h1>
            <p className="text-gray-600 mb-8">
              Join Unstop and find your dream job or recruit talented candidates
            </p>

            {/* Role selection */}
            <div className="space-y-4 mb-8">
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedRole === "candidate"
                    ? "border-green-500 ring-1 ring-green-500"
                    : "border-gray-200 hover:border-blue-200"
                }`}
                onClick={() => setSelectedRole("candidate")}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Sign up as a Candidate
                    </h3>
                    <p className="text-gray-600">
                      Compete, learn, and apply for jobs and internships
                    </p>
                  </div>
                  {selectedRole === "candidate" && (
                    <div className="ml-auto bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedRole === "recruiter"
                    ? "border-green-500 ring-1 ring-green-500"
                    : "border-gray-200 hover:border-blue-200"
                }`}
                onClick={() => setSelectedRole("recruiter")}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">
                      Sign up as a Recruiter
                    </h3>
                    <p className="text-gray-600">
                      Host competitions, hire talent, and offer career
                      opportunities
                    </p>
                  </div>
                  {selectedRole === "recruiter" && (
                    <div className="ml-auto bg-green-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Next button */}
            <div className="flex justify-center">
              {selectedRole === "candidate" ? (
                <Link
                  href="/candidate"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2 font-semibold text-lg"
                >
                  Next
                </Link>
              ) : (
                <Link
                  href="/recruiter"
                  className="bg-green-500 hover:bg-green-600 text-white rounded-lg px-6 py-2 font-semibold text-lg"
                >
                  Next
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
