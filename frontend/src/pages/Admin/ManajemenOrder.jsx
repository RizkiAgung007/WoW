import React, { useState, useEffect } from "react";

const ManajemenOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const statusStyles = {
    request: "bg-yellow-100 text-yellow-800 ring-yellow-300",
    approved: "bg-green-100 text-green-800 ring-green-300",
    rejected: "bg-red-100 text-red-800 ring-red-300",
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

  const renderContent = () => {
    if (loading)
      return (
        <tr>
          <td colSpan="6" className="text-center py-10 text-gray-500">
            Memuat data pesanan...
          </td>
        </tr>
      );
    if (error)
      return (
        <tr>
          <td colSpan="6" className="text-center py-10 text-red-600 bg-red-50">
            {error}
          </td>
        </tr>
      );
    if (orders.length === 0)
      return (
        <tr>
          <td colSpan="6" className="text-center py-10 text-gray-500">
            Tidak ada data pesanan.
          </td>
        </tr>
      );

    return orders.map((order, index) => (
      <tr key={order.order_id} className="hover:bg-gray-50">
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
          {index + 1}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-800">
          {order.nama_user}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {order.nama_paket}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {order.email}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
          {order.no_telp}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm">
          <select
            value={order.status_order}
            onChange={(e) => handleStatusChange(order.order_id, e.target.value)}
            className={`w-full p-2 border-none rounded-md text-sm font-medium focus:outline-none focus:ring-2 ${
              statusStyles[order.status_order]
            }`}
          >
            <option value="request">Request</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Manajemen Order</h1>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nama User
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Paket Order
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  No. Telp
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {renderContent()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManajemenOrder;
