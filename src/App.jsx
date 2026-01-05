import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Bell,
  RefreshCw,
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  LogOut,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Plus,
  Filter,
  Download,
  MoreVertical,
  CheckCircle2,
  Clock,
  XCircle,
  X,
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  Shield,
  Award,
  FileCheck,
  User,
  Key,
  Save,
  AlertTriangle,
  CheckCircle,
  Menu,
  CirclePile,
} from "lucide-react";

import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";

import { sidebarNavItems } from "./data/credentialIQData";

const iconMap = {
  LayoutDashboard,
  Users,
  FileText,
  ShieldCheck,
  BarChart3,
  Settings,
};

// ============ MODAL COMPONENT ============
function Modal({ isOpen, onClose, title, children, width = "500px" }) {
  if (!isOpen) return null;
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(4px)",
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={(e) => e.stopPropagation()}
          style={{
            width,
            maxHeight: "85vh",
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "16px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 20px",
              borderBottom: "1px solid #1e293b",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <h3
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "white",
                margin: 0,
              }}
            >
              {title}
            </h3>
            <button
              onClick={onClose}
              style={{
                background: "none",
                border: "none",
                color: "#64748b",
                cursor: "pointer",
                padding: "4px",
              }}
            >
              <X style={{ width: "18px", height: "18px" }} />
            </button>
          </div>
          <div
            style={{
              padding: "20px",
              maxHeight: "calc(85vh - 60px)",
              overflow: "auto",
            }}
          >
            {children}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ============ SIDEBAR ============
function Sidebar({ collapsed, onToggle }) {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <aside
      style={{
        width: collapsed ? "72px" : "220px",
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        backgroundColor: "#0f172a",
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        zIndex: 50,
        transition: "width 0.2s",
      }}
    >
      <div
        style={{
          padding: "14px",
          borderBottom: "1px solid #1e293b",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <div
          style={{
            width: "34px",
            height: "34px",
            borderRadius: "8px",
            background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <CirclePile style={{ width: "16px", height: "16px", color: "white" }} />
        </div>
        {!collapsed && (
          <div>
            <h1
              style={{
                fontSize: "15px",
                fontWeight: "700",
                color: "white",
                margin: 0,
              }}
            >
              Credential IQ
            </h1>
          </div>
        )}
      </div>
      <nav style={{ flex: 1, padding: "8px", overflow: "auto" }}>
        {sidebarNavItems.map((item) => {
          const Icon = iconMap[item.icon] || LayoutDashboard;
          const isActive =
            location.pathname === item.path ||
            (item.id === "dashboard" && location.pathname === "/dashboard");
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "10px 12px",
                marginBottom: "2px",
                borderRadius: "8px",
                border: isActive ? "1px solid rgba(59,130,246,0.3)" : "none",
                backgroundColor: isActive
                  ? "rgba(59,130,246,0.12)"
                  : "transparent",
                color: isActive ? "#60a5fa" : "#94a3b8",
                cursor: "pointer",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
            >
              <Icon style={{ width: "18px", height: "18px" }} />
              {!collapsed && (
                <span style={{ fontSize: "13px", fontWeight: "500" }}>
                  {item.label}
                </span>
              )}
            </button>
          );
        })}
      </nav>
      <div style={{ padding: "8px", borderTop: "1px solid #1e293b" }}>
        <button
          onClick={onToggle}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: "10px",
            padding: "10px 12px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "transparent",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          {collapsed ? (
            <ChevronRight style={{ width: "18px", height: "18px" }} />
          ) : (
            <>
              <ChevronLeft style={{ width: "18px", height: "18px" }} />
              <span style={{ fontSize: "13px" }}>Collapse</span>
            </>
          )}
        </button>
      </div>
      {!collapsed && (
        <div
          style={{
            padding: "12px",
            borderTop: "1px solid #1e293b",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "32px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #10b981, #059669)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            SJ
          </div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                fontSize: "13px",
                fontWeight: "500",
                color: "white",
                margin: 0,
              }}
            >
              Sarah Johnson
            </p>
          </div>
          <button
            onClick={() => (window.location.href = "/")}
            style={{
              background: "none",
              border: "none",
              color: "#64748b",
              cursor: "pointer",
              padding: "4px",
            }}
          >
            <LogOut style={{ width: "16px", height: "16px" }} />
          </button>
        </div>
      )}
    </aside>
  );
}

// ============ PAGE LAYOUT ============
function PageLayout({ children, title, subtitle, actions }) {
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const notificationRef = useRef(null);
  const mainRef = useRef(null);

  // Handle responsive margin and close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      // Close mobile menu if resizing to desktop
      if (!mobile && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }

      if (mainRef.current) {
        if (window.innerWidth >= 1024) {
          mainRef.current.style.marginLeft = collapsed ? "72px" : "220px";
        } else {
          mainRef.current.style.marginLeft = "0";
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [collapsed, isMobileMenuOpen]);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showNotifications]);

  // Dummy notifications
  const [notifications] = useState([
    {
      id: 1,
      type: "alert",
      title: "New Application Pending Review",
      message:
        "Dr. Sarah Mitchell's credentialing application requires your attention",
      time: "5 minutes ago",
      read: false,
    },
    {
      id: 2,
      type: "success",
      title: "Verification Completed",
      message:
        "Dr. James Morrison's credentials have been successfully verified",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "warning",
      title: "Compliance Deadline Approaching",
      message: "NCQA audit documentation is due in 3 days",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 4,
      type: "info",
      title: "System Update Available",
      message: "New features have been added to the credentialing workflow",
      time: "1 day ago",
      read: true,
    },
    {
      id: 5,
      type: "alert",
      title: "Anomaly Detected",
      message: "Unusual pattern detected in provider application #APP-004",
      time: "2 days ago",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle style={{ width: "16px", height: "16px" }} />;
      case "success":
        return <CheckCircle style={{ width: "16px", height: "16px" }} />;
      case "warning":
        return <AlertCircle style={{ width: "16px", height: "16px" }} />;
      default:
        return <Bell style={{ width: "16px", height: "16px" }} />;
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case "alert":
        return "#f87171";
      case "success":
        return "#4ade80";
      case "warning":
        return "#fbbf24";
      default:
        return "#60a5fa";
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#020617" }}>
      <Sidebar
        navItems={sidebarNavItems}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        isMobileOpen={isMobileMenuOpen}
        onMobileClose={() => setIsMobileMenuOpen(false)}
      />
      <main
        ref={mainRef}
        className="transition-all duration-200"
        style={{
          marginLeft: isMobile ? "0" : collapsed ? "72px" : "220px",
          transition: "margin-left 0.2s",
          minHeight: "100vh",
        }}
      >
        <header
          style={{
            position: "sticky",
            top: 0,
            zIndex: 40,
            backgroundColor: "rgba(2,6,23,0.95)",
            backdropFilter: "blur(8px)",
            borderBottom: "1px solid #1e293b",
            padding: "12px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="px-4 sm:px-5 lg:px-5"
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {/* Mobile Menu Button - Only visible on mobile */}
            {isMobile && (
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5" />
              </button>
            )}
            <div>
              <h1
                style={{
                  fontSize: "18px",
                  fontWeight: "700",
                  color: "white",
                  margin: 0,
                }}
              >
                {title}
              </h1>
              {subtitle && (
                <p
                  style={{
                    fontSize: "12px",
                    color: "#64748b",
                    margin: "2px 0 0 0",
                  }}
                >
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          <div
            ref={notificationRef}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              position: "relative",
            }}
          >
            {actions}
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              style={{
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #1e293b",
                backgroundColor: "#0f172a",
                color: "#64748b",
                cursor: "pointer",
                position: "relative",
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = "#3b82f6";
                e.currentTarget.style.backgroundColor = "#1e293b";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.backgroundColor = "#0f172a";
              }}
            >
              <Bell style={{ width: "16px", height: "16px" }} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-2px",
                    right: "-2px",
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    backgroundColor: "#ef4444",
                    color: "white",
                    fontSize: "10px",
                    fontWeight: "600",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "2px solid #020617",
                  }}
                >
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 8px)",
                  right: 0,
                  width: "380px",
                  maxHeight: "500px",
                  backgroundColor: "#0f172a",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                  zIndex: 1000,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    padding: "16px",
                    borderBottom: "1px solid #1e293b",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      fontSize: "16px",
                      fontWeight: "600",
                      color: "white",
                      margin: 0,
                    }}
                  >
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span
                      style={{
                        padding: "2px 8px",
                        borderRadius: "12px",
                        backgroundColor: "#3b82f6",
                        color: "white",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {unreadCount} new
                    </span>
                  )}
                </div>

                {/* Notifications List */}
                <div
                  style={{
                    overflowY: "auto",
                    maxHeight: "400px",
                  }}
                >
                  {notifications.length === 0 ? (
                    <div
                      style={{
                        padding: "40px 20px",
                        textAlign: "center",
                        color: "#64748b",
                      }}
                    >
                      <Bell
                        style={{
                          width: "32px",
                          height: "32px",
                          margin: "0 auto 12px",
                          opacity: 0.5,
                        }}
                      />
                      <p style={{ margin: 0, fontSize: "14px" }}>
                        No notifications
                      </p>
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        style={{
                          padding: "12px 16px",
                          borderBottom: "1px solid #1e293b",
                          backgroundColor: notification.read
                            ? "transparent"
                            : "rgba(59,130,246,0.05)",
                          cursor: "pointer",
                          transition: "background-color 0.2s",
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.backgroundColor = "#1e293b";
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.backgroundColor =
                            notification.read
                              ? "transparent"
                              : "rgba(59,130,246,0.05)";
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "12px",
                            alignItems: "flex-start",
                          }}
                        >
                          <div
                            style={{
                              width: "32px",
                              height: "32px",
                              borderRadius: "8px",
                              backgroundColor: `${getNotificationColor(
                                notification.type
                              )}20`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              color: getNotificationColor(notification.type),
                              flexShrink: 0,
                            }}
                          >
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p
                              style={{
                                fontSize: "14px",
                                fontWeight: notification.read ? "400" : "600",
                                color: "white",
                                margin: "0 0 4px 0",
                              }}
                            >
                              {notification.title}
                            </p>
                            <p
                              style={{
                                fontSize: "12px",
                                color: "#94a3b8",
                                margin: "0 0 4px 0",
                                lineHeight: "1.4",
                              }}
                            >
                              {notification.message}
                            </p>
                            <p
                              style={{
                                fontSize: "11px",
                                color: "#64748b",
                                margin: 0,
                              }}
                            >
                              {notification.time}
                            </p>
                          </div>
                          {!notification.read && (
                            <div
                              style={{
                                width: "8px",
                                height: "8px",
                                borderRadius: "50%",
                                backgroundColor: "#3b82f6",
                                flexShrink: 0,
                                marginTop: "4px",
                              }}
                            />
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                {notifications.length > 0 && (
                  <div
                    style={{
                      padding: "12px 16px",
                      borderTop: "1px solid #1e293b",
                      textAlign: "center",
                    }}
                  >
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        color: "#60a5fa",
                        cursor: "pointer",
                        fontSize: "13px",
                        fontWeight: "500",
                        padding: "4px 8px",
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.color = "#93c5fd";
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.color = "#60a5fa";
                      }}
                    >
                      View all notifications
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </header>
        <div
          style={{ padding: "12px 16px" }}
          className="px-3 sm:px-4 md:px-5 lg:px-6"
        >
          {children}
        </div>
      </main>
    </div>
  );
}

// ============ DASHBOARD ============
function DashboardPage() {
  return (
    <PageLayout title="Dashboard" subtitle="Provider credentialing overview">
      <Dashboard />
    </PageLayout>
  );
}

// ============ PROVIDERS PAGE ============
const mockProviders = [
  {
    id: "PRV-001",
    name: "Dr. Sarah Mitchell",
    specialty: "Cardiology",
    npi: "1234567890",
    status: "Active",
    location: "New York, NY",
    lastVerified: "2026-01-02",
    phone: "(555) 123-4567",
    email: "smitchell@hospital.com",
  },
  {
    id: "PRV-002",
    name: "Dr. James Morrison",
    specialty: "Internal Medicine",
    npi: "0987654321",
    status: "Suspended",
    location: "Los Angeles, CA",
    lastVerified: "2025-12-15",
    phone: "(555) 987-6543",
    email: "jmorrison@clinic.com",
  },
  {
    id: "PRV-003",
    name: "Dr. Emily Chen",
    specialty: "Pediatrics",
    npi: "1122334455",
    status: "Active",
    location: "Chicago, IL",
    lastVerified: "2026-01-04",
    phone: "(555) 456-7890",
    email: "echen@medical.org",
  },
  {
    id: "PRV-004",
    name: "Dr. Michael Brown",
    specialty: "Orthopedics",
    npi: "5566778899",
    status: "Pending",
    location: "Houston, TX",
    lastVerified: "2025-11-20",
    phone: "(555) 321-0987",
    email: "mbrown@ortho.com",
  },
  {
    id: "PRV-005",
    name: "Dr. Lisa Wang",
    specialty: "Dermatology",
    npi: "6677889900",
    status: "Active",
    location: "Phoenix, AZ",
    lastVerified: "2026-01-03",
    phone: "(555) 654-3210",
    email: "lwang@skin.care",
  },
];

function ProvidersPage() {
  const [filterModal, setFilterModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [exportModal, setExportModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("All");
  const [newProvider, setNewProvider] = useState({
    name: "",
    specialty: "",
    npi: "",
    email: "",
    phone: "",
    location: "",
  });

  const filteredProviders =
    statusFilter === "All"
      ? mockProviders
      : mockProviders.filter((p) => p.status === statusFilter);
  const statusColors = {
    Active: { bg: "#052e16", color: "#4ade80" },
    Suspended: { bg: "#450a0a", color: "#f87171" },
    Pending: { bg: "#422006", color: "#fbbf24" },
  };

  return (
    <PageLayout title="Providers" subtitle="Manage provider credentials">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <div style={{ display: "flex", gap: "8px" }}>
          <button
            onClick={() => setFilterModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              backgroundColor: "#0f172a",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Filter style={{ width: "14px", height: "14px" }} />
            Filter
            {statusFilter !== "All" && (
              <span
                style={{
                  marginLeft: "4px",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  backgroundColor: "#3b82f6",
                  color: "white",
                  fontSize: "11px",
                }}
              >
                {statusFilter}
              </span>
            )}
          </button>
          <button
            onClick={() => setExportModal(true)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 12px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              backgroundColor: "#0f172a",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            <Download style={{ width: "14px", height: "14px" }} />
            Export
          </button>
        </div>
        <button
          onClick={() => setAddModal(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "8px 14px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            fontSize: "13px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          <Plus style={{ width: "14px", height: "14px" }} />
          Add Provider
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #1e293b" }}>
              {[
                "Provider",
                "Specialty",
                "NPI",
                "Status",
                "Location",
                "Last Verified",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: "11px",
                    fontWeight: "500",
                    color: "#64748b",
                    textTransform: "uppercase",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredProviders.map((p) => (
              <tr key={p.id} style={{ borderBottom: "1px solid #1e293b" }}>
                <td style={{ padding: "12px 14px" }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "32px",
                        height: "32px",
                        borderRadius: "50%",
                        backgroundColor: "#1e293b",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#94a3b8",
                        fontSize: "12px",
                        fontWeight: "500",
                      }}
                    >
                      {p.name
                        .split(" ")
                        .slice(1)
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <p
                        style={{
                          fontSize: "13px",
                          fontWeight: "500",
                          color: "white",
                          margin: 0,
                        }}
                      >
                        {p.name}
                      </p>
                      <p
                        style={{
                          fontSize: "11px",
                          color: "#64748b",
                          margin: 0,
                        }}
                      >
                        {p.email}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  {p.specialty}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: "12px",
                    color: "#94a3b8",
                    fontFamily: "monospace",
                  }}
                >
                  {p.npi}
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span
                    style={{
                      padding: "3px 8px",
                      borderRadius: "20px",
                      fontSize: "11px",
                      fontWeight: "500",
                      backgroundColor: statusColors[p.status].bg,
                      color: statusColors[p.status].color,
                    }}
                  >
                    {p.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  {p.location}
                </td>
                <td
                  style={{
                    padding: "12px 14px",
                    fontSize: "12px",
                    color: "#94a3b8",
                  }}
                >
                  {p.lastVerified}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Modal */}
      <Modal
        isOpen={filterModal}
        onClose={() => setFilterModal(false)}
        title="Filter Providers"
        width="320px"
      >
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "12px" }}>
          Status
        </p>
        {["All", "Active", "Pending", "Suspended"].map((s) => (
          <button
            key={s}
            onClick={() => {
              setStatusFilter(s);
              setFilterModal(false);
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              border:
                statusFilter === s ? "1px solid #3b82f6" : "1px solid #1e293b",
              backgroundColor:
                statusFilter === s ? "rgba(59,130,246,0.1)" : "transparent",
              color: statusFilter === s ? "#60a5fa" : "#94a3b8",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {s}
          </button>
        ))}
      </Modal>

      {/* Export Modal */}
      <Modal
        isOpen={exportModal}
        onClose={() => setExportModal(false)}
        title="Export Providers"
        width="320px"
      >
        <p style={{ fontSize: "13px", color: "#94a3b8", marginBottom: "12px" }}>
          Select format
        </p>
        {["CSV", "Excel (.xlsx)", "PDF"].map((f) => (
          <button
            key={f}
            onClick={() => {
              alert(`Exporting as ${f}...`);
              setExportModal(false);
            }}
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "8px",
              borderRadius: "8px",
              border: "1px solid #1e293b",
              backgroundColor: "transparent",
              color: "#94a3b8",
              fontSize: "13px",
              cursor: "pointer",
              textAlign: "left",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Download style={{ width: "14px", height: "14px" }} />
            {f}
          </button>
        ))}
      </Modal>

      {/* Add Provider Modal */}
      <Modal
        isOpen={addModal}
        onClose={() => setAddModal(false)}
        title="Add New Provider"
        width="450px"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {[
            { k: "name", l: "Full Name", p: "Dr. John Smith" },
            { k: "specialty", l: "Specialty", p: "Cardiology" },
            { k: "npi", l: "NPI Number", p: "1234567890" },
            { k: "email", l: "Email", p: "doctor@hospital.com" },
            { k: "phone", l: "Phone", p: "(555) 123-4567" },
            { k: "location", l: "Location", p: "City, State" },
          ].map((f) => (
            <div key={f.k}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginBottom: "6px",
                }}
              >
                {f.l}
              </label>
              <input
                value={newProvider[f.k]}
                onChange={(e) =>
                  setNewProvider({ ...newProvider, [f.k]: e.target.value })
                }
                placeholder={f.p}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  backgroundColor: "#020617",
                  color: "white",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            alert("Provider added!");
            setAddModal(false);
            setNewProvider({
              name: "",
              specialty: "",
              npi: "",
              email: "",
              phone: "",
              location: "",
            });
          }}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
          }}
        >
          Add Provider
        </button>
      </Modal>
    </PageLayout>
  );
}

// ============ APPLICATIONS PAGE ============
const mockApplications = [
  {
    id: "APP-001",
    provider: "Dr. Robert Lee",
    type: "Initial",
    submitted: "2026-01-04",
    status: "In Review",
    progress: 75,
    priority: "High",
    specialty: "Neurology",
    documents: 12,
    completedDocs: 9,
  },
  {
    id: "APP-002",
    provider: "Dr. Amanda Foster",
    type: "Renewal",
    submitted: "2026-01-03",
    status: "Pending Documents",
    progress: 40,
    priority: "Medium",
    specialty: "Psychiatry",
    documents: 8,
    completedDocs: 3,
  },
  {
    id: "APP-003",
    provider: "Dr. Thomas Wright",
    type: "Initial",
    submitted: "2026-01-02",
    status: "Approved",
    progress: 100,
    priority: "Low",
    specialty: "Anesthesiology",
    documents: 15,
    completedDocs: 15,
  },
  {
    id: "APP-004",
    provider: "Dr. Patricia Nguyen",
    type: "Re-credentialing",
    submitted: "2026-01-01",
    status: "In Review",
    progress: 60,
    priority: "High",
    specialty: "Dermatology",
    documents: 10,
    completedDocs: 6,
  },
  {
    id: "APP-005",
    provider: "Dr. Kevin Martinez",
    type: "Renewal",
    submitted: "2025-12-30",
    status: "Rejected",
    progress: 100,
    priority: "Medium",
    specialty: "Oncology",
    documents: 14,
    completedDocs: 14,
    rejectionReason: "License verification failed",
  },
];

function ApplicationsPage() {
  const [selectedApp, setSelectedApp] = useState(null);
  const statusIcons = {
    "In Review": Clock,
    "Pending Documents": AlertCircle,
    Approved: CheckCircle2,
    Rejected: XCircle,
  };
  const statusColors = {
    "In Review": "#60a5fa",
    "Pending Documents": "#fbbf24",
    Approved: "#4ade80",
    Rejected: "#f87171",
  };

  return (
    <PageLayout
      title="Applications"
      subtitle="Track credentialing applications"
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {[
          { l: "Total", v: 156, c: "#3b82f6" },
          { l: "In Review", v: 42, c: "#60a5fa" },
          { l: "Pending", v: 23, c: "#fbbf24" },
          { l: "Completed", v: 91, c: "#4ade80" },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                fontWeight: "700",
                color: s.c,
                margin: 0,
              }}
            >
              {s.v}
            </p>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                margin: "2px 0 0 0",
              }}
            >
              {s.l}
            </p>
          </div>
        ))}
      </div>

      <div
        style={{
          backgroundColor: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "14px",
        }}
      >
        {mockApplications.map((app) => {
          const Icon = statusIcons[app.status];
          return (
            <div
              key={app.id}
              onClick={() => setSelectedApp(app)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "14px",
                padding: "12px",
                backgroundColor: "#020617",
                borderRadius: "10px",
                marginBottom: "8px",
                cursor: "pointer",
                border: "1px solid #1e293b",
                transition: "border-color 0.2s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "#3b82f6")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "#1e293b")
              }
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FileText
                  style={{ width: "16px", height: "16px", color: "#64748b" }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontSize: "13px",
                    fontWeight: "500",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {app.provider}
                </p>
                <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                  {app.id} • {app.type}
                </p>
              </div>
              <div style={{ width: "100px" }}>
                <div
                  style={{
                    height: "5px",
                    backgroundColor: "#1e293b",
                    borderRadius: "3px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${app.progress}%`,
                      height: "100%",
                      backgroundColor: statusColors[app.status],
                    }}
                  />
                </div>
                <p
                  style={{
                    fontSize: "10px",
                    color: "#64748b",
                    margin: "3px 0 0 0",
                  }}
                >
                  {app.progress}%
                </p>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "4px",
                  padding: "4px 8px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              >
                <Icon
                  style={{
                    width: "12px",
                    height: "12px",
                    color: statusColors[app.status],
                  }}
                />
                <span
                  style={{ fontSize: "11px", color: statusColors[app.status] }}
                >
                  {app.status}
                </span>
              </div>
              <span
                style={{
                  padding: "3px 6px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  fontWeight: "500",
                  backgroundColor:
                    app.priority === "High"
                      ? "#450a0a"
                      : app.priority === "Medium"
                      ? "#422006"
                      : "#1e293b",
                  color:
                    app.priority === "High"
                      ? "#f87171"
                      : app.priority === "Medium"
                      ? "#fbbf24"
                      : "#94a3b8",
                }}
              >
                {app.priority}
              </span>
            </div>
          );
        })}
      </div>

      {/* Application Detail Modal */}
      <Modal
        isOpen={!!selectedApp}
        onClose={() => setSelectedApp(null)}
        title={selectedApp?.id || ""}
        width="500px"
      >
        {selectedApp && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              <div
                style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "10px",
                  backgroundColor: "#1e293b",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <User
                  style={{ width: "24px", height: "24px", color: "#64748b" }}
                />
              </div>
              <div>
                <p
                  style={{
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "white",
                    margin: 0,
                  }}
                >
                  {selectedApp.provider}
                </p>
                <p style={{ fontSize: "13px", color: "#64748b", margin: 0 }}>
                  {selectedApp.specialty}
                </p>
              </div>
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "12px",
                marginBottom: "16px",
              }}
            >
              {[
                { l: "Type", v: selectedApp.type },
                { l: "Submitted", v: selectedApp.submitted },
                { l: "Priority", v: selectedApp.priority },
                {
                  l: "Documents",
                  v: `${selectedApp.completedDocs}/${selectedApp.documents}`,
                },
              ].map((i) => (
                <div
                  key={i.l}
                  style={{
                    padding: "10px",
                    backgroundColor: "#020617",
                    borderRadius: "8px",
                  }}
                >
                  <p style={{ fontSize: "11px", color: "#64748b", margin: 0 }}>
                    {i.l}
                  </p>
                  <p
                    style={{
                      fontSize: "14px",
                      fontWeight: "500",
                      color: "white",
                      margin: "4px 0 0 0",
                    }}
                  >
                    {i.v}
                  </p>
                </div>
              ))}
            </div>
            <p
              style={{
                fontSize: "12px",
                color: "#64748b",
                marginBottom: "8px",
              }}
            >
              Progress
            </p>
            <div
              style={{
                height: "8px",
                backgroundColor: "#1e293b",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px",
              }}
            >
              <div
                style={{
                  width: `${selectedApp.progress}%`,
                  height: "100%",
                  backgroundColor: statusColors[selectedApp.status],
                }}
              />
            </div>
            <p
              style={{
                fontSize: "13px",
                color: statusColors[selectedApp.status],
                marginBottom: "16px",
              }}
            >
              {selectedApp.status}
            </p>
            {selectedApp.rejectionReason && (
              <p
                style={{
                  fontSize: "13px",
                  color: "#f87171",
                  padding: "10px",
                  backgroundColor: "#450a0a",
                  borderRadius: "8px",
                }}
              >
                Rejection: {selectedApp.rejectionReason}
              </p>
            )}
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}

// ============ COMPLIANCE PAGE ============
function CompliancePage() {
  const standards = [
    {
      name: "NCQA",
      score: 96.2,
      lastAudit: "2025-11-15",
      nextAudit: "2026-05-15",
      icon: Shield,
    },
    {
      name: "URAC",
      score: 94.8,
      lastAudit: "2025-10-20",
      nextAudit: "2026-04-20",
      icon: Award,
    },
    {
      name: "CMS",
      score: 93.1,
      lastAudit: "2025-12-01",
      nextAudit: "2026-06-01",
      icon: FileCheck,
    },
  ];
  return (
    <PageLayout title="Compliance" subtitle="Regulatory compliance monitoring">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "14px",
          marginBottom: "16px",
        }}
      >
        {standards.map((s) => (
          <div
            key={s.name}
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "12px",
              padding: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "12px",
              }}
            >
              <div
                style={{
                  padding: "6px",
                  borderRadius: "6px",
                  backgroundColor: "rgba(59,130,246,0.12)",
                }}
              >
                <s.icon
                  style={{ width: "16px", height: "16px", color: "#60a5fa" }}
                />
              </div>
              <span
                style={{ fontSize: "14px", fontWeight: "600", color: "white" }}
              >
                {s.name}
              </span>
              <span
                style={{
                  marginLeft: "auto",
                  padding: "3px 8px",
                  borderRadius: "20px",
                  fontSize: "10px",
                  fontWeight: "500",
                  backgroundColor: "#052e16",
                  color: "#4ade80",
                }}
              >
                Compliant
              </span>
            </div>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "700",
                color: "#4ade80",
                margin: "0 0 12px 0",
              }}
            >
              {s.score}%
            </p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "11px",
                color: "#64748b",
              }}
            >
              <span>Last: {s.lastAudit}</span>
              <span>Next: {s.nextAudit}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        style={{
          backgroundColor: "#0f172a",
          border: "1px solid #1e293b",
          borderRadius: "12px",
          padding: "16px",
        }}
      >
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "white",
            marginBottom: "12px",
          }}
        >
          Compliance Tasks
        </h3>
        {[
          {
            task: "Update DEA verification procedures",
            due: "2026-01-15",
            status: "In Progress",
          },
          {
            task: "Complete NPDB query documentation",
            due: "2026-01-20",
            status: "Pending",
          },
          {
            task: "Review sanctions monitoring policy",
            due: "2026-01-25",
            status: "Pending",
          },
        ].map((t, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px",
              backgroundColor: "#020617",
              borderRadius: "8px",
              marginBottom: "6px",
            }}
          >
            <span style={{ fontSize: "13px", color: "white" }}>{t.task}</span>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: "11px", color: "#64748b" }}>
                Due: {t.due}
              </span>
              <span
                style={{
                  padding: "3px 6px",
                  borderRadius: "4px",
                  fontSize: "10px",
                  backgroundColor:
                    t.status === "In Progress" ? "#1e3a5f" : "#1e293b",
                  color: t.status === "In Progress" ? "#60a5fa" : "#94a3b8",
                }}
              >
                {t.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </PageLayout>
  );
}

