export default function Welcome({ onClose }) {
    return (
        <div className="p-7 my-2 text-center">
            <p className="mb-4">Já está!!</p>
            <div className="leading-4 m-4">
                <p >O teu registo</p>
                <p>foi efetuado com sucesso</p>
            </div>

            <button
                onClick={onClose}
                className="mt-4 bg-black w-full text-center text-white rounded-xl py-2 cursor-pointer">
                Inicia a tua sessão
            </button>
        </div>
    )
}