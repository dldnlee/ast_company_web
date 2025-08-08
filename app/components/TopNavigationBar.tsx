


export default function TopNavigationBar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-white/10 border-b border-white/20">
            <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-3 sm:px-6">
                <img src="company_logos/ASTCompanyWhiteNoBG.png" alt="AST Logo" className="h-10" />
                <nav className="hidden md:flex space-x-8 text-sm font-medium">
                    {['Home', 'About', 'Clients', 'Portfolio', 'Contact'].map(section => (
                    <a key={section} href={'#' + section.toLowerCase()} className="hover:text-purple-400">
                        {section}
                    </a>
                    ))}
                </nav>
            </div>
        </header>
    )
}