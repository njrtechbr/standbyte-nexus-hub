
import { useState, useEffect } from "react";
import { Menu, X, Zap, ArrowRight } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Início", href: "#home" },
    { name: "Serviços", href: "#services" },
    { name: "Produtos", href: "#products" },
    { name: "Sobre", href: "#about" },
    { name: "Contato", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
      scrolled 
        ? 'bg-white/95 backdrop-blur-sm shadow-lg border-b border-gray-200' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-3xl font-bold flex items-center space-x-1">
              <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                Stand
              </span>
              <span className={`${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}>
                byte
              </span>
              <div className="w-2 h-2 bg-green-400 rounded-full" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`font-semibold ${
                  scrolled 
                    ? 'text-gray-700 hover:text-blue-600' 
                    : 'text-white/90 hover:text-white'
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="px-8 py-4 font-bold text-white rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 hover:opacity-90"
            >
              <div className="flex items-center space-x-2">
                <Zap className="w-5 h-5" />
                <span>Fale Conosco</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 rounded-xl bg-white/10 backdrop-blur-sm"
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`} />
              ) : (
                <Menu className={`w-6 h-6 ${
                  scrolled ? 'text-gray-700' : 'text-white'
                }`} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl mt-4 mb-6 shadow-xl border border-gray-200 overflow-hidden">
              <nav className="p-6 space-y-3">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex items-center justify-between px-6 py-4 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-semibold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span>{item.name}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400" />
                  </a>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Zap className="w-5 h-5" />
                    <span>Fale Conosco</span>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
