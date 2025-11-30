import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, Target, Eye, Users, Award, Leaf, ArrowRight } from 'lucide-react';
import aboutTeam from '@/assets/about-team.jpg';

const values = [
  {
    icon: Heart,
    title: 'Paixão',
    description: 'Amamos o que fazemos e isso reflete em cada peça que criamos.'
  },
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Utilizamos os melhores materiais e técnicas de impressão do mercado.'
  },
  {
    icon: Users,
    title: 'Cliente em Primeiro',
    description: 'Sua satisfação é nossa prioridade número um, sempre.'
  },
  {
    icon: Leaf,
    title: 'Sustentabilidade',
    description: 'Comprometidos com práticas eco-friendly em toda nossa produção.'
  }
];

const About = () => {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-hero text-primary-foreground section-padding">
        <div className="container-custom text-center">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">Nossa História</span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 mb-4">SOBRE NÓS</h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Conheça a CustomTee e descubra como transformamos criatividade em realidade vestível.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-accent font-medium text-sm uppercase tracking-wider">Desde 2018</span>
              <h2 className="font-display text-4xl md:text-5xl mt-2 mb-6">
                NOSSA<br />JORNADA
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  A CustomTee nasceu em 2018 da paixão de um grupo de amigos por moda e arte. 
                  O que começou como um pequeno projeto em uma garagem, hoje é uma das principais 
                  referências em camisetas personalizadas do Brasil.
                </p>
                <p>
                  Nossa missão sempre foi clara: dar às pessoas a oportunidade de expressar 
                  sua individualidade através de peças únicas e de alta qualidade. Acreditamos 
                  que cada pessoa tem uma história para contar, e suas roupas são uma extensão 
                  dessa narrativa.
                </p>
                <p>
                  Ao longo dos anos, investimos em tecnologia de ponta para impressão, 
                  desenvolvemos parcerias com artistas locais e construímos uma comunidade 
                  de clientes fiéis que compartilham nossa visão de moda autêntica.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-secondary">
                <img
                  src={aboutTeam}
                  alt="Equipe CustomTee trabalhando na criação de camisetas personalizadas"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent rounded-2xl flex items-center justify-center">
                <div className="text-center text-accent-foreground">
                  <span className="font-display text-4xl block">6+</span>
                  <span className="text-sm">Anos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section-padding bg-secondary">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl mb-4">NOSSA MISSÃO</h3>
              <p className="text-muted-foreground leading-relaxed">
                Transformar a criatividade de nossos clientes em peças de vestuário únicas 
                e de alta qualidade, democratizando a moda personalizada e permitindo que 
                cada pessoa expresse sua individualidade através do que veste.
              </p>
            </div>

            <div className="bg-card p-8 rounded-2xl shadow-sm">
              <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-display text-2xl mb-4">NOSSA VISÃO</h3>
              <p className="text-muted-foreground leading-relaxed">
                Ser reconhecida como a principal referência em moda customizada no Brasil, 
                liderando a revolução da personalização no vestuário e inspirando pessoas 
                a viverem sua autenticidade através da moda.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-accent font-medium text-sm uppercase tracking-wider">O que nos move</span>
            <h2 className="font-display text-4xl md:text-5xl mt-2">NOSSOS VALORES</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="text-center p-6 bg-card rounded-xl border border-border card-hover animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 mx-auto mb-4 bg-accent/10 rounded-xl flex items-center justify-center">
                  <value.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-gradient-hero text-primary-foreground">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '50K+', label: 'Clientes Felizes' },
              { number: '100K+', label: 'Camisetas Criadas' },
              { number: '200+', label: 'Designs Exclusivos' },
              { number: '99%', label: 'Satisfação' },
            ].map((stat, index) => (
              <div key={stat.label} className="text-center">
                <span className="font-display text-4xl md:text-5xl text-accent block mb-2">
                  {stat.number}
                </span>
                <span className="text-primary-foreground/70">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <h2 className="font-display text-4xl md:text-5xl mb-6">
            FAÇA PARTE DA<br />
            <span className="text-accent">NOSSA HISTÓRIA</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Junte-se aos milhares de clientes que já descobriram o prazer de 
            vestir peças únicas e personalizadas.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link to="/produtos">
                Ver Produtos
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outlineAccent" size="lg" asChild>
              <Link to="/contato">
                Fale Conosco
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
