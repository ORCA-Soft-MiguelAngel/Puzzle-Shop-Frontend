import React, { useEffect, useState } from "react";
import ProdcutCard from "./product/ProdcutCard";
import SearchBar from "./search/SearchBar";
import Filter from "./search/Filter";
import { GET_FAKE_PRODUCTS, useFetchData } from "@/api/fakeApiQueries";
import { FakeProduct } from "@/types/FakeProduct";
import ProductSkeleton from "@/components/Skeletons/ProductCardSkeleton";
import { Action } from "@/types/Filter";

const Products = () => {
  const { data, isLoading, error } =
    useFetchData<FakeProduct[]>(GET_FAKE_PRODUCTS);

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

  useEffect(() => {
    handleSearchAndFilter(searchTerm, currentFilter, data);
  }, [data, searchTerm, currentFilter]);

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
          {isLoading &&
            [1, 2, 3, 4].map((item) => <ProductSkeleton key={item} />)}
          {data &&
            filteredData.map((product) => (
              <ProdcutCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
