import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export function FooterSection() {
  return (
    <footer className="bg-gray-900 py-12 text-center text-gray-400">
      {/* Logo */}
      <img
        src="company_logos/ASTCompanyLine.png"
        alt="AST Logo"
        className="h-10 mx-auto mb-4"
      />

      {/* Tagline */}
      <p className="mb-6">Creative Content Agency</p>

      {/* Navigation */}
      <nav className="mb-6">
        <ul className="flex flex-wrap justify-center gap-6 text-sm font-medium">
          <li><a href="/" className="hover:text-purple-400">Home</a></li>
          <li><a href="/about" className="hover:text-purple-400">About</a></li>
          <li><a href="/services" className="hover:text-purple-400">Clients</a></li>
          <li><a href="/works" className="hover:text-purple-400">Portfolio</a></li>
          <li><a href="/contact" className="hover:text-purple-400">Contact</a></li>
        </ul>
      </nav>

      {/* Social Icons */}
      <div className="flex justify-center gap-6 text-xl mb-8">
        <a
          href="https://instagram.com/ast__company"
          className="hover:text-purple-400 transition-colors"
        >
          <FaInstagram />
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          <FaYoutube />
        </a>
        <a href="#" className="hover:text-purple-400 transition-colors">
          <FaLinkedin />
        </a>
      </div>

      {/* Copyright */}
      <p className="text-sm">© 2024 ASTCOMPANY. All rights reserved.</p>
    </footer>
  );
}
