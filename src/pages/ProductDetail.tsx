import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { ArrowLeft, ShoppingBag, Plus, Minus, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = products.find(p => p.id === Number(id));
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <Layout>
        <div className="section-padding container-custom text-center">
          <h1 className="font-display text-4xl mb-4">Produto não encontrado</h1>
          <p className="text-muted-foreground mb-8">
            O produto que você está procurando não existe.
          </p>
          <Button variant="accent" asChild>
            <Link to="/produtos">Ver todos os produtos</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Selecione um tamanho",
        description: "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive"
      });
      return;
    }
    if (!selectedColor) {
      toast({
        title: "Selecione uma cor",
        description: "Por favor, escolha uma cor antes de adicionar ao carrinho.",
        variant: "destructive"
      });
      return;
    }

    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor
    });

    toast({
      title: "Adicionado ao carrinho!",
      description: `${product.name} foi adicionado ao seu carrinho.`,
    });
  };

  const handleBuyNow = () => {
    if (!selectedSize || !selectedColor) {
      handleAddToCart();
      return;
    }

    addToCart({
      product,
      quantity,
      selectedSize,
      selectedColor
    });
    
    navigate('/checkout');
  };

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          {/* Back Button */}
          <Button variant="ghost" className="mb-8" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Product Image */}
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={product.image || '/placeholder.svg'}
                  alt={`Camiseta ${product.name} - ${product.description}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute top-4 left-4 px-4 py-2 bg-accent text-accent-foreground text-sm font-medium rounded-full">
                {product.category}
              </span>
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-6">
                <h1 className="font-display text-4xl md:text-5xl mb-4">{product.name}</h1>
                <p className="text-3xl font-bold text-accent">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.fullDescription}
              </p>

              {/* Size Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Tamanho
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "w-12 h-12 rounded-lg border-2 font-medium transition-all",
                        selectedSize === size
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent"
                      )}
                      aria-label={`Selecionar tamanho ${size}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Cor
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 text-sm font-medium transition-all flex items-center gap-2",
                        selectedColor === color
                          ? "border-accent bg-accent text-accent-foreground"
                          : "border-border hover:border-accent"
                      )}
                      aria-label={`Selecionar cor ${color}`}
                    >
                      {selectedColor === color && <Check className="w-4 h-4" />}
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-8">
                <label className="block text-sm font-medium mb-3">
                  Quantidade
                </label>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-accent transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="text-xl font-medium w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-border flex items-center justify-center hover:border-accent transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                <Button 
                  variant="outlineAccent" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </Button>
                <Button 
                  variant="accent" 
                  size="lg" 
                  className="flex-1"
                  onClick={handleBuyNow}
                >
                  Comprar Agora
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProductDetail;
