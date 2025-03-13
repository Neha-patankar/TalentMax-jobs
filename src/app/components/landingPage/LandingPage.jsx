// pages/index.js
import Head from 'next/head';
import Image from 'next/image';
import JobSearchBar from './JobSearchBar';

const  LandingPage  = ()  => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <Head>
        <title>Talent Max - Unlock Your Career</title>
        <meta name="description" content="Explore opportunities from across the globe" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <JobSearchBar/>
      <main>
        {/* Hero Section */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-16 mt-8 gap-8">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold text-blue-800 mb-4">
              Unlock <span className="text-gray-700">Your Career</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Explore opportunities from across the globe to grow, showcase skills, gain
              CV points & get hired by your dream company.
            </p>
          </div>

          {/* User Badge */}
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2 mt-4 md:mt-0">
            <div className="bg-indigo-500 rounded-full h-10 w-10 flex items-center justify-center text-white mr-3">
              un
            </div>
            <div>
              <p className="text-gray-700">Aditya</p>
              <p className="text-sm font-medium">Just Went Talent Max Pro!</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-16">
          {/* Internships Card */}
          <div className="bg-green-400 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Internships</h2>
              <p className="text-gray-700">
                Gain<br />
                Practical<br />
                Experience
              </p>
            </div>
            <div className="relative h-32 w-32">
              <Image 
                src="/landingpage/internshipportal.png" 
                alt="Internships" 
                layout="fill" 
                className="rounded-xl object-cover"
              />
              <div className="absolute -top-4 -left-4 bg-yellow-300 rounded-full p-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Mentorships Card */}
          <div className="bg-orange-400 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Mentorships</h2>
              <p className="text-gray-700">
                Guidance<br />
                From Top Mentors
              </p>
              <div className="flex items-center mt-2">
                <span className="text-xs bg-white rounded-xl px-2 py-1">2000+ Mentors</span>
              </div>
            </div>
            <div className="relative h-32 w-32">
              <Image 
                src="/landingpage/internshipportal.png" 
                alt="Mentorships" 
                layout="fill" 
                className="rounded-xl object-cover"
              />
            </div>
          </div>

          {/* Jobs Card */}
          <div className="bg-blue-500 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-1">Jobs</h2>
              <p className="text-gray-700">
                Explore<br />
                Diverse Careers
              </p>
            </div>
            <div className="relative h-32 w-32">
              <Image 
                src="/landingpage/internshipportal.png" 
                alt="Jobs" 
                layout="fill" 
                className="rounded-xl object-cover"
              />
              <div className="absolute -top-2 -right-2">
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md">G</div>
              </div>
              <div className="absolute top-6 -right-4">
                <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md">A</div>
              </div>
            </div>
          </div>

        

         

        
        </div>

        {/* Who's Using Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">Who's using Talent Max?</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Students and Professionals */}
            <div className="border border-gray-200 rounded-2xl p-6 flex items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Students and Professionals</h3>
                <p className="text-gray-700 text-sm mb-1">Unlock Your Potential:</p>
                <p className="text-gray-700 text-sm">Compete, Build Resume, Grow and get Hired!</p>
              </div>
              <div className="relative h-28 w-28">
                <Image 
                  src="/landingpage/internshipportal.png" 
                  alt="Students and Professionals" 
                  layout="fill" 
                  className="rounded-xl object-cover"
                />
                <div className="absolute -top-2 -right-2 flex flex-col gap-1">
                  <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md text-blue-500">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Companies and Recruiters */}
            <div className="border border-gray-200 rounded-2xl p-6 flex items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Companies and Recruiters</h3>
                <p className="text-gray-700 text-sm mb-1">Discover Right Talent:</p>
                <p className="text-gray-700 text-sm">Hire, Engage, and Brand Like Never Before!</p>
              </div>
              <div className="relative h-28 w-28">
                <Image 
                  src="/landingpage/internshipportal.png" 
                  alt="Companies and Recruiters" 
                  layout="fill" 
                  className="rounded-xl object-cover"
                />
                <div className="absolute -top-2 -right-2">
                  <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md">G</div>
                </div>
                <div className="absolute top-6 -right-4">
                  <div className="bg-white rounded-full h-8 w-8 flex items-center justify-center shadow-md">A</div>
                </div>
              </div>
            </div>

            {/* Colleges */}
            <div className="border border-gray-200 rounded-2xl p-6 flex items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">Colleges</h3>
                <p className="text-gray-700 text-sm mb-1">Bridge Academia and Industry:</p>
                <p className="text-gray-700 text-sm">Empower Students with Real-World Opportunities!</p>
              </div>
              <div className="relative h-28 w-28">
                <Image 
                  src="/landingpage/internshipportal.png" 
                  alt="Colleges" 
                  layout="fill" 
                  className="rounded-xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
export default LandingPage;