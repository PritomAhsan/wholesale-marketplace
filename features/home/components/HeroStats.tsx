import { stats } from "../data/stats";

export default function HeroStats() {
  return (
    <div className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4">

      {stats.map((item) => (
        <div key={item.label} className="text-center">

          <h3 className="text-4xl font-bold text-blue-600">
            {item.value}
          </h3>

          <p className="mt-2 text-slate-600">
            {item.label}
          </p>

        </div>
      ))}

    </div>
  );
}