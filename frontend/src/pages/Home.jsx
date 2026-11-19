import SlideShow from "../components/SlideShow"
import CategoriesCards from "../components/CategoriasCards"
import BoxCards from '../components/BoxCards'
import slides from '../assets/slides'
import Footer from "../components/Footer"
import SobreContainer from "../components/SobreContainer"
import Slogan from "../components/Slogan"
import Newsletter from "../components/Newsletter"

function Home() {
    return (
        <div className="home">
            <SlideShow slides={slides} />

            {/* Slogan e filtros */}
            <div className="text-center my-15">
                <Slogan />
            </div>

            {/* Categorias */}
            <div className="md:w-[90%] mx-auto my-15">
                <CategoriesCards />
            </div>

            {/* Novidades / Inscrição / Eventos */}
            <div className="w-[80%] md:w-[85%] mx-auto my-15">
                <div className="flex flex-col md:flex-row gap-6 md:h-87">
                    <div className="order-2 md:order-1 md:basis-3/5 h-96 md:h-full">
                        <BoxCards title={"Novidades"} />
                    </div>
                    <div className="order-1 md:order-2 md:basis-2/5 flex flex-row md:flex-col gap-6">
                        <div className="flex-1 h-36 md:h-auto">
                            <BoxCards title={"Inscrever-me como artista"} />
                        </div>
                        <div className="flex-1 h-36 md:h-auto">
                            <BoxCards title={"Eventos"} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Resumo - Sobre */}
            <div className="my-15">
                <SobreContainer />
            </div>

            {/* Newsletter */}
            <div className="my-15 text-center">
                <Newsletter />
            </div>

            {/* Footer */}
            <div className="mt-15">
                <Footer />
            </div>
        </div>
    );
}

export default Home;