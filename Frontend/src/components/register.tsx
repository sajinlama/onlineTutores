"use client";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";

const URI = "http://localhost:5001/api/register";

export default function Register() {
  const navigate = useNavigate();
  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    const registerData = {
      name: fullName,
      email: email,
      password: password
    };

    
console.log(registerData);
    try {
      const response = await axios.post(URI, registerData, {
        withCredentials: true 
      });
      
      if (response.status === 201) {
        // Fixed space artifact inside path route
        navigate("/home");
      }
      
      setfullName("");
      setemail("");
      setpassword("");
    } catch (error: any) {
      console.error("Registration error:", error);
      setError(error.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fafafa] dark:bg-[#030303] flex items-center justify-center p-4 relative overflow-hidden font-sans antialiased text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Background Micro Decorative Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/5 dark:bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 dark:bg-blue-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative w-full max-w-md bg-white/60 dark:bg-zinc-950/40 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800/80 rounded-2xl p-6 md:p-8 shadow-xl dark:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 group">
        
        {/* Header Icon Block */}
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-11 h-11 bg-zinc-900 dark:bg-zinc-100 rounded-xl flex items-center justify-center shadow-sm mb-4">
            <BookOpen className="h-5 w-5 text-white dark:text-black" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            Create an account
          </h2>
          <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
            Access personalized lessons with expert tutors
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-sm rounded-xl font-medium animate-in fade-in slide-in-from-top-2 duration-200">
            {error}
          </div>
        )}
    
        <form onSubmit={handleSubmit} autoComplete="off" className="space-y-5">
          <LabelInputContainer>
            <Label htmlFor="fullname" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Full Name</Label>
            <Input
              id="fullname"
              placeholder="Shivaji Patil"
              type="text"
              onChange={(e) => setfullName(e.target.value)}
              value={fullName}
              disabled={isLoading}
              className="h-11 rounded-xl bg-white/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 placeholder-zinc-400 dark:placeholder-zinc-600"
              required
              minLength={5}
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="email" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Email Address</Label>
            <Input
              id="email"
              placeholder="shivajipatil@gmail.com"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              disabled={isLoading}
              className="h-11 rounded-xl bg-white/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 placeholder-zinc-400 dark:placeholder-zinc-600"
              required
            />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password" className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
              disabled={isLoading}
              className="h-11 rounded-xl bg-white/80 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 focus-visible:ring-zinc-400 dark:focus-visible:ring-zinc-700 placeholder-zinc-400 dark:placeholder-zinc-600"
              required
              minLength={8}
              maxLength={20}
            />
            <p className="text-[11px] text-zinc-400 dark:text-zinc-500 pl-0.5 leading-normal">
              Must be at least 8 characters with letters and numbers.
            </p>
          </LabelInputContainer>
    
          <button
            type="submit"
            disabled={isLoading}
            className="group/btn relative h-11 w-full cursor-pointer rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-black font-semibold text-sm shadow-md transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none overflow-hidden flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              <>
                <span>Sign Up</span>
                <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" />
              </>
            )}
            <BottomGradient />
          </button>
        </form>
    
        <p className="mt-6 text-center text-sm text-zinc-500 dark:text-zinc-400">
          Have an account already?{" "}
          <Link
            to="/login"
            className="font-semibold text-zinc-800 dark:text-zinc-200 hover:underline underline-offset-4 cursor-pointer"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex w-full flex-col space-y-2", className)}>
      {children}
    </div>
  );
};