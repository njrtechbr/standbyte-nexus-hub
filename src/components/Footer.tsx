
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="bg-standbyte-dark text-standbyte-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div className="text-2xl font-bold">
              <span className="text-standbyte-blue">Stand</span><span className="text-standbyte-white">byte</span>
            </div>
            <p className="text-standbyte-mid leading-relaxed">
              Soluções completas em tecnologia da informação para impulsionar 
              seu negócio com inovação e qualidade.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-standbyte-blue rounded-full flex items-center justify-center hover:bg-standbyte-red">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-standbyte-blue rounded-full flex items-center justify-center hover:bg-standbyte-red">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-standbyte-blue rounded-full flex items-center justify-center hover:bg-standbyte-red">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-standbyte-blue rounded-full flex items-center justify-center hover:bg-standbyte-red">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-standbyte-white">Serviços</h3>
            <ul className="space-y-3 text-standbyte-mid">
              <li><a href="#" className="hover:text-standbyte-white">Infraestrutura de TI</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Segurança Digital</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Consultoria Técnica</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Suporte Especializado</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Cloud Computing</a></li>
            </ul>
          </div>

          {/* Products */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-standbyte-white">Produtos</h3>
            <ul className="space-y-3 text-standbyte-mid">
              <li><a href="#" className="hover:text-standbyte-white">Computadores Desktop</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Notebooks</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Servidores</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Dispositivos Móveis</a></li>
              <li><a href="#" className="hover:text-standbyte-white">Acessórios</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-standbyte-white">Contato</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-standbyte-red" />
                <span className="text-standbyte-mid">(11) 3456-7890</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-standbyte-red" />
                <span className="text-standbyte-mid">contato@standbyte.com.br</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-standbyte-red mt-1" />
                <div className="text-standbyte-mid">
                  <div>Av. Paulista, 1000</div>
                  <div>São Paulo - SP</div>
                  <div>CEP: 01310-100</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-standbyte-mid/30 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-standbyte-mid text-sm">
              © 2024 Standbyte. Todos os direitos reservados.
            </div>
            <div className="flex space-x-6 text-sm text-standbyte-mid">
              <a href="#" className="hover:text-standbyte-white">Política de Privacidade</a>
              <a href="#" className="hover:text-standbyte-white">Termos de Uso</a>
              <a href="#" className="hover:text-standbyte-white">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
