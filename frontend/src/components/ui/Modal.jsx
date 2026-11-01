import { useEffect } from 'react';
import CloseIcon from '../../assets/icons/close-icon.svg?react';
const Modal = ({ isOpen, onClose, children }) => {
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
            <div onClick={(e) => e.stopPropagation()} className="bg-modal max-w-2xl md:max-w-4xl pb-6 rounded-xl flex flex-col max-h-[95vh]">
                    <button onClick={onClose} aria-label='Fechar' className="self-end mr-3 mt-2 shrink-0">
                        <CloseIcon className="w-4 h-4 text-gray-500" />
                    </button>
                <div className='mx-10 flex flex-col border-2 border-gray-400 rounded-xl overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;