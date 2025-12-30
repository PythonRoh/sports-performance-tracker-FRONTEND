import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Upload from "./pages/Upload";
import AIInsights from "./pages/AIInsights";
import MainLayout from "./layouts/MainLayout";

export default function App() {
  const token = localStorage.getItem("token");

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected routes with Navbar */}
      <Route element={token ? <MainLayout /> : <Navigate to="/login" />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/ai-insights" element={<AIInsights />} />
      </Route>
    </Routes>
  );
}
