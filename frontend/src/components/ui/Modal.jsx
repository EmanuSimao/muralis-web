import { useEffect } from 'react';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
const Modal = ({ isOpen, onClose, children, className = "" }) => {
    // não permite scroll do body de fundo
    useEffect(() => {
        if (!isOpen) return;

        const backgroundOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = backgroundOverflow;
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
            <div onClick={(e) => e.stopPropagation()} className="bg-modal max-w-xl md:w-125 pb-6 rounded-xl flex flex-col max-h-[95vh]">
                <button onClick={onClose} aria-label='Fechar' className="self-end mr-3 mt-6 shrink-0 cursor-pointer">
                    <CloseIcon className="w-4 h-4 text-gray-500 hover:text-gray-700 font-bold" />
                </button>
                <div className={`mx-10 mb-5 flex flex-col border ${className || "border-gray-300"} rounded-xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none `}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;