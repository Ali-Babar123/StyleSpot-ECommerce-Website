



import React from 'react';

const PriceDetail = () => {
  // Sample data for price details
  const subtotal = 867.97;
  const discount = 16.797;
  const deliveryCharges = 40;
  const total = subtotal - discount + deliveryCharges;

  return (
    <div className="w-64 p-4 border border-gray-200 rounded-md bg-gray-100">
      <h3 className="text-lg font-semibold mb-4 text-blue-800">Price Detail</h3>
      <div className="flex justify-between border-b border-gray-300 py-2">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      <div className="flex justify-between border-b border-gray-300 py-2">
        <span>Discount</span>
        <span>${discount.toFixed(3)}</span>
      </div>
      <div className="flex justify-between border-b border-gray-300 py-2">
        <span>Delivery Charges</span>
        <span>${deliveryCharges.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-bold py-2">
        <span>Total</span>
        <span>${total.toFixed(3)}</span>
      </div>
    </div>
  );
};

export default PriceDetail;
