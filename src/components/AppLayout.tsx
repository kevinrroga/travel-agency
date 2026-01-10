import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { useEffect } from "react";

const AppLayout = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname !== "/") return;
    if (!location.hash) return;

    const id = location.hash.replace("#", "");
    if (!id) return;

    // Wait a tick so the route content is mounted.
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (!el) return;

      const headerOffset = 80 + 12;
      const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top: y, behavior: "smooth" });

      el.classList.remove("section-flash");
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      el.offsetHeight;
      el.classList.add("section-flash");
      window.setTimeout(() => el.classList.remove("section-flash"), 900);
    }, 0);
  }, [location.pathname, location.hash]);

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
