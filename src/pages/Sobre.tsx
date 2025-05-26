
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import About from "@/components/About";

const Sobre = () => {
  return (
    <div className="min-h-screen bg-standbyte-white">
      <Header />
      <main className="pt-8">
        <About />
        
        {/* Seção adicional de história da empresa */}
        <section className="py-16 bg-standbyte-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-standbyte-blue mb-8">Nossa História</h2>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="text-left space-y-4">
                  <p className="text-standbyte-mid leading-relaxed">
                    Fundada em 2009, a Standbyte nasceu da visão de democratizar o acesso à tecnologia 
                    de qualidade no Brasil. Começamos como uma pequena empresa familiar e crescemos 
                    para nos tornar referência no setor.
                  </p>
                  <p className="text-standbyte-mid leading-relaxed">
                    Hoje, atendemos desde pequenas empresas até grandes corporações, sempre mantendo 
                    nosso compromisso com a excelência e inovação.
                  </p>
                </div>
                <div className="bg-standbyte-light p-8 rounded-xl">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-standbyte-blue mb-2">15+</div>
                    <div className="text-standbyte-mid mb-4">Anos no Mercado</div>
                    <div className="text-2xl font-bold text-standbyte-dark mb-2">10.000+</div>
                    <div className="text-standbyte-mid">Clientes Satisfeitos</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Sobre;
