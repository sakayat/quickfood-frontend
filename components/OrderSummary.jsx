"use client";

import React from "react";

const OrderSummary = ({ item }) => {
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
