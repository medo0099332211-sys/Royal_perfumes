import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown, Eye, EyeOff, Lock, User } from "lucide-react";
import { useAdminAuth } from "@/hooks/useProducts";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAdminAuth();
  const { t, isRTL } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      const success = login(username, password);
      if (success) {
        toast.success(isRTL ? "مرحباً بك، مسؤول!" : "Welcome back, Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error(isRTL ? "بيانات غير صحيحة. حاول مرة أخرى." : "Invalid credentials. Please try again.");
        setLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-royal-black flex items-center justify-center px-6 relative overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-gold-500/3 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-gold-500/2 blur-[100px] rounded-full" />
      </div>

      <div className="w-full max-w-md relative z-10" style={{ animation: "fadeUp 0.7s ease-out both" }}>
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-gold-gradient flex items-center justify-center mx-auto mb-4 animate-float">
            <Crown className="w-8 h-8 text-royal-black" />
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-1">{t("adminPanel")}</h1>
          <p className="text-xs text-gold-500 tracking-widest uppercase font-sans">{t("brandName")}</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="font-serif text-xl font-semibold text-white mb-6 text-center">
            {t("secureLogin")} <span className="gold-text">{t("login")}</span>
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                {t("username")}
              </label>
              <div className="relative">
                <User className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/40`} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder={t("enterUsername")}
                  className={`input-luxury w-full ${isRTL ? "pr-10 pl-4" : "pl-10 pr-4"} py-3 rounded-lg text-sm`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs text-gold-500 tracking-widest uppercase mb-1.5 font-sans">
                {t("password")}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isRTL ? "right-3.5" : "left-3.5"} top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500/40`} />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={t("enterPassword")}
                  className={`input-luxury w-full ${isRTL ? "pr-10 pl-10" : "pl-10 pr-10"} py-3 rounded-lg text-sm`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isRTL ? "left-3.5" : "right-3.5"} top-1/2 -translate-y-1/2 text-gold-500/40 hover:text-gold-400 transition-colors`}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3.5 rounded-lg text-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? t("authenticating") : t("loginToDashboard")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
