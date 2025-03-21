"use client";
import { useAuth } from "@/app/context/AuthContext";
import { useCart } from "@/app/context/CartContext";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const OrderForm = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const router = useRouter();

  const { isAuthenticated, token } = useAuth();

  const { cartItems, clearCart } = useCart();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      router.push("/login");
    }

    if (!deliveryAddress.trim()) {
      return setError("Please enter a delivery address");
    }

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/create-order/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            restaurant_id: cartItems[0].restaurant_id,
            items: cartItems.map((item) => ({
              menu_item_id: item.menu_item_id,
              quantity: item.quantity,
            })),
            delivery_address: deliveryAddress,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(data.message || "Failed to place order");
      }

      clearCart();

      setSuccess("Order placed successfully!");

      router.push(`/profile`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <form className="space-y-3 mt-3" onSubmit={handlePlaceOrder}>
      <label
        htmlFor="delivery-address"
        className="block text-sm font-medium text-gray-700"
      >
        Delivery Address
      </label>
      <textarea
        id="delivery-address"
        type="text"
        value={deliveryAddress}
        onChange={(e) => setDeliveryAddress(e.target.value)}
        className="outline-none w-full px-3 py-2 border border-gray-300 rounded-md sm:text-sm"
        placeholder="Enter your delivery address"
        rows={3}
      />
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black"
      >
        Place Order
      </button>
    </form>
  );
};

export default OrderForm;
