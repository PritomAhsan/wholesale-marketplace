import { Supplier } from "../data/suppliers";
import SupplierCard from "./SupplierCard";

interface Props {
  suppliers: Supplier[];
}

export default function SupplierGrid({
  suppliers,
}: Props) {
  return (
    <div className="space-y-8">
      {suppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          supplier={supplier}
        />
      ))}
    </div>
  );
}