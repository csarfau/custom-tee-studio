import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    }
    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "E-mail inválido";
    }
    if (!formData.subject.trim()) {
      newErrors.subject = "Assunto é obrigatório";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Mensagem é obrigatória";
    } else if (formData.message.length < 10) {
      newErrors.message = "Mensagem deve ter pelo menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos corretamente.",
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Mensagem enviada!",
      description: "Entraremos em contato em breve.",
    });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (submitted) {
    return (
      <Layout>
        <section className="section-padding">
          <div className="container-custom max-w-2xl text-center">
            <div className="animate-scale-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h1 className="font-display text-4xl md:text-5xl mb-4">
                MENSAGEM ENVIADA!
              </h1>
              <p className="text-muted-foreground text-lg mb-8">
                Obrigado pelo contato, {formData.name}!<br />
                Responderemos em até 24 horas úteis.
              </p>
              <Button
                variant="accent"
                size="lg"
                onClick={() => setSubmitted(false)}
              >
                Enviar Nova Mensagem
              </Button>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground section-padding">
        <div className="container-custom text-center">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Fale Conosco
          </span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 mb-4">
            CONTATO
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Dúvidas, sugestões ou quer fazer um orçamento personalizado? Entre
            em contato conosco.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="font-display text-2xl mb-6">INFORMAÇÕES</h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">E-mail</h3>
                    <p className="text-muted-foreground">
                      contato@customtee.com.br
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Telefone</h3>
                    <p className="text-muted-foreground">(11) 99999-9999</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Endereço</h3>
                    <p className="text-muted-foreground">
                      Av. Raja Gabáglia, 1000 <br />- Belo Horizonte, MG
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-6 bg-secondary rounded-xl">
                <h3 className="font-display text-lg mb-2">
                  Horário de Atendimento
                </h3>
                <p className="text-sm text-muted-foreground">
                  Segunda a Sexta: 9h às 18h
                  <br />
                  Sábado: 9h às 13h
                </p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Nome Completo *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn(errors.name && "border-destructive")}
                      placeholder="Seu nome"
                    />
                    {errors.name && (
                      <span className="text-sm text-destructive">
                        {errors.name}
                      </span>
                    )}
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
                    {errors.email && (
                      <span className="text-sm text-destructive">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="subject">Assunto *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      className={cn(errors.subject && "border-destructive")}
                      placeholder="Assunto da mensagem"
                    />
                    {errors.subject && (
                      <span className="text-sm text-destructive">
                        {errors.subject}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Mensagem *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className={cn(
                      "min-h-[150px]",
                      errors.message && "border-destructive"
                    )}
                    placeholder="Descreva sua dúvida, sugestão ou pedido de orçamento..."
                  />
                  {errors.message && (
                    <span className="text-sm text-destructive">
                      {errors.message}
                    </span>
                  )}
                </div>

                <Button variant="accent" size="lg" type="submit">
                  <Send className="w-5 h-5" />
                  Enviar Mensagem
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
