"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "../../service/Api"; // Make sure this is correctly imported

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("candidate");
  const [currentTileIndex, setCurrentTileIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
                          d="M10 3C6.373 3 3.254 5.55 1.133 9.113a1 1 0 000 .774C3.254 14.45 6.373 17 10 17c3.627 0 6.746-2.55 8.867-6.113a1 1 0 000-.774C16.746 5.55 13.627 3 10 3zm0 2a7.977 7.977 0 015.878 2.5H4.122A7.977 7.977 0 0110 5zm-3.5 4.5a3.5 3.5 0 107 0 3.5 3.5 0 00-7 0zm3.5 5a7.977 7.977 0 01-5.878-2.5h11.756A7.977 7.977 0 0110 14.5zm3.5-4.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Login button */}
                <button
                  onClick={handleLogin}
                  className="w-full py-3 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-900"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Log In"}
                </button>

                <div className="flex items-center justify-between mt-6">
                  <Link href="/forgot-password" className="text-sm text-blue-900 hover:underline">
                    Forgot Password?
                  </Link>
                  <Link href="/createaccount" className="text-sm text-blue-900 hover:underline">
                    Create an Account
                  </Link>
                </div>

                {/* Social Login */}
                <div className="mt-6">
                  <button className="w-full py-3 mb-3 bg-orange-600 text-white rounded-md font-semibold hover:bg-orange-700">
                    Continue with Google
                  </button>
                  <button className="w-full py-3 bg-blue-900 text-white rounded-md font-semibold hover:bg-blue-900">
                    Continue with Facebook
                  </button>
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
