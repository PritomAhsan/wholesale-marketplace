"use client";

import Image from "next/image";
import Link from "next/link";
import { Check, Heart, ShoppingCart, Trash2 } from "lucide-react";
import { useState } from "react";

import Container from "@/components/layout/Container";
import { AppButton } from "@/components/ui/app-button";
import { useWishlist, WishlistItem } from "@/features/wishlist/WishlistContext";
import { useCart } from "@/features/cart/CartContext";
import { useToast } from "@/features/notifications/ToastContext";

export default function WishlistPage() {
  const { items, removeItem } = useWishlist();
  const { notify } = useToast();

  if (items.length === 0) {
    return (
      <section className="bg-ivory py-24">
        <Container className="max-w-lg text-center">
          <Heart className="mx-auto mb-4 text-obsidian/20" size={56} />

          <h1 className="text-xl font-bold text-obsidian">
            Your wishlist is empty
          </h1>

          <p className="mt-2 text-sm text-obsidian/50">
            Save products you're considering and they'll show up here.
          </p>

          <Link href="/products">
            <AppButton className="mt-7">Browse Products</AppButton>
          </Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-10">
      <Container>
        <h1 className="text-2xl font-bold text-obsidian">Wishlist</h1>

        <p className="mt-1.5 text-sm text-obsidian/50">
          {items.length} saved product{items.length !== 1 ? "s" : ""}
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <WishlistCard
              key={item.productUuid}
              item={item}
              onRemove={() => {
                removeItem(item.productUuid);
                notify("Removed from wishlist", "remove");
              }}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

function WishlistCard({
  item,
  onRemove,
}: {
  item: WishlistItem;
  onRemove: () => void;
}) {
  const { addItem } = useCart();
  const { notify } = useToast();
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    addItem({
      productUuid: item.productUuid,
      slug: item.slug,
      name: item.name,
      image: item.image,
      price: item.price,
      moq: item.moq,
      stock: item.stock,
      supplierUuid: item.supplierUuid,
      supplierName: item.supplierName,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    notify(`${item.name} added to cart`, "cart");
  }

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-sapphire hover:shadow-xl hover:shadow-sapphire/10">
      <div className="relative h-44 shrink-0 overflow-hidden bg-muted sm:h-48">
        <Link href={`/products/${item.slug}`} className="block h-full w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 50vw"
            className="object-cover transition duration-500 group-hover:scale-110"
          />
        </Link>

        <button
          onClick={onRemove}
          className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-obsidian/50 shadow-sm transition hover:text-red-600"
          aria-label="Remove from wishlist"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>

        <span className="absolute bottom-2 left-2 rounded-md bg-obsidian/80 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          MOQ {item.moq}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <Link href={`/products/${item.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-semibold leading-5 text-obsidian transition group-hover:text-sapphire">
            {item.name}
          </h3>
        </Link>

        <p className="mt-2 text-xl font-extrabold text-sapphire">
          ${item.price.toFixed(2)}
        </p>

        <p className="mt-1.5 truncate text-xs text-obsidian/45">
          Seller <span className="font-medium text-obsidian/60">{item.supplierName}</span>
        </p>

        <div className="mt-auto pt-3">
          <AppButton
            className="h-9 w-full justify-center px-2 text-xs"
            disabled={item.stock <= 0}
            onClick={handleAddToCart}
          >
            {added ? (
              <>
                <Check className="mr-1 h-3.5 w-3.5" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="mr-1 h-3.5 w-3.5" />
                {item.stock <= 0 ? "Out of stock" : "Add to cart"}
              </>
            )}
          </AppButton>
        </div>
      </div>
    </div>
  );
}
