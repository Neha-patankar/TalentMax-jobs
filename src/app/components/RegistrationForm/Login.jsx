"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from 'axios';

// Create API client with the correct base URL
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth service with login method
const authService = {
  login: async (userData) => {
    try {
      const { email, password, userType } = userData;
      
      // Use the correct endpoint for candidate login
      const endpoint = userType === 'candidate' 
        ? '/api/login'  // Correct endpoint for candidates
        : '/api/recruiters/login';
      
      console.log(`Attempting login with endpoint: ${endpoint}`);
      const response = await apiClient.post(endpoint, { email, password });
      return response.data;
    } catch (error) {
      console.error('Login error details:', error.response || error);
      throw error;
    }
  }
};

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("candidate");
  const [currentTileIndex, setCurrentTileIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState(""); // New state for success message

  // Tile content for scrolling display
  const tiles = [
    { image: "/landingpage/loginimg.png", title: "Find Your Dream Job" },
    { image: "/landingpage/loginimg2.png", title: "Connect with Recruiters" },
    { image: "/landingpage/Loginimag3.png", title: "Showcase Your Skills" },
    { image: "/landingpage/internshipportal.png", title: "Get Career Advice" },
    { image: "/landingpage/internshipportal.png", title: "Grow Your Network" },
  ];

  // Auto-scroll functionality for tiles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTileIndex((prevIndex) => (prevIndex + 1) % tiles.length);
    }, 3000); // Change tile every 3 seconds

    return () => clearInterval(interval);
  }, [tiles.length]);

  // Handle form submission with debugging
  const handleLogin = async (e) => {
    e.preventDefault();

    // Form validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }

    setLoading(true);
    setError("");
    setSuccessMessage(""); // Clear any previous success message

    // For testing/debugging purposes
    console.log(`Attempting to login as ${activeTab} with email: ${email}`);

    try {
      // Use the login method
      const response = await authService.login({
        email,
        password,
        userType: activeTab
      });

      console.log("Login response:", response);

      // Handle successful login
      if (response && response.token) {
        // Save token and user info to localStorage
        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", activeTab);
        
        if (response.userData) {
          localStorage.setItem("userData", JSON.stringify(response.userData));
        }

        // Set success message
        setSuccessMessage(`Welcome back! Login successful.`);
        
        // Redirect after a short delay to show the success message
        setTimeout(() => {
          const redirectPath = activeTab === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
          router.push(redirectPath);
        }, 1500);
      } else {
        setError("Login successful but no token received. Please contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      
      // Enhanced error handling with more details
      if (err.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error status:", err.response.status);
        console.log("Error data:", err.response.data);
        
        if (err.response.status === 404) {
          setError("Login endpoint not found. This could be a server configuration issue.");
        } else if (err.response.status === 401) {
          setError("Invalid email or password. Please try again.");
        } else if (err.response.status === 403) {
          setError("Your account is not authorized. Please contact support.");
        } else {
          setError(err.response.data?.message || `Server error (${err.response.status}). Please try again.`);
        }
      } else if (err.request) {
        // The request was made but no response was received
        console.log("No response received:", err.request);
        setError("No response from server. Please check your internet connection.");
      } else {
        // Something happened in setting up the request that triggered an Error
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <main className="max-w-5xl w-full mx-auto">
        {/* Login Modal */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full flex flex-col">
          <div className="relative">
            <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 z-10">
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="flex flex-col md:flex-row">
              {/* Sidebar with scrolling tiles */}
              <div
                className={`hidden md:flex md:flex-col md:w-1/2 ${
                  activeTab === "candidate" ? "bg-yellow-400" : "bg-blue-600"
                } transition-colors duration-300`}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="text-xl font-bold text-white mb-4">
                    <Image
                      src="/companylogo.png"
                      alt="Talent Max"
                      width={180}
                      height={60}
                      className="mr-2"
                    />
                  </div>

                  {/* Scrolling tiles */}
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
                            {tile.title}
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
                </div>
              </div>

              {/* Login form */}
              <div className="flex-1 p-6 md:p-8">
                <h1 className="text-2xl font-bold text-center mt-2 mb-6">
                  Log in
                </h1>

                {/* User type tabs */}
                <div className="flex rounded-full bg-gray-100 p-1 mb-6">
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                      activeTab === "candidate"
                        ? "bg-blue-900 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab("candidate")}
                  >
                    As Candidate
                  </button>
                  <button
                    className={`flex-1 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                      activeTab === "recruiter"
                        ? "bg-blue-900 text-white"
                        : "text-gray-700"
                    }`}
                    onClick={() => setActiveTab("recruiter")}
                  >
                    As Recruiter
                  </button>
                </div>

                {/* Success message display */}
                {successMessage && (
                  <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                    {successMessage}
                  </div>
                )}

                {/* Error message display */}
                {error && (
                  <div className="mb-4 p-3 bg-red-100 text-orange-700 rounded-md text-sm">
                    {error}
                  </div>
                )}

                {/* Email input */}
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 mb-3 border rounded-md"
                />

                {/* Password input */}
                <div className="relative mb-6">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 border rounded-md"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M10 12.5c-1.38 0-2.5-1.12-2.5-2.5S8.62 7.5 10 7.5s2.5 1.12 2.5 2.5S11.38 12.5 10 12.5z" />
                        <path
                          fillRule="evenodd"
                          d="M.458 10c1.732-4.147 5.388-7 9.542-7s7.81 2.853 9.542 7c-1.732 4.147-5.388 7-9.542 7S2.19 14.147.458 10zM10 14.5c-2.485 0-4.5-2.015-4.5-4.5S7.515 5.5 10 5.5s4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 3.172a4 4 0 011.585-1.586M16.828 16.828a4 4 0 01-1.585 1.586M7.5 10c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zM.458 10c1.732-4.147 5.388-7 9.542-7s7.81 2.853 9.542 7c-1.732 4.147-5.388 7-9.542 7S2.19 14.147.458 10z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                <button
                  onClick={handleLogin}
                  className={`w-full p-3 rounded-lg text-white ${
                    loading ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                {/* Forgot password */}
                <div className="text-sm mt-4 text-center">
                  <Link href="/forgot-password">
                    <p className="text-blue-500 hover:underline">Forgot password?</p>
                  </Link>
                </div>

                {/* Sign up option */}
                <div className="text-sm mt-2 text-center">
                  Don't have an account?{" "}
                  <Link href={activeTab === "candidate" ? "/candidate" : "/recruiter"}>
                    <span className="text-blue-500 hover:underline">Sign up</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Login;