"use client";

import { SlidersHorizontal } from "lucide-react";

import { AppButton } from "@/components/ui/app-button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ProductFilters from "./ProductFilters";

export default function MobileFilters() {
  return (
    <div className="lg:hidden">

      <Sheet>

        <SheetTrigger
          render={
            <AppButton
              variant="outline"
              className="w-full justify-center"
            />
          }
        >
          <SlidersHorizontal className="mr-2 h-4 w-4" />
          Filters
        </SheetTrigger>

        <SheetContent
          side="left"
          className="w-[320px] overflow-y-auto p-0"
        >

          <SheetHeader className="border-b p-6">
            <SheetTitle>
              Filters
            </SheetTitle>
          </SheetHeader>

          <div className="p-6">
            <ProductFilters mobile />
          </div>

        </SheetContent>

      </Sheet>

    </div>
  );
}