import { ReactNode } from "react";
import Announcement from "./Announcement";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function MainLayout({ children }: Props) {
  return (
    <>
      <Announcement />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}