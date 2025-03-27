"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CompanySlider = () => {
  // Company logos (replace with actual logo imports or URLs)
  const companies = [
    { name: "HP", logo: "/companylogo/hp.png" },
    { name: "IBM", logo: "/companylogo/ibm.png" },
    { name: "Infosys", logo: "/companylogo/infosys.png" },
    { name: "Intel", logo: "/companylogo/intel.png" },
    { name: "Meta", logo: "/companylogo/meta.png" },
    { name: "Visa", logo: "/companylogo/visa.png" },
  ];

  const statistics = [
    { value: 300000, suffix: "K+", label: "companies hiring" },
    { value: 10000, suffix: "+", label: "new openings everyday" },
    { value: 21000000, suffix: "Mn+", label: "active students" },
    { value: 600000, suffix: "K+", label: "learners" },
  ];

  // Logo Slider State
  const [currentSlide, setCurrentSlide] = useState(0);

  // Animated Counter State
  const [counters, setCounters] = useState(statistics.map(() => 0));

  // Logo Slider Navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % companies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? companies.length - 1 : prev - 1
    );
  };

  // Auto Scroll Effect
  useEffect(() => {
    const interval = setInterval(nextSlide, 2000); // Slide every 2 seconds
    return () => clearInterval(interval);
  }, [currentSlide]);

  // Animated Counter Effect
  useEffect(() => {
    const animationDuration = 2000; // 2 seconds
    const updateInterval = 50; // Update every 50ms

    const counterAnimations = statistics.map((stat, index) => {
      const increment = stat.value / (animationDuration / updateInterval);

      const intervalId = setInterval(() => {
        setCounters((prevCounters) => {
          const newCounters = [...prevCounters];
          const newValue = newCounters[index] + increment;

          // Stop at target value
          if (newValue >= stat.value) {
            newCounters[index] = stat.value;
            clearInterval(intervalId);
          } else {
            newCounters[index] = newValue;
          }

          return newCounters;
        });
      }, updateInterval);

      return () => clearInterval(intervalId);
    });

    return () => counterAnimations.forEach((cleanup) => cleanup());
  }, []);

  // Format number with K or Mn suffix
  const formatNumber = (value, suffix) => {
    return `${Math.floor(value).toLocaleString()}${suffix}`;
  };

  return (
    <div className="w-full p-6 bg-white rounded-lg shadow-lg">
      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-blue-950">
          <span className="text-orange-600">Top companies</span> Trust us
        </h2>
      </div>

      {/* Company Logo Circular Slider */}
      <div className="relative flex items-center justify-center mb-12">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-blue-100 rounded-full p-2 hover:bg-blue-200 transition"
        >
          <ChevronLeft className="text-blue-950" />
        </button>

        <div className="flex space-x-8 overflow-hidden w-full justify-center">
          {companies.slice(currentSlide, currentSlide + 6).map((company, index) => (
            <div
              key={index}
              className={`transition-all duration-300 transform hover:scale-105 ${
                index === 2 ? "scale-110" : ""
              }`}
            >
              <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-16 w-16 object-contain opacity-70 hover:opacity-100 "
                  width="64" // Add width and height attributes to avoid errors
                  height="64"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-blue-100 rounded-full p-2 hover:bg-blue-200 transition"
        >
          <ChevronRight className="text-blue-800" />
        </button>
      </div>

      {/* Statistics */}
      <div className="flex justify-center space-x-10">
        {statistics.map((stat, index) => (
          <div
            key={index}
            className="text-center p-6 bg-blue-950 text-white rounded-lg shadow-lg w-60 hover:bg-blue-100 transition-colors duration-300"
          >
            <div className="text-3xl font-bold text-white">
              {formatNumber(counters[index], stat.suffix)}
            </div>
            <div className="text-sm text-gray-100">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanySlider;
