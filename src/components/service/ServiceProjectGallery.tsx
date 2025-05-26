
import { useState } from "react";
import { Images, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Project {
  id: number;
  image: string;
  title: string;
  location: string;
  description: string;
}

interface ServiceProjectGalleryProps {
  projectGallery?: Project[];
  serviceTitle: string;
}

const ServiceProjectGallery = ({ projectGallery, serviceTitle }: ServiceProjectGalleryProps) => {
  const [selectedProjectImage, setSelectedProjectImage] = useState<number | null>(null);

  if (!projectGallery || projectGallery.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-standbyte-dark mb-4 flex items-center justify-center gap-3">
          <Images className="w-8 h-8 text-standbyte-blue" />
          Projetos Realizados
        </h2>
        <p className="text-xl text-standbyte-mid max-w-2xl mx-auto">
          Confira alguns dos projetos de {serviceTitle.toLowerCase()} que já realizamos para nossos clientes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projectGallery.map((project) => (
          <Card 
            key={project.id} 
            className="overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group"
            onClick={() => setSelectedProjectImage(project.id)}
          >
            <div className="aspect-video overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-bold text-standbyte-dark mb-2 group-hover:text-standbyte-blue transition-colors">
                {project.title}
              </h3>
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-4 h-4 text-standbyte-mid" />
                <span className="text-sm text-standbyte-mid">{project.location}</span>
              </div>
              <p className="text-sm text-standbyte-mid leading-relaxed">
                {project.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Modal para visualizar imagem em tamanho maior */}
      {selectedProjectImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedProjectImage(null)}
        >
          <div className="max-w-4xl max-h-full relative">
            <button
              onClick={() => setSelectedProjectImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-standbyte-red text-2xl font-bold"
            >
              ✕
            </button>
            {projectGallery.find(p => p.id === selectedProjectImage) && (
              <div className="bg-standbyte-white rounded-lg overflow-hidden">
                <img 
                  src={projectGallery.find(p => p.id === selectedProjectImage)!.image}
                  alt={projectGallery.find(p => p.id === selectedProjectImage)!.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-standbyte-dark mb-2">
                    {projectGallery.find(p => p.id === selectedProjectImage)!.title}
                  </h3>
                  <div className="flex items-center gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-standbyte-mid" />
                    <span className="text-standbyte-mid">
                      {projectGallery.find(p => p.id === selectedProjectImage)!.location}
                    </span>
                  </div>
                  <p className="text-standbyte-mid">
                    {projectGallery.find(p => p.id === selectedProjectImage)!.description}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceProjectGallery;
