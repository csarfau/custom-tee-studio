import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/context/CartContext';
import { toast } from '@/hooks/use-toast';
import { Trash2, ShoppingBag, CheckCircle, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

const paymentMethods = [
  { id: 'pix', label: 'PIX', description: '10% de desconto' },
  { id: 'credit', label: 'Cartão de Crédito', description: 'Em até 12x' },
  { id: 'boleto', label: 'Boleto', description: 'Vencimento em 3 dias' },
];

const Checkout = () => {
  const { cartItems, removeFromCart, clearCart, getTotal } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    cep: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Endereço é obrigatório';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'Cidade é obrigatória';
    }
    if (!formData.cep.trim()) {
      newErrors.cep = 'CEP é obrigatório';
    }
    if (!selectedPayment) {
      newErrors.payment = 'Selecione uma forma de pagamento';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast({
        title: "Carrinho vazio",
        description: "Adicione produtos ao carrinho antes de finalizar.",
        variant: "destructive"
      });
      return;
    }

    if (!validateForm()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive"
      });
      return;
    }

    setOrderCompleted(true);
    clearCart();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const total = getTotal();
  const discount = selectedPayment === 'pix' ? total * 0.1 : 0;
  const finalTotal = total - discount;

  if (orderCompleted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-custom max-w-2xl text-center">
            <div className="animate-scale-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">PEDIDO CONFIRMADO!</h1>
              <p className="text-muted-foreground text-lg mb-8">
                Obrigado pela sua compra, {formData.name}!<br />
                Você receberá um e-mail de confirmação em {formData.email}.
              </p>
              
              <div className="bg-secondary rounded-xl p-6 mb-8 text-left">
                <h3 className="font-display text-xl mb-4">Resumo do Pedido</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Endereço:</strong> {formData.address}, {formData.city} - {formData.cep}</p>
                  <p><strong>Pagamento:</strong> {paymentMethods.find(p => p.id === selectedPayment)?.label}</p>
                  <p><strong>Total:</strong> R$ {finalTotal.toFixed(2).replace('.', ',')}</p>
                </div>
              </div>

              <Button variant="accent" size="lg" asChild>
                <Link to="/produtos">
                  Continuar Comprando
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="section-padding">
        <div className="container-custom">
          <Button variant="ghost" className="mb-8" asChild>
            <Link to="/produtos">
              <ArrowLeft className="w-4 h-4" />
              Continuar Comprando
            </Link>
          </Button>

          <h1 className="font-display text-4xl md:text-5xl mb-8">CHECKOUT</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 bg-secondary rounded-xl">
              <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h2 className="font-display text-2xl mb-2">Seu carrinho está vazio</h2>
              <p className="text-muted-foreground mb-6">
                Adicione produtos para continuar com a compra.
              </p>
              <Button variant="accent" asChild>
                <Link to="/produtos">Ver Produtos</Link>
              </Button>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <h2 className="font-display text-2xl mb-4">Itens do Carrinho</h2>
                {cartItems.map(item => (
                  <div 
                    key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                    className="flex gap-4 p-4 bg-card rounded-xl border border-border"
                  >
                    <img
                      src={item.product.image || '/placeholder.svg'}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-display text-lg">{item.product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {item.selectedSize} | {item.selectedColor} | Qtd: {item.quantity}
                      </p>
                      <p className="font-bold mt-2">
                        R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                      aria-label="Remover item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}

                {/* Form */}
                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                  <h2 className="font-display text-2xl">Dados de Entrega</h2>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Nome Completo *</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={cn(errors.name && "border-destructive")}
                        placeholder="Seu nome completo"
                      />
                      {errors.name && <span className="text-sm text-destructive">{errors.name}</span>}
                    </div>
                    <div>
                      <Label htmlFor="email">E-mail *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className={cn(errors.email && "border-destructive")}
                        placeholder="seu@email.com"
                      />
                      {errors.email && <span className="text-sm text-destructive">{errors.email}</span>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="address">Endereço *</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={cn(errors.address && "border-destructive")}
                      placeholder="Rua, número, complemento"
                    />
                    {errors.address && <span className="text-sm text-destructive">{errors.address}</span>}
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={cn(errors.city && "border-destructive")}
                        placeholder="Sua cidade"
                      />
                      {errors.city && <span className="text-sm text-destructive">{errors.city}</span>}
                    </div>
                    <div>
                      <Label htmlFor="cep">CEP *</Label>
                      <Input
                        id="cep"
                        name="cep"
                        value={formData.cep}
                        onChange={handleInputChange}
                        className={cn(errors.cep && "border-destructive")}
                        placeholder="00000-000"
                      />
                      {errors.cep && <span className="text-sm text-destructive">{errors.cep}</span>}
                    </div>
                  </div>

                  {/* Payment Methods */}
                  <div>
                    <h2 className="font-display text-2xl mb-4">Forma de Pagamento</h2>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {paymentMethods.map(method => (
                        <button
                          key={method.id}
                          type="button"
                          onClick={() => {
                            setSelectedPayment(method.id);
                            if (errors.payment) setErrors(prev => ({ ...prev, payment: '' }));
                          }}
                          className={cn(
                            "p-4 rounded-xl border-2 text-left transition-all",
                            selectedPayment === method.id
                              ? "border-accent bg-accent/5"
                              : "border-border hover:border-accent/50"
                          )}
                        >
                          <span className="font-medium block">{method.label}</span>
                          <span className="text-sm text-muted-foreground">{method.description}</span>
                        </button>
                      ))}
                    </div>
                    {errors.payment && <span className="text-sm text-destructive mt-2 block">{errors.payment}</span>}
                  </div>
                </form>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-secondary rounded-xl p-6 sticky top-28">
                  <h2 className="font-display text-2xl mb-6">Resumo</h2>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>R$ {total.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Frete</span>
                      <span className="text-green-600">Grátis</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Desconto PIX</span>
                        <span>- R$ {discount.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-accent">R$ {finalTotal.toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>

                  <Button 
                    variant="accent" 
                    size="lg" 
                    className="w-full mt-6"
                    onClick={handleSubmit}
                  >
                    Confirmar Pedido
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Checkout;
