"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CandidateDashboard = () => {
    const [candidates, setCandidates] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: '', direction: 'ascending' });
    const [selectedResume, setSelectedResume] = useState(null);
    const [showResumeModal, setShowResumeModal] = useState(false);

    // Fetch data from the backend
    useEffect(() => {
        fetchCandidates();
    }, []);

    const fetchCandidates = () => {
        axios.get('http://localhost:8080/api/candidates')
            .then(response => {
                const processedData = response.data.map((candidate, index) => {
                    let userCode;
                    
                    // Generate user codes based on userType
                    if (candidate.userType === 'Candidate') {
                        userCode = `CAND${index + 1}`;
                    } else if (candidate.userType === 'Recruiter') {
                        userCode = `RCT${index + 1}`;
                    } else if (candidate.userType === 'Admin') {
                        userCode = `ADM${index + 1}`;
                    } else if (candidate.userType === 'Super Admin') {
                        userCode = `SADM${index + 1}`;
                    } else {
                        userCode = `USER${index + 1}`; // Default user code if none match
                    }
    
                    return {
                        ...candidate,
                        userCode: userCode, // Assign generated userCode
                        userType: candidate.userType || 'Candidate',
                        userStatus: candidate.userStatus || 'Not Active', // Default to 'Not Active'
                        _original: { // Store original values to detect changes
                            userType: candidate.userType || 'Candidate',
                            userStatus: candidate.userStatus || 'Not Active' // Default to 'Not Active'
                        }
                    };
                });
                setCandidates(processedData);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    };
    
    // Sorting function
    const handleSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedCandidates = [...candidates].sort((a, b) => {
            if (a[key] < b[key]) {
                return direction === 'ascending' ? -1 : 1;
            }
            if (a[key] > b[key]) {
                return direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        setCandidates(sortedCandidates);
    };

    // Handle user type change
    const handleUserTypeChange = (id, newType) => {
        setCandidates(prevCandidates =>
            prevCandidates.map(candidate =>
                candidate._id === id ? { ...candidate, userType: newType } : candidate
            )
        );
    };

    // Handle user status change
    const handleUserStatusChange = (id, newStatus) => {
        setCandidates(prevCandidates =>
            prevCandidates.map(candidate =>
                candidate._id === id ? { ...candidate, userStatus: newStatus } : candidate
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

    // Send activation notification to user
    const sendActivationNotification = (user) => {
        // You would implement your notification logic here, e.g., email API call
        axios.post('http://localhost:8080/api/notifications/send', {
            userId: user._id,
            email: user.email,
            subject: 'Account Activation',
            message: `Dear ${user.firstName}, your account has been activated. You can now log in to our system.`
        })
        .then(response => {
            console.log('Activation notification sent successfully');
        })
        .catch(error => {
            console.error('Failed to send activation notification:', error);
        });
    };

    // Handle update button click
    const handleUpdate = (candidate) => {
        // Check if any changes were made
        const hasChanges = 
            candidate.userType !== candidate._original.userType || 
            candidate.userStatus !== candidate._original.userStatus;
        
        if (hasChanges) {
            // Store original status to check if it changed from non-active to active
            const wasActivated = candidate._original.userStatus !== 'Active' && candidate.userStatus === 'Active';
            
            // Update user in the database
            axios.put(`http://localhost:8080/api/candidates/${candidate._id}`, {
                userType: candidate.userType,
                userStatus: candidate.userStatus
            })
            .then(response => {
                // Update local state with the changes
                setCandidates(prevCandidates =>
                    prevCandidates.map(c =>
                        c._id === candidate._id ? {
                            ...c,
                            _original: {
                                userType: c.userType,
                                userStatus: c.userStatus
                            }
                        } : c
                    )
                );
                
                // If status was changed to Active, send notification
                if (wasActivated) {
                    sendActivationNotification(candidate);
                    alert(`User ${candidate.firstName} ${candidate.lastName} updated successfully and activation notification sent!`);
                } else {
                    alert(`User ${candidate.firstName} ${candidate.lastName} updated successfully!`);
                }
            })
            .catch(error => {
                console.error("Error updating user:", error);
                alert("Failed to update user. Please try again.");
            });
        } else {
            alert("No changes to update.");
        }
    };

    return (
        <div className="container mx-auto px-4 max-w-8xl">
            <h1 className="text-3xl font-bold text-center text-gray-800 my-6">Candidate Dashboard</h1>

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
                                onClick={() => handleSort('applyFor')}
                            >
                                Apply For
                            </th>
                            <th 
                                className="py-3 px-4 text-left font-semibold text-gray-700 border-b cursor-pointer"
                                onClick={() => handleSort('gender')}
                            >
                                Gender
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
                        {candidates.map(candidate => (
                            <tr key={candidate._id} className="hover:bg-gray-50 transition-colors">
                                <td className="py-3 px-4 border-b border-gray-200 font-medium text-gray-800">
                                    {candidate.userCode}
                                </td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.firstName}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.lastName}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.email}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.phone}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.applyFor}</td>
                                <td className="py-3 px-4 border-b border-gray-200">{candidate.gender}</td>

                                {/* Dropdown for User Status */}
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <select
                                        value={candidate.userStatus}
                                        onChange={(e) => handleUserStatusChange(candidate._id, e.target.value)}
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
                                        onClick={() => handleViewResume(candidate.resumePath)}
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition-colors"
                                    >
                                        View
                                    </button>
                                </td>

                                <td className="py-3 px-4 border-b border-gray-200">{new Date(candidate.createdAt).toLocaleDateString()}</td>

                                {/* Update button */}
                                <td className="py-3 px-4 border-b border-gray-200">
                                    <button
                                        onClick={() => handleUpdate(candidate)}
                                        className={`${
                                            candidate.userStatus !== candidate._original.userStatus || 
                                            candidate.userType !== candidate._original.userType
                                                ? 'bg-green-500 hover:bg-green-600' 
                                                : 'bg-gray-400'
                                        } text-white px-4 py-1 rounded-md transition-colors`}
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

export default CandidateDashboard;