"use client";
import { useState } from "react";
const logo = "/logo.png";
import Button from "./Button";
import { useRouter } from 'next/navigation';
import { Menu, X } from "lucide-react";

export default function Nav() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-white/10 backdrop-blur-lg shadow-md p-4 rounded-3xl md:rounded-full border border-white/20 transition-all duration-300">
      <div className="flex justify-between items-center px-4">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => {
            setIsOpen(false);
            router.push("/");
          }}
        >
          <img src={logo} alt="Velora Logo" className="h-10 w-10" />
          <span className="text-xl font-outfit font-bold text-white">
            Velora
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-6">
            <li>
              <a
                href="#heroSec"
                className="cursor-pointer px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:text-purple-300 hover:drop-shadow-[0_0_15px_#d8b4fe]"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#abt"
                className="cursor-pointer px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:text-purple-300 hover:drop-shadow-[0_0_15px_#d8b4fe]"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#feat"
                className="cursor-pointer px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:text-purple-300 hover:drop-shadow-[0_0_15px_#d8b4fe]"
              >
                Features
              </a>
            </li>

            <li>
              <a
                href="#pricing"
                className="cursor-pointer px-4 py-2 rounded-full text-white font-medium transition-all duration-300 hover:text-purple-300 hover:drop-shadow-[0_0_15px_#d8b4fe]"
              >
                Pricing
              </a>
            </li>
          </ul>

          <Button
            className="text-sm px-5 py-1.5"
            onClick={() => router.push("/login")}
          >
            Login
          </Button>
        </div>

        {/* Mobile Toggle Button */}
        <div className="flex md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-300 focus:outline-none transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 px-4 pb-4 pt-2 border-t border-white/10 flex flex-col space-y-4 transition-all duration-300">
          <ul className="flex flex-col space-y-3">
            <li>
              <a
                href="#heroSec"
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer py-2 text-white font-medium hover:text-purple-300 transition-colors"
              >
                Home
              </a>
            </li>

            <li>
              <a
                href="#abt"
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer py-2 text-white font-medium hover:text-purple-300 transition-colors"
              >
                About
              </a>
            </li>

            <li>
              <a
                href="#feat"
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer py-2 text-white font-medium hover:text-purple-300 transition-colors"
              >
                Features
              </a>
            </li>

            <li>
              <a
                href="#pricing"
                onClick={() => setIsOpen(false)}
                className="block cursor-pointer py-2 text-white font-medium hover:text-purple-300 transition-colors"
              >
                Pricing
              </a>
            </li>
          </ul>

          <Button
            className="text-sm w-full py-2.5"
            onClick={() => {
              setIsOpen(false);
              router.push("/login");
            }}
          >
            Login
          </Button>
        </div>
      )}
    </nav>
  );
}
