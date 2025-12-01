import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";
import {
  Upload,
  X,
  ShoppingBag,
  ImagePlus,
  Shirt,
  Check,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/utils";

const tshirtColors = [
  { name: "Preto", value: "#1a1a1a", textColor: "white" },
  { name: "Branco", value: "#ffffff", textColor: "black" },
  { name: "Cinza", value: "#6b7280", textColor: "white" },
  { name: "Marinho", value: "#1e3a5f", textColor: "white" },
  { name: "Vermelho", value: "#dc2626", textColor: "white" },
  { name: "Verde", value: "#16a34a", textColor: "white" },
];

const sizes = ["PP", "P", "M", "G", "GG", "XG"];

const Customize = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState(tshirtColors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [imageScale, setImageScale] = useState(50);
  const [imagePosition, setImagePosition] = useState({ x: 50, y: 45 });
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo é 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "Arquivo muito grande",
          description: "O tamanho máximo é 5MB.",
          variant: "destructive",
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const resetPosition = () => {
    setImageScale(50);
    setImagePosition({ x: 50, y: 45 });
  };

  const handleAddToCart = () => {
    if (!uploadedImage) {
      toast({
        title: "Envie uma imagem",
        description:
          "Por favor, envie uma foto para personalizar sua camiseta.",
        variant: "destructive",
      });
      return;
    }
    if (!selectedSize) {
      toast({
        title: "Selecione um tamanho",
        description:
          "Por favor, escolha um tamanho antes de adicionar ao carrinho.",
        variant: "destructive",
      });
      return;
    }

    addToCart({
      product: {
        id: Date.now(),
        name: "Camiseta Personalizada",
        description: "Camiseta com sua foto exclusiva",
        fullDescription:
          "Camiseta personalizada com sua própria imagem, impressão de alta qualidade.",
        price: 129.9,
        image: uploadedImage,
        category: "Personalizada",
        sizes: sizes,
        colors: [selectedColor.name],
      },
      quantity: 1,
      selectedSize,
      selectedColor: selectedColor.name,
    });

    toast({
      title: "Adicionado ao carrinho!",
      description: "Sua camiseta personalizada foi adicionada ao carrinho.",
    });

    navigate("/checkout");
  };

  return (
    <Layout>
      <section className="bg-gradient-hero text-primary-foreground section-padding">
        <div className="container-custom text-center">
          <span className="text-accent font-medium text-sm uppercase tracking-wider">
            Crie sua peça única
          </span>
          <h1 className="font-display text-5xl md:text-7xl mt-2 mb-4">
            PERSONALIZE
          </h1>
          <p className="text-primary-foreground/70 text-lg max-w-2xl mx-auto">
            Envie sua foto e veja como ficará na camiseta. Crie algo único que
            representa você!
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="order-2 lg:order-1">
              <h2 className="font-display text-2xl mb-6">PRÉVIA DA CAMISETA</h2>

              <div
                className="relative aspect-square rounded-2xl overflow-hidden flex items-center justify-center"
                style={{ backgroundColor: "#f0f0f0" }}
              >
                <svg viewBox="0 0 400 450" className="w-full h-full max-w-md">
                  <path
                    d="M80 80 L50 120 L80 140 L80 400 L320 400 L320 140 L350 120 L320 80 L260 80 L240 60 Q200 40 160 60 L140 80 Z"
                    fill={selectedColor.value}
                    stroke={
                      selectedColor.value === "#ffffff"
                        ? "#e5e5e5"
                        : "transparent"
                    }
                    strokeWidth="2"
                  />

                  <path
                    d="M160 60 Q200 90 240 60"
                    fill="none"
                    stroke={
                      selectedColor.value === "#ffffff"
                        ? "#e5e5e5"
                        : selectedColor.value === "#1a1a1a"
                        ? "#333"
                        : "rgba(0,0,0,0.2)"
                    }
                    strokeWidth="3"
                  />

                  {uploadedImage && (
                    <foreignObject
                      x={200 - imageScale * 1.4}
                      y={80 + (50 - imagePosition.y) * 2}
                      width={imageScale * 2.8}
                      height={imageScale * 2.8}
                    >
                      <div className="w-full h-full flex items-center justify-center overflow-hidden rounded">
                        <img
                          src={uploadedImage}
                          alt="Sua imagem personalizada"
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </foreignObject>
                  )}

                  {!uploadedImage && (
                    <g>
                      <rect
                        x="140"
                        y="120"
                        width="120"
                        height="120"
                        fill="none"
                        stroke={
                          selectedColor.textColor === "white"
                            ? "rgba(255,255,255,0.3)"
                            : "rgba(0,0,0,0.2)"
                        }
                        strokeWidth="2"
                        strokeDasharray="8,4"
                        rx="8"
                      />
                      <text
                        x="200"
                        y="185"
                        textAnchor="middle"
                        fill={
                          selectedColor.textColor === "white"
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(0,0,0,0.3)"
                        }
                        fontSize="14"
                        fontFamily="Inter, sans-serif"
                      >
                        Sua imagem aqui
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {uploadedImage && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label className="text-sm mb-2 block">
                      Tamanho da imagem
                    </Label>
                    <input
                      title="Tamanho da imagem"
                      type="range"
                      min="20"
                      max="80"
                      value={imageScale}
                      onChange={(e) => setImageScale(Number(e.target.value))}
                      className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Menor</span>
                      <span>Maior</span>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" onClick={resetPosition}>
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetar posição
                  </Button>
                </div>
              )}
            </div>

            <div className="order-1 lg:order-2 space-y-8">
              <div>
                <h2 className="font-display text-2xl mb-4">ENVIE SUA FOTO</h2>

                {!uploadedImage ? (
                  <div
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onClick={() => fileInputRef.current?.click()}
                    className={cn(
                      "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
                      isDragging
                        ? "border-accent bg-accent/5"
                        : "border-border hover:border-accent/50"
                    )}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-secondary rounded-full flex items-center justify-center">
                      <ImagePlus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <p className="font-medium mb-2">
                      Arraste sua imagem aqui ou clique para selecionar
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG ou WEBP (máx. 5MB)
                    </p>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="aspect-video rounded-xl overflow-hidden bg-secondary">
                      <img
                        src={uploadedImage}
                        alt="Imagem enviada"
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <button
                      onClick={removeImage}
                      className="absolute top-2 right-2 w-8 h-8 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/90 transition-colors"
                      aria-label="Remover imagem"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleFileUpload}
                  className="hidden"
                  aria-label="Selecionar arquivo de imagem"
                />

                {!uploadedImage && (
                  <Button
                    variant="outline"
                    className="w-full mt-4"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    Selecionar arquivo
                  </Button>
                )}
              </div>

              <div>
                <h3 className="font-display text-xl mb-4">COR DA CAMISETA</h3>
                <div className="flex flex-wrap gap-3">
                  {tshirtColors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={cn(
                        "w-12 h-12 rounded-full border-4 transition-all relative",
                        selectedColor.name === color.name
                          ? "border-accent scale-110"
                          : "border-transparent hover:scale-105"
                      )}
                      style={{ backgroundColor: color.value }}
                      aria-label={`Selecionar cor ${color.name}`}
                    >
                      {selectedColor.name === color.name && (
                        <Check
                          className="absolute inset-0 m-auto w-5 h-5"
                          style={{ color: color.textColor }}
                        />
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Cor selecionada:{" "}
                  <span className="font-medium text-foreground">
                    {selectedColor.name}
                  </span>
                </p>
              </div>

              <div>
                <h3 className="font-display text-xl mb-4">TAMANHO</h3>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
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

              <div className="bg-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Preço</p>
                    <p className="text-3xl font-bold text-accent">R$ 129,90</p>
                  </div>
                  <Shirt className="w-12 h-12 text-muted-foreground" />
                </div>

                <p className="text-sm text-muted-foreground mb-4">
                  Inclui impressão de alta qualidade, tecido 100% algodão
                  premium e entrega para todo o Brasil.
                </p>

                <Button
                  variant="accent"
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5" />
                  Adicionar ao Carrinho
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Customize;
