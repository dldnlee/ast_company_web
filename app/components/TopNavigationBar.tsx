'use client';
import React from 'react';

export default function TopNavigationBar() {
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

    const navItems = [
        { name: 'Home', id: 'home' },
        { name: 'About', id: 'about' },
        { name: 'Clients', id: 'clients' },
        { name: 'Portfolio', id: 'portfolio' },
        { name: 'Contact', id: 'contact' }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-3 sm:px-6">
                <img src="company_logos/ASTCompanyWhiteNoBG.png" alt="AST Logo" className="h-10" />
                <nav className="hidden md:flex space-x-8 text-sm font-medium">
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
            </div>
        </header>
    );
}