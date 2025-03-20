"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/my-orders/`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <div className="border-b border-gray-400 py-3">
        <h2 className="text-xl font-semibold text-black text-center">
          Order History
        </h2>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading...</p>
        </div>
      ) : orders.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Delivery Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                  Total
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {order.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {order.delivery_address}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-gray-800">
                        <p>{item.name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: {formatCurrency(item.price)}</p>
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">
                    {order.items
                      .reduce(
                        (total, item) => total + parseFloat(item.total_price),
                        0
                      )
                      .toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't placed any orders yet.</p>
          <Link
            href="/menu"
            className="mt-4 inline-block px-4 py-2 bg-black text-white rounded"
          >
            Browse Menu
          </Link>
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
