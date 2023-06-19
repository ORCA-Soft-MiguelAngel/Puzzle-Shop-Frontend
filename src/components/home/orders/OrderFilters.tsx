import React from 'react';

interface OrderFilterProps {
  onFilterRating?: (rating: string) => void;
  onFilterPrice?: (price: string) => void;
}

const OrderFilter: React.FC<OrderFilterProps> = ({
  onFilterRating,
  onFilterPrice,
}) => {
  const handleRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterRating) {
      onFilterRating(event.target.value);
    }
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (onFilterPrice) {
      onFilterPrice(event.target.value);
    }
  };

  return (
    <div className="flex gap-4">
      <div>
        <label htmlFor="ratingFilter" className="block text-sm font-medium text-gray-700">Rating</label>
        <select id="ratingFilter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={handleRatingChange}>
          <option value="all">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
      <div>
        <label htmlFor="priceFilter" className="block text-sm font-medium text-gray-700">Price</label>
        <select id="priceFilter" className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md" onChange={handlePriceChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
};

export default OrderFilter;