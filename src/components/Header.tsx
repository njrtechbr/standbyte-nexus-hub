
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-2xl shadow-2xl border-b border-white/20' 
        : 'bg-gradient-to-r from-transparent via-white/5 to-transparent backdrop-blur-sm'
    }`}>
      {/* Glow effect bar */}
      <div className={`h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent transition-opacity duration-500 ${
        scrolled ? 'opacity-100' : 'opacity-0'
      }`} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo com animação */}
          <div className="flex items-center group cursor-pointer">
            <div className="relative">
              {/* Background glow */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-0 group-hover:opacity-20 blur transition-all duration-300" />
              
              <div className="relative text-3xl font-bold transition-all duration-300 group-hover:scale-105">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent bg-size-200 animate-gradient">
                  Stand
                </span>
                <span className={`transition-colors duration-300 ${
                  scrolled ? 'text-gray-800' : 'text-white'
                }`}>
                  byte
                </span>
              </div>
              
              {/* Subtle pulse indicator */}
              <div className="absolute -top-1 -right-1 w-3 h-3">
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse opacity-80" />
                <div className="absolute inset-0 w-full h-full bg-green-400 rounded-full animate-ping opacity-30" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Background hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                <div className="absolute inset-0 bg-white/10 rounded-xl backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300" />
                
                {/* Text */}
                <span className={`relative font-medium transition-all duration-300 ${
                  scrolled 
                    ? 'text-gray-700 group-hover:text-blue-600' 
                    : 'text-white/90 group-hover:text-white'
                }`}>
                  {item.name}
                </span>
                
                {/* Animated underline */}
                <div className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full group-hover:left-0 transition-all duration-300" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 blur-sm transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA Button with advanced effects */}
          <div className="hidden md:block">
            <a
              href="#contact"
              className="group relative px-6 py-3 font-semibold text-white rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-size-200 animate-gradient" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Border glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-60 blur-sm transition-all duration-300" />
              
              {/* Content */}
              <div className="relative flex items-center space-x-2">
                <Zap className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12" />
                <span>Fale Conosco</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
              
              {/* Shine effect */}
              <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-[-100%] transition-all duration-700" />
            </a>
          </div>

          {/* Mobile menu button with animations */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group relative p-3 rounded-2xl transition-all duration-300 hover:scale-110"
            >
              {/* Background */}
              <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              {/* Icon with rotation animation */}
              <div className="relative transition-transform duration-300">
                {isMenuOpen ? (
                  <X className={`w-6 h-6 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} />
                ) : (
                  <Menu className={`w-6 h-6 transition-colors duration-300 ${
                    scrolled ? 'text-gray-700' : 'text-white'
                  }`} />
                )}
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation with advanced animations */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          <div className="bg-white/90 backdrop-blur-2xl rounded-3xl mt-4 mb-6 shadow-2xl border border-white/20 overflow-hidden">
            {/* Gradient top border */}
            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500" />
            
            <nav className="p-6 space-y-2">
              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group block px-6 py-4 rounded-2xl transition-all duration-300 hover:scale-[1.02] transform"
                  onClick={() => setIsMenuOpen(false)}
                  style={{ 
                    animationDelay: `${index * 100}ms`,
                    animation: isMenuOpen ? 'slideInUp 0.6s ease-out' : undefined
                  }}
                >
                  {/* Background hover effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300" />
                  
                  <div className="relative flex items-center justify-between">
                    <span className="text-gray-700 group-hover:text-blue-600 font-medium transition-colors duration-300">
                      {item.name}
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </a>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4">
                <a
                  href="#contact"
                  className="group relative block text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-[1.02] overflow-hidden"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative flex items-center justify-center space-x-2">
                    <Zap className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span>Fale Conosco</span>
                  </div>
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
