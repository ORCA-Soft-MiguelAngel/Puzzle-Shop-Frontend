import React from "react";
import ContentLoader from "react-content-loader";

const ProductSkeleton = () => {
  return (
    <ContentLoader className="w-full h-[540px]">
      <rect x="0" y="0" rx="5" ry="5" width="100%" height="290" />
      <rect x="0" y="305" rx="5" ry="5" width="100%" height="30" />
      <rect x="0" y="350" rx="5" ry="5" width="35%" height="20" />
      <rect x="0" y="385" rx="5" ry="5" width="60%" height="20" />
      <rect x="0" y="420" rx="5" ry="5" width="100%" height="60" />
      <rect x="0" y="495" rx="5" ry="5" width="100%" height="40" />
    </ContentLoader>
  );
};

export default ProductSkeleton;
