
import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Search, User, Phone, Mail } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { name: "Início", href: "/" },
    { name: "Produtos", href: "/produtos" },
    { name: "Serviços", href: "/servicos" },
    { name: "Sobre", href: "/sobre" },
    { name: "Contato", href: "/contato" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primaryBlue text-neutralWhite py-2 text-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>(11) 99999-9999</span>
              </div>
              <div className="hidden md:flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contato@standbyte.com</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span>Frete grátis acima de R$ 299</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-neutralWhite shadow-lg border-b border-neutralLight' 
          : 'bg-neutralWhite'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="text-3xl font-bold flex items-center space-x-1">
                <span className="text-primaryBlue">Stand</span>
                <span className="text-neutralDark">byte</span>
                <div className="w-2 h-2 bg-accentRed rounded-full" />
              </div>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar produtos e serviços..."
                  className="w-full px-4 py-3 pr-12 border-2 border-neutralLight rounded-lg focus:border-primaryBlue focus:outline-none"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primaryBlue text-neutralWhite p-2 rounded-lg hover:bg-primaryBlue/90 transition-colors">
                  <Search className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-medium transition-colors ${
                    isActive(item.href)
                      ? "text-accentRed"
                      : "text-primaryBlue hover:text-accentRed"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Action Buttons */}
            <div className="flex items-center space-x-4">
              {/* Search Mobile */}
              <button className="lg:hidden p-2 text-primaryBlue hover:text-accentRed">
                <Search className="w-6 h-6" />
              </button>

              {/* User Account */}
              <Link
                to="/conta"
                className="hidden md:flex items-center space-x-2 p-2 text-primaryBlue hover:text-accentRed transition-colors"
              >
                <User className="w-6 h-6" />
                <span className="hidden lg:block font-medium">Conta</span>
              </Link>

              {/* Shopping Cart */}
              <Link
                to="/carrinho"
                className="relative p-2 text-primaryBlue hover:text-accentRed transition-colors"
              >
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-1 -right-1 bg-accentRed text-neutralWhite text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  0
                </span>
              </Link>

              {/* Orçamento CTA */}
              <Link
                to="/contato"
                className="hidden md:inline-flex items-center px-6 py-3 bg-accentRed text-neutralWhite font-semibold rounded-lg hover:bg-accentRed/90 transition-colors"
              >
                Solicitar Orçamento
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 text-primaryBlue"
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
            <div className="lg:hidden border-t border-neutralLight bg-neutralWhite">
              {/* Mobile Search */}
              <div className="p-4 border-b border-neutralLight">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar produtos e serviços..."
                    className="w-full px-4 py-3 pr-12 border border-neutralLight rounded-lg focus:border-primaryBlue focus:outline-none"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primaryBlue text-neutralWhite p-2 rounded">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <nav className="py-4 space-y-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`block px-4 py-3 font-medium transition-colors ${
                      isActive(item.href)
                        ? "text-accentRed bg-neutralLight/50"
                        : "text-primaryBlue hover:bg-neutralLight hover:text-accentRed"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                {/* Mobile Account */}
                <Link
                  to="/conta"
                  className="flex items-center px-4 py-3 text-primaryBlue hover:bg-neutralLight hover:text-accentRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="w-5 h-5 mr-3" />
                  Minha Conta
                </Link>

                {/* Mobile Cart */}
                <Link
                  to="/carrinho"
                  className="flex items-center px-4 py-3 text-primaryBlue hover:bg-neutralLight hover:text-accentRed transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  Carrinho
                </Link>

                {/* Mobile CTA */}
                <div className="px-4 pt-2">
                  <Link
                    to="/contato"
                    className="flex items-center justify-center w-full px-6 py-3 bg-accentRed text-neutralWhite font-semibold rounded-lg hover:bg-accentRed/90 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Solicitar Orçamento
                  </Link>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
