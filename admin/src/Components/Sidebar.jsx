import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiBarChart2,
  FiPackage,
  FiShoppingCart,
  FiUsers,
  FiPlusCircle,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin-login");
  };

  const toggleCollapse = () => setIsCollapsed((prev) => !prev);

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      isActive
        ? "bg-sidebar-active text-sidebar-accent shadow-sm"
        : "text-slate-400 hover:bg-sidebar-hover hover:text-slate-200"
    }`;

  const navItems = [
    { to: "/dashboard", icon: FiBarChart2, label: "Dashboard" },
    { to: "/products", icon: FiPackage, label: "Manage Products" },
    { to: "/orders", icon: FiShoppingCart, label: "Manage Orders" },
    { to: "/users", icon: FiUsers, label: "Manage Users" },
    { to: "/add-service", icon: FiPlusCircle, label: "Add New Service" },
  ];

  return (
    <>
      {/* Mobile menu trigger */}
      <button
        onClick={toggleMobileMenu}
        className="md:hidden fixed top-4 left-4 z-50 flex items-center justify-center w-10 h-10 rounded-xl bg-sidebar text-white shadow-lg shadow-black/20"
        aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - sticky (fixed) so it stays in place on scroll */}
      <aside
        className={`sidebar-sticky
          flex flex-col bg-sidebar text-white z-40
          shadow-sidebar-inner transition-[width] duration-300 ease-out
          ${isCollapsed ? "w-[72px]" : "w-64"}
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Collapse toggle — desktop only */}
        <button
          onClick={toggleCollapse}
          className="hidden md:flex absolute -right-3 top-7 w-6 h-6 items-center justify-center rounded-full bg-slate-600 text-slate-300 hover:bg-slate-500 hover:text-white border-2 border-sidebar transition-colors z-10"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <FiChevronRight size={12} /> : <FiChevronLeft size={12} />}
        </button>

        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center px-4 border-b border-white/5">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex shrink-0 w-9 h-9 rounded-lg bg-sidebar-accent/20 flex items-center justify-center">
              <FiBarChart2 className="text-sidebar-accent" size={20} />
            </div>
            <span
              className={`font-semibold text-slate-100 truncate transition-opacity ${
                isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
              }`}
            >
              Daksh Admin
            </span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={navLinkClass}
              onClick={() => isMobileMenuOpen && toggleMobileMenu()}
            >
              <Icon size={20} className="shrink-0" />
              {!isCollapsed && <span className="truncate">{label}</span>}
            </NavLink>
          ))}

          <div className="pt-2">
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200 ${isCollapsed ? "justify-center" : ""}`}
            >
              <FiLogOut size={20} className="shrink-0" />
              {!isCollapsed && <span>Logout</span>}
            </button>
          </div>
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="shrink-0 px-4 py-3 border-t border-white/5">
            <p className="text-xs text-slate-500">v1.0.0</p>
          </div>
        )}
      </aside>
    </>
  );
}
