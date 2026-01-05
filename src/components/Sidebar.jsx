import { useState, useEffect, useRef } from 'react';
import {
    LayoutDashboard,
    Users,
    FileText,
    ShieldCheck,
    BarChart3,
    Settings,
    ChevronLeft,
    ChevronRight,
    Zap,
    X
} from 'lucide-react';

const iconMap = {
    LayoutDashboard,
    Users,
    FileText,
    ShieldCheck,
    BarChart3,
    Settings,
};

export function Sidebar({ navItems, collapsed, onToggle, isMobileOpen, onMobileClose }) {
    const [activeItem, setActiveItem] = useState('dashboard');
    const [isMobile, setIsMobile] = useState(false);
    const sidebarRef = useRef(null);

    // Detect mobile screen size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    // Close mobile menu if resizing to desktop
    useEffect(() => {
        if (!isMobile && isMobileOpen) {
            onMobileClose?.();
        }
    }, [isMobile, isMobileOpen, onMobileClose]);

    // Close sidebar when clicking outside on mobile
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isMobileOpen && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                onMobileClose?.();
            }
        };

        if (isMobileOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = '';
        };
    }, [isMobileOpen, onMobileClose]);

    return (
        <>
            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                    onClick={onMobileClose}
                />
            )}

            <aside
                ref={sidebarRef}
                style={{ 
                    width: isMobile ? '256px' : (collapsed ? '80px' : '256px'),
                    transform: isMobile 
                        ? (isMobileOpen ? 'translateX(0)' : 'translateX(-100%)') 
                        : 'translateX(0)',
                }}
                className="fixed left-0 top-0 h-screen bg-slate-900 border-r border-slate-800 flex flex-col transition-all duration-300 z-50"
            >
            {/* Logo/Brand */}
            <div className="p-4 border-b border-slate-800">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-medical-500 to-medical-700 flex items-center justify-center flex-shrink-0">
                            <Zap className="w-5 h-5 text-white" />
                        </div>
                        {(!isMobile && !collapsed) || (isMobile && isMobileOpen) ? (
                            <div className="overflow-hidden">
                                <h1 className="text-lg font-bold text-white leading-tight">Credential IQ</h1>
                                <p className="text-xs text-slate-500">by HiLabs</p>
                            </div>
                        ) : null}
                    </div>
                    {/* Mobile Close Button */}
                    <button
                        onClick={onMobileClose}
                        className="lg:hidden p-1 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = iconMap[item.icon] || LayoutDashboard;
                    const isActive = activeItem === item.id;

                    return (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveItem(item.id);
                                // Close mobile menu when item is clicked
                                if (isMobile && isMobileOpen) {
                                    onMobileClose?.();
                                }
                            }}
                            className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                group relative
                ${isActive
                                    ? 'bg-medical-600/20 text-medical-400 border border-medical-600/30'
                                    : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                }
              `}
                            title={collapsed ? item.label : undefined}
                        >
                            <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-medical-400' : ''}`} />
                            {((!isMobile && !collapsed) || (isMobile && isMobileOpen)) && (
                                <span className="font-medium text-sm">{item.label}</span>
                            )}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-medical-500 rounded-r-full" />
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Collapse Toggle - Hidden on Mobile */}
            <div className="hidden lg:block p-3 border-t border-slate-800">
                <button
                    onClick={onToggle}
                    className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                >
                    {collapsed ? (
                        <ChevronRight className="w-5 h-5" />
                    ) : (
                        <>
                            <ChevronLeft className="w-5 h-5" />
                            <span className="text-sm">Collapse</span>
                        </>
                    )}
                </button>
            </div>

            {/* User/Status Footer - Always show on mobile, conditionally on desktop */}
            {(!isMobile || !collapsed) && (
                <div className="p-4 border-t border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white text-sm font-medium">
                            SJ
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white truncate">Sarah Johnson</p>
                            <p className="text-xs text-slate-500 truncate">Credentialing Specialist</p>
                        </div>
                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            )}
        </aside>
    );
}
