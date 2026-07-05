const stats = [
  {
    value: "10K+",
    label: "Products",
  },
  {
    value: "500+",
    label: "Suppliers",
  },
  {
    value: "120",
    label: "Categories",
  },
  {
    value: "40+",
    label: "Countries",
  },
];

export default function HeroStats() {
  return (
    <div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
      {stats.map((item) => (
        <div key={item.label}>
          <h3 className="text-3xl font-black text-slate-900">
            {item.value}
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}