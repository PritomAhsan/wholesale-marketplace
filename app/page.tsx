import Container from "@/components/layout/Container";

export default function HomePage() {
  return (
    <Container className="py-24">
      <h1 className="text-5xl font-bold">
        Wholesale Marketplace
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-slate-600">
        Modern B2B marketplace for verified suppliers and wholesale buyers.
      </p>
    </Container>
  );
}