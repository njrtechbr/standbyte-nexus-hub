
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
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes glow-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 30px rgba(147, 51, 234, 0.4); }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-glow {
          animation: glow-pulse 2s ease-in-out infinite;
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        
        .glass-effect {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-2px);
        }
      `}</style>
      
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
        scrolled 
          ? 'glass-effect bg-white/10 shadow-2xl border-b border-white/10' 
          : 'bg-transparent'
      }`}>
        {/* Gradient indicator */}
        <div className={`h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient transition-opacity duration-500 ${
          scrolled ? 'opacity-100' : 'opacity-0'
        }`} />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center group cursor-pointer">
              <div className="relative hover-lift">
                <div className="absolute -inset-3 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl opacity-0 group-hover:opacity-100 animate-glow transition-all duration-500 blur-sm" />
                
                <div className="relative text-3xl font-bold flex items-center space-x-1">
                  <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent animate-gradient bg-size-200">
                    Stand
                  </span>
                  <span className={`transition-all duration-500 ${
                    scrolled ? 'text-gray-800' : 'text-white'
                  }`}>
                    byte
                  </span>
                  
                  {/* Status indicator */}
                  <div className="relative">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <div className="absolute inset-0 w-2 h-2 bg-green-400 rounded-full animate-ping opacity-30" />
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {menuItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="group relative px-6 py-3 rounded-2xl transition-all duration-500 hover-lift overflow-hidden"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Hover background */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                  <div className="absolute inset-0 glass-effect opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
                  
                  {/* Text */}
                  <span className={`relative font-semibold transition-all duration-500 ${
                    scrolled 
                      ? 'text-gray-700 group-hover:text-blue-600' 
                      : 'text-white/90 group-hover:text-white'
                  }`}>
                    {item.name}
                  </span>
                  
                  {/* Animated underline */}
                  <div className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-8 group-hover:left-1/2 group-hover:-translate-x-1/2 transition-all duration-500" />
                  
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700 skew-x-12" />
                </a>
              ))}
            </nav>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="#contact"
                className="group relative px-8 py-4 font-bold text-white rounded-2xl overflow-hidden hover-lift bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 animate-gradient hover:shadow-2xl transition-all duration-500"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                {/* Border glow */}
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-60 blur-sm transition-all duration-500" />
                
                {/* Content */}
                <div className="relative flex items-center space-x-2">
                  <Zap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12" />
                  <span>Fale Conosco</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                
                {/* Shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700 skew-x-12" />
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="group relative p-3 rounded-2xl transition-all duration-500 hover-lift glass-effect hover:bg-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
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

          {/* Mobile Navigation */}
          <div className={`md:hidden overflow-hidden transition-all duration-700 ease-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}>
            <div className="glass-effect bg-white/10 rounded-3xl mt-4 mb-6 shadow-2xl border border-white/10 overflow-hidden animate-slide-down">
              <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 animate-gradient" />
              
              <nav className="p-6 space-y-3">
                {menuItems.map((item, index) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="group flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-500 hover-lift glass-effect hover:bg-white/10"
                    onClick={() => setIsMenuOpen(false)}
                    style={{ 
                      animationDelay: `${index * 100}ms`,
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    
                    <span className="relative text-white font-semibold group-hover:text-blue-300 transition-colors duration-300">
                      {item.name}
                    </span>
                    <ArrowRight className="w-5 h-5 text-white/60 group-hover:text-blue-300 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
                  </a>
                ))}
                
                {/* Mobile CTA */}
                <div className="pt-4">
                  <a
                    href="#contact"
                    className="group flex items-center justify-center space-x-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-500 hover-lift animate-gradient"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                    
                    <Zap className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                    <span className="relative">Fale Conosco</span>
                    
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform translate-x-full group-hover:translate-x-[-100%] transition-transform duration-700 skew-x-12" />
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
