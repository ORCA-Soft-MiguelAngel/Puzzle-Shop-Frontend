import React from "react";
import OrderProducts from "./OrderProducts";

const OrderDetail = () => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="mb-3">
        <h4 className="text-lg font-semibold">
          Order <span className="text-blue-600">#23556457e32345</span>
        </h4>
        <p className="text-gray-500">Thu 15, Jun 2023. 23:57</p>
        <div>Rating 5</div>
      </div>
      <OrderProducts />
      <div className="flex items-center justify-end text-lg mt-2 mr-1">
        Total: <span className="font-semibold">$ 192.83</span>
      </div>
    </div>
  );
};

export default OrderDetail;
