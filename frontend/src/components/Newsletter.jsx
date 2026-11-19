export default function Newsletter() {
    return (
        <div className="w-full mx-auto flex flex-col justify-center md:flex-col gap-6">
            <div className="text-4xl text-newsletter">
                <p>junta-te à comunidade MURA.LIS</p>
                <p>descobre histórias, criadores e eventos locais</p>
            </div>
            <div className="flex flex-row justify-around mx-auto items-center bg-register rounded-full w-150 text-center">
                <div className="grow py-2">
                    <input type="email" name="email" id="email" placeholder="introduza o seu e-mail" className="w-full text-center outline-none" />
                </div>
                <div className="flex-none py-2 bg-gray-400 rounded-r-full text-center text-white">
                    <input className="mx-4 px-2" type="submit" value="subscrever" />
                </div>
            </div>
        </div>
    )
}