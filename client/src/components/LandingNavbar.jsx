// LandingNavbar.jsx
import React from "react";
import { Link } from "react-router-dom"; // Removed useNavigate
import { Button } from "./ui/Button";
import { cn } from "@/lib/utils";

export const LandingNavbar = () => {
  const token = localStorage.getItem("token");
  const isSignedIn = !!token;

  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link to="/" className="flex items-center">
        <div className="relative h-8 w-8 mr-4">
          <img fill="true" alt="Logo" src="/logo.png" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", "font-montserrat")}>
          AI Shomachar
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link to={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button variant="outline" className="rounded-full">
            {isSignedIn ? "Dashboard" : "Get Started"}
          </Button>
        </Link>
      </div>
    </nav>
  );
};
