import React from "react";
import OrderProducts from "./OrderProducts";
import { Order, OrderStatus, Product } from "@/types/Order";
import { Rating } from "@smastrom/react-rating";
import {
  CURRENCIES,
  calculateTotalOrder,
  formatCurrency,
} from "@/utils/currency";
import { formatDate } from "@/utils/date";
import Button from "@/components/common/Button";
import { Currency } from "@/types/Currency";
import CurrencyListBox from "./CurrencyListBox";

interface OrderDetailProps {
  order: Order;
  handlePayOrder?: (order: Order) => void;
  handleCancelOrder?: (order: Order) => void;
  handleRateOrder?: (order: Order, rating: number) => void;
  handleEditOrder?: (order: Order) => void;
}

const OrderDetail: React.FC<OrderDetailProps> = ({
  order,
  handlePayOrder,
  handleCancelOrder,
  handleRateOrder,
  handleEditOrder,
}) => {
  const [allowEdit, setAllowEdit] = React.useState(false);
  const [currency, setCurrency] = React.useState<Currency>(CURRENCIES[0]);

  const handleDeleteProduct = (product: Product) => {
    const newProducts = order.products.filter((p) => p._id !== product._id);
    handleEditOrder &&
      handleEditOrder({
        ...order,
        products: newProducts,
      });
  };

  return (
    <div className="relative p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex justify-between gap-3 mb-3 flex-col md:flex-row">
        <div className="mb-3">
          <h4 className="text-lg font-semibold">
            Order <span className="text-blue-600">#{order._id}</span>
          </h4>
          <p className="text-gray-500">{formatDate(order.updatedAt)}</p>
          {order.status === OrderStatus.COMPLETED && (
            <div>
              <Rating
                className="w-1/2"
                value={order.rating || 0}
                style={{ maxWidth: 120 }}
                onChange={(value: number) =>
                  handleRateOrder && handleRateOrder(order, value)
                }
              />
            </div>
          )}
        </div>
        {allowEdit && (
          <CurrencyListBox
            selectedCurrency={currency}
            setSelectedCurrency={(curr) => setCurrency(curr)}
          />
        )}
      </div>

      <OrderProducts
        products={order.products}
        allowEdit={order.status === OrderStatus.ACTIVE && allowEdit}
        currency={currency.symbol}
        handleDeleteProduct={handleDeleteProduct}
      />
      <div className="flex items-center justify-end text-lg mt-2 mr-1">
        Total:{" "}
        <span className="font-semibold">
          {formatCurrency(calculateTotalOrder(order.products), currency.symbol)}
        </span>
      </div>
      {order.status === OrderStatus.ACTIVE && (
        <div className="flex justify-end">
          <div className="flex gap-2 lg:w-1/2 mt-5">
            <Button
              onClick={() => setAllowEdit(!allowEdit)}
              className="border border-blue-500 bg-white text-blue-500 hover:bg-blue-500 hover:text-white"
            >
              Edit
            </Button>
            <Button
              onClick={() => handleCancelOrder && handleCancelOrder(order)}
              className="border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handlePayOrder && handlePayOrder(order)}
              className="border border-green-500 bg-white text-green-500 hover:bg-green-500 hover:text-white"
            >
              Pay
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderDetail;
