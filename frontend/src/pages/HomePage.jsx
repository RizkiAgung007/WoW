import React from "react";
import HeroSection from "../components/HeroSection";
import ShowCase from "../components/ShowCase";
import Testimonial from "../components/Testimonial";
import GalleryCase from "../components/GalleryCase";

const HomePage = () => {
  return (
    <div>
      <HeroSection scrollToId="showcase" />
      <ShowCase />
      <Testimonial />
      <GalleryCase />
    </div>
  );
};

export default HomePage;
