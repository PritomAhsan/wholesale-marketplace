import { Supplier } from "../data/suppliers";

interface Props {
  supplier: Supplier;
}

export default function SupplierAbout({
  supplier,
}: Props) {
  return (
    <div className="rounded-3xl bg-white p-8">

      <h2 className="text-3xl font-bold">
        About Company
      </h2>

      <p className="mt-6 leading-8 text-slate-600">
        {supplier.description}
      </p>

      <p className="mt-6 leading-8 text-slate-600">
        With years of export experience and strict quality
        control processes, the company serves wholesalers,
        distributors and retailers across Europe, North
        America, Asia and the Middle East. OEM and private
        label manufacturing services are available.
      </p>

    </div>
  );
}