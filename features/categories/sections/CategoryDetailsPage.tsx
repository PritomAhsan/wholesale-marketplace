import Container from "@/components/layout/Container";

import ProductGrid from "@/features/products/components/ProductGrid";
import SupplierGrid from "@/features/suppliers/components/SupplierGrid";

import { products } from "@/features/products/data/products";
import { suppliers } from "@/features/suppliers/data/suppliers";

import { Category } from "../data/categories";

interface Props {
    category: Category;
}

export default function CategoryDetailsPage({
    category,
}: Props) {

    const categoryProducts = products.filter(
        (p) => p.category === category.name
    );

    const categorySuppliers = suppliers.filter(
        (s) => s.category === category.name
    );

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
                                {category.products}
                            </div>
                            Products
                        </div>

                        <div>
                            <div className="text-3xl font-bold">
                                {category.suppliers}
                            </div>
                            Suppliers
                        </div>

                    </div>

                </div>

                <section className="mt-16">

                    <h2 className="mb-8 text-3xl font-bold">
                        Featured Products
                    </h2>

                    <ProductGrid
                        products={categoryProducts.slice(0,4)}
                    />

                </section>

                <section className="mt-20">

                    <h2 className="mb-8 text-3xl font-bold">
                        Featured Suppliers
                    </h2>

                    <SupplierGrid
                        suppliers={categorySuppliers.slice(0,2)}
                    />

                </section>

                {/* <section className="mt-20">

                    <h2 className="mb-8 text-3xl font-bold">
                        Browse All Products
                    </h2>

                    <ProductGrid
                        products={categoryProducts}
                    />

                </section> */}

            </Container>

        </section>
    );
}