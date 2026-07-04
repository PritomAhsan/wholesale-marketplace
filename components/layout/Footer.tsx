import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t py-10">
      <Container>
        <p className="text-center text-sm text-slate-500">
          © {new Date().getFullYear()} WholesaleHub. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}