import React from "react";
import Footer from "../shared/Footer";
import Header from "../shared/Header";
import Navbar from "../shared/Navbar";

function MainLayout({ children }) {
  return (
    <>
      <Header />
      <div className="content-wrapper">{children}</div>
      <Navbar />
      <Footer />
    </>
  );
}

export default MainLayout;
