import React from 'react'
import RecruiterRegistrationForm from '../components/RegistrationForm/RecruiterRegistrationForm';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

 const page = () => {
  return (
    <div>
         <Navbar/>
        <RecruiterRegistrationForm/>
        <Footer/>
    </div>
  )
}
export default page;