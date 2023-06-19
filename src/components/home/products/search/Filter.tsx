import Button from "@/components/common/Button";
import React from "react";

const Filter = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 my-4 xl:w-1/2 mx-auto">
      <Button className="">Filter by Name</Button>
      <Button>Filter by Category</Button>
    </div>
  );
};

export default Filter;
