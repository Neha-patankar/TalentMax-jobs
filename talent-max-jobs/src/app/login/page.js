import React from 'react'
import Login from '../components/RegistrationForm/Login';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const page = () => {
  return (
    <div>
        <Navbar/>
        <Login/>
        <Footer/>
    </div>
  )
}
export  default page ;