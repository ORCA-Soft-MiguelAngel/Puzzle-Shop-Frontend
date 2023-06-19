import React from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { OrderStatus, Product } from "@/types/Order";
import {
  calculateTotalInterest,
  calculateTotalProduct,
  formatCurrency,
} from "@/utils/currency";
import { CurrencySymbol } from "@/types/Currency";

interface OrderProductsProps {
  products: Product[];
  allowEdit: boolean;
  currency: CurrencySymbol;
  handleDeleteProduct: (product: Product) => void;
}

const OrderProducts: React.FC<OrderProductsProps> = ({
  products,
  allowEdit,
  currency,
  handleDeleteProduct,
}) => {
  return (
    <div>
      {/** TABLE VERISON */}
      <div className="w-full bg-white text-left text-gray-500">
        <div
          className={`hidden bg-gray-50 font-medium text-gray-900 lg:grid ${
            allowEdit ? "lg:grid-cols-7" : "lg:grid-cols-6"
          }`}
        >
          <h3 className="px-6 py-4"></h3>
          <h3 className="px-6 py-4">Item</h3>
          <h3 className="px-6 py-4">Quantity</h3>
          <h3 className="px-6 py-4">Price</h3>
          <h3 className="px-6 py-4">Interest (15%)</h3>
          <h3 className="px-6 py-4 text-center">Total</h3>
          {allowEdit && <h3 className="px-6 py-4 text-center"></h3>}
        </div>
        <div className="divide-y divide-gray-100 border-t border-gray-100">
          {products.map((product) => (
            <div
              key={product._id}
              className={`relative flex flex-wrap bg-white hover:bg-gray-50  lg:grid md:grid-cols-2  ${
                allowEdit ? "lg:grid-cols-7" : "lg:grid-cols-6"
              } lg:gap-4`}
            >
              <div className="flex w-full items-center justify-center lg:col-span-1 py-3">
                <img
                  className="object-cover object-center h-52 w-52 lg:w-40 lg:h-40"
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Item</h3>
                <p>{product.title}</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">
                  Quantity
                </h3>
                <p>{product.quantity}</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Price</h3>
                <p>{formatCurrency(product.price, currency)}</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">
                  Interest (15%)
                </h3>
                <p>{formatCurrency(calculateTotalInterest(product), currency)}</p>
              </div>
              <div className="px-6 py-4 lg:col-span-1">
                <h3 className="lg:hidden font-medium text-gray-900">Total</h3>
                <p>{formatCurrency(calculateTotalProduct(product), currency)}</p>
              </div>
              {allowEdit && (
                <div className="px-6 py-4 absolute right-2 top-2 lg:relative lg:col-span-1">
                  {/* <h3 className="lg:hidden font-medium text-gray-900">Actions</h3> */}
                  <div className="flex justify-center gap-4">
                    <button
                      x-data="{ tooltip: 'Delete' }"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <TrashIcon className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      {/** MOBILE VERSION */}
    </div>
  );
};

export default OrderProducts;
