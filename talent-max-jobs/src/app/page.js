import Footer from "./components/Footer/Footer";
import LandingPage from "./components/landingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";


 function Home() {
  return (
    <>
      <Navbar/>
      <LandingPage/>
      <Footer/>
      {/* <RegistrationForm/> */}
    </>
  );
}
export default Home;