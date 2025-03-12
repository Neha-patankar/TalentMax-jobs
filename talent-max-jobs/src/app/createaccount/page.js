import React from 'react'
import CreateAccount from '../components/RegistrationForm/CreateAccount';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';

const page = () => {
  return (
    <div>
      <Navbar/>
       <CreateAccount/>
       <Footer/>
    </div>
  )
}
export  default page ;