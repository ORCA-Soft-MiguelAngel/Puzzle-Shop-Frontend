import {
  DELETE_ORDER,
  GET_USER_ORDERS,
  UPDATE_ORDER,
  useDeleteData,
  useFetchData,
  useUpdateData,
} from "@/api/apiQueries";
import { useAuth } from "@/hooks/useAuth";
import { Api } from "@/types/Api";
import { Order, OrderStatus } from "@/types/Order";
import { toastOptions } from "@/utils/toast";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import { toast } from "react-toastify";
import OrderDetail from "./OrderDetail";
import OrderFilter from "./OrderFilters";
import { calculateTotalOrder } from "@/utils/currency";

const Orders = () => {
  const queryClient = useQueryClient();
  const { decodedToken, isAuthenticated } = useAuth();
  const { data: ordersResponse } = useFetchData<Api<Order[]>>(
    GET_USER_ORDERS(decodedToken?.userId as string),
    {
      enabled: !!decodedToken?.userId,
    }
  );
  const updateOrderMutation = useUpdateData<Api<Order>, Partial<Order>>(
    UPDATE_ORDER
  );
  const deleteOrderMutation = useDeleteData<Api<any>>(DELETE_ORDER);

  const [orders, setOrders] = useState<Order[]>([]);
  const [filterRating, setFilterRating] = useState("all");
  const [filterPrice, setFilterPrice] = useState("asc");
  const [activeOrder, setActiveOrder] = useState<Order | undefined>(undefined);

  const handleFilterRating = (rating: string) => {
    setFilterRating(rating);
  };

  const handleFilterPrice = (price: string) => {
    setFilterPrice(price);
  };

  // Filter and sort function
  const filterAndSortOrders = (orders: any) => {
    let result = [...orders];

    if (filterRating !== "all") {
      result = result.filter((order) => order.rating == filterRating);
    }

    result.sort((a, b) => {
      const aTotal = calculateTotalOrder(a.products);
      const bTotal = calculateTotalOrder(b.products);
      if (filterPrice === "asc") {
        return aTotal - bTotal;
      } else {
        return bTotal - aTotal;
      }
    });

    return result;
  };

  const handlePayOrder = (order: Order) => {
    const updatedOrder = { ...order, status: OrderStatus.COMPLETED };
    delete updatedOrder.rating;
    updateOrderMutation.mutate(updatedOrder, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Order paid successfully", toastOptions);
          queryClient.refetchQueries(GET_USER_ORDERS(order.userId));
        } else {
          toast.error(data.errorMessage);
        }
      },
    });
  };

  const handleCancelOrder = (order: Order) => {
    deleteOrderMutation.mutate(order._id, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Order deleted successfully", toastOptions);
          queryClient.refetchQueries(GET_USER_ORDERS(order.userId));
        } else {
          toast.error(data.errorMessage);
        }
      },
    });
  };

  const handleRateOrder = (order: Order, rating: number) => {
    const updatedOrder = { ...order, rating };
    updateOrderMutation.mutate(updatedOrder, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Order rated successfully", toastOptions);
          queryClient.refetchQueries(GET_USER_ORDERS(order.userId));
        } else {
          toast.error(data.errorMessage);
        }
      },
    });
  };

  const handleEditOrder = (order: Order) => {
    if (order.products.length === 0) {
      handleCancelOrder(order);
      return;
    }

    const updatedOrder = { ...order, status: OrderStatus.ACTIVE };
    delete updatedOrder.rating;
    updateOrderMutation.mutate(updatedOrder, {
      onSuccess: (data) => {
        if (data.success) {
          toast.success("Order updated successfully", toastOptions);
          queryClient.refetchQueries(GET_USER_ORDERS(order.userId));
        } else {
          toast.error(data.errorMessage);
        }
      },
    });
  };

  useEffect(() => {
    isAuthenticated &&
      decodedToken &&
      queryClient.refetchQueries(
        GET_USER_ORDERS(decodedToken?.userId as string)
      );
  }, [isAuthenticated, decodedToken]);

  useEffect(() => {
    if (ordersResponse?.success) {
      const updatedOrders = ordersResponse.data;
      setOrders(updatedOrders);
      setActiveOrder(
        updatedOrders.find((order) => order.status === OrderStatus.ACTIVE)
      );
    }
  }, [ordersResponse]);

  return (
    <div>
      <Disclosure defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
              <span className="text-lg">Active Orders</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-blue-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
              {activeOrder ? (
                <OrderDetail
                  order={activeOrder}
                  handleCancelOrder={handleCancelOrder}
                  handlePayOrder={handlePayOrder}
                  handleEditOrder={handleEditOrder}
                />
              ) : (
                <p>No active orders at the moment...</p>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Disclosure as="div" className="mt-2" defaultOpen>
        {({ open }) => (
          <>
            <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-gray-100 px-4 py-2 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75">
              <span className="text-lg">Previous Orders</span>
              <ChevronUpIcon
                className={`${
                  open ? "rotate-180 transform" : ""
                } h-5 w-5 text-gray-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className=" pt-4 pb-2 text-sm flex flex-col gap-5">
              <>
                <OrderFilter
                  onFilterRating={handleFilterRating}
                  onFilterPrice={handleFilterPrice}
                />
                {filterAndSortOrders(orders)
                  .filter((order) => order.status === OrderStatus.COMPLETED)
                  .map((order) => (
                    <OrderDetail
                      key={order._id}
                      order={order}
                      handleRateOrder={handleRateOrder}
                    />
                  ))}
              </>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
};

export default Orders;
