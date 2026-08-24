import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { fetchCategories } from "@/features/categories/api";

interface Props {
  children: ReactNode;
}

export default async function MainLayout({ children }: Props) {
  const categories = await fetchCategories();

  return (
    <>
      <Navbar categories={categories} />
      <main>{children}</main>
      <Footer />
    </>
  );
}