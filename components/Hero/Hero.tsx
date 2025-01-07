"use client";
import Container from "@/shared/Container";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Image1 from "@/images/HeroImg1.png";
import Image2 from "@/images/HeroImg2.png";
import Image3 from "@/images/HeroImg3.png";
import Image4 from "@/images/HeroImg4.png";
import Image5 from "@/images/HeroImg5.png";
import Image6 from "@/images/HeroImg6.png";

const images = [Image1, Image2, Image3, Image4, Image5, Image6];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Container className="pb-20 pt-8">
      <div className="w-full h-auto xs:[320px] sm:h-[350px] md:h-[400px] lg:h-[450px] xl:h-[500px]">
        <Image
          src={images[currentImageIndex]}
          alt={`Image ${currentImageIndex + 1}`}
          className="w-full h-full  rounded-[12px]"
        />
      </div>
    </Container>
  );
};

export default Hero;
