
import { useState } from "react";

interface ServiceImageGalleryProps {
  gallery: string[];
  title: string;
}

const ServiceImageGallery = ({ gallery, title }: ServiceImageGalleryProps) => {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      <div className="aspect-video bg-standbyte-light rounded-lg overflow-hidden">
        <img 
          src={gallery[selectedImage]} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {gallery.length > 1 && (
        <div className="flex gap-3">
          {gallery.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`w-20 h-16 rounded-lg overflow-hidden border-2 ${
                selectedImage === index ? 'border-standbyte-blue' : 'border-standbyte-light'
              }`}
            >
              <img 
                src={image} 
                alt={`${title} ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServiceImageGallery;
