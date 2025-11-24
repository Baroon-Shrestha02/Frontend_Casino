import { Route, Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AboutPage from "./Pages/AboutPage";
import ServicePage from "./Pages/ServicePage";
import CoursePage from "./Pages/CoursePage";
import ContactPage from "./Pages/ContactPage";
import CareerPage from "./Pages/CareerPage";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import Navbar2 from "./Components/Navbar2";
import GalleryPage from "./Pages/GalleryPage";
import Whatsapp from "./Components/HelperComponents/Whatsapp";
import Roullete from "./Components/CoursesComponents/CoursesList/Roullete";
import BlackJack from "./Components/CoursesComponents/CoursesList/BlackJack";
import Poker from "./Components/CoursesComponents/CoursesList/Poker";
import TeenPatti from "./Components/CoursesComponents/CoursesList/TeenPatti";
import Baccarat from "./Components/CoursesComponents/CoursesList/Baccarat";
import CasinoWar from "./Components/CoursesComponents/CoursesList/CasinoWar";
import Andar from "./Components/CoursesComponents/CoursesList/Andar";
import Marriage from "./Components/CoursesComponents/CoursesList/Marriage";
import ScrollToTop from "./Components/HelperComponents/ScrollToTop";
import BlogsPage from "./Pages/BlogsPage";
import FAQPages from "./Pages/FAQPages";
import TestimonialsPage from "./Pages/TestimonialsPage";
import Login from "./Components/AuthComponents/Login.Jsx";
import CareerDescription from "./Components/CareerComponents/CareerDescription";

import AddCareerForm from "./Components/CareerComponents/AddCareerForm";

function App() {
  return (
    <>
      <ScrollToTop />
      <Whatsapp />
      <Navbar2 />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<CareerPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/roulette" element={<Roullete />} />
        <Route path="/courses/blackjack" element={<BlackJack />} />
        <Route path="/courses/poker" element={<Poker />} />
        <Route path="/courses/teen-patti" element={<TeenPatti />} />
        <Route path="/courses/baccarat" element={<Baccarat />} />
        <Route path="/courses/casino-war" element={<CasinoWar />} />
        <Route path="/courses/andar-bahar" element={<Andar />} />
        <Route path="/courses/marriage" element={<Marriage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/faq" element={<FAQPages />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-post" element={<AddCareerForm />} />

        <Route path="/careers/:id" element={<CareerDescription />} />

        {/* <Route path="/services" element={<ServicePage />} /> */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
