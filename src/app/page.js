import Footer from "./components/Footer/Footer";
import CompanySlider from "./components/landingPage/CompanySlider";
import JobVacanciesByLocation from "./components/landingPage/JobVacanciesByLocation";
import JobVacanciesPage from "./components/landingPage/JobVacanciesPage";
import LandingPage from "./components/landingPage/LandingPage";
import Navbar from "./components/Navbar/Navbar";



 function Home() {
  return (
    <>
      <Navbar/>
      <LandingPage/>
      <JobVacanciesPage/>
      <JobVacanciesByLocation/>
      <CompanySlider/>
      <Footer/>
      {/* <RegistrationForm/> */}
    </>
  );
}
export default Home;