import React from "react";
import { Hero } from "../../components/hero/Hero";
import { About } from "../about/About";
import { Services } from "../services/Services";
import { Products } from "../products/Products";

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <About />
      <Services/>
      <Products/>
    </div>
  );
}
