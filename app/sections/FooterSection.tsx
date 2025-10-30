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
    <footer className="bg-gray-900 px-10 py-12 text-center text-gray-400 flex justify-between items-start">
      <div className="text-start text-sm">
        {/* Logo */}
        <img
          src="company_logos/ASTCompanyLine.png"
          alt="AST Logo"
          className="h-10 mb-4"
        />
        {/* Tagline */}
        <p className="text-start">AST Media Group</p>
        <p className="text-start">
          주식회사 아스트컴퍼니 / 사업자등록번호 710-81-04121 / 대표이사 조현욱 
          서울특별시 마포구 성지3길 55 3층(합정동)
        </p>
        {/* Copyright */}
        <p className="text-sm">COPYRIGHT© ASTCOMPANY. ALL RIGHTS RESERVED.</p>
      </div>

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



    </footer>
  );
}
