import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingBag, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface NavLink {
  href: string;
  label: string;
  highlight?: boolean;
}

const navLinks: NavLink[] = [
  { href: "/", label: "Início" },
  { href: "/produtos", label: "Produtos" },
  { href: "/personalizar", label: "Personalizar", highlight: true },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2">
            <span className="font-display text-2xl md:text-3xl tracking-wider text-foreground">
              CUSTOM<span className="text-accent">TEE</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent relative py-1 flex items-center gap-1.5",
                  link.highlight && "text-accent",
                  location.pathname === link.href
                    ? "text-accent after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-accent"
                    : !link.highlight && "text-foreground/70"
                )}
              >
                {link.highlight && <Sparkles className="w-3.5 h-3.5" />}
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/checkout"
              className="relative p-2 hover:bg-secondary rounded-full transition-colors"
              aria-label="Ver carrinho"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-accent text-accent-foreground text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            <button
              className="md:hidden p-2 hover:bg-secondary rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block py-3 text-base font-medium transition-colors items-center gap-2",
                  link.highlight && "text-accent",
                  location.pathname === link.href
                    ? "text-accent"
                    : !link.highlight &&
                        "text-foreground/70 hover:text-foreground"
                )}
              >
                {link.highlight && <Sparkles className="w-4 h-4" />}
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
