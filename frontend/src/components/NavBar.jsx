import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import Logo from "../assets/logo/logo-final.svg?react";
import ArrowDown from "../assets/icons/arrow-down-icon.svg?react";

export default function NavBar({
    links = [],
    brand = { to: "/", label: "Muralis" },
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [openProfile, setOpenProfile] = useState();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpenProfile(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="navbar p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link
                    to={brand.to}
                    className="navbar-brand flex items-center gap-2.5"
                    onClick={() => setIsOpen(false)}
                >
                    <Logo className="h-15 w-auto" aria-label={`${brand.label} Logo`} />
                </Link>

                {/* Menu para mobile */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-black focus:outline-none md:hidden"
                >
                    {isOpen ? (
                        <span className="material-symbols-outlined">menu_open</span>
                    ) : (
                        <span className="material-symbols-outlined">menu</span>
                    )}
                </button>

                {/* Links de Navegação */}
                <div className="navbar-links hidden items-center gap-2 md:flex">
                    <div className="w-105 bg-gray-300 h-6 mt-1 rounded-full">sdfkjsdhfkjf</div>

                    {links.map(
                        ({
                            to,
                            label,
                            icon: Icon,
                            iconOnly = false,
                            className = "",
                            onClick,
                            dropdown,
                        }) => {
                            const classes = `text-gray-500 ${className}`.trim();
                            const content = (
                                <>
                                    {/* Avatar de perfil
                                    {isAvatar &&
                                        (avatar?.length === 1 ? ( // é uma inicial (string de 1 char)
                                            <div className="w-9 h-9 rounded-full bg-black text-white flex items-center justify-center">
                                                {avatar}
                                            </div>
                                        ) : (
                                            <img
                                                src={avatar}
                                                alt={label}
                                                className="w-9 h-9 rounded-full object-cover"
                                            />
                                        ))} */}

                                    {/* Ícone normal */}
                                    {/* {!isAvatar && Icon && ( */}
                                    {Icon && (
                                        <Icon className="navbar-link-icon w-8 h-8 text-gray-500 hover:text-orange-500" />
                                    )}

                                    {/* Label (texto) */}
                                    {!iconOnly && label}
                                </>
                            );

                            if (dropdown) {
                                return (
                                    <div key={label} className="relative" ref={dropdownRef}>
                                        <button
                                            type="button"
                                            onClick={() => setOpenProfile(openProfile === label ? null : label)}
                                            className={`${classes} inline-flex justify-center items-center gap-1.5`}
                                        >
                                            {content}
                                            {/* <span className="material-symbols-outlined text-sm">
                                                {openProfile === label ? "expand_less" : "expand_more"}
                                            </span> */}
                                            <ArrowDown className="w-3 h-3" />
                                        </button>

                                        {openProfile === label && (
                                            <div className="absolute right-0 mt-2 min-w-60 bg-white rounded-xl shadow-md border border-gray-100 z-50 overflow-hidden p-3">
                                                <p className=" block px-4 py-1 font-bold">A tua conta</p>
                                                {dropdown.map((item) =>
                                                    item.to ? (
                                                        <Link
                                                            key={item.label}
                                                            to={item.to}
                                                            onClick={() => setOpenProfile(null)}
                                                            className={`${item.className || ''} block px-4 py-1 text-sm text-gray-700 hover:bg-gray-100 rounded-lg`}
                                                        >
                                                            {item.label}
                                                        </Link>
                                                    ) : (
                                                        <button
                                                            key={item.label}
                                                            type="button"
                                                            onClick={() => {
                                                                item.onClick();
                                                                setOpenProfile(null);
                                                            }}
                                                            className={`${item.className || ''} w-full px-4 py-1 text-sm text-gray-700 rounded-lg cursor-pointer`}
                                                        >
                                                            {item.label}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        )}
                                    </div>
                                );
                            }

                            if (onClick) {
                                return (
                                    <button
                                        key={label}
                                        type="button"
                                        onClick={onClick}
                                        className={classes}
                                        aria-label={iconOnly ? label : undefined}
                                        title={iconOnly ? label : undefined}
                                    >
                                        {content}
                                    </button>
                                );
                            }

                            return (
                                <Link
                                    key={label}
                                    to={to}
                                    className={classes}
                                    aria-label={iconOnly ? label : undefined}
                                    // title={iconOnly || isAvatar ? label : undefined}
                                    title={iconOnly ? label : undefined}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {content}
                                </Link>
                            );
                        },
                    )}
                </div>
            </div>
        </nav>
    );
}
