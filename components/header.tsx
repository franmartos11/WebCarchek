"use client"

import { Car, Menu, X } from "lucide-react"
import { ReactNode, ButtonHTMLAttributes, HTMLAttributes, useEffect, useState } from "react"

type ButtonSize = "default" | "sm" | "icon"
type ButtonVariant = "default" | "ghost"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize
  variant?: ButtonVariant
  children: ReactNode
}

export function Button({
  children,
  className = "",
  size = "default",
  variant = "default",
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-lg transition-colors"
  const sizes: Record<ButtonSize, string> = {
    default: "h-10 px-5 text-sm",
    sm: "h-9 px-4 text-sm",
    icon: "h-10 w-10 p-2",
  }
  const variants: Record<ButtonVariant, string> = {
    default: "bg-blue-700 text-white hover:bg-blue-800",
    ghost: "bg-transparent hover:bg-gray-100",
  }

  return (
    <button className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}

/* ======= Drawer helpers (lightweight) ======= */
interface SheetTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}
function SheetTrigger({ children, ...rest }: SheetTriggerProps) {
  return (
    <button {...rest} aria-haspopup="dialog" aria-expanded={rest["aria-expanded"]}>
      {children}
    </button>
  )
}

interface SheetContentProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}
function SheetContent({ open, onClose, children }: SheetContentProps) {
  // overlay + drawer handled by parent; this just renders children
  return (
    <>
      {/* Overlay */}
      <div
        aria-hidden={!open}
        className={`fixed inset-0 bg-black/40 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 pointer-events-none"} z-40`}
        onClick={onClose}
      />

      {/* Drawer (panel) */}
      <aside
        aria-hidden={!open}
        role="dialog"
        className={`fixed right-0 top-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl p-6 transition-transform duration-300 z-50
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {children}
      </aside>
    </>
  )
}

/* ======= Header Component ======= */
interface NavItem {
  name: string
  href: string
}

export function Header() {
  const [open, setOpen] = useState<boolean>(false)

  // lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = prev
      }
    }
    // no cleanup needed when not open
    return
  }, [open])

  const navigation: NavItem[] = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Consultar Estado", href: "#consultar" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="h-16 flex items-center justify-between">

          {/* Logo */}
          <a href="#inicio" className="flex items-center gap-3 font-semibold text-lg sm:text-xl">
            <div className="bg-blue-700 text-white p-2 rounded-md flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <span className="leading-tight">AutoTaller Pro</span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-6">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>

            <Button size="sm" className="ml-2">
              Agendar Cita
            </Button>
          </div>

          {/* Mobile controls */}
          <div className="md:hidden flex items-center gap-2">
            <SheetTrigger onClick={() => setOpen(true)} aria-expanded={open}>
              <Button variant="ghost" size="icon" aria-label="Abrir menú">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
          </div>
        </nav>
      </div>

      {/* Drawer content (mobile) */}
      <SheetContent open={open} onClose={() => setOpen(false)}>
        <div className="flex items-center justify-between mb-6">
          <a href="#inicio" onClick={() => setOpen(false)} className="flex items-center gap-3 font-semibold text-lg">
            <div className="bg-blue-700 text-white p-2 rounded-md flex items-center justify-center">
              <Car className="w-5 h-5" />
            </div>
            <span>AutoTaller Pro</span>
          </a>

          <button aria-label="Cerrar menú" onClick={() => setOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {navigation.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setOpen(false)}
              className="text-base font-medium text-gray-700 py-2 px-2 rounded-md hover:bg-gray-50"
            >
              {item.name}
            </a>
          ))}

          <Button className="mt-4 w-full" onClick={() => setOpen(false)}>
            Agendar Cita
          </Button>
        </div>
      </SheetContent>
    </header>
  )
}
