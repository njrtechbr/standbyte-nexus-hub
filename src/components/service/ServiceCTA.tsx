
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const ServiceCTA = () => {
  return (
    <div className="mt-16 bg-standbyte-light rounded-2xl p-8 text-center">
      <h2 className="text-3xl font-bold text-standbyte-dark mb-4">
        Pronto para começar seu projeto?
      </h2>
      <p className="text-xl text-standbyte-mid mb-8 max-w-2xl mx-auto">
        Entre em contato conosco e receba um orçamento personalizado para suas necessidades
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to="/orcamento">
          <Button size="lg" className="bg-standbyte-red hover:bg-red-700 text-standbyte-white px-8">
            Solicitar Orçamento
          </Button>
        </Link>
        <Link to="/contato">
          <Button 
            size="lg" 
            variant="outline" 
            className="border-standbyte-blue text-standbyte-blue hover:bg-standbyte-blue hover:text-standbyte-white px-8"
          >
            Falar Conosco
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCTA;
