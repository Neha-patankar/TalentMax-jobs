import React from 'react'
import CandidateDashboard from './CandidateDashboard'
import RecruiterDashboard from './RecruiterDashboard'

const AdminDashboard = () => {
  return (
    <div>
    <div>AdminDashboard
        <CandidateDashboard/>
        <RecruiterDashboard/>
    </div>
    </div>
  )
}

export  default AdminDashboard