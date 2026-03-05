import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FiHome, FiGrid, FiShoppingCart, FiClipboard, FiUser } from "react-icons/fi";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: FiHome, path: "/" },
  { key: "services", label: "Services", icon: FiGrid, path: "/products" },
  { key: "orders", label: "Orders", icon: FiClipboard, path: "/my-orders" },
  { key: "cart", label: "Cart", icon: FiShoppingCart, path: "/cart" },
  { key: "account", label: "Account", icon: FiUser, path: "/profile" },
];

export default function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);

  // Only show on mobile-size screens via Tailwind classes
  // Hide on some routes where a fixed nav would clash (admin-style pages)
  const hiddenRoutes = ["/admin-login"];
  if (hiddenRoutes.includes(location.pathname)) return null;

  const activeKey = NAV_ITEMS.find((item) =>
    item.path === "/"
      ? location.pathname === "/"
      : location.pathname.startsWith(item.path)
  )?.key;

  const cartCount =
    cartItems?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 md:hidden bg-white/95 border-t border-slate-200 shadow-[0_-4px_16px_rgba(15,23,42,0.06)]">
      <div className="max-w-6xl mx-auto px-2 py-1.5">
        <div className="flex items-center justify-between">
          {NAV_ITEMS.map(({ key, label, icon: Icon, path }) => {
            const isActive = key === activeKey;
            const isCart = key === "cart";
            return (
              <button
                key={key}
                type="button"
                onClick={() => navigate(path)}
                className={`flex flex-col items-center justify-center flex-1 py-1.5 text-[10px] font-medium transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-500"
                }`}
              >
                <div
                  className={`relative flex items-center justify-center w-9 h-9 rounded-xl border ${
                    isActive
                      ? "border-blue-500 bg-blue-50"
                      : "border-transparent bg-slate-50"
                  }`}
                >
                  <Icon size={18} />
                  {isCart && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] rounded-full px-1.5 py-0.5 min-w-[16px] flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="mt-0.5 leading-none">{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}

