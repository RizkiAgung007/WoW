import React, { useState, useEffect } from "react";
import { FiChevronDown } from "react-icons/fi"; // Impor ikon panah

const ManajemenOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusStyles = {
    request: {
      bg: "bg-yellow-100",
      text: "text-yellow-800",
      ring: "ring-yellow-400",
      dot: "bg-yellow-500",
    },
    approved: {
      bg: "bg-green-100",
      text: "text-green-800",
      ring: "ring-green-400",
      dot: "bg-green-500",
    },
    rejected: {
      bg: "bg-red-100",
      text: "text-red-800",
      ring: "ring-red-400",
      dot: "bg-red-500",
    },
  };

  const fetchOrders = async () => {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan, silakan login ulang.");
      }
      const response = await fetch("http://localhost:5000/api/orders", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Gagal mengambil data pesanan.");
      }
      const data = await response.json();
      setOrders(data.data);
    } catch (err) {
      setError(err.message);
      console.error("Gagal mengambil data order:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    const originalOrders = [...orders];
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.order_id === orderId
          ? { ...order, status_order: newStatus }
          : order
      )
    );
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `http://localhost:5000/api/orders/${orderId}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status_order: newStatus }),
        }
      );
      if (!response.ok) {
        throw new Error("Gagal memperbarui status.");
      }
    } catch (err) {
      console.error("Gagal memperbarui status:", err);
      setOrders(originalOrders);
      alert("Gagal memperbarui status. Memuat ulang data.");
      fetchOrders();
    }
  };

  const StatusSelector = ({ order }) => {
    const currentStyle =
      statusStyles[order.status_order] || statusStyles.request;

    return (
      <div className="relative w-36">
        <span
          className={`absolute left-3 top-1/2 -translate-y-1/2 h-2 w-2 rounded-full ${currentStyle.dot}`}
        ></span>
        <select
          value={order.status_order}
          onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
          className={`w-full pl-8 pr-8 py-2 border-none rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 appearance-none transition-colors duration-200 ${currentStyle.bg} ${currentStyle.text} ${currentStyle.ring}`}
        >
          <option value="request">Request</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <FiChevronDown className={currentStyle.text} />
        </div>
      </div>
    );
  };

  const renderContent = () => {
    if (loading)
      return (
        <div className="text-center py-10 text-[#3A6B4C]/70">
          Memuat data pesanan...
        </div>
      );
    if (error)
      return (
        <div className="text-center py-10 text-red-600 bg-red-50 p-4 rounded-lg">
          {error}
        </div>
      );
    if (orders.length === 0)
      return (
        <div className="text-center py-10 text-[#3A6B4C]/70">
          Tidak ada data pesanan.
        </div>
      );

    return (
      <>
        {/* Mobile View */}
        <div className="space-y-4 md:hidden">
          {orders.map((order) => (
            <div
              key={order.order_id}
              className="bg-white p-4 rounded-lg shadow-md border"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-[#3A6B4C]">
                    {order.nama_user}
                  </h3>
                  <p className="text-sm text-[#3A6B4C]/80">
                    {order.nama_paket}
                  </p>
                </div>
                <p className="text-sm font-medium text-[#3A6B4C]">
                  #{order.order_id}
                </p>
              </div>
              <div className="text-sm text-[#3A6B4C]/80 mt-4 space-y-1 border-t pt-3">
                <p>
                  <strong>Email:</strong> {order.email}
                </p>
                <p>
                  <strong>Telp:</strong> {order.no_telp}
                </p>
              </div>
              <div className="mt-4">
                <StatusSelector order={order} />
              </div>
            </div>
          ))}
        </div>

        {/* Desktop View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Nama User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Paket Order
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  No. Telp
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-semibold text-[#3A6B4C]/70 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order, index) => (
                <tr key={order.order_id} className="hover:bg-[#A8E6CF]/20">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-[#3A6B4C]">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-[#3A6B4C]">
                    {order.nama_user}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3A6B4C]/80">
                    {order.nama_paket}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3A6B4C]/80">
                    {order.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-[#3A6B4C]/80">
                    {order.no_telp}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <StatusSelector order={order} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  };

  return (
    <div>
      <h1 className="text-3xl font-semibold text-[#3A6B4C] mb-6">
        Manajemen Order
      </h1>
      <div className="bg-white shadow-md rounded-2xl md:overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default ManajemenOrder;
