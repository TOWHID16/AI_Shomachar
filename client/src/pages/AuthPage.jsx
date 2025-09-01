import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname === "/sign-in";
  const [loading, setLoading] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setLoading(true);
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    try {
      const response = await axios.post(endpoint, values);
      localStorage.setItem("token", response.data.token);
      toast.success(
        isLogin ? "Logged in successfully!" : "Registration successful!"
      );
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.msg || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">
          {isLogin ? "Welcome Back" : "Create an Account"}
        </CardTitle>
        <CardDescription>
          {isLogin
            ? "Sign in to continue to AI Shomachar."
            : "Sign up to start using AI Shomachar."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              type="email"
              placeholder="e.g. user@example.com"
              disabled={loading}
              {...form.register("email")}
            />
            {form.formState.errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              disabled={loading}
              {...form.register("password")}
            />
            {form.formState.errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link to={isLogin ? "/sign-up" : "/sign-in"} className="underline">
            {isLogin ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthPage;
