"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RecruiterDashboard = () => {
    const [recruiters, setRecruiters] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [selectedResume, setSelectedResume] = useState(null);
    const [showResumeModal, setShowResumeModal] = useState(false);

    // Fetch data from the backend
    useEffect(() => {
        fetchRecruiters();
    }, []);

    const fetchRecruiters = () => {
        axios.get('http://localhost:8080/api/recruiters/recruiters')
            .then(response => {
                const processedData = response.data.map((recruiter, index) => {
                    let userCode;
                    
                    // Generate user codes based on userType
                    if (recruiter.userType === 'Candidate') {
                        userCode = `CAND${index + 1}`;
                    } else if (recruiter.userType === 'Recruiter') {
                        userCode = `RCT${index + 1}`;
                    } else if (recruiter.userType === 'Admin') {
                        userCode = `ADM${index + 1}`;
                    } else if (recruiter.userType === 'Super Admin') {
                        userCode = `SADM${index + 1}`;
                    } else {
                        userCode = `USER${index + 1}`; // Default user code if none match
                    }
    
                    return {
                        ...recruiter,
                        userCode: userCode, // Assign generated userCode
                        userType: recruiter.userType || 'Recruiter',
                        userStatus: recruiter.userStatus || 'Active',
                        _original: { // Store original values to detect changes
                            userType: recruiter.userType || 'Recruiter',
                            userStatus: recruiter.userStatus || 'Active'
                        }
                    };
                });
                setRecruiters(processedData);
            })
            .catch(error => {
                console.error("There was an error fetching the recruiters data!", error);
            });
    };
    

    // Sorting function
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedRecruiters = [...recruiters].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setRecruiters(sortedRecruiters);
    };

    // Handle user type change
    const handleUserTypeChange = (id, newType) => {
        setRecruiters(prevRecruiters =>
            prevRecruiters.map(recruiter =>
                recruiter._id === id ? { ...recruiter, userType: newType } : recruiter
            )
        );
    };

    // Handle user status change
    const handleUserStatusChange = (id, newStatus) => {
        setRecruiters(prevRecruiters =>
            prevRecruiters.map(recruiter =>
                recruiter._id === id ? { ...recruiter, userStatus: newStatus } : recruiter
            )
        );
    };

    // Handle view resume
    const handleViewResume = (resumePath) => {
        setSelectedResume(resumePath);
        setShowResumeModal(true);
    };

    // Close resume modal
    const closeResumeModal = () => {
        setShowResumeModal(false);
        setSelectedResume(null);
    };

    // Handle update button click
    const handleUpdate = (recruiter) => {
        // Check if any changes were made
        const hasChanges = 
            recruiter.userType !== recruiter._original.userType || 
            recruiter.userStatus !== recruiter._original.userStatus;
        
        if (hasChanges) {
            // Update user in the database
            axios.put(`http://localhost:8080/api/recruiters/${recruiter._id}`, {
                userType: recruiter.userType,
                userStatus: recruiter.userStatus
            })
            .then(response => {
                // Update local state with the changes
                setRecruiters(prevRecruiters =>
                    prevRecruiters.map(r =>
                        r._id === recruiter._id ? {
                            ...r,
                            _original: {
                                userType: r.userType,
                                userStatus: r.userStatus
                            }
                        } : r
                    )
                );
                alert(`Recruiter ${recruiter.firstName} ${recruiter.lastName} updated successfully!`);
            })
            .catch(error => {
                console.error("Error updating recruiter:", error);
                alert("Failed to update recruiter. Please try again.");
            });
        } else {
            alert("No changes to update.");
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-8xl">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-6">Recruiter  Dashboard</h1>

            {/* Resume Modal */}
            {showResumeModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl w-4/5 h-4/5 max-w-4xl">
                        <div className="flex justify-between items-center p-4 border-b">
                            <h2 className="text-xl font-semibold">Resume Viewer</h2>
                            <button 
                                onClick={closeResumeModal}
                                className="text-gray-600 hover:text-gray-900"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        <div className="p-4 h-full">
                            <iframe 
                                src={selectedResume} 
                                className="w-full h-5/6" 
                                title="Resume Viewer"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="min-w-full bg-white">
                    <thead className="bg-gray-100">
                        <tr>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('userCode')}
                            >
                                User Code
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('firstName')}
                            >
                                First Name
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('lastName')}
                            >
                                Last Name
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('email')}
                            >
                                Email
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('phone')}
                            >
                                Phone
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('companyName')}
                            >
                                company Name
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('address')}
                            >
                                Address
                            </th>
                         
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">User Status</th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">
                                Resume
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('createdAt')}
                            >
                                Created At
                            </th>
                            <th className="py-3 px-4 text-left font-semibold text-gray-700 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recruiters.map(recruiter => (
                            <tr key={recruiter._id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-800">
                                    {recruiter.userCode}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.firstName}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.lastName}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.email}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.phone}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.companyName}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{recruiter.address}</td>
                             

                                {/* Dropdown for User Status */}
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <select
                                        value={recruiter.userStatus}
                                        onChange={(e) => handleUserStatusChange(recruiter._id, e.target.value)}
                                        className="bg-gray-100 rounded-md py-1 px-2"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Not Active">Not Active</option>
                                        <option value="Block">Block</option>
                                        <option value="Black List">Black List</option>
                                    </select>
                                </td>

                                {/* Resume view button */}
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleViewResume(recruiter.resumePath)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        View
                                    </button>
                                </td>

                                <td className="py-3 px-4 border-b border-gray-200">{new Date(recruiter.createdAt).toLocaleDateString()}</td>

                                {/* Update button */}
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleUpdate(recruiter)}
                                        className="bg-green-500 text-white px-4 py-1 rounded-md hover:bg-green-600 transition-colors"
                                    >
                                        Update
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RecruiterDashboard;