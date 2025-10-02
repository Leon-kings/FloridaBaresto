import React from "react";
import { Hero } from "../../components/hero/Hero";
import { Products } from "../products/Products";
import { Testimonials } from "../testimony/Testimony";

export default function Home() {
  return (
    <div className="w-full mx-0 px-0">
      <Hero />
      <Products />
      <Testimonials />
    </div>
  );
}
