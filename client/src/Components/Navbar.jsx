import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { AuthContext } from "../context/AuthContext";
import { FiUser } from "react-icons/fi";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { isAuthenticated, logout, user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [location, setLocation] = useState(user?.location || "Detecting...");
  const [isLocationLoading, setIsLocationLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated && !user?.location) {
      setIsLocationLoading(true);
      navigator.geolocation?.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            const address = data?.display_name?.split(",")[0] || "Your Location";
            setLocation(address);
            await axios.put(
              `${BASE_URL}/api/users/location`,
              { location: address },
              { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
            );
            setUser((prev) => ({ ...prev, location: address }));
          } catch (error) {
            setLocation("Location unavailable");
          } finally {
            setIsLocationLoading(false);
          }
        },
        () => {
          setLocation("Allow location access");
          setIsLocationLoading(false);
        }
      );
    } else if (user?.location) {
      setLocation(user.location);
    }
  }, [isAuthenticated, user?.location]);

  const handleManualLocationChange = async () => {
    const newLocation = prompt("Enter your location:", location);
    if (newLocation && newLocation !== location) {
      try {
        setLocation(newLocation);
        await axios.put(
          `${BASE_URL}/api/users/location`,
          { location: newLocation },
          { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
        );
        setUser((prev) => ({ ...prev, location: newLocation }));
      } catch (error) {
        console.error("Failed to update location:", error);
        setLocation(location);
      }
    }
  };

  return (
    <nav className="bg-white/95 backdrop-blur border-b border-slate-100 text-slate-900 sticky top-0 z-50 shadow-sm">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Left side - Logo & Navigation */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-slate-900 hover:text-blue-700 transition-colors"
            >
              Provider
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-6 text-sm font-medium">
              <Link
                to="/"
                className="px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                Home
              </Link>
              <Link
                to="/products"
                className="px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                Services
              </Link>
              <Link
                to="/pricing"
                className="px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                Pricing
              </Link>
              <Link
                to="/help"
                className="px-3 py-2 text-slate-700 hover:text-blue-600 transition-colors"
              >
                Help Center
              </Link>
            </div>
          </div>

          {/* Right side - Auth & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated && (
              <div
                onClick={handleManualLocationChange}
                className="flex items-center text-xs sm:text-sm text-slate-600 hover:text-blue-600 cursor-pointer transition-colors"
              >
                <svg className="w-4 h-4 mr-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {isLocationLoading ? "Detecting..." : location}
              </div>
            )}

            {/* Cart */}
            <Link
              to="/cart"
              className="p-2 relative"
            >
              <svg className="w-6 h-6 text-slate-700 hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>

            {/* Auth */}
            {!isAuthenticated ? (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-xl border border-slate-200 text-sm font-semibold text-slate-800 hover:border-blue-400 hover:text-blue-700 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-slate-700">Hi, {user?.name}</span>
                <Link
                  to="/my-orders"
                  className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
                >
                  My Orders
                </Link>
                <button
                  onClick={logout}
                  className="px-3 py-1 text-sm font-medium rounded-md text-slate-700 hover:text-red-600 transition-colors"
                >
                  Logout
                </button>
                <Link
                  to="/profile"
                  className="w-9 h-9 flex items-center justify-center rounded-full bg-blue-50 hover:bg-blue-100"
                >
                  <FiUser size={18} className="text-blue-700" />
                </Link>
              </div>
            )}

          </div>

        

        </div>
      </div>
    </nav>
  );
}