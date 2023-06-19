import React from "react";
import ProdcutCard from "./product/ProdcutCard";
import SearchBar from "./search/SearchBar";
import Filter from "./search/Filter";

const Products = () => {
  return (
    <div>
      <div>
        <div>
          <SearchBar />
          <Filter />
        </div>
      </div>
      <div>
        <div className="grid mt-8 grid-col-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
            <ProdcutCard key={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
