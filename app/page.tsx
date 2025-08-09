'use client';
import React, { useEffect } from 'react';

import TopNavigationBar from './components/TopNavigationBar';
import { ContactSection, PartnerChannelSection, PortfolioSection, PartnerInfluencerSection, SectionOne, SectionThree, SectionTwo, FooterSection } from './sections';

export default function HomePage() {
  return (
    <main className="text-white overflow-x-hidden">
      {/* Header */}
      <TopNavigationBar />

      {/* Hero Section */}
      <section id="home">
        <SectionOne />
      </section>

      {/* About Section */}
      <section id="about">
        <SectionTwo />
      </section>

      {/* Partner Channel Section - treating as "Clients" */}
      <section id="clients">
        <SectionThree />
        <PartnerInfluencerSection />
        <PartnerChannelSection />
      </section>

      {/* Portfolio Section */}
      <section id="portfolio">
        <PortfolioSection />
      </section>

      {/* Contact Section */}
      <section id="contact">
        <ContactSection />
      </section>

      {/* Footer */}
      <FooterSection />
    </main>
  );
}