// ============ REPORTS PAGE (WITH YEAR FILTER) ============
const yearlyData = {
  2024: [45, 52, 48, 61, 55, 68, 72, 65, 70, 58, 63, 75],
  2025: [65, 80, 75, 90, 85, 95, 100, 88, 92, 78, 85, 90],
  2026: [70, 85, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

function ReportsPage() {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [reportModal, setReportModal] = useState(null);
  const data = yearlyData[selectedYear];

  const reports = [
    {
      name: "Weekly Summary",
      desc: "Verification activity for the past 7 days",
      type: "PDF",
    },
    {
      name: "Compliance Status",
      desc: "NCQA, URAC, CMS compliance overview",
      type: "PDF",
    },
    {
      name: "Provider Directory",
      desc: "Complete list of credentialed providers",
      type: "Excel",
    },
    {
      name: "Audit Trail",
      desc: "Detailed action log for auditing",
      type: "CSV",
    },
  ];

  return (
    <PageLayout title="Reports" subtitle="Analytics and reporting">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "12px",
          marginBottom: "16px",
        }}
      >
        {[
          { l: "Total Verifications", v: "12,847", t: "+12.5%", up: true },
          { l: "Avg Processing", v: "2.3 hrs", t: "-18.2%", up: true },
          { l: "Success Rate", v: "94.7%", t: "+2.1%", up: true },
          { l: "Rejections", v: "156", t: "+5.3%", up: false },
        ].map((s) => (
          <div
            key={s.l}
            style={{
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              padding: "14px",
            }}
          >
            <p
              style={{
                fontSize: "11px",
                color: "#64748b",
                margin: "0 0 6px 0",
              }}
            >
              {s.l}
            </p>
            <p
              style={{
                fontSize: "22px",
                fontWeight: "700",
                color: "white",
                margin: 0,
              }}
            >
              {s.v}
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                marginTop: "6px",
              }}
            >
              {s.up ? (
                <TrendingUp
                  style={{ width: "12px", height: "12px", color: "#4ade80" }}
                />
              ) : (
                <TrendingDown
                  style={{ width: "12px", height: "12px", color: "#f87171" }}
                />
              )}
              <span
                style={{
                  fontSize: "11px",
                  color: s.up ? "#4ade80" : "#f87171",
                }}
              >
                {s.t}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "16px" }}
      >
        <div
          style={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "14px",
            }}
          >
            <h3
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "white",
                margin: 0,
              }}
            >
              Monthly Verification Trend
            </h3>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
              style={{
                padding: "6px 10px",
                borderRadius: "6px",
                border: "1px solid #334155",
                backgroundColor: "#020617",
                color: "white",
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </div>
          <div
            style={{
              height: "180px",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "6px",
            }}
          >
            {data.map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  backgroundColor: h > 0 ? "#3b82f6" : "#1e293b",
                  borderRadius: "3px 3px 0 0",
                  opacity: 0.7 + i * 0.025,
                  minHeight: h > 0 ? "4px" : "2px",
                }}
              />
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "8px",
              fontSize: "10px",
              color: "#64748b",
            }}
          >
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        <div
          style={{
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "12px",
            padding: "16px",
          }}
        >
          <h3
            style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "white",
              marginBottom: "12px",
            }}
          >
            Quick Reports
          </h3>
          {reports.map((r) => (
            <button
              key={r.name}
              onClick={() => setReportModal(r)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "10px",
                marginBottom: "6px",
                borderRadius: "8px",
                border: "1px solid #1e293b",
                backgroundColor: "#020617",
                color: "white",
                fontSize: "13px",
                cursor: "pointer",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.borderColor = "#3b82f6")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.borderColor = "#1e293b")
              }
            >
              <span>{r.name}</span>
              <Download
                style={{ width: "14px", height: "14px", color: "#64748b" }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Report Modal */}
      <Modal
        isOpen={!!reportModal}
        onClose={() => setReportModal(null)}
        title={reportModal?.name || ""}
        width="400px"
      >
        {reportModal && (
          <div>
            <p
              style={{
                fontSize: "13px",
                color: "#94a3b8",
                marginBottom: "16px",
              }}
            >
              {reportModal.desc}
            </p>
            <div
              style={{
                padding: "12px",
                backgroundColor: "#020617",
                borderRadius: "8px",
                marginBottom: "16px",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "0 0 4px 0",
                }}
              >
                Format
              </p>
              <p style={{ fontSize: "14px", color: "white", margin: 0 }}>
                {reportModal.type}
              </p>
            </div>
            <button
              onClick={() => {
                alert(`Downloading ${reportModal.name}...`);
                setReportModal(null);
              }}
              style={{
                width: "100%",
                padding: "12px",
                borderRadius: "8px",
                border: "none",
                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                color: "white",
                fontSize: "14px",
                fontWeight: "500",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
              }}
            >
              <Download style={{ width: "16px", height: "16px" }} />
              Download Report
            </button>
          </div>
        )}
      </Modal>
    </PageLayout>
  );
}

