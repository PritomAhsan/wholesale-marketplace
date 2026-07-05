interface Props {
  value: string;
  label: string;
}

export function StatCard({
  value,
  label,
}: Props) {
  return (
    <div className="text-center">

      <h3 className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-4xl font-black text-transparent">
        {value}
      </h3>

      <p className="mt-2 text-slate-500">
        {label}
      </p>

    </div>
  );
}