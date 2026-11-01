import { Outlet } from "react-router";
import NavBar from "../../components/NavBar";
import SearchIcon from '../../assets/icons/search-icon.svg?react';
import FavoriteIcon from '../../assets/icons/favorites-icon.svg?react'
import { useState } from "react";
import Modal from "../../components/ui/Modal";
import SignInForm from "../../components/SignInForm";


export default function Layout() {
    const [open, setOpen] = useState(false);

    const handleSuccess = () => {
        setOpen(false);
    }

    const navLinks = [
        { label: 'Procurar', to: "/procurar", icon: SearchIcon, iconOnly: true },
        { label: 'Favoritos', to: "/favoritos", icon: FavoriteIcon, iconOnly: true },
        {
            label: "Criar Conta | Iniciar Sessão",
            onClick: () => setOpen(true),
            className: "bg-register rounded-full text-gray-500 py-1 px-4 lowercase"
        },
    ]
    return (
        <>
            <NavBar brand={{ to: '/', label: 'Mura.lis' }} links={navLinks} />
            <main>
                <Outlet />
            </main>
            <Modal isOpen={open} onClose={() => setOpen(false)} >
                <div className="px-6 my-2">
                    <p>Criar Conta</p>
                    <p>Junta-te à Muralis e descobre o que te inspira</p>
                </div>
                <div className="px-6 my-2">
                    <SignInForm onSuccess={{handleSuccess}}/>
                </div>
            </Modal>
        </>
    )
}