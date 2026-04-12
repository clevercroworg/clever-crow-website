import "./ppc.css";
import HeaderPPC from "./components/HeaderPPC";
import Footer from "@/components/Footer";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function PPCLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPPC />
      {children}
      <Footer />
    </>
  );
}
