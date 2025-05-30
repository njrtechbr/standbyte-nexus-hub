
import HeaderWithAuth from "@/components/HeaderWithAuth";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-standbyte-white">
      <HeaderWithAuth />
      <Hero />
      <Products />
      <Services />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
