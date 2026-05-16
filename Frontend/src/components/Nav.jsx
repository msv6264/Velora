import logo from "../assets/logo.png";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Nav() {
  const navigate = useNavigate();

  return (
    <nav className="relative z-10 bg-white/10 backdrop-blur-lg shadow-md p-4 rounded-full border border-white/20">
      <div className="flex justify-between items-center px-4">
        <div
          className="flex items-center space-x-4 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="Velora Logo" className="h-10 w-10" />
          <span className="text-xl font-outfit font-bold text-white">
            Velora
          </span>
        </div>

        <div className="flex items-center space-x-8">
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
            onClick={() => navigate("/Login")}
          >
            Login
          </Button>
        </div>
      </div>
    </nav>
  );
}
