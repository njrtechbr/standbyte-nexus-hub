
import { Link } from "react-router-dom";
import { Clock, Shield, FileText, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceInfoProps {
  title: string;
  description: string;
  badge: string;
  category: string;
  duration: string;
  warranty: string;
}

const ServiceInfo = ({ title, description, badge, category, duration, warranty }: ServiceInfoProps) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-3 mb-4">
          <span className="bg-standbyte-red text-standbyte-white px-3 py-1 text-sm font-bold rounded-full">
            {badge}
          </span>
          <span className="text-xs bg-standbyte-light text-standbyte-dark px-3 py-1 rounded">
            {category}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold text-standbyte-dark mb-4">
          {title}
        </h1>
        
        <p className="text-xl text-standbyte-mid leading-relaxed">
          {description}
        </p>
      </div>

      {/* Service Details */}
      <div className="border-t border-standbyte-light pt-6">
        <div className="grid grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-standbyte-blue" />
            <div>
              <span className="block text-sm text-standbyte-mid">Prazo</span>
              <span className="font-medium text-standbyte-dark">{duration}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-standbyte-blue" />
            <div>
              <span className="block text-sm text-standbyte-mid">Garantia</span>
              <span className="font-medium text-standbyte-dark">{warranty}</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Buttons */}
      <div className="border-t border-standbyte-light pt-6">
        <div className="flex flex-col gap-4">
          <Link to="/orcamento">
            <Button 
              size="lg" 
              className="w-full bg-standbyte-red hover:bg-red-700 text-standbyte-white"
            >
              <FileText className="w-5 h-5 mr-2" />
              Solicitar Orçamento Grátis
            </Button>
          </Link>
          
          <Link to="/contato">
            <Button 
              size="lg" 
              variant="outline"
              className="w-full border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white"
            >
              <Phone className="w-5 h-5 mr-2" />
              Falar com Especialista
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceInfo;
