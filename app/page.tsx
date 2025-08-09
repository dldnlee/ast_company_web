'use client';
import React, { useEffect } from 'react';

import TopNavigationBar from './components/TopNavigationBar';
import { ContactSection, PartnerChannelSection, PortfolioSection, PartnerInfluencerSection, SectionOne, SectionThree, SectionTwo, FooterSection } from './sections';

export default function HomePage() {

  return (
    <main className="text-white overflow-x-hidden">
      {/* Background Balls */}
      {/* <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none background-balls" /> */}

      {/* Header */}
      <TopNavigationBar />

      {/* Hero */}
      <SectionOne />

      {/* About */}
      <SectionTwo />

      {/* Partner Channel */}
      <SectionThree />

      {/* Partner Influencers */}
      <PartnerInfluencerSection />
      
      {/* PartnerInfluencers */}
      <PartnerChannelSection />

      {/* Portfolios */}
      <PortfolioSection />

      {/* Contact Us Card */}
      <ContactSection />

      {/* Footer */}
      <FooterSection />
    </main>
  );
}
