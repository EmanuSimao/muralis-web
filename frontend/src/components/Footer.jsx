import FacebookIcon from '../assets/icons/facebook-icon.svg?react';
import InstagramIcon from '../assets/icons/instagram-icon.svg?react';
import TikTokIcon from '../assets/icons/tiktok-icon.svg?react';
import PinterestIcon from '../assets/icons/pinterest-icon.svg?react';
import ArrowDownIcon from '../assets/icons/arrow-down-icon.svg?react';

export default function Footer() {
    return (
        <footer>
            <div className="w-[95%] mx-auto flex flex-col">
                <div className="box p-5 bg-register rounded-xl flex flex-col ">
                    <div className="flex flex-row justify-between mx-7">
                        <div className="socials text-left">
                            <span className="text-xl text-[#393939] font-semibold tracking-widest">mura.lis</span>
                            <div className="text-gray-400 flex flex-row">
                                <FacebookIcon className="h-7 w-7 -ml-2" />
                                <InstagramIcon className="h-7 w-7" />
                                <TikTokIcon className="h-7 w-7" />
                                <PinterestIcon className="h-7 w-7" />
                            </div>
                        </div>
                        <div className="infos text-gray-500 font-[450]">
                            <p>Mura.lis</p>
                            <p>sobre</p>
                            <p>como funciona</p>
                            <p>perguntas frequentes</p>
                            <p>contactos</p>
                        </div>
                    </div>
                    <hr className="px-3 my-2 mx-7" />
                    <div className="flex flex-row items-center mx-7 justify-end gap-1">
                        português
                        <ArrowDownIcon className="text-gray-600 h-2 w-2" />
                    </div>
                </div>
                <div className="py-4 rights text-center text-sm text-gray-600">
                    <p>Copyright © 2026 Mura.lis. Todos os direitos reservados.</p>
                    <p>by Emanuel Simão</p>
                </div>
            </div>
        </footer>
    )
}