// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { Box } from "@mui/material";

// import HomePage from "../pages/HomePage";
// import ScrollToTop from "./ScrollToTop";
// import Header from "./Header";
// import Footer from "./Footer";
// import Shop from "../pages/Shop";
// import Travel from "../pages/Travel";
// import Contact from "../pages/Contact";
// import Gallery from "../pages/Gallery";
// import About from "../pages/About";
// import PrivacyPolicy from "../pages/Privacy";
// import TermsAndConditions from "../pages/Terms";
// import Blog from "../pages/Blog";
// import Admin from "../pages/Admin";
// import AdminGallery from "../pages/AdminGallery";
// import AdminBlog from "../pages/AdminBlog";
// import AdminTravel from "../pages/AdminTravel";

// const AppContent = () => {
//   const location = useLocation();
//   const [isAdminPage, setIsAdminPage] = useState(false);

//   useEffect(() => {
//     // Check if the current path is an admin page
//     const isAdmin = location.pathname.includes('/admin');
//     setIsAdminPage(isAdmin);
//   }, [location.pathname]);

//   return (
//     <>
//       <ScrollToTop />
//       <Header />
//       <Routes>
//         <Route exact path="/" element={<HomePage />} />
//         <Route path="/travel" element={<Travel />} />
//         <Route path="/gallery" element={<Gallery />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/shop" element={<Shop />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/blog" element={<Blog />} />
//         <Route path="/privacy policy" element={<PrivacyPolicy />} />
//         <Route path="/terms & conditions" element={<TermsAndConditions />} />
//         <Route path="/admin" element={<Admin />} />
//         <Route path="/admin/gallery" element={<AdminGallery />} />
//         <Route path="/admin/blog" element={<AdminBlog />} />
//         <Route path="/admin/travel" element={<AdminTravel />} />
//       </Routes>
//       {!isAdminPage && <Footer />}
//     </>
//   );
// };

// export default AppContent;
// AppContent.js
import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import ScrollToTop from "./ScrollToTop";
import Header from "./Header";
import Footer from "./Footer";

import HomePage from "../pages/HomePage";
import Shop from "../pages/Shop";
import Travel from "../pages/Travel";
import Contact from "../pages/Contact";
import Gallery from "../pages/Gallery";
import About from "../pages/About";
import PrivacyPolicy from "../pages/Privacy";
import TermsAndConditions from "../pages/Terms";
import Blog from "../pages/Blog";
import Admin from "../pages/Admin";
import AdminGallery from "../pages/AdminGallery";
import AdminBlog from "../pages/AdminBlog";
import AdminTravel from "../pages/AdminTravel";
import AuthPage from "../pages/AuthPage";
// import AuthPage from "../pages/AuthPage"; // ✅ Import AuthPage

const AppContent = () => {
  const location = useLocation();
  const [isAdminPage, setIsAdminPage] = useState(false);

  useEffect(() => {
    const isAdmin = location.pathname.includes("/admin");
    setIsAdminPage(isAdmin);
  }, [location.pathname]);

  return (
    <>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/register" element={<AuthPage />} />{" "}
        {/* ✅ Using AuthPage */}
        <Route path="/travel" element={<Travel />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/privacy policy" element={<PrivacyPolicy />} />
        <Route path="/terms & conditions" element={<TermsAndConditions />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/gallery" element={<AdminGallery />} />
        <Route path="/admin/blog" element={<AdminBlog />} />
        <Route path="/admin/travel" element={<AdminTravel />} />
      </Routes>
      {!isAdminPage && <Footer />}
    </>
  );
};

export default AppContent;
