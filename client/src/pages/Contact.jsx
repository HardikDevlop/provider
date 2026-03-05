import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for contacting us! We'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen dashboard-bg-pattern">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <header className="text-center mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Have a question about our services or a booking? Send us a message and our team will respond quickly.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-3 mb-8">
          <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Call us</h3>
            <p className="text-xs text-slate-600 mb-1">24/7 phone support</p>
            <p className="text-sm font-semibold text-blue-600">+91-99999-99999</p>
          </div>
          <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Email</h3>
            <p className="text-xs text-slate-600 mb-1">We reply within a few hours</p>
            <p className="text-sm font-semibold text-blue-600">support@daksh.com</p>
          </div>
          <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card p-4">
            <h3 className="text-sm font-semibold text-slate-900 mb-1">Help Center</h3>
            <p className="text-xs text-slate-600 mb-1">Find answers to common questions</p>
            <a href="/help" className="text-sm font-semibold text-blue-600 underline">
              Visit help center
            </a>
          </div>
        </div>

        <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Full name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Email address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Your message
              </label>
              <textarea
                placeholder="Tell us how we can help..."
                className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 min-h-[120px]"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex justify-center px-5 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 transition-colors shadow-dashboard-card"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
