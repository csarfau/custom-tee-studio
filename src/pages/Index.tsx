import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard';
import { products } from '@/data/products';
import { ArrowRight, Sparkles, Truck, Shield, Palette } from 'lucide-react';
import heroTshirt from '@/assets/hero-tshirt.png';

const features = [
  {
    icon: Palette,
    title: 'Design Único',
    description: 'Crie estampas exclusivas que expressam sua personalidade'
  },
  {
    icon: Shield,
    title: 'Qualidade Premium',
    description: 'Tecidos de alta qualidade que duram e mantêm as cores'
  },
  {
    icon: Truck,
    title: 'Entrega Rápida',
    description: 'Receba em casa com rapidez e segurança'
  },
  {
    icon: Sparkles,
    title: 'Acabamento Perfeito',
    description: 'Impressão de alta definição em cada detalhe'
  }
];

const Index = () => {
  const featuredProducts = products.slice(0, 3);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-primary-foreground animate-slide-up">
              <span className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-medium mb-6">
                ✨ Nova Coleção 2024
              </span>
              <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-none mb-6">
                VISTA SUA
                <span className="block text-accent">CRIATIVIDADE</span>
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/70 mb-8 max-w-lg">
                Camisetas personalizadas de alta qualidade. 
                Transforme suas ideias em peças únicas que contam a sua história.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="xl" asChild>
                  <Link to="/produtos">
                    VER COLEÇÃO
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                <Button variant="outlineAccent" size="xl" asChild className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground">
                  <Link to="/sobre">
                    NOSSA HISTÓRIA
                  </Link>
                </Button>
              </div>
            </div>

            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-accent/20 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
                <div className="w-64 h-64 bg-accent/30 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                <img
                  src={heroTshirt}
                  alt="Camiseta personalizada CustomTee com design geométrico em coral"
                  className="relative z-10 w-80 h-auto animate-float drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary-foreground/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="text-center p-6 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-lg mb-2 tracking-wide">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">Destaques</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2 mb-4">PRODUTOS EM ALTA</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Confira as camisetas mais populares da nossa coleção, 
              escolhidas pelos nossos clientes mais exigentes.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Button variant="accent" size="lg" asChild>
              <Link to="/produtos">
                Ver Todos os Produtos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-hero text-primary-foreground">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-6xl mb-6">
            PRONTO PARA<br />
            <span className="text-accent">CRIAR O SEU?</span>
          </h2>
          <p className="text-primary-foreground/70 text-lg mb-8 max-w-2xl mx-auto">
            Entre em contato conosco e transforme suas ideias em realidade. 
            Nossa equipe está pronta para ajudar você a criar a camiseta perfeita.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/contato">
              SOLICITAR ORÇAMENTO
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
