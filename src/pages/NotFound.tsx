import { Link } from "react-router-dom";
import { Crown } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-royal-black flex items-center justify-center px-6">
      <div className="text-center" style={{ animation: "fadeUp 0.6s ease-out both" }}>
        <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-6">
          <Crown className="w-8 h-8 text-royal-black" />
        </div>
        <p className="font-serif text-7xl font-bold gold-text mb-4">404</p>
        <h1 className="font-serif text-2xl font-semibold text-white mb-3">Page Not Found</h1>
        <p className="text-sm text-white/40 font-sans mb-8 max-w-sm mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link to="/" className="btn-gold px-8 py-3.5 rounded text-sm">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
