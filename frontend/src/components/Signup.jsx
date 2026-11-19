import { useState } from "react"
import { useForm } from "react-hook-form";
import EndUserIcon from '../assets/icons/enduser-icon.svg?react'
import ArtistIcon from '../assets/icons/artist-icon.svg?react'
import EmailIcon from '../assets/icons/email-icon.svg?react'
import PasswdIcon from '../assets/icons/passwd-icon.svg?react'
import UsersDataService from "../services/user.service";

export default function Signup({ onSuccess, onSwitchToLogin }) {
    const [isArtist, setIsArtist] = useState(false);
    // const [error, setError] = useState(null);

    const handleAccountTypeChange = (value) => {
        setIsArtist(value);
        setValue("isArtist", value)
    }

    const {
        register,
        handleSubmit,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: { isArtist: false }
    });

    const onSubmit = async (data) => {
        // setError(null);
        try {
            await UsersDataService.register({
                nome: data.username,
                email: data.email,
                password: data.password,
                isArtist: isArtist,
            });
            onSuccess();
        } catch (e) {
            // const msg = setError(e.response && e.response.data && e.response.data.error
            //     ? e.response.data.error
            //     : "Erro ao criar conta. Tente novamente mais tarde!"
            // );

            if (e.response.status === 409)
                setError('email', { message: "Email já registado!" });
            else
                setError('root', { message: "Erro ao criar conta. Tente novamente." })
        }
    };

    return (
        <>
            <div className="px-6 my-2">
                <p>Criar Conta</p>
                <p>Junta-te à Muralis e descobre o que te inspira</p>
            </div>
            <div className="px-6 my-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <p>Tipo de Conta</p>
                        <div className="accounType-option flex items-center py-3 px-2 my-2 border-2 border-gray-400 hover:border-gray-800 has-checked:border-gray-800 rounded-xl cursor-pointer">
                            <input type="radio"
                                id="consumidor"
                                name="accountType"
                                checked={isArtist === false}
                                onChange={() => handleAccountTypeChange(false)}
                                className="peer sr-only "
                            />
                            <span className="invisible peer-checked:visible w-1 h-1 ml-2 shrink-0 rounded-full bg-gray-800" />
                            <label htmlFor="consumidor" className="flex flex-row items-center gap-2 w-full cursor-pointer">
                                <div>
                                    <EndUserIcon className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="sm:text-sm md:text-md">Consumidor</span>
                                    <span className="text-xs/3 text-gray-600">descobrir criadores e conhecer o seu trabalho</span>
                                </div>
                            </label>
                        </div>
                        <div className="accountType-option flex items-center py-3 px-2 my-2 border-2 border-gray-400 hover:border-gray-800 has-checked:border-gray-800 rounded-xl cursor-pointer">
                            <input type="radio"
                                id="artista"
                                name="accountType"
                                checked={isArtist === true}
                                onChange={() => handleAccountTypeChange(true)}
                                className="peer sr-only"
                            />
                            <span className="invisible peer-checked:visible w-1 h-1 ml-2 shrink-0 rounded-full bg-gray-800" />
                            <label htmlFor="artista" className="flex flex-row items-center gap-2 w-full cursor-pointer">
                                <div>
                                    <ArtistIcon className="w-6 h-6" />
                                </div>
                                <div className="flex flex-col cursor-pointer">
                                    <span className="sm:text-sm md:text-md">Artesão</span>
                                    <span className="text-xs/3 text-gray-600">divulgar o trabalho e conectar-se com a comunidade.</span>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* Text Labels */}
                    <div className="">
                        <div className="flex flex-col my-2">
                            <label htmlFor="username">Nome e Apelido</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <EndUserIcon className="w-5 h-5 mr-2" />
                                <input
                                    type="text"
                                    // id="username"
                                    {...register("username", {
                                        required: "Nome é necessário",
                                        maxLength: {
                                            value: 50,
                                            message: "Não pode exceder 50 caracteres",
                                        }
                                    })}
                                    className="w-full outline-0 bg-inherit"
                                />
                            </div>
                            <p className="text-error text-xs">{errors.username?.message}</p>
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="email">Email</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <EmailIcon className="w-5 h-5 mr-2" />
                                <input
                                    // type="email"
                                    type="text"
                                    {...register("email", {
                                        required: "Email é necessário",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "Email inválido"
                                        }
                                    })}
                                    onChange={() => clearErrors("email")}
                                    className="w-full outline-0 focus:bg-transparent active:bg-transparent"
                                />
                            </div>
                            {errors.email && (<p className="text-error text-xs">{errors.email.message}</p>)}
                        </div>

                        {
                            isArtist &&
                            <div className="flex flex-col my-2">
                                <label htmlFor="nome-artista">Nome de artista/Atelier</label>
                                <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                    <ArtistIcon className="w-5 h-5 mr-2" />
                                    <input
                                        // type="email"
                                        type="text"
                                        {...register("artistName", {
                                            required: "Campo necessário"
                                        })}
                                        onChange={() => clearErrors("artistName")}
                                        className="w-full outline-0 focus:bg-transparent active:bg-transparent"
                                    />
                                </div>
                                {errors.artistName && (<p className="text-error text-xs">{errors.artistName.message}</p>)}
                            </div>
                        }

                        <div className="flex flex-col my-2">
                            <label htmlFor="passwd">Password</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <PasswdIcon className="w-5 h-5 mr-2" />
                                <input
                                    type="password"
                                    id="password"
                                    {...register("password", { required: true })}
                                    className="w-full outline-0"
                                />
                            </div>
                            {errors.password && <span className="text-error text-xs">Password obrigatória</span>}
                        </div>
                        <div className="flex flex-col my-2">
                            <label htmlFor="confirm_passwd">Confirmar Password</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <PasswdIcon className="w-5 h-5 mr-2" />
                                <input
                                    type="password"
                                    id="confirm_passwd"
                                    {...register("confirm_passwd", {
                                        required: "Confirmação de password obrigatória",
                                        validate: (value, formValues) =>
                                            value === formValues.password || "As passwords não coincidem"
                                    })}
                                    className="w-full outline-0"
                                />
                            </div>
                            {errors.confirm_passwd && (
                                <span className="text-error text-xs">
                                    {errors.confirm_passwd.type === "validate"
                                        ? errors.confirm_passwd.message
                                        : "Confirmação de password obrigatória"}
                                </span>
                            )}
                        </div>
                    </div>

                    {/* Submit btn */}
                    <div className="mt-8 flex flex-col gap-3 text-center">
                        {errors.root && (
                            <span className="text-error text-sm text-center">{errors.root.msg}</span>
                        )}

                        <button type="submit"
                            className="bg-black w-full text-center text-white rounded-xl py-2 cursor-pointer">
                            Criar Conta
                        </button>
                        <span className="font-normal">Já tens conta?
                            <button className="cursor-pointer font-semibold" type="button" onClick={onSwitchToLogin}>&nbsp;Iniciar Sessão</button>
                        </span>
                    </div>
                </form>
            </div>
        </>
    )
}