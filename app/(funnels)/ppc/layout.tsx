import "./ppc.css";
import HeaderPPC from "./components/HeaderPPC";
import FooterPPC from "./components/FooterPPC";

export const metadata = {
  robots: "noindex, nofollow",
};

export default function PPCLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderPPC />
      {children}
      <FooterPPC />
    </>
  );
}
