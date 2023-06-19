import Button from "@/components/common/Button";

const ProdcutCard = () => {
  return (
    <div>
      <div className="relative">
        <div className="relative h-72 w-full overflow-hidden rounded-lg">
          <img
            className="object-cover w-full h-full object-center"
            src="https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
            alt=""
          />
        </div>
        <div className="mt-4 relative">
          <h3 className="font-medium text-sm text-opacity-100">
            Title of the Product
          </h3>
          <p className="text-opacity-100 text-gray-500 text-sm mt-1">
            Description of the product
          </p>
        </div>
        <div className="p-4 rounded-lg overflow-hidden flex justify-end items-end h-72 top-0 absolute left-0 right-0">
          <div
            aria-hidden
            className="opacity-50 bg-gradient-to-t from-black to-transparent h-36 bottom-0 left-0 right-0 absolute"
          ></div>
          <p className="text-white font-semibold text-lg relative opacity-100">
            $210
          </p>
        </div>
      </div>
      <div className="mt-6">
        <Button>Add to bag</Button>
      </div>
    </div>
  );
};

export default ProdcutCard;
