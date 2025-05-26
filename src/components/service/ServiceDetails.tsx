
import { CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface ServiceDetailsProps {
  fullDescription: string;
  features: string[];
  benefits: string[];
  process: string[];
}

const ServiceDetails = ({ fullDescription, features, benefits, process }: ServiceDetailsProps) => {
  return (
    <div className="mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Full Description */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-standbyte-dark">Sobre o Serviço</h3>
          </CardHeader>
          <CardContent>
            <p className="text-standbyte-mid leading-relaxed">{fullDescription}</p>
          </CardContent>
        </Card>

        {/* Features */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-standbyte-dark">O que Inclui</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-standbyte-blue flex-shrink-0 mt-0.5" />
                  <span className="text-standbyte-dark">{feature}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Benefits */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-standbyte-dark">Benefícios</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-standbyte-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-standbyte-dark">{benefit}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Process */}
        <Card>
          <CardHeader>
            <h3 className="text-xl font-bold text-standbyte-dark">Como Funciona</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {process.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-standbyte-blue text-standbyte-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-standbyte-dark pt-1">{step}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ServiceDetails;
