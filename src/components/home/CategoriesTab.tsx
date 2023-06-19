import React from "react";
import { Tab } from "@headlessui/react";
import classNames from "@/utils/classNames";
import Products from "./products/Products";
import Orders from "./orders/Orders";

const categories = [
  { type: "All Products", component: <Products /> },
  { type: "My Orders", component: <Orders /> },
];

const CategoriesTab = () => {
  return (
    <div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1 lg:w-1/2">
          {categories.map(({ type }) => (
            <Tab
              key={`tab-${type}`}
              className={({ selected }) =>
                classNames(
                  "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                  "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                  selected
                    ? "bg-white shadow"
                    : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                )
              }
            >
              {type}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">
          {categories.map(({ type, component }) => (
            <Tab.Panel
              key={`panel-${type}`}
              className={classNames(
                "rounded-xl bg-white py-5",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              {component}
            </Tab.Panel>
          ))}
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default CategoriesTab;
