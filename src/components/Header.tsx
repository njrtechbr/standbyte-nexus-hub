
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'glass-effect shadow-2xl' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo com efeito animado */}
          <div className="flex items-center animate-slide-in-left">
            <div className="text-3xl font-bold relative group">
              <span className="text-blue-700">Stand</span>
              <span className="text-red-600">byte</span>
              <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-700 to-red-600 group-hover:w-full transition-all duration-500"></div>
            </div>
          </div>

          {/* Desktop Navigation com efeitos hover */}
          <nav className="hidden md:flex space-x-8 animate-slide-in-up">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="relative text-gray-700 hover:text-blue-700 transition-all duration-300 font-medium group py-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-700 to-red-600 group-hover:w-full transition-all duration-300"></span>
                <span className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-50 to-red-50 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
              </a>
            ))}
          </nav>

          {/* CTA Button com efeito neon */}
          <div className="hidden md:block animate-slide-in-right">
            <a
              href="#contact"
              className="relative px-8 py-3 font-semibold text-white rounded-full overflow-hidden group animate-glow"
              style={{
                background: 'linear-gradient(45deg, #1e40af, #dc2626)',
              }}
            >
              <span className="relative z-10">Fale Conosco</span>
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-blue-700 transition-colors p-2 rounded-lg hover:bg-blue-50"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation com animação */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 right-0 glass-effect shadow-2xl animate-slide-in-up">
            <nav className="px-6 py-6 space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-700 hover:text-blue-700 transition-all duration-300 font-medium py-3 px-4 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-red-50 animate-fade-in-scale"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <a
                href="#contact"
                className="block text-center bg-gradient-to-r from-blue-700 to-red-600 text-white px-6 py-3 rounded-full hover:from-red-600 hover:to-blue-800 transition-all duration-300 mt-4 animate-pulse-custom"
                onClick={() => setIsMenuOpen(false)}
              >
                Fale Conosco
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
