import SlideShow from "../components/SlideShow"
import CategoriesList from "../components/CategoriasLista"
import FreguesiasList from "../components/Freguesias"
import CategoriesCards from "../components/CategoriasCards"
import BoxCards from '../components/BoxCards'
import slides from '../assets/slides'
import SearchIcon from '../assets/icons/search-icon.svg?react'
import FilterIcon from '../assets/icons/filter-icon.svg?react'
import LocationIcon from '../assets/icons/location-icon.svg?react'
import Footer from "../components/Footer"
import { useState } from "react"
import SobreContainer from "../components/SobreContainer"

function Home() {
    const [categoryId, setCategoryId] = useState('');
    const [freguesia, setFreguesia] = useState('');
    const [search, setSearch] = useState('');
    return (
        <div className="home">
            <SlideShow slides={slides} />

            {/* Slogan e filtros */}
            <div className="text-center">
                <div className="head lowercase p-6 ">
                    <h1 className="text-xl md:text-4xl">um mural de histórias, técnicas e criadores</h1>
                    <h3 className="text-lg md:text-2xl mt-2">encontra-os por nome, categoria ou localização</h3>
                </div>

                <div className="filtros py-6 px-15 flex flex-row flex-wrap md:flex-nowrap justify-evenly gap-4 md:w-[85%] mx-auto">
                    <div className="artista-nome bg-register rounded-full w-full p-3 flex flex-row items-center">
                        <label htmlFor="artist-name">
                            <SearchIcon className="h-7 w-7" />
                        </label>
                        <input
                            id="artist-name" type="text" value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="pesquisa o nome do artista"
                            className="w-full ml-2"
                        />
                    </div>
                    <div className="categoria bg-register rounded-full w-full p-3 flex flex-row items-center">
                        <label htmlFor="categories">
                            <FilterIcon className="h-7 w-7" />
                        </label>
                        <CategoriesList
                            value={categoryId}
                            onChange={setCategoryId}
                            placeholder="categorias"
                            // className={`w-full ml-2 pr-8 rounded outline-none focus:outline-none bg-register lowercase ${categoryId ? "text-font" : "text-gray-400"} appearance-none pointer`}
                        />
                    </div>
                    <div className="localizacao bg-register rounded-full w-full p-3 flex flex-row items-center">
                        <label htmlFor="freguesias">
                            <LocationIcon className="h-7 w-7" />
                        </label>
                        <FreguesiasList
                            value={freguesia}
                            onChange={setFreguesia}
                            placeholder="freguesias"
                        // className={`w-full ml-2 pr-8 rounded outline-none focus:outline-none ${freguesia ? "text-font" : "text-gray-400"} lowercase appearance-none truncate`}
                        />
                    </div>
                </div>
            </div>

            {/* Categorias */}
            <div className="md:w-[90%] mx-auto">
                <CategoriesCards />
            </div>

            {/* Novidades / Inscrição / Eventos */}
            <div className="w-[80%] md:w-[85%] mx-auto mt-5 mb-9">
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
            <div className="">
                <SobreContainer />
            </div>

            {/* Newsletter */}
            <div className="w-full mx-auto p-10 m-10 text-center">
                <div className="flex flex-col justify-center md:flex-col gap-6">
                    <div className="text-4xl text-newsletter">
                        <p>junta-te à comunidade MURA.LIS</p>
                        <p>descobre histórias, criadores e eventos locais</p>
                    </div>
                    <div className="flex flex-row justify-around mx-auto items-center bg-register rounded-full w-150 text-center">
                        <div className="grow py-2">
                            <input type="email" name="email" id="email" placeholder="introduza o seu e-mail" />
                        </div>
                        <div className="flex-none py-2 bg-gray-400 rounded-r-full text-center text-white">
                            <input className="mx-4 px-2" type="submit" value="subscrever" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    )
}

export default Home;