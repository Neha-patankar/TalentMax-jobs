// pages/registration.js
"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const CreateAccount = () => {
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [currentTileIndex, setCurrentTileIndex] = useState(0);

  // List of mentor profiles or tiles
  const tiles = [
    { title: "Mentor 1", image: "/landingpage/Loginimag3.png" },
    { title: "Mentor 2", image: "/landingpage/loginimg.png" },
    { title: "Mentor 3", image: "/landingpage/loginimg2.png" },
    { title: "Mentor 4", image: "/landingpage/internshipportal.png" },
  ];

  // Automatically cycle through tiles every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTileIndex((prevIndex) =>
        prevIndex === tiles.length - 1 ? 0 : prevIndex + 1
      );
    }, 4000);
    return () => clearInterval(interval);
  }, [tiles.length]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
        {/* Left side - Yellow background with mentorship info */}
        <div className="w-full md:w-5/12 bg-gray-200 p-8 relative">
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

          {/* Scroll slider for mentor profiles */}
          <div className="relative flex-grow mb-6 rounded-lg overflow-hidden" style={{ height: "350px" }}>
            {tiles.map((tile, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ease-in-out w-full h-full ${
                  index === currentTileIndex
                    ? "opacity-100 translate-x-0"
                    : index < currentTileIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                }`}
                style={{ backfaceVisibility: "hidden" }}
              >
                <div className="p-4 h-full flex flex-col">
                  <h3 className="text-white font-bold text-xl mb-4">
                    {/* {tile.title} */}
                  </h3>
                  <div className="relative flex-grow w-full rounded-lg overflow-hidden">
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Indicator dots for tiles */}
          <div className="flex justify-center space-x-2 mt-auto">
            {tiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTileIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTileIndex === index
                    ? "bg-white scale-110"
                    : "bg-white bg-opacity-50"
                }`}
                aria-label={`View slide ${index + 1}`}
              />
            ))}
          </div>

          {/* <div className="absolute bottom-8 left-0 right-0 text-center">
            <h2 className="text-blue-900 text-2xl font-bold">Mentorship</h2>
            <p className="text-blue-900">from top mentors</p>
          </div> */}
        </div>

        {/* Right side - Registration form */}
        <div className="w-full md:w-7/12 p-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Join a Talent Max jobs...
            </h1>
            <p className="text-gray-600 mb-8">
              Join Unstop and find your dream job or recruit talented candidates
            </p>

            {/* Role selection */}
            <div className="space-y-4 mb-8">
              <div
                className={`border rounded-lg p-6 cursor-pointer transition-all ${
                  selectedRole === "candidate"
                    ? "border-blue-900 ring-4 ring-blue-900"
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
                    <h3 className="font-semibold text-lg">Candidate Sign up</h3>
                    <p className="text-gray-600">
                      Compete, learn, and apply for jobs and internships
                    </p>
                  </div>
                  {selectedRole === "candidate" && (
                    <div className="ml-auto bg-orange-500 text-white rounded-full h-6 w-6 flex items-center justify-center">
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
                    ? "border-orange-600 ring-4 ring-orange-600"
                    : "border-gray-200 hover:border-blue-200"
                }`}
                onClick={() => setSelectedRole("recruiter")}
              >
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-900 mr-4">
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
                    <h3 className="font-semibold text-lg">Recruiter Sign up</h3>
                    <p className="text-gray-600">
                      Host competitions, hire talent, and offer career
                      opportunities
                    </p>
                  </div>
                  {selectedRole === "recruiter" && (
                    <div className="ml-auto bg-orange-600 text-white rounded-full h-6 w-6 flex items-center justify-center">
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
                  className="bg-blue-900 hover:bg-blue-900 text-white rounded-lg px-6 py-2 font-semibold text-lg"
                >
                  Next
                </Link>
              ) : (
                <Link
                  href="/recruiter"
                  className="bg-blue-900 hover:bg-blue-900 text-white rounded-lg px-6 py-2 font-semibold text-lg"
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

export default CreateAccount
