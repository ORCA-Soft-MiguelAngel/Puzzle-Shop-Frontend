import React, { ButtonHTMLAttributes, FunctionComponent } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      className={`w-full font-medium text-sm py-2 px-8 border rounded-md flex justify-center relative items-center bg-gray-200 hover:bg-gray-300 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
