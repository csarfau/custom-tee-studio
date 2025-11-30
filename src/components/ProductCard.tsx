import { Link } from 'react-router-dom';
import { Product } from '@/data/products';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="group bg-card rounded-xl overflow-hidden shadow-sm card-hover border border-border">
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <img
          src={product.image || '/placeholder.svg'}
          alt={`Camiseta ${product.name} - ${product.description}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 left-3 px-3 py-1 bg-accent text-accent-foreground text-xs font-medium rounded-full">
          {product.category}
        </span>
      </div>
      
      <div className="p-5">
        <h3 className="font-display text-xl mb-2 tracking-wide text-foreground">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-foreground">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <Button variant="outlineAccent" size="sm" asChild>
            <Link to={`/produto/${product.id}`}>
              Ver detalhes
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
