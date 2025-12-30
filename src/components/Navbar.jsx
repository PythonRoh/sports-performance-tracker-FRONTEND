import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const navLinkClass = (path) =>
    `px-4 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-blue-600 text-white"
        : "text-slate-300 hover:text-white hover:bg-slate-800"
    }`;

  return (
    <nav className="w-full bg-slate-900 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Logo + Title */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            🏃
          </div>
          <span className="text-lg font-semibold text-blue-400 tracking-wide">
            Sports Tracker
          </span>
        </div>

        {/* Center: Navigation */}
        <div className="flex items-center gap-2">
          <Link to="/" className={navLinkClass("/")}>
            Dashboard
          </Link>

          <Link to="/analytics" className={navLinkClass("/analytics")}>
            Analytics
          </Link>

          <Link to="/upload" className={navLinkClass("/upload")}>
            Upload
          </Link>
          <Link to="/ai-insights" className={navLinkClass("/ai-insights")}>
            AI Insights
          </Link>
        </div>

        {/* Right: Logout */}
        <Button variant="destructive" className="text-sm" onClick={logout}>
          Logout
        </Button>
      </div>
    </nav>
  );
}
