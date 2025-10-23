import React from "react";
import Hero from "./Hero.js";
import Awards from "./Awards.js";
import Education from "./Education.js";
import Pricing from "./Pricing.js";
import Stats from "./Stats.js";

import OpenAccount from "../OpenAccount.js";

function HomePage() {
  return (
    <>
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
    </>
  );
}

export default HomePage;
