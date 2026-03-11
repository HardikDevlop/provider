import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShield, FiClock, FiHeadphones, FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import GlassCard from "../Components/GlassCard";
import CTASection from "../Components/CTASection";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/products`)
      .then((res) => {
        setProducts(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Failed to load services. Please try again later.");
      })
      .finally(() => setIsLoading(false));
  }, []);

  const topServices = products.slice(0, 8);

  return (
    <GlassCard className="min-h-screen dashboard-bg-pattern">
      {/* Hero section */}
      <section className="bg-transparent">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pb-16">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6 animate-slide-up">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                Trusted Home Service Pro
              </span>
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight">
                  Your Home Deserves{" "}
                  <span className="text-blue-600">Expert Care</span>
                </h1>
                <p className="mt-3 text-slate-600 text-sm sm:text-base max-w-xl">
                  From AC repair to house cleaning, painting to electrical work — we provide
                  professional home services right at your doorstep.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/products")}
                  className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold shadow-dashboard-card hover:bg-blue-700 transition-colors"
                >
                  Browse Services
                  <FiArrowRight className="ml-2" size={16} />
                </button>
                <a
                  href="tel:+919999999999"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-white text-slate-800 text-sm font-medium border border-slate-200 hover:border-slate-300 shadow-sm transition-colors"
                >
                  Call Now
                </a>
                <a
                  href="https://wa.me/919999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-4 py-2.5 rounded-xl bg-emerald-500 text-white text-sm font-medium shadow-sm hover:bg-emerald-600 transition-colors"
                >
                  <FaWhatsapp className="mr-2" size={18} />
                  WhatsApp
                </a>
              </div>
              <p className="text-xs sm:text-sm text-slate-500">
                No hidden charges. Instant booking. Verified professionals.
              </p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 animate-slide-up" style={{ animationDelay: "80ms" }}>
              <StatCard label="Happy Customers" value="10K+" chip="Verified Reviews" color="blue" />
              <StatCard label="Professionals" value="50+" chip="Background-checked" color="emerald" />
              <StatCard label="Support" value="24/7" chip="Instant assistance" color="amber" />
              <StatCard label="Average Rating" value="4.8★" chip="Service quality" color="rose" />
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-white/70 border-y border-slate-100">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Why Choose Us?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Professional services you can trust
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <FeatureCard
              icon={<FiShield size={22} />}
              title="Verified Professionals"
              text="Every service partner is identity-verified and background checked."
            />
            <FeatureCard
              icon={<FiClock size={22} />}
              title="On-Time Service"
              text="Choose a time slot that suits you — we respect your time."
            />
            <FeatureCard
              icon={<FiHeadphones size={22} />}
              title="24/7 Support"
              text="Our team is always ready to help you with your bookings."
            />
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="bg-slate-50/70">
        <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 sm:mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Our Services
              </h2>
              <p className="mt-1 text-sm sm:text-base text-slate-600">
                Comprehensive home services for all your needs
              </p>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="self-start inline-flex items-center px-4 py-2 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-800 hover:border-slate-300 shadow-sm"
            >
              View All Services
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="bg-dashboard-card rounded-2xl border border-slate-100 shadow-dashboard-card animate-pulse h-56"
                />
              ))}
            </div>
          ) : topServices.length === 0 ? (
            <p className="text-center text-slate-500 text-sm">
              No services available at the moment.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {topServices.map((service) => (
                <article
                  key={service._id}
                  className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card hover:shadow-dashboard-card-hover transition-all duration-300 overflow-hidden flex flex-col animate-slide-up"
                >
                  <div className="relative h-32 w-full overflow-hidden">
                    <img
                      src={
                        Array.isArray(service.images) && service.images[0]
                          ? `${BASE_URL}/uploads/${service.images[0]}`
                          : "/default-service.jpg"
                      }
                      alt={service.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold bg-emerald-100 text-emerald-700">
                      Popular
                    </span>
                  </div>
                  <div className="flex-1 p-4 space-y-2 flex flex-col">
                    <h3 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {service.description || "Professional service for your home"}
                    </p>
                    <div className="mt-2 flex items-center justify-between text-sm font-semibold text-slate-900">
                      <span>
                        ₹{service.visitingPrice ?? service.price ?? "—"}
                      </span>
                      <span className="text-xs text-slate-500">
                        Visiting charge
                      </span>
                    </div>
                    <button
                      onClick={() => navigate(`/product/${service._id}`)}
                      className="mt-3 inline-flex items-center justify-center px-3 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors"
                    >
                      View Details
                      <FiArrowRight className="ml-1.5" size={14} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
      <CTASection />

      {/* How it works */}
      <section className="bg-white">
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
              How It Works
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600">
              Book a service in 3 simple steps
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <StepCard
              step="1"
              title="Choose Service"
              text="Select from a wide range of home services tailored to your needs."
            />
            <StepCard
              step="2"
              title="Book Appointment"
              text="Pick your preferred date and time — we’ll confirm instantly."
            />
            <StepCard
              step="3"
              title="Get It Done"
              text="Our professional arrives on time and completes the job to your satisfaction."
            />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
          <div className="bg-blue-700/90 rounded-3xl px-6 sm:px-10 py-8 sm:py-10 shadow-dashboard-card text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                Need Help With Your Home?
              </h2>
              <p className="mt-2 text-sm sm:text-base text-blue-100 max-w-xl">
                Book our professional services today and experience hassle-free home maintenance.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => navigate("/products")}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl bg-white text-blue-700 text-sm font-semibold shadow-sm hover:bg-blue-50"
              >
                Book a Service
              </button>
              <button
                onClick={() => navigate("/help")}
                className="inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-blue-200 text-sm font-semibold text-white hover:bg-blue-600/40"
              >
                Get Support
              </button>
            </div>
          </div>
        </div>
      </section>
    </GlassCard>
  );
}

function StatCard({ label, value, chip, color }) {
  const colorMap = {
    blue: "from-blue-50 to-sky-50 text-blue-700",
    emerald: "from-emerald-50 to-teal-50 text-emerald-700",
    amber: "from-amber-50 to-yellow-50 text-amber-700",
    rose: "from-rose-50 to-orange-50 text-rose-700",
  };
  const chipMap = {
    blue: "bg-blue-100 text-blue-700",
    emerald: "bg-emerald-100 text-emerald-700",
    amber: "bg-amber-100 text-amber-700",
    rose: "bg-rose-100 text-rose-700",
  };

  return (
    <div
      className={`bg-gradient-to-br ${colorMap[color]} rounded-2xl border border-white/60 shadow-dashboard-card p-4 sm:p-5 flex flex-col justify-between`}
    >
      <div>
        <p className="text-xs font-medium text-slate-500/80">{label}</p>
        <p className="mt-2 text-xl sm:text-2xl font-bold text-slate-900">
          {value}
        </p>
      </div>
      <span
        className={`mt-3 inline-flex items-center px-2 py-1 rounded-full text-[10px] font-semibold ${chipMap[color]}`}
      >
        {chip}
      </span>
    </div>
  );
}

function FeatureCard({ icon, title, text }) {
  return (
    <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card hover:shadow-dashboard-card-hover transition-all duration-300 p-5 flex flex-col items-start gap-3">
      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600">{text}</p>
    </div>
  );
}

function StepCard({ step, title, text }) {
  return (
    <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card hover:shadow-dashboard-card-hover transition-all duration-300 p-5 flex flex-col items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-semibold">
        {step}
      </div>
      <h3 className="text-sm sm:text-base font-semibold text-slate-900">
        {title}
      </h3>
      <p className="text-xs sm:text-sm text-slate-600">{text}</p>
    </div>
  );
}