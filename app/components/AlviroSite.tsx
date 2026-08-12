"use client";

import Navigation from "./Navigation";
import Hero from "./Hero";
import { BrandRail, Process, Results, Services } from "./Sections";
import { ContactSection, Footer, WhatsAppAction } from "./ContactFooter";
import DustCursor from "./DustCursor";

export default function AlviroSite() {
  return (
    <>
      <DustCursor />
      <Navigation />
      <main id="main-content">
        <Hero />
        <BrandRail />
        <Services />
        <Process />
        <Results />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppAction />
    </>
  );
}
