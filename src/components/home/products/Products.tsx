import React, { useEffect, useState } from "react";
import ProdcutCard from "./product/ProdcutCard";
import SearchBar from "./search/SearchBar";
import Filter from "./search/Filter";
import {
  GET_FAKE_PRODUCTS,
  useFetchData as useFetchFakeData,
} from "@/api/fakeApiQueries";
import { FakeProduct } from "@/types/FakeProduct";
import ProductSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { Action } from "@/types/Filter";
import { useQueryClient } from "react-query";
import { useAuth } from "@/hooks/useAuth";
import {
  CREATE_ORDER,
  GET_USER_ORDERS,
  UPDATE_ORDER,
  useFetchData,
  useMutateData,
  useUpdateData,
} from "@/api/apiQueries";
import { Order, OrderStatus } from "@/types/Order";
import { toast } from "react-toastify";
import { Api } from "@/types/Api";
import { toastOptions } from "@/utils/toast";

const Products = () => {
  const queryClient = useQueryClient(); // access the query client
  const { decodedToken, isAuthenticated } = useAuth();
  const {
    data: ordersResponse,
    isLoading: isOrdersLoading,
    error: orderErrors,
  } = useFetchData<Api<Order[]>>(
    GET_USER_ORDERS(decodedToken?.userId as string),
    {
      enabled: !!decodedToken?.userId,
    }
  );
  const createOrderMutation = useMutateData<Api<Order>, Partial<Order>>(
    CREATE_ORDER
  );
  const updateOrderMutation = useUpdateData<Api<Order>, Partial<Order>>(
    UPDATE_ORDER
  );
  const {
    data: fakeData,
    isLoading: fakeIsLoading,
    error: fakeError,
  } = useFetchFakeData<FakeProduct[]>(GET_FAKE_PRODUCTS);

  const [filteredData, setFilteredData] = useState<FakeProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentFilter, setCurrentFilter] = useState<Action>("clear");

  const handleSearchAndFilter = (
    searchTerm: string,
    filter: Action | null,
    data: FakeProduct[] | undefined
  ) => {
    if (!data) return;

    let processedData = [...data];

    // Filtering by search term
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      processedData = processedData.filter(
        (product) =>
          product.title.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.category.toLowerCase().includes(lowerCaseSearchTerm) ||
          product.price.toString().includes(lowerCaseSearchTerm)
      );
    }

    // Sorting by filter
    if (filter) {
      processedData.sort((a, b) => {
        const aKey = filter === "name" ? a.title : a.category;
        const bKey = filter === "name" ? b.title : b.category;
        return aKey.toLowerCase().localeCompare(bKey.toLowerCase());
      });
    }

    setFilteredData(processedData);
  };

  const handleAddToCartProduct = async (product: FakeProduct) => {
    if (!isAuthenticated || !decodedToken) return;

    await queryClient.refetchQueries(
      GET_USER_ORDERS(decodedToken?.userId as string)
    );

    const orders = ordersResponse?.data;

    const activeOrder = orders?.find(
      (order) => order.status === OrderStatus.ACTIVE
    );

    if (activeOrder) {
      const updatedProducts = [...activeOrder.products, product];
      await updateOrderMutation.mutateAsync(
        {
          _id: activeOrder._id,
          products: updatedProducts,
        },
        {
          onSuccess: () =>
            queryClient.refetchQueries(
              GET_USER_ORDERS(decodedToken?.userId as string)
            ),
        }
      );
      toast.success("Product added to the order!", toastOptions);
    } else {
      const newOrder = { userId: decodedToken.userId, products: [product] };
      await createOrderMutation.mutateAsync(newOrder, {
        onSuccess: () =>
          queryClient.refetchQueries(
            GET_USER_ORDERS(decodedToken?.userId as string)
          ),
      });
      toast.success("New order created and product added!", toastOptions);
    }
  };

  useEffect(() => {
    handleSearchAndFilter(searchTerm, currentFilter, fakeData);
  }, [fakeData, searchTerm, currentFilter]);

  return (
    <div>
      <div>
        <div>
          <SearchBar onSearch={setSearchTerm} />
          <Filter onFilter={setCurrentFilter} />
        </div>
      </div>
      <div>
        <div className="grid mt-8 grid-col-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
          {fakeIsLoading &&
            [1, 2, 3, 4].map((item) => <ProductSkeleton key={item} />)}
          {fakeData &&
            filteredData.map((product) => (
              <ProdcutCard
                key={product.id}
                product={product}
                handleGoCart={handleAddToCartProduct}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
