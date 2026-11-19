import { useContext, useState } from "react"
import { AuthContext } from "../auth/AuthContext"
import Footer from "./Footer"
import SobreContainer from "./SobreContainer"
import Newsletter from "./Newsletter"
import { getProfileSidebarLinks } from "../helpers/profileLinks"
import ProfileTab from "../helpers/ProfileTab"
import MessagesTab from "../helpers/MessagesTab"
import SettingsTab from "../helpers/SettingsTab"
import FavoritesTab from "../helpers/FavoritesTab"

export default function Profile() {
    const [activeTab, setActiveTab] = useState("perfil")
    const { user, logout } = useContext(AuthContext)
    // console.log("activeTab:", activeTab)
    const profileLinks = getProfileSidebarLinks(logout);

    const tabs = {
        perfil: <ProfileTab user={ user } />,
        mensagens: <MessagesTab />,
        definicoes: <SettingsTab />,
        favoritos: <FavoritesTab />,
    }
    return (
        <div className="profile">
            <div className="flex flex-row justify-between gap-30 md:w-[90%] mx-auto mt-10">
                <div className="">
                    <div className="mx-5 text-left leading-3">
                        <p className="capitalize text-2xl ">Olá,</p>
                        <p className="capitalize text-2xl">{user?.nome}</p>
                    </div>
                    <div className="flex flex-col my-10 border-t border-t-gray-300">
                        {profileLinks.map((item) => (
                            <button key={item.label}
                                type="button"
                                onClick={() => item.onClick ? item.onClick() : setActiveTab(item.tab)}
                                // className={`block w-full px-4 py-1 text-left rounded-lg cursor-pointer
                                className={`relative px-5 py-1 text-left cursor-pointer border-b border-b-gray-300 
                                    ${activeTab === item.tab
                                        ? "font-semibold text-font bg-gray-100"
                                        : "text-gray-700 hover:bg-gray-100"}
                                    ${item.className || ''}`}>
                                {/* <div className="flex items-center gap-2"> */}
                                {activeTab === item.tab && (
                                    <span className="absolute left-0 top-0 h-full w-1.5 bg-orange-500 rounded-r-xs" />
                                )}
                                <span className="pl-2">{item.label}</span>
                                {/* </div> */}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="grow px-8 mt-10">
                    {/* criar um ficheiro tab para cada elemento e codigo fica mais limpo
                        depois é so criar  uma const tabs = {perfil: <PerfilTab />, mensagens: <MNensagens />,...}

                        aqui chamar {tabs[activeTab]} - identifica imediato a tag e escreve o conteudo, em vez de tornar a pagina massiva com dados
                    */}
                    {tabs[activeTab]}
                    {/* {activeTab === "perfil" && <p>Dados pessoais...</p>}
                    {activeTab === "mensagens" && <p>Mensagens...</p>}
                    {activeTab === "favoritos" && <p>Favoritos...</p>}
                    {activeTab === "artesao" && <p>Torna-me Artesão...</p>}
                    {activeTab === "ajuda" && <p>Ajuda...</p>} */}
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
    )
}