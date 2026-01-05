import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Zap,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  CirclePile,
} from "lucide-react";
import backgroundVideo from "../assets/background.mp4";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({ email: "", password: "" });

    // Validate email
    if (!email.trim()) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    // Validate password
    if (!password.trim()) {
      setErrors((prev) => ({ ...prev, password: "Password is required" }));
      return;
    }

    // If validation passes, proceed with login
    setIsLoading(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  return (
    <div
      style={{ minHeight: "100vh", display: "flex" }}
      className="bg-slate-950 flex-col lg:flex-row"
    >
      {/* Left Side - Branding */}
      <div
        style={{
          flex: "1 1 50%",
          padding: "48px",
          position: "relative",
          overflow: "hidden",
        }}
        className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-slate-900 via-slate-900 to-medical-950"
      >
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        {/* Overlay for better text readability */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            zIndex: 1,
          }}
        />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="bg-gradient-to-br from-medical-500 to-medical-700"
            >
              <CirclePile
                style={{ width: "24px", height: "24px", color: "white" }}
              />
            </div>
            <div>
              <h1
                style={{ fontSize: "24px", fontWeight: "bold", color: "white" }}
              >
                Credential IQ
              </h1>
              <p style={{ fontSize: "14px", color: "#64748b" }}>by HiLabs</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: "480px", position: "relative", zIndex: 2 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "white",
              lineHeight: "1.2",
              marginBottom: "24px",
            }}
          >
            AI-Powered Provider Credentialing
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: "18px", color: "#94a3b8", lineHeight: "1.6" }}
          >
            Automate verification, flag anomalies in real-time, and ensure
            compliance with NCQA, URAC, and CMS standards.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "16px",
              marginTop: "48px",
            }}
          >
            {[
              { label: "Providers Verified", value: "2.5M+" },
              { label: "Avg Processing Time", value: "2.3s" },
              { label: "Compliance Rate", value: "99.7%" },
            ].map((stat) => (
              <div
                key={stat.label}
                style={{
                  padding: "16px",
                  borderRadius: "12px",
                  border: "1px solid #334155",
                }}
                className="bg-slate-800/50"
              >
                <p
                  style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "white",
                  }}
                >
                  {stat.value}
                </p>
                <p style={{ fontSize: "12px", color: "#64748b" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "24px",
            fontSize: "14px",
            color: "#64748b",
            position: "relative",
            zIndex: 2,
          }}
        >
          <span>NCQA Compliant</span>
          <span>•</span>
          <span>URAC Certified</span>
          <span>•</span>
          <span>CMS Approved</span>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div
        style={{
          flex: "1 1 50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "28px",
        }}
        className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 sm:py-8 md:py-10 lg:py-12"
      >
        {/* Background Video for Mobile */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="lg:hidden"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>

        {/* Overlay for better text readability on mobile */}
        <div
          className="lg:hidden"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(15, 23, 42, 0.7)",
            zIndex: 1,
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            width: "100%",
            maxWidth: "400px",
            position: "relative",
            zIndex: 2,
          }}
        >
          <div
            style={{ textAlign: "center" }}
            className="mb-8 sm:mb-10 lg:mb-12"
          >
            {/* Icon — visible ONLY on small screens */}
            <div className="md:hidden">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  className="bg-gradient-to-br from-medical-500 to-medical-700"
                >
                  <CirclePile
                    style={{ width: "24px", height: "24px", color: "white" }}
                  />
                </div>
              </div>
            </div>

            <div className="lg:hidden mb-4">
              <h1
                style={{ fontSize: "20px", fontWeight: "bold", color: "white" }}
                className="text-xl sm:text-2xl"
              >
                Credential IQ
              </h1>
              <p
                style={{ fontSize: "12px", color: "#64748b", marginTop: "4px" }}
                className="text-xs sm:text-sm"
              >
                by HiLabs
              </p>
            </div>

            <h2
              style={{
                fontSize: "28px",
                fontWeight: "bold",
                color: "white",
                marginBottom: "12px",
              }}
              className="text-2xl sm:text-3xl lg:text-[28px]"
            >
              Welcome back
            </h2>

            <p style={{ color: "#64748b" }} className="text-sm sm:text-base">
              Sign in to your account to continue
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            style={{ display: "flex", flexDirection: "column", gap: "24px" }}
            className="gap-5 sm:gap-6 lg:gap-6"
          >
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#94a3b8",
                  marginBottom: "10px",
                }}
                className="text-sm sm:text-sm"
              >
                Email Address
              </label>
              <div style={{ position: "relative" }}>
                <Mail
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    color: errors.email ? "#f87171" : "#64748b",
                  }}
                />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors((prev) => ({ ...prev, email: "" }));
                    }
                  }}
                  placeholder="name@company.com"
                  style={{
                    width: "100%",
                    padding: "12px 12px 12px 44px",
                    borderRadius: "12px",
                    border: errors.email
                      ? "1px solid #f87171"
                      : "1px solid #334155",
                    backgroundColor: "#0f172a",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  className="text-base sm:text-sm"
                />
              </div>
              {errors.email && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#f87171",
                    marginTop: "6px",
                  }}
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#94a3b8",
                  marginBottom: "10px",
                }}
                className="text-sm sm:text-sm"
              >
                Password
              </label>
              <div style={{ position: "relative" }}>
                <Lock
                  style={{
                    position: "absolute",
                    left: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    color: errors.password ? "#f87171" : "#64748b",
                  }}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) {
                      setErrors((prev) => ({ ...prev, password: "" }));
                    }
                  }}
                  placeholder="Enter your password"
                  style={{
                    width: "100%",
                    padding: "12px 44px 12px 44px",
                    borderRadius: "12px",
                    border: errors.password
                      ? "1px solid #f87171"
                      : "1px solid #334155",
                    backgroundColor: "#0f172a",
                    color: "white",
                    fontSize: "16px",
                    outline: "none",
                  }}
                  className="text-base sm:text-sm"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "#64748b",
                    padding: "4px",
                  }}
                  className="touch-manipulation"
                >
                  {showPassword ? (
                    <EyeOff style={{ width: "20px", height: "20px" }} />
                  ) : (
                    <Eye style={{ width: "20px", height: "20px" }} />
                  )}
                </button>
              </div>
              {errors.password && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#f87171",
                    marginTop: "6px",
                  }}
                >
                  {errors.password}
                </p>
              )}
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "14px",
              }}
              className="flex-col sm:flex-row gap-3 sm:gap-0 text-sm"
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  color: "#94a3b8",
                  cursor: "pointer",
                }}
                className="order-2 sm:order-1"
              >
                <input type="checkbox" style={{ accentColor: "#3b82f6" }} />
                Remember me
              </label>
              <a
                href="#"
                style={{ color: "#3b82f6", textDecoration: "none" }}
                className="order-1 sm:order-2"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading || !email.trim() || !password.trim()}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "12px",
                border: "none",
                background: "linear-gradient(to right, #3b82f6, #2563eb)",
                color: "white",
                fontSize: "16px",
                fontWeight: "600",
                cursor:
                  isLoading || !email.trim() || !password.trim()
                    ? "not-allowed"
                    : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                opacity:
                  isLoading || !email.trim() || !password.trim() ? 0.5 : 1,
              }}
              className="touch-manipulation"
            >
              {isLoading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  style={{
                    width: "20px",
                    height: "20px",
                    border: "2px solid white",
                    borderTopColor: "transparent",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                <>
                  Sign In
                  <ArrowRight style={{ width: "20px", height: "20px" }} />
                </>
              )}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "32px",
              fontSize: "14px",
              color: "#64748b",
            }}
            className="text-xs sm:text-sm"
          >
            Don't have an account?{" "}
            <a href="#" style={{ color: "#3b82f6", textDecoration: "none" }}>
              Contact your administrator
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
