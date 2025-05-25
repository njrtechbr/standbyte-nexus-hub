
import { useState, useEffect } from "react";
import { Menu, X, Zap } from "lucide-react";

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
    <header className={`fixed top-0 left-0 right-0 z-50 ${
      scrolled 
        ? 'bg-standbyte-white shadow-lg border-b border-standbyte-light' 
        : 'bg-standbyte-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold flex items-center space-x-1">
              <span className="text-standbyte-blue">Stand</span>
              <span className="text-standbyte-dark">byte</span>
              <div className="w-2 h-2 bg-standbyte-red rounded-full" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-standbyte-blue font-medium hover:text-standbyte-red"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="inline-flex items-center px-6 py-3 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700"
            >
              <Zap className="w-4 h-4 mr-2" />
              Fale Conosco
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-standbyte-blue"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-standbyte-light">
            <nav className="py-4 space-y-2">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-4 py-2 text-standbyte-blue hover:bg-standbyte-light hover:text-standbyte-red"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="px-4 pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center w-full px-6 py-3 bg-standbyte-red text-standbyte-white font-semibold rounded-lg hover:bg-red-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Fale Conosco
                </a>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
