import Navbar from "@/components/day-37/layout/Navbar";
import Footer from "@/components/day-37/layout/Footer";

interface Day37LayoutProps {
  children: React.ReactNode;
}

export default function Day37Layout({
  children,
}: Day37LayoutProps) {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="min-h-[70vh]">
        {children}
      </main>

      <Footer />
    </div>
  );
}