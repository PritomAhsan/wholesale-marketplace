import Container from "@/components/layout/Container";

import ProductGrid from "@/features/products/components/ProductGrid";

import { Product } from "@/features/products/data/products";

import { Category } from "../data/categories";

interface Props {
    category: Category;
    products: Product[];
    productsTotal: number;
    suppliersTotal: number;
}

export default function CategoryDetailsPage({
    category,
    products,
    productsTotal,
    suppliersTotal,
}: Props) {

    return (
        <section className="bg-slate-50 py-20">

            <Container>

                <div className="rounded-3xl bg-gradient-to-r from-blue-700 to-indigo-700 p-12 text-white">

                    <h1 className="text-5xl font-black">
                        {category.name}
                    </h1>

                    <p className="mt-4 max-w-3xl text-blue-100 text-lg">
                        {category.description}
                    </p>

                    <div className="mt-8 flex gap-8">

                        <div>
                            <div className="text-3xl font-bold">
                                {productsTotal}
                            </div>
                            Products
                        </div>

                        <div>
                            <div className="text-3xl font-bold">
                                {suppliersTotal}
                            </div>
                            Suppliers
                        </div>

                    </div>

                </div>

                {products.length > 0 && (
                    <section className="mt-16">

                        <h2 className="mb-8 text-3xl font-bold">
                            Featured Products
                        </h2>

                        <ProductGrid
                            products={products.slice(0, 4)}
                        />

                    </section>
                )}

            </Container>

        </section>
    );
}
