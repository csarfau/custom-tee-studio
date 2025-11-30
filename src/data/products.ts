import urbanStreetTee from '@/assets/products/urban-street-tee.jpg';
import geometricVisionTee from '@/assets/products/geometric-vision-tee.jpg';
import retroWaveTee from '@/assets/products/retro-wave-tee.jpg';
import natureElementsTee from '@/assets/products/nature-elements-tee.jpg';
import abstractMindTee from '@/assets/products/abstract-mind-tee.jpg';
import minimalEssentialTee from '@/assets/products/minimal-essential-tee.jpg';

export interface Product {
  id: number;
  name: string;
  description: string;
  fullDescription: string;
  price: number;
  image: string;
  category: string;
  sizes: string[];
  colors: string[];
}

export const products: Product[] = [
  {
    id: 1,
    name: "Urban Street Tee",
    description: "Camiseta minimalista com design urbano exclusivo",
    fullDescription: "Nossa Urban Street Tee é a escolha perfeita para quem busca um estilo minimalista com personalidade. Confeccionada em algodão premium 100% orgânico, oferece conforto superior durante todo o dia. O design exclusivo foi criado por artistas locais, tornando cada peça única. Ideal para o dia a dia, combina perfeitamente com jeans ou shorts.",
    price: 89.90,
    image: urbanStreetTee,
    category: "Street",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Preto", "Branco", "Cinza"]
  },
  {
    id: 2,
    name: "Geometric Vision",
    description: "Estampa geométrica vibrante com cores intensas",
    fullDescription: "A Geometric Vision é para os ousados que não têm medo de se destacar. Com uma estampa geométrica cuidadosamente desenvolvida, esta camiseta traz cores vibrantes que capturam olhares. Tecido macio de alta qualidade com tecnologia anti-transpirante. Perfeita para festivais, shows ou qualquer momento em que você queira brilhar.",
    price: 109.90,
    image: geometricVisionTee,
    category: "Arte",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Multicolor", "Azul", "Roxo"]
  },
  {
    id: 3,
    name: "Retro Wave",
    description: "Inspirada nos anos 80 com toque contemporâneo",
    fullDescription: "Viaje no tempo com a Retro Wave! Esta camiseta combina a nostalgia dos anos 80 com um design moderno e atual. As cores neon e o visual synthwave fazem dela uma peça de colecionador. Material premium com acabamento diferenciado. Ideal para quem aprecia a cultura pop e quer expressar seu estilo único.",
    price: 99.90,
    image: retroWaveTee,
    category: "Retro",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Rosa Neon", "Azul Neon", "Preto"]
  },
  {
    id: 4,
    name: "Nature Elements",
    description: "Conexão com a natureza em cada detalhe",
    fullDescription: "A Nature Elements celebra a beleza do mundo natural. Com estampas inspiradas em elementos da floresta, montanhas e oceano, esta camiseta é perfeita para os amantes da natureza. Produzida com materiais sustentáveis e tintas ecológicas. Parte dos lucros é destinada a projetos de reflorestamento.",
    price: 119.90,
    image: natureElementsTee,
    category: "Eco",
    sizes: ["P", "M", "G", "GG", "XG"],
    colors: ["Verde", "Marrom", "Azul Oceano"]
  },
  {
    id: 5,
    name: "Abstract Mind",
    description: "Arte abstrata exclusiva para mentes criativas",
    fullDescription: "A Abstract Mind é uma tela em branco transformada em arte vestível. Cada estampa é uma obra de arte abstrata única, criada por artistas contemporâneos. Esta camiseta é mais que uma roupa - é uma declaração artística. Tecido de alta gramatura para durabilidade excepcional. Edição limitada com certificado de autenticidade.",
    price: 139.90,
    image: abstractMindTee,
    category: "Arte",
    sizes: ["P", "M", "G", "GG"],
    colors: ["Multicolor", "Preto/Branco", "Tons Terrosos"]
  },
  {
    id: 6,
    name: "Minimal Essential",
    description: "Simplicidade elegante para todos os momentos",
    fullDescription: "Às vezes, menos é mais. A Minimal Essential prova que a simplicidade pode ser sofisticada. Design clean com pequenos detalhes que fazem toda a diferença. Corte impecável e caimento perfeito. Versátil o suficiente para o escritório ou um encontro casual. O básico elevado ao máximo.",
    price: 79.90,
    image: minimalEssentialTee,
    category: "Básico",
    sizes: ["PP", "P", "M", "G", "GG", "XG"],
    colors: ["Preto", "Branco", "Cinza", "Marinho"]
  }
];
