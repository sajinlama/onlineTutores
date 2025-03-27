"use client";
import React, { useState } from "react";  // Added useState import
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import axios from "axios";
import ThemeSwitcher from "./themswitcher";

const URI = "http://localhost:5001/api/register";
export default function Register() {

  const [fullName, setfullName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");



  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const registerData ={
      name:fullName,
      email:email,
      password:password
    }

    try {
      const response = await axios.post(URI,registerData);
      console.log("the data is ",response.data)
      setfullName("");
      setemail("");
      setpassword("");
      
    } catch (error) {
      console.log(error)
      
    }
    console.log("Form submitted");
  };



  return (
    <div>
       <nav className="flex justify-end p-5 "><ThemeSwitcher/></nav>
    <div className="relative flex h-screen justify-center items-center">
     

    <div className="relative shadow-input mx-auto w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
      <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
        Welcome to EduMentor
      </h2>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
        Access personalized lessons with expert tutors
      </p>
  
      <form className="my-8" onSubmit={handleSubmit} autoComplete="off">
        <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
          <LabelInputContainer>
            <Label htmlFor="fullname">Full name</Label>
            <Input
              id="fullname"
              placeholder="yourname"
              type="text"
              onChange={(e) => setfullName(e.target.value)}
              value={fullName}
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            placeholder="projectmayhem@fc.com"
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
          </div>
        </LabelInputContainer>
  
        <button
          className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
          type="submit"
        >
          Sign up &rarr;
          <BottomGradient />
        </button>
      </form>
  
      <p
  className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400"
>
  Have an account already?{" "}
  <Link
    to="/"
    className="font-medium text-neutral-600 hover:text-black dark:text-neutral-400 dark:hover:text-white cursor-pointer"

  >
    Login 
  </Link>
</p>

  
     
    </div>
  </div>
  </div>
  
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
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