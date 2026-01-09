import { Outlet } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <ScrollToTop />

      <div className="pt-20 overflow-x-hidden">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};

export default AppLayout;
