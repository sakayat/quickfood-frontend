"use client";

import { useCart } from "@/app/context/CartContext";
import React from "react";
import OrderForm from "./OrderForm";

const OrderSummary = ({ item }) => {
  const { calculateTotal } = useCart();

  return (
    <div className="space-y-4">
      <div key={item.id} className="flex justify-between">
        <span>
          {item.name} x {item.quantity}
        </span>
        <span>${item.price * item.quantity}</span>
      </div>
      
      
    </div>
  );
};

export default OrderSummary;
