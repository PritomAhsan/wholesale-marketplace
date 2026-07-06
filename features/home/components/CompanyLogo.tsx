import Image from "next/image";

interface Props {
  src: string;
  alt: string;
}

export default function CompanyLogo({
  src,
  alt,
}: Props) {
  return (
    <div className="flex h-20 items-center justify-center rounded-2xl border border-slate-200 bg-white p-2 transition hover:border-blue-200 hover:shadow-md">
      <Image
        src={src}
        alt={alt}
        width={120}
        height={40}
        className="h-8 w-auto object-contain grayscale opacity-70 transition hover:grayscale-0 hover:opacity-100"
      />
    </div>
  );
}