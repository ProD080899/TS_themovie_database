import React from "react";
import Header from "../layout/Header";
import Title1 from "./Title1";
import CartMovie from "../Home/CartMovie";
import Footer from "../layout/Footer";
import "./CartMovie.css";
function Home() {
  return (
    <div>
      <Header />
      <div className="main-home">
        <Title1 />
        <CartMovie />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
