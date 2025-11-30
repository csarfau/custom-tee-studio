import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = ['Todos', 'Street', 'Arte', 'Retro', 'Eco', 'Básico'];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const filteredProducts = selectedCategory === 'Todos'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground section-padding">
        <div className="container-custom text-center">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Catálogo</span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 mb-4">NOSSOS PRODUTOS</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Explore nossa coleção completa de camisetas customizáveis. 
            Cada peça é única, assim como você.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border sticky top-16 md:top-20 bg-background/95 backdrop-blur-sm z-40">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "accent" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "rounded-full",
                  selectedCategory !== category && "hover:border-accent hover:text-accent"
                )}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section-padding">
        <div className="container-custom">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                Nenhum produto encontrado nesta categoria.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product, index) => (
                <div 
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Products;
