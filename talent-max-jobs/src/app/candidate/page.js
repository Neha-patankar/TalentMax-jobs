import React from 'react'
import CandidateRegistrationForm from '../components/RegistrationForm/CandidateRegistrationForm';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const page = () => {
  return (
    <div>
      <Navbar/>
      <CandidateRegistrationForm/>
      <Footer/>
    </div>
  )
}
export default page;