import { useEffect, useState } from "react";
import axios from "axios";
import { PageLayout, PageSkeletonHeader, PageSkeletonTable } from "../Components/PageLayout";
import { FiShoppingCart, FiRefreshCw, FiSearch } from "react-icons/fi";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function ManageOrders() {
  const [ordersByUser, setOrdersByUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      setError("Admin token missing. Please log in again.");
      setIsLoading(false);
      return;
    }
    try {
      setIsLoading(true);
      const res = await axios.get(`${BASE_URL}/api/orders/AllOrders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const grouped = {};
      res.data.forEach((order) => {
        const userName = order.user?.name || "Guest";
        if (!grouped[userName]) grouped[userName] = [];
        grouped[userName].push(order);
      });
      for (const user in grouped) {
        grouped[user].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }
      setOrdersByUser(grouped);
    } catch (err) {
      console.error("Error fetching orders:", err);
      if (err.response?.status === 401) {
        setError("Unauthorized. Please log in as an admin.");
      } else {
        setError("Something went wrong while fetching orders.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const filteredOrdersByUser = Object.fromEntries(
    Object.entries(ordersByUser).filter(([userName]) =>
      userName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <PageLayout
      icon={FiShoppingCart}
      title="Manage Orders"
      subtitle="View and manage all customer orders"
      maxWidth="max-w-6xl"
      action={
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-56">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by user name..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-xl bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all"
            />
          </div>
          <button
            onClick={fetchOrders}
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-600 text-white text-sm font-medium hover:bg-teal-700 disabled:opacity-60 transition-colors shadow-dashboard-card"
          >
            <FiRefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      }
    >
      {isLoading ? (
        <>
          <PageSkeletonHeader />
          <PageSkeletonTable rows={4} />
        </>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-4 rounded-2xl text-sm animate-slide-up">
          {error}
        </div>
      ) : Object.keys(filteredOrdersByUser).length === 0 ? (
        <div className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card p-8 sm:p-12 text-center animate-slide-up">
          <FiShoppingCart className="mx-auto text-slate-300" size={48} />
          <h3 className="mt-4 text-lg font-semibold text-slate-800">No orders found</h3>
          <p className="mt-1 text-sm text-slate-500">Orders will appear here when customers place them.</p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-5 animate-slide-up">
          {Object.entries(filteredOrdersByUser).map(([userName, orders]) => (
            <div
              key={userName}
              className="bg-dashboard-card rounded-2xl border border-slate-200/80 shadow-dashboard-card overflow-hidden transition-shadow hover:shadow-dashboard-card-hover"
            >
              <div className="px-4 sm:px-6 py-4 border-b border-slate-100 bg-slate-50/50">
                <h3 className="text-lg font-semibold text-slate-800">
                  Customer: <span className="text-teal-600">{userName}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">{orders.length} order(s)</p>
              </div>
              <div className="p-4 sm:p-6 divide-y divide-slate-100">
                {orders.map((order) => (
                  <div key={order._id} className="py-4 sm:py-5 space-y-3 first:pt-4 sm:first:pt-5">
                    <div className="flex flex-col xs:flex-row justify-between gap-1 text-xs sm:text-sm text-slate-500">
                      <span className="truncate font-mono">ID: {order._id?.slice(-8)}</span>
                      <span>
                        {new Date(order.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700 space-y-1">
                      <p><strong className="text-slate-600">House No:</strong> {order.address?.houseNumber}</p>
                      <p><strong className="text-slate-600">Street/Colony:</strong> {order.address?.street}</p>
                      {order.address?.landmark && (
                        <p><strong className="text-slate-600">Landmark:</strong> {order.address.landmark}</p>
                      )}
                      <p><strong className="text-slate-600">Address Type:</strong> {order.address?.addressType}</p>
                      <p className="break-words"><strong className="text-slate-600">Full Address:</strong> {order.address?.fullAddress}</p>
                      <p><strong className="text-slate-600">Time Slot:</strong> {order.address?.timeSlot}</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center border border-slate-100 rounded-xl p-2.5 bg-slate-50/50">
                          <img
                            src={`${BASE_URL}/uploads/${item.imageUrl}`}
                            alt={item.title}
                            className="w-10 h-10 sm:w-12 sm:h-12 object-cover rounded-lg shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="font-medium text-sm truncate text-slate-800">{item.title}</p>
                            <p className="text-xs text-slate-600">
                              ₹{item.price} × {item.quantity} = ₹{item.price * item.quantity}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-800"
                            : order.status === "Cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {order.status}
                      </span>
                      <span className="text-sm font-semibold text-slate-800">
                        Total: ₹{order.totalAmount}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </PageLayout>
  );
}
