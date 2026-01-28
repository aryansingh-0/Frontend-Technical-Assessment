import React from "react";
import ProductsList from "@/components/products/ProductsList";

export default function Page() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Directory</h1>
      <ProductsList />
    </div>
  );
}
