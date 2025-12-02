
"use client";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";
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

export default function Nav({ page }: { page: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setDropdown(!dropdown);

  // 🔵 Idioma fijo en español
  const texts = {
    op1: "Inicio",
    op2: {
      title: "Servicios",
      o1: "Todos los servicios",
      o2: "Desarrollo Web",
      o3: "Apps a medida",
      o4: "Carcheck",
      o5: "Audit",
    },
    op3: "Nosotros",
    op4: "Servicios",
    op5: "Consultar Estado",
  };

  return (
    <div className="bg-blue-800" id="top-page">
      <div className="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4 relative">

        {/* LOGO */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img
            className="h-[3rem]"
            src="/aspafulllogo.webp"
            alt="Logo Aspa"
            title="Logo Aspa"
          />
        </Link>

        {/* BOTÓN BURGER */}
        <button
          onClick={toggleMenu}
          type="button"
          aria-expanded={isMenuOpen}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-gray-400 hover:bg-gray-700 focus:ring-2 focus:ring-gray-600"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* MENU */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto mt-4 md:mt-0`}>
          <ul className="flex flex-col text-white font-medium rounded-lg md:space-x-8 md:flex-row md:border-0 md:bg-transparent ">

            {/* INICIO */}
            <li>
              <Link
                href="/"
                onClick={toggleMenu}
                className={`block py-2 px-3 md:p-0 rounded md:hover:text-white ${
                  page === "home" ? "text-blue-700" : "text-gray-200"
                }`}
              >
                {texts.op1}
              </Link>
            </li>

            {/* NOSOTROS */}
            <li>
              <Link
                href="#nosotros"
                onClick={toggleMenu}
                className={`block py-2 px-3 md:p-0 md:hover:text-white ${
                  page === "nosotros" ? "text-blue-700" : "text-gray-200"
                }`}
              >
                {texts.op3}
              </Link>
            </li>

            {/* servicios */}
            <li>
              <Link
                href="#servicios"
                onClick={toggleMenu}
                className={`block py-2 px-3 md:p-0 md:hover:text-white ${
                  page === "contacto" ? "text-blue-700" : "text-gray-200"
                }`}
              >
                {texts.op4}
              </Link>
            </li>
             {/* servicios */}
             <li>
              <Link
                href="#consultar"
                onClick={toggleMenu}
                className={`block py-2 px-3 md:p-0 md:hover:text-white ${
                  page === "contacto" ? "text-blue-700" : "text-gray-200"
                }`}
              >
                {texts.op5}
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </div>
  );
}
