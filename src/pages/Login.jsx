import { useState } from "react";
import { login } from "../api/authApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errorOpen, setErrorOpen] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res.data.token);
      window.location.href = "/";
    } catch {
      setErrorOpen(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-slate-900 border border-slate-800 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-blue-400">
            Welcome Back
          </CardTitle>
          <p className="text-sm text-slate-400">
            Log in to track your performance
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />

            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Login
            </Button>
          </form>

          <p className="text-sm text-center text-slate-400 mt-6">
            New user?{" "}
            <Link to="/signup" className="text-blue-400 hover:underline">
              Sign up
            </Link>
          </p>
        </CardContent>
      </Card>

      {/* Error Dialog */}
      <Dialog open={errorOpen} onOpenChange={setErrorOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Login Failed</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-slate-400">
            Invalid email or password. Please try again.
          </p>
        </DialogContent>
      </Dialog>
    </div>
  );
}
