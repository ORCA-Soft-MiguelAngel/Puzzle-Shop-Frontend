import Button from "@/components/common/Button";
import { Action } from "@/types/Filter";
import React, { useState } from "react";

interface FilterProps {
  onFilter: (action: Action) => void;
}

const Filter: React.FC<FilterProps> = ({ onFilter }) => {
  const [selectedFilter, setSelectedFilter] = useState<string>("clear");

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const id = e.currentTarget.id;
    setSelectedFilter(id as Action);
    onFilter(id as Action);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 my-4 xl:w-1/2 mx-auto">
      <Button
        id="name"
        className={
          selectedFilter === "name"
            ? "bg-gray-400 border-2 border-gray-400 text-white"
            : ""
        }
        onClick={handleButtonClick}
      >
        {selectedFilter === "name" ? "Filtered" : "Filter"} by Name
      </Button>
      <Button
        id="category"
        className={
          selectedFilter === "category"
            ? "bg-gray-400 border-2 border-gray-400 text-white"
            : ""
        }
        onClick={handleButtonClick}
      >
        {selectedFilter === "category" ? "Filtered" : "Filter"} by Category
      </Button>
      {selectedFilter !== "clear" && (
        <Button id="clear" onClick={handleButtonClick}>
          Clear Filter
        </Button>
      )}
    </div>
  );
};

export default Filter;
