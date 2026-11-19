import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import SearchIcon from '../../assets/icons/search-icon.svg?react';
import FavoriteIcon from '../../assets/icons/favorites-icon.svg?react'
import { useContext, useState } from "react";
import Modal from "../../components/ui/Modal";
import SignInForm from "../../components/Signup";
import LoginForm from "../../components/Login";
import WelcomeForm from "../../components/Welcome";
import { AuthContext } from "../../auth/AuthContext";
import { getProfileLinks } from "../../helpers/profileLinks";


export default function Layout() {
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openWelcome, setOpenWelcome] = useState(false);
    const { user, isLoggedIn, logout } = useContext(AuthContext)
    const profileLinks = getProfileLinks(logout);

    const publicLinks = [
        { label: 'Procurar', to: "/procurar", icon: SearchIcon, iconOnly: true },
        { label: 'Favoritos', to: "/favoritos", icon: FavoriteIcon, iconOnly: true },
    ]

    // verifica se user tem sessão iniciada e altera a navbar dinamicamente
    const authLinks = isLoggedIn ? [
        ...publicLinks,
        {
            label: "Olá " + (user?.nome?.split(" ")[0] || "Perfil"),
            // to: "/perfil",
            className: "bg-register rounded-full text-gray-500 py-1 px-4 capitalize text-sm",
            dropdown: profileLinks
            // avatar: user?.profilePicture || user?.name?.chatAt(0).toUpperCase(),
            // isAvatar: true,
        }
    ] : [
        ...publicLinks,
        {
            label: "Criar Conta | Iniciar Sessão",
            onClick: () => setOpenRegister(true),
            className: "bg-register rounded-full text-gray-500 text-sm py-1 px-4 lowercase"
        },
    ];

    return (
        <>
            <NavBar brand={{ to: '/', label: 'Mura.lis' }} links={authLinks} />

            <main>
                <Outlet />
            </main>

            <Modal isOpen={openRegister} onClose={() => setOpenRegister(false)} >
                <SignInForm
                    onSuccess={() => {
                        setOpenRegister(false)
                        setOpenWelcome(true)
                    }}
                    onSwitchToLogin={() => {
                        setOpenRegister(false);
                        setOpenLogin(true);
                    }}
                />
            </Modal>

            <Modal isOpen={openLogin} onClose={() => setOpenLogin(false)}>
                <LoginForm
                    onSuccess={() => setOpenLogin(false)}
                    onSwitchToSignUp={() => {
                        setOpenLogin(false);
                        setOpenRegister(true);
                    }}
                />
            </Modal>

            {/* Modal Welcome (Registo com sucesso) */}
            <Modal isOpen={openWelcome} onClose={() => setOpenWelcome(false)} className="border-[#B55A1C]">
                <WelcomeForm
                    onClose={() => {
                        setOpenWelcome(false);
                        setOpenLogin(true);
                    }}
                />
            </Modal>
        </>
    )
}