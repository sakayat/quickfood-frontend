"use client";

import { useCart } from "@/app/context/CartContext";
import { Minus, Plus, Trash2 } from "lucide-react";
import React from "react";

const Cart = ({ item }) => {
  const { updateItemQuantity, removeItem } = useCart();

  const handleQuantityChange = (id, quantity) => {
    if (quantity >= 1) {
      updateItemQuantity(id, quantity);
    }
  };

  const handleRemoveItem = (id) => {
    removeItem(id);
  };

  return (
    <div className="flex items-center justify-between border-b pb-4">
      <div className="flex items-center space-x-4">
        {item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="w-16 h-16 object-cover rounded-md"
          />
        )}
        <div>
          <h3 className="font-medium">{item.name}</h3>
          <p className="text-sm text-gray-500">${item.price}</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <button
          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Minus size={16} />
        </button>
        <span className="w-8 text-center">{item.quantity}</span>
        <button
          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
          className="p-1 rounded-md hover:bg-gray-100"
        >
          <Plus size={16} />
        </button>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className="p-1 text-red-500 hover:bg-gray-100 rounded-md ml-2"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default Cart;
