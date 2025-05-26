
export const products = [
  {
    id: 1,
    name: "Notebook Gamer Legion 5i",
    brand: "Lenovo",
    slug: "notebook-gamer-legion-5i",
    image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=800&h=600&fit=crop"
    ],
    originalPrice: 8999.99,
    salePrice: 7499.99,
    discount: 17,
    rating: 4.8,
    reviews: 234,
    specs: ["Intel i7-12700H", "RTX 4060 8GB", "16GB DDR5", "512GB SSD", "15.6'' 144Hz"],
    fullSpecs: {
      processor: "Intel Core i7-12700H (12ª geração)",
      memory: "16GB DDR5 4800MHz (expansível até 32GB)",
      storage: "512GB SSD NVMe PCIe 4.0",
      graphics: "NVIDIA GeForce RTX 4060 8GB GDDR6",
      display: "15.6'' Full HD IPS 144Hz Anti-Glare",
      connectivity: "Wi-Fi 6, Bluetooth 5.1, USB-C, HDMI 2.1",
      battery: "80Wh - até 8 horas de uso",
      os: "Windows 11 Home"
    },
    description: "O Notebook Gamer Legion 5i é a escolha perfeita para gamers que buscam performance e qualidade. Equipado com processador Intel de 12ª geração e placa de vídeo RTX 4060, oferece experiência de jogo fluida em alta resolução.",
    category: "Notebooks",
    inStock: true,
    warranty: "2 anos",
    isOnSale: true,
    isFreeShipping: true
  },
  {
    id: 2,
    name: "Placa de Vídeo RTX 4070",
    brand: "ASUS",
    slug: "placa-video-rtx-4070-asus",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop"
    ],
    originalPrice: 3299.99,
    salePrice: 2899.99,
    discount: 12,
    rating: 4.9,
    reviews: 189,
    specs: ["12GB GDDR6X", "DLSS 3.0", "Ray Tracing", "Dual Fan", "PCI-E 4.0"],
    fullSpecs: {
      memory: "12GB GDDR6X",
      coreClock: "2610 MHz (Boost Clock)",
      memorySpeed: "21 Gbps",
      memoryInterface: "192-bit",
      resolution: "Até 7680x4320",
      interface: "PCI Express 4.0 x16",
      powerConsumption: "200W",
      connectors: "3x DisplayPort 1.4a, 2x HDMI 2.1a"
    },
    description: "A ASUS GeForce RTX 4070 oferece performance excepcional para jogos em 1440p e ray tracing. Com arquitetura Ada Lovelace e tecnologia DLSS 3.0, proporciona qualidade visual impressionante.",
    category: "Placas de Vídeo",
    inStock: true,
    warranty: "3 anos",
    isOnSale: true,
    isFreeShipping: true
  }
];

export const getProductBySlug = (slug: string) => {
  return products.find(product => product.slug === slug);
};

export const getProductsByCategory = (category: string) => {
  if (category === 'Todos') return products;
  return products.filter(product => product.category === category);
};
