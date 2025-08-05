'use client';
import React, { useEffect } from 'react';

import TopNavigationBar from './components/TopNavigationBar';
import { SectionOne, SectionThree, SectionTwo } from './sections';

export default function HomePage() {
  useEffect(() => {
    // Hero text animation
    const el = document.getElementById('hero-title');
    if (el) {
      const text = el.textContent || '';
      el.innerHTML = '';
      text.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.classList.add('inline-block', 'opacity-0', 'translate-y-10', 'transition-all', 'duration-500');
        el.appendChild(span);
        setTimeout(() => {
          span.classList.remove('opacity-0', 'translate-y-10');
        }, 100 * i);
      });
    }
  }, []);

  return (
    <main className="bg-black text-white overflow-x-hidden">
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

      {/* Partner Influencer */}
      <section id="partner-influencer" className="py-20 bg-black text-center">
        <h2 className="text-3xl font-bold mb-4">PARTNER INFLUENCER</h2>
        <p className="text-gray-400 mb-8">협력 인플루언서</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-6xl mx-auto px-4">
          {[...Array(12)].map((_, i) => (
            <div key={i}>
              <img src={`/PartnerInfluencer/${i+1}.jpg`} alt={`Influencer ${i+1}`} className="rounded-lg shadow-md" />
              <p className="text-sm font-medium mt-2">@influencer{i+1}</p>
            </div>
          ))}
          <div className="bg-white/10 aspect-square rounded-xl flex items-center justify-center text-4xl text-gray-400">?</div>
        </div>
      </section>

      {/* Clients */}
      <section id="clients" className="py-20 bg-black text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">CLIENTS</h2>
        <p className="text-gray-400 mb-8">함께한 브랜드들</p>
        <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-6 max-w-6xl mx-auto px-4">
          {[...Array(48)].map((_, i) => (
            <img key={i} src={`/ClientsLogo/${i + 1}.png`} alt={`Client ${i + 1}`} className="h-12 object-contain mx-auto" />
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section id="portfolio" className="py-20 bg-gradient-to-b from-neutral-900 to-black text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-400">PORTFOLIO</h2>
        <p className="text-gray-400 mb-8">진행 사례</p>
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {['모두보기', '브랜드필름', '브랜디드/PPL', '숏폼'].map((label, i) => (
            <button key={i} className="px-4 py-2 rounded-full text-sm font-semibold border border-white/20 bg-white/10 hover:bg-purple-500 hover:text-white transition">
              {label}
            </button>
          ))}
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg bg-white/5">
              <img src={`/Portfolio/${i + 1}.jpg`} alt={`Work ${i + 1}`} className="w-full h-48 object-cover" />
              <div className="p-4 text-left">
                <h3 className="text-white font-bold mb-1">작품 제목 {i + 1}</h3>
                <p className="text-gray-400 text-sm">작업 설명</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 bg-black text-center">
        <h2 className="text-4xl font-bold mb-4">GET IN <span className="text-purple-400">TOUCH</span></h2>
        <p className="text-gray-400 mb-12">프로젝트 문의는 언제든지 환영합니다</p>
        <div className="max-w-xl mx-auto bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl space-y-4">
          <div className="text-lg"><i className="fas fa-envelope mr-2 text-purple-400" /> contact@astcompany.co.kr</div>
          <div className="text-lg"><i className="fas fa-phone mr-2 text-purple-400" /> 010-3044-2131</div>
          <div className="text-lg"><i className="fas fa-map-marker-alt mr-2 text-purple-400" /> 서울특별시 서초구 매헌로 16, 1313호</div>
        </div>
      </section>

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
