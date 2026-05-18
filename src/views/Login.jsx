"use client";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { loginUser, signUpUser } from "../services/auth";

import NeuralBg from "../components/NeuralBg";
import {
  Mail,
  Lock,
  CircleUser,
  ArrowRight,
  Code,
} from "lucide-react";
const logo = "/logo.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userName, setUserName] = useState("");
  
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;
    if (isLogin) {
      response = await loginUser(formData.email, formData.password);
    } else {
      response = await signUpUser(userName, formData.email, formData.password);
    }

    if (response?.error) {
      alert(response.error.message);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#030303] flex items-center justify-center p-6 relative overflow-hidden font-outfit">
      {/* Background elements */}
      <NeuralBg side={isLogin ? "right" : "left"} />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ba8ffa]/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8791fe]/5 blur-[120px] rounded-full" />

      <div className="w-full max-w-md relative z-10">
        {/* Logo/Brand */}
        <div 
          className="flex flex-col items-center mb-10 group cursor-pointer"
          onClick={() => router.push("/")}
        >
          <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-[#ba8ffa]/30 transition-all duration-500 backdrop-blur-xl overflow-hidden p-3">
            <img src={logo} alt="Velora Logo" className="w-full h-full object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Velora
          </h1>
          <p className="text-gray-500 font-spectral italic text-lg mt-1">
            Revisit what matters.
          </p>
        </div>

        {/* Auth Card */}
        <div className="bg-white/[0.02] border border-white/5 backdrop-blur-3xl rounded-[2.5rem] p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ba8ffa]/30 to-transparent" />

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl text-white font-semibold">
              {isLogin ? "Welcome back" : "Create account"}
            </h2>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#8791fe] text-sm font-medium hover:underline underline-offset-4 transition-all"
            >
              {isLogin ? "Sign up instead" : "Log in instead"}
            </button>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>

            {!isLogin && (
              <div className="relative group">
                <CircleUser
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                  size={20}
                />
                <input
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="User Name"
                  required
                  className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/[0.07] transition-all duration-300"
                />
              </div>
            )}

            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                size={20}
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email address"
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/[0.07] transition-all duration-300"
              />
            </div>

            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-[#ba8ffa] transition-colors"
                size={20}
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                required
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-gray-600 focus:outline-none focus:border-[#ba8ffa]/30 focus:bg-white/[0.07] transition-all duration-300"
              />
            </div>

            <button 
              type="submit"
              className="w-full bg-[#ba8ffa] text-black font-bold py-4 rounded-2xl hover:shadow-[0_0_30px_rgba(186,143,250,0.3)] hover:scale-[1.02] transition-all duration-500 flex items-center justify-center gap-2 mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight size={20} />
            </button>
          </form>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-2xl py-3.5 text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300">
              <CircleUser size={20} />
              <span className="text-sm font-medium">Google</span>
            </button>
            <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 rounded-2xl py-3.5 text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300">
              <Code size={20} />
              <span className="text-sm font-medium">GitHub</span>
            </button>
          </div>

        </div>

        {/* Footer info */}
        <p className="text-center text-gray-600 text-sm mt-8 px-6 font-spectral">
          By continuing, you agree to Velora's{" "}
          <a
            href="#"
            className="text-gray-500 hover:text-white underline underline-offset-4"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="#"
            className="text-gray-500 hover:text-white underline underline-offset-4"
          >
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default Login;