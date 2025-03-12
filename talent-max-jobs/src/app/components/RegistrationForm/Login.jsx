"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Changed from next/router to next/navigation
import {authService} from "../../service/Api";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("candidate");
  const [currentTileIndex, setCurrentTileIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Tiles content for scrolling display
  const tiles = [
    { image: "/landingpage/loginimg.png", title: "Find Your Dream Job" },
    { image: "/landingpage/Loginimg2.png", title: "Connect with Recruiters" },
    { image: "/landingpage/Loginimg3.png", title: "Showcase Your Skills" },
    { image: "/landingpage/loginimg", title: "Get Career Advice" },
    { image: "/landingpage/internshipportal.png", title: "Grow Your Network" },
  ];

  // Auto-scroll functionality for tiles
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTileIndex((prevIndex) => (prevIndex + 1) % tiles.length);
    }, 3000); // Change tile every 3 seconds

    return () => clearInterval(interval);
  }, [tiles.length]);

  // Handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    
    setLoading(true);
    setError("");
    
    try {
      // Call the login API based on active tab (user type)
      const endpoint = activeTab === "candidate" ? "candidateLogin" : "recruiterLogin";
      const response = await authService[endpoint]({ email, password });
      
      // Handle successful login
      if (response && response.token) {
        // Save token to localStorage or cookies
        localStorage.setItem("token", response.token);
        localStorage.setItem("userType", activeTab);
        
        // Redirect to appropriate dashboard
        const redirectPath = activeTab === "candidate" ? "/candidate/dashboard" : "/recruiter/dashboard";
        router.push(redirectPath);
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || "An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6">
        {/* Login Modal */}
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white rounded-lg overflow-hidden max-w-5xl w-full max-h-[90vh] flex flex-col">
            <div className="relative">
              <button className="absolute right-4 top-4 text-gray-500 hover:text-gray-700">
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
              <div className="flex">
                {/* Dynamic colored sidebar with scrolling tiles */}
                <div
                  className={`hidden md:block ${
                    activeTab === "candidate" ? "bg-yellow-400" : "bg-blue-600"
                  } w-1/2 transition-colors duration-300`}
                >
                  <div className="p-6">
                    <div className="text-xl font-bold text-white mb-4">
                      <Image
                        src="/companylogo.png"
                        alt="Talent Max"
                        width={200}
                        height={200}
                        className="mr-2"
                      />
                    </div>

                    {/* Scrolling tiles container */}
                    <div className="relative h-80 overflow-hidden rounded-lg">
                      {/* Scrolling tiles */}
                      <div className="absolute inset-0">
                        {tiles.map((tile, index) => (
                          <div
                            key={index}
                            className={`absolute transition-all duration-500 w-full rounded-lg ${
                              index === currentTileIndex
                                ? "opacity-100 scale-100 z-0"
                                : "opacity-0 scale-95 -z-10"
                            }`}
                          >
                            <div className="p-4 bg-white bg-opacity-20 backdrop-blur-sm rounded-lg">
                              <h3 className="text-white font-bold text-lg mb-2">
                                {tile.title}
                              </h3>
                              <div className="h-40 relative">
                                <Image
                                  src={tile.image}
                                  alt={tile.title}
                                  layout="fill"
                                  objectFit="cover"
                                  className="rounded-md"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Indicator dots for tiles */}
                    <div className="flex justify-center mt-4 space-x-2">
                      {tiles.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentTileIndex(index)}
                          className={`w-2 h-2 rounded-full ${
                            currentTileIndex === index
                              ? "bg-white"
                              : "bg-white bg-opacity-50"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Login form */}
                <div className="flex-1 p-6">
                  <h1 className="text-2xl font-bold text-center mt-6 mb-6">
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

                  {/* Error message display */}
                  {error && (
                    <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
                      {error}
                    </div>
                  )}

                  {/* Social logins */}
                  <button className="mb-3 w-full border border-gray-300 rounded-md py-2.5 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="text-gray-700">Continue with Google</span>
                  </button>

                  <button className="mb-6 w-full border border-gray-300 rounded-md py-2.5 flex items-center justify-center space-x-2">
                    <svg className="w-5 h-5" fill="#0077B5" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.36-3.34c-1.52 0-2.39.82-2.78 1.67h-.04V10H9.5v8.5h2.82v-5.05c0-.28.02-.55.1-.74.21-.55.69-1.13 1.49-1.13 1.05 0 1.47.86 1.47 2.12v4.8h2.82M7 10H4.5v8.5H7V10m-1.25-4a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 1 0 0-2.5z"></path>
                    </svg>
                    <span className="text-gray-700">Continue with LinkedIn</span>
                  </button>

                  <form onSubmit={handleLogin}>
                    <div className="relative mb-4">
                      <input
                        type="email"
                        className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>

                    <div className="relative mb-4">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="border border-gray-300 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <button
                        type="button"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M13.875 18.825c-3.66 0-6.825-3.825-6.825-8.325 0-3.69 3.165-6.825 6.825-6.825 3.69 0 6.825 3.165 6.825 6.825s-3.135 8.325-6.825 8.325zm-.075 2.025c6.075 0 11.025-6.165 11.025-10.35C22.95 6.3 18 0 11.925 0S0 5.925 0 10.35c0 3.825 4.875 10.5 10.875 10.5z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M1 1l22 22M9 9.88A4.98 4.98 0 0 0 6 12C4.87 9.75 7.53 7 11.87 7c.3 0 .59.02.87.06"></path>
                            <path d="M22.52 12.46C20.75 15.47 17 19 12 19"></path>
                            <path d="M2.48 12.46C4.25 9.47 8 6 13 6"></path>
                          </svg>
                        )}
                      </button>
                    </div>

                    <div className="flex justify-end mb-4">
                      <Link href="/forgot-password" className="text-sm text-blue-900">
                        Forgot Password?
                      </Link>
                    </div>

                    <button
                      type="submit"
                      className={`w-full bg-blue-900 text-white py-2.5 rounded-md mb-6 hover:bg-blue-800 transition-colors duration-300 ${
                        loading ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                      disabled={loading}
                    >
                      {loading ? "Logging in..." : "Log in"}
                    </button>
                  </form>

                  <div className="text-center">
                    <p>
                      Don't have an account?{" "}
                      <Link href="/createaccount" className="text-blue-900">
                        Sign up
                      </Link>
                    </p>
                  </div>
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