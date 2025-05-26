
import { Link } from "react-router-dom";

interface ServiceBreadcrumbProps {
  serviceTitle: string;
}

const ServiceBreadcrumb = ({ serviceTitle }: ServiceBreadcrumbProps) => {
  return (
    <div className="flex items-center gap-2 mb-8 text-sm">
      <Link to="/" className="text-standbyte-mid hover:text-standbyte-blue">Home</Link>
      <span className="text-standbyte-mid">/</span>
      <Link to="/servicos" className="text-standbyte-mid hover:text-standbyte-blue">Serviços</Link>
      <span className="text-standbyte-mid">/</span>
      <span className="text-standbyte-dark">{serviceTitle}</span>
    </div>
  );
};

export default ServiceBreadcrumb;
