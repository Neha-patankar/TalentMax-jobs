import React from "react";
import {
  Facebook,
  Instagram,
  Mail,
  Linkedin,
  Phone,
  MapPin,
  ArrowRight
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-12 px-5">
      <div className="container mx-auto">
        {/* Main Footer Content - 5 Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Column 1: Company Info & Logo */}
          <div className="space-y-4">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/companylogo.png"
                alt="Talent Max"
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
            <p className="text-sm text-gray-600">
              Connecting the right talent with the right opportunities across India.
            </p>
            {/* Social Media */}
            <div className="flex space-x-3">
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: For Job Seekers */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Job Seekers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/search-jobs" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Search Jobs
                </Link>
              </li>
              <li>
                <Link href="/register" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Register Now
                </Link>
              </li>
              <li>
                <Link href="/login" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Login
                </Link>
              </li>
              <li>
                <Link href="/create-resume" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Create Resume
                </Link>
              </li>
              <li>
                <Link href="/tips" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Career Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: For Employers */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/post-job" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Post a Job
                </Link>
              </li>
              <li>
                <Link href="/search-resumes" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Search Resumes
                </Link>
              </li>
              <li>
                <Link href="/employer-register" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Register as Employer
                </Link>
              </li>
              <li>
                <Link href="/employer-login" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Employer Login
                </Link>
              </li>
              <li>
                <Link href="/recruitment-services" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Recruitment Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Company Links */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="text-gray-600 hover:text-blue-600 transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2" /> 
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Mobile App */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="text-sm text-gray-600 space-y-2">
              <h3 className="font-semibold text-gray-800 mb-2">Contact Us</h3>

              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-600" />
                <p>
                  18 –B Scheme No. 71 Main Road, Above Ratnaraj Medical, Near
                  Ranjeet Hanuman Temple, Indore, MP, India
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-blue-600" />
                <a
                  href="mailto:Ankita@Talentmax.in"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  Ankita@Talentmax.in
                </a>
              </div>

              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-blue-600" />
                <a
                  href="tel:+917692951590"
                  className="hover:text-blue-600 hover:underline transition-colors"
                >
                  +91 7692951590
                </a>
              </div>
            </div>

            {/* Mobile App */}
          
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-sm text-gray-500">
          <p>&copy; {currentYear} Talent Max. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;