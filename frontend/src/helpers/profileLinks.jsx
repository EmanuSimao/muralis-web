export const getProfileLinks = (logout) => [
    { label: "Perfil", to: "/perfil", className: "hover:bg-gray-100 text-left" },
    { label: "Mensagens", to: "/mensagens", className: "hover:bg-gray-100 text-left" },
    { label: "Favoritos", to: "/favorites", className: "hover:bg-gray-100 text-left" },
    { label: "Torna-me Artesão", to: "/#", className: "hover:bg-gray-100 text-left" },
    { label: "Ajuda", to: "", className: "hover:bg-gray-100 text-left" },
    { label: "Terminar Sessão", onClick: logout, className: "bg-black hover:bg-gray-600 mt-4 text-white capitalize text-center" }
]

export const getProfileSidebarLinks = (logout) => [
    { label: "Dados Pessoais", tab: "perfil" },
    { label: "Definições da conta", tab: "definicoes"},
    { label: "Mensagens", tab: "mensagens" },
    { label: "Favoritos", tab: "favoritos" },
    { label: "Torna-me Artesão", tab: "artesao" },
    { label: "Ajuda",  tab: "ajuda" },
    { label: "Terminar Sessão", onClick: logout, className: "mt-15 border-t border-t-gray-300 border-b-transparent font-semibold" }
]