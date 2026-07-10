"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { Product } from "../data/products";

import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import SupplierTab from "./SupplierTab";

interface Props {
  product: Product;
}

export default function ProductTabs({
  product,
}: Props) {
  return (
    <div className="mt-16 rounded-3xl border border-slate-200 bg-white p-8">

      <Tabs defaultValue="description">

        <TabsList className="mb-8 h-auto flex-wrap rounded-2xl bg-slate-100 p-2">

          <TabsTrigger value="description">
            Description
          </TabsTrigger>

          <TabsTrigger value="specifications">
            Specifications
          </TabsTrigger>

          <TabsTrigger value="supplier">
            Supplier
          </TabsTrigger>

        </TabsList>

        <TabsContent value="description">
          <DescriptionTab
            description={product.description}
          />
        </TabsContent>

        <TabsContent value="specifications">
          <SpecificationsTab
            product={product}
          />
        </TabsContent>

        <TabsContent value="supplier">
          <SupplierTab
            product={product}
          />
        </TabsContent>

      </Tabs>

    </div>
  );
}