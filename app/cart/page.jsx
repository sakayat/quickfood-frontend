"use client";
import React from "react";
import { useCart } from "../context/CartContext";
import Link from "next/link";
import Cart from "@/components/Cart";
import OrderHistory from "@/components/OrderHistory";
import OrderSummary from "@/components/OrderSummary";
import OrderForm from "@/components/OrderForm";

const CartPage = () => {
  const { cartItems, calculateTotal } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link
            href="/menu"
            className="px-4 py-2 bg-black text-white rounded-md hover:bg-primary/90"
          >
            Back to Menu
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Cart item={item} key={item.id} />
                ))}
              </div>
            </div>
          </div>
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="p-6 rounded-lg border border-gray-200">
              <div className="space-y-4 mb-4">
                {cartItems.map((item) => (
                  <OrderSummary item={item} key={item.id} />
                ))}
                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
              </div>
            </div>
            <OrderForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
