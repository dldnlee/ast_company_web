'use client';
import React, { useEffect } from 'react';

import TopNavigationBar from './components/TopNavigationBar';
import { ContactSection, PartnerChannelSection, PortfolioSection, PartnerInfluencerSection, SectionOne, SectionThree, SectionTwo } from './sections';

export default function HomePage() {

  return (
    <main className="text-white overflow-x-hidden">
      {/* Background Balls */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none background-balls" />

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


      {/* Contact */}
      {/* <section id="contact" className="py-20 bg-black text-center">
        <h2 className="text-4xl font-bold mb-4">GET IN <span className="text-purple-400">TOUCH</span></h2>
        <p className="text-gray-400 mb-12">프로젝트 문의는 언제든지 환영합니다</p>
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl space-y-4">
          <div className="text-lg"><i className="fas fa-envelope mr-2 text-purple-400" /> contact@astcompany.co.kr</div>
          <div className="text-lg"><i className="fas fa-phone mr-2 text-purple-400" /> 010-3044-2131</div>
          <div className="text-lg"><i className="fas fa-map-marker-alt mr-2 text-purple-400" /> 서울특별시 서초구 매헌로 16, 1313호</div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className="bg-gray-900 py-12 text-center text-gray-400">
        <img src="/ASTCompanyLine.png" alt="AST Logo" className="h-10 mx-auto mb-4" />
        <p className="mb-4">Creative Content Agency</p>
        <div className="flex justify-center gap-6 text-xl">
          <a href="https://instagram.com/ast__company" className="hover:text-purple-400"><i className="fab fa-instagram" /></a>
          <a href="#" className="hover:text-purple-400"><i className="fab fa-youtube" /></a>
          <a href="#" className="hover:text-purple-400"><i className="fab fa-linkedin" /></a>
        </div>
        <p className="text-sm mt-8">© 2024 ASTCOMPANY. All rights reserved.</p>
      </footer>
    </main>
  );
}
