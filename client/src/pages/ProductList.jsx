import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cleaning", label: "Cleaning" },
  { key: "repair", label: "Repair" },
  { key: "plumbing", label: "Plumbing" },
  { key: "electrical", label: "Electrical" },
  { key: "painting", label: "Painting" },
  { key: "pest", label: "Pest Control" },
];

function inferCategory(name = "") {
  const n = name.toLowerCase();
  if (n.includes("clean")) return "cleaning";
  if (n.includes("paint")) return "painting";
  if (n.includes("plumb") || n.includes("pipe")) return "plumbing";
  if (n.includes("electric") || n.includes("ac") || n.includes("appliance"))
    return "electrical";
  if (n.includes("pest") || n.includes("termite")) return "pest";
  if (n.includes("repair")) return "repair";
  return "all";
}

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        setProducts(
          data.map((p) => ({
            ...p,
            _category: inferCategory(p.name),
          }))
        );
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load services. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        category === "all" || p._category === category;
      const term = search.trim().toLowerCase();
      const matchesSearch =
        !term ||
        p.name?.toLowerCase().includes(term) ||
        p.description?.toLowerCase().includes(term);
      return matchesCategory && matchesSearch;
    });
  }, [products, search, category]);

  return (
    <div className="min-h-screen dashboard-bg-pattern">
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Our <span className="text-blue-600">Services</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto">
            Professional home services for all your maintenance and repair needs
          </p>
        </header>

        {/* Search + filters */}
        <div className="space-y-4 sm:space-y-5 mb-6 sm:mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search services..."
                className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm sm:text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
              <svg
                className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z"
                />
              </svg>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center px-3 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700 shadow-sm"
            >
              Filters
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.key}
                onClick={() => setCategory(c.key)}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm border transition-colors ${
                  category === c.key
                    ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                    : "bg-white text-slate-700 border-slate-200 hover:border-blue-300"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Services grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="h-64 bg-dashboard-card rounded-2xl border border-slate-100 shadow-dashboard-card animate-pulse"
              />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center text-slate-500 text-sm">
            No services match your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filtered.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ service }) {
  const navigate = useNavigate();
  const image =
    Array.isArray(service.images) && service.images[0]
      ? `${BASE_URL}/uploads/${service.images[0]}`
      : "/default-service.jpg";
  const subCount = Array.isArray(service.subServices)
    ? service.subServices.length
    : 0;

  return (
    <article className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card hover:shadow-dashboard-card-hover transition-all duration-300 overflow-hidden flex flex-col">
      <div className="relative h-32 sm:h-36 w-full overflow-hidden">
        <img
          src={image}
          alt={service.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
          24×7 Available
        </span>
      </div>
      <div className="flex-1 p-4 flex flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
              {service.name}
            </h3>
            <p className="mt-1 text-[11px] sm:text-xs text-slate-500 line-clamp-2">
              {service.description || "Professional service for your home"}
            </p>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-between text-[11px] sm:text-xs text-slate-500">
          <span>
            {subCount > 0
              ? `${subCount} services available`
              : "Single service"}
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="text-xs">
            <span className="block text-slate-500">Starting from</span>
            <span className="text-base font-semibold text-slate-900">
              ₹{service.visitingPrice ?? service.price ?? "—"}
            </span>
          </div>
          <button
            onClick={() => navigate(`/product/${service._id}`)}
            className="inline-flex items-center px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}