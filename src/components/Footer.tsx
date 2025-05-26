
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-neutralDark text-neutralWhite">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-bold">
              <span className="text-primaryBlue">Stand</span><span className="text-neutralWhite">byte</span>
            </div>
            <p className="text-neutralMid leading-relaxed">
              Soluções completas em tecnologia da informação para impulsionar 
              seu negócio com inovação e qualidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-primaryBlue rounded-full flex items-center justify-center hover:bg-accentRed">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primaryBlue rounded-full flex items-center justify-center hover:bg-accentRed">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primaryBlue rounded-full flex items-center justify-center hover:bg-accentRed">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-primaryBlue rounded-full flex items-center justify-center hover:bg-accentRed">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutralWhite">Serviços</h3>
            <ul className="space-y-3 text-neutralMid">
              <li><a href="#" className="hover:text-neutralWhite">Infraestrutura de TI</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Segurança Digital</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Consultoria Técnica</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Suporte Especializado</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Cloud Computing</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutralWhite">Produtos</h3>
            <ul className="space-y-3 text-neutralMid">
              <li><a href="#" className="hover:text-neutralWhite">Computadores Desktop</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Notebooks</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Servidores</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Dispositivos Móveis</a></li>
              <li><a href="#" className="hover:text-neutralWhite">Acessórios</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-neutralWhite">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-accentRed" />
                <span className="text-neutralMid">(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-accentRed" />
                <span className="text-neutralMid">contato@standbyte.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-accentRed mt-1" />
                <div className="text-neutralMid">
                  <div>Av. Paulista, 1000</div>
                  <div>São Paulo - SP</div>
                  <div>CEP: 01310-100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutralMid/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-neutralMid text-sm">
              © 2024 Standbyte. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-neutralMid">
              <a href="#" className="hover:text-neutralWhite">Política de Privacidade</a>
              <a href="#" className="hover:text-neutralWhite">Termos de Uso</a>
              <a href="#" className="hover:text-neutralWhite">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
