import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export function FooterSection() {

    const navItems = [
        { name: 'HOME', id: 'home' },
        { name: 'ABOUT', id: 'about' },
        { name: 'CLIENTS', id: 'clients' },
        { name: 'PORTFOLIO', id: 'portfolio' },
        { name: 'CONTACT', id: 'contact' }
    ];
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
            e.preventDefault();
            const element = document.getElementById(sectionId);
            if (element) {
                element.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        };
  return (
    <footer className="bg-gray-900 py-12 text-center text-gray-400">
      {/* Logo */}
      <img
        src="company_logos/ASTCompanyLine.png"
        alt="AST Logo"
        className="h-10 mx-auto mb-4"
      />

      {/* Tagline */}
      <p className="mb-6">AST Media Group</p>

      {/* Navigation */}
      <nav className="hidden md:flex items-center justify-center gap-6 text-sm font-medium mb-6">
        {navItems.map(item => (
            <a 
                key={item.name} 
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className="hover:text-purple-400 transition-colors duration-200 cursor-pointer"
            >
                {item.name}
            </a>
        ))}
      </nav>

      {/* Social Icons */}
      {/* <div className="flex justify-center gap-6 text-xl mb-8">
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
      </div> */}

      {/* Copyright */}
      <p className="text-sm">© 2024 ASTCOMPANY. All rights reserved.</p>
    </footer>
  );
}
