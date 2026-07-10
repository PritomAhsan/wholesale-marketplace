"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: string[];
  alt: string;
}

export default function ProductGallery({
  images,
  alt,
}: Props) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="space-y-5">

      {/* Main Image */}

      <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white">

        <Image
            src={images[selected]}
            alt={alt}
            width={900}
            height={900}
            priority
            className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-110"
        />

        </div>

      {/* Thumbnails */}

      <div className="grid grid-cols-4 gap-4">

        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelected(index)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              selected === index
                ? "border-blue-600"
                : "border-slate-200 hover:border-slate-400"
            }`}
          >
            <Image
              src={image}
              alt={`${alt} ${index + 1}`}
              width={200}
              height={200}
              className="aspect-square w-full object-cover"
            />
          </button>
        ))}

      </div>

    </div>
  );
}