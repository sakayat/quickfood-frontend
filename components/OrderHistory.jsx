"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, MapPin, TruckIcon } from "lucide-react";

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
        <div className="px-4 py-4">
          <div className="grid gap-4">
            {orders.map((order) => (
              <div key={order.id} className="border rounded-lg overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 flex justify-between items-center">
                  <div>
                    <span className="text-gray-500 text-sm">Order ID:</span>
                    <span className="font-medium ml-1">#{order.id}</span>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === "pending"
                        ? "bg-gray-200 text-gray-800"
                        : order.status === "preparing"
                        ? "bg-yellow-200 text-yellow-800"
                        : order.status === "out_for_delivery"
                        ? "bg-blue-200 text-blue-800"
                        : order.status === "delivered"
                        ? "bg-green-200 text-green-800"
                        : order.status === "cancelled"
                        ? "bg-red-200 text-red-800"
                        : ""
                    }`}
                  >
                    {order.status}
                  </div>
                </div>

                <div className="p-4">
                  <div className="flex items-start mb-4">
                    <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                    <div className="ml-2 text-sm text-gray-600 flex-1">
                      {order.delivery_address || "No delivery address provided"}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <h4 className="font-medium text-sm mb-2">Order Items</h4>
                    <ul className="space-y-2">
                      {order.items.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-gray-700">
                            {item.quantity}x {item.name || item.menu_item_name}
                          </span>
                          <span className="font-medium">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
                      <span className="font-medium">Total:</span>
                      <span className="font-bold">
                        {formatCurrency(order.total_cost)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Link
                      href={`/track-order/${order.id}`}
                      className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 hover:text-blue-800"
                    >
                      <TruckIcon className="h-4 w-4 mr-1" />
                      Track Order
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
