import Button from "@/components/common/Button";
import { FakeProduct } from "@/types/FakeProduct";
import { FunctionComponent } from "react";
import { Rating } from "@smastrom/react-rating";
import { formatCurrency } from "@/utils/currency";

interface Props {
  product: FakeProduct;
  handleGoCart: (product: FakeProduct) => void;
}

const ProdcutCard: FunctionComponent<Props> = ({ product, handleGoCart }) => {
  return (
    <div className="flex flex-col justify-between">
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            className="object-cover w-full h-full object-center"
            src={product.image}
            alt=""
          />
        </div>
        <div className="mt-4 relative">
          <h3 className="font-semibold text-opacity-100">{product.title}</h3>
          <p className="text-opacity-100 text-gray-500 text-sm mt-1">
            {product.category}
          </p>
          <div className="text-opacity-100 text-gray-500 text-sm my-2">
            <Rating
              className="w-1/2"
              value={product.rating.rate}
              style={{ maxWidth: 120 }}
              readOnly
            />
          </div>
          <p className="text-opacity-100 text-gray-500 text-sm mt-1">
            {product.description}
          </p>
        </div>
        <div className="p-4 rounded-lg overflow-hidden flex justify-end items-end h-72 top-0 absolute left-0 right-0">
          <div
            aria-hidden
            className="opacity-50 bg-gradient-to-t from-black to-transparent h-36 bottom-0 left-0 right-0 absolute"
          ></div>
          <p className="text-white font-semibold text-lg relative opacity-100">
            {formatCurrency(product.price, "$")}
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Button onClick={() => handleGoCart(product)}>Add to bag</Button>
      </div>
    </div>
  );
};

export default ProdcutCard;