// ============ SETTINGS PAGE (WITH WORKING TOGGLES) ============
function SettingsPage() {
  const [settings, setSettings] = useState({
    notifications: true,
    autoVerify: true,
    twoFactor: false,
  });
  const [passwordModal, setPasswordModal] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const toggleSetting = (key) =>
    setSettings({ ...settings, [key]: !settings[key] });

  return (
    <PageLayout title="Settings" subtitle="Configure preferences">
      <div style={{ maxWidth: "550px" }}>
        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "white",
            marginBottom: "12px",
          }}
        >
          General
        </h3>
        {[
          {
            k: "notifications",
            l: "Email Notifications",
            d: "Receive alerts for flagged applications",
          },
          {
            k: "autoVerify",
            l: "Auto-verification",
            d: "Automatically verify low-risk applications",
          },
          {
            k: "twoFactor",
            l: "Two-Factor Authentication",
            d: "Require 2FA for admin actions",
          },
        ].map((s) => (
          <div
            key={s.k}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px",
              backgroundColor: "#0f172a",
              border: "1px solid #1e293b",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <div>
              <p
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "white",
                  margin: 0,
                }}
              >
                {s.l}
              </p>
              <p
                style={{
                  fontSize: "12px",
                  color: "#64748b",
                  margin: "3px 0 0 0",
                }}
              >
                {s.d}
              </p>
            </div>
            <button
              onClick={() => toggleSetting(s.k)}
              style={{
                width: "44px",
                height: "24px",
                borderRadius: "12px",
                backgroundColor: settings[s.k] ? "#3b82f6" : "#334155",
                border: "none",
                padding: "2px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  marginLeft: settings[s.k] ? "20px" : "0",
                  transition: "margin-left 0.2s",
                }}
              />
            </button>
          </div>
        ))}

        <h3
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: "white",
            margin: "20px 0 12px 0",
          }}
        >
          Account
        </h3>
        <button
          onClick={() => setPasswordModal(true)}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "14px",
            backgroundColor: "#0f172a",
            border: "1px solid #1e293b",
            borderRadius: "10px",
            color: "white",
            fontSize: "14px",
            cursor: "pointer",
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = "#3b82f6")}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
        >
          <Key style={{ width: "18px", height: "18px", color: "#64748b" }} />
          <div style={{ textAlign: "left" }}>
            <p style={{ margin: 0, fontWeight: "500" }}>Change Password</p>
            <p
              style={{
                margin: "3px 0 0 0",
                fontSize: "12px",
                color: "#64748b",
              }}
            >
              Update your login credentials
            </p>
          </div>
        </button>
      </div>

      {/* Password Modal */}
      <Modal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
        title="Change Password"
        width="380px"
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {[
            {
              k: "current",
              l: "Current Password",
              p: "Enter current password",
            },
            { k: "new", l: "New Password", p: "Enter new password" },
            { k: "confirm", l: "Confirm Password", p: "Confirm new password" },
          ].map((f) => (
            <div key={f.k}>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  color: "#94a3b8",
                  marginBottom: "6px",
                }}
              >
                {f.l}
              </label>
              <input
                type="password"
                value={passwords[f.k]}
                onChange={(e) =>
                  setPasswords({ ...passwords, [f.k]: e.target.value })
                }
                placeholder={f.p}
                style={{
                  width: "100%",
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #334155",
                  backgroundColor: "#020617",
                  color: "white",
                  fontSize: "13px",
                  outline: "none",
                }}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            alert("Password updated!");
            setPasswordModal(false);
            setPasswords({ current: "", new: "", confirm: "" });
          }}
          style={{
            width: "100%",
            marginTop: "16px",
            padding: "12px",
            borderRadius: "8px",
            border: "none",
            background: "linear-gradient(135deg, #3b82f6, #2563eb)",
            color: "white",
            fontSize: "14px",
            fontWeight: "500",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <Save style={{ width: "16px", height: "16px" }} />
          Save Changes
        </button>
      </Modal>
    </PageLayout>
  );
}

// ============ APP ============
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/credential-iq" element={<DashboardPage />} />
        <Route path="/credential-iq/providers" element={<ProvidersPage />} />
        <Route
          path="/credential-iq/applications"
          element={<ApplicationsPage />}
        />
        <Route path="/credential-iq/compliance" element={<CompliancePage />} />
        <Route path="/credential-iq/reports" element={<ReportsPage />} />
        <Route path="/credential-iq/settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
