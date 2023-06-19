import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";

const OrderProducts = () => {
  return (
    <div>
      {/** TABLE VERISON */}
      <div className="w-full bg-white text-left text-gray-500">
        <div className="hidden bg-gray-50 font-medium text-gray-900 lg:grid lg:grid-cols-7">
          <h3 className="px-6 py-4"></h3>
          <h3 className="px-6 py-4">Item</h3>
          <h3 className="px-6 py-4">Quantity</h3>
          <h3 className="px-6 py-4">Price</h3>
          <h3 className="px-6 py-4">Interest (15%)</h3>
          <h3 className="px-6 py-4">Total</h3>
          <h3 className="px-6 py-4 text-center"></h3>
        </div>
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="relative flex flex-wrap bg-white hover:bg-gray-50  lg:grid md:grid-cols-2  lg:grid-cols-7 lg:gap-4"
            >
              <div className="flex w-full items-center justify-center lg:col-span-1 ">
                <img
                  className="object-cover object-center h-52 w-52 lg:w-40 lg:h-40"
                  src="https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
                  alt=""
                />
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Item</h3>
                <p>Follower No 45 Scalla with plus more plus academic boi</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">
                  Quantity
                </h3>
                <p>1</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Price</h3>
                <p>$ 10.99</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">
                  Interest (15%)
                </h3>
                <p>$ 5.99</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Total</h3>
                <p>$ 16.98</p>
              </div>
              <div className="px-6 py-4 absolute right-2 top-2 lg:relative lg:col-span-1">
                {/* <h3 className="lg:hidden font-medium text-gray-900">Actions</h3> */}
                <div className="flex justify-center gap-4">
                  <button x-data="{ tooltip: 'Delete' }">
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/** MOBILE VERSION */}
    </div>
  );
};

export default OrderProducts;
