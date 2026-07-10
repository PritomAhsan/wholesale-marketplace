import { Product } from "../data/products";

interface Props {
  product: Product;
}

export default function SpecificationsTab({
  product,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">

      <table className="w-full">

        <tbody>

          {product.specifications.map((item) => (
            <tr
              key={item.label}
              className="border-b last:border-0"
            >
              <td className="w-1/3 bg-slate-50 px-6 py-4 font-semibold">
                {item.label}
              </td>

              <td className="px-6 py-4">
                {item.value}
              </td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}