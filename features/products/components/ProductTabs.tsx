"use client";

import {
  FileText,
  ListChecks,
  Building2,
  Star,
} from "lucide-react";

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
import ReviewsTab from "./ReviewsTab";

interface Props {
  product: Product;
}

export default function ProductTabs({ product }: Props) {
  return (
    <section className="mt-16">
      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white px-8 py-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Product Information
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Explore product details, specifications, supplier information and
            customer reviews.
          </p>
        </div>

        <Tabs defaultValue="description">
          {/* Tabs */}
          <div className="sticky top-16 z-20 border-b border-slate-200 bg-white px-6 py-4">
            <TabsList className="grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-2 lg:grid-cols-4">
              <TabsTrigger
                value="description"
                className="flex items-center gap-2 rounded-xl"
              >
                <FileText className="h-4 w-4" />
                <span>Description</span>
              </TabsTrigger>

              <TabsTrigger
                value="specifications"
                className="flex items-center gap-2 rounded-xl"
              >
                <ListChecks className="h-4 w-4" />
                <span>Specifications</span>
              </TabsTrigger>

              <TabsTrigger
                value="supplier"
                className="flex items-center gap-2 rounded-xl"
              >
                <Building2 className="h-4 w-4" />
                <span>Supplier</span>
              </TabsTrigger>

              <TabsTrigger
                value="reviews"
                className="flex items-center gap-2 rounded-xl"
              >
                <Star className="h-4 w-4" />
                <span>Reviews</span>
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Content */}
          <div className="p-6 lg:p-8">
            <TabsContent value="description" className="mt-0">
              <DescriptionTab description={product.description} />
            </TabsContent>

            <TabsContent value="specifications" className="mt-0">
              <SpecificationsTab product={product} />
            </TabsContent>

            <TabsContent value="supplier" className="mt-0">
              <SupplierTab product={product} />
            </TabsContent>

            <TabsContent value="reviews" className="mt-0">
              <ReviewsTab product={product} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}