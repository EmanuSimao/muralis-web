import { Controller, useForm } from "react-hook-form"
import { AuthContext } from '../auth/AuthContext'
import EndUserIcon from '../assets/icons/enduser-icon.svg?react'
import EmailIcon from '../assets/icons/email-icon.svg?react'
import userService from "../services/user.service"
import DatePicker from "../components/ui/DatePicker"
import { useContext } from "react"

export default function ProfileTab({ user }) {
    console.log("user recebido:", user);
    console.log("data_nascimento:", user.data_nascimento, typeof user.data_nascimento);
    const { setUser } = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        control,
        setError,
        // setSuccess,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            nome: user.nome ?? "",
            email: user.email ?? "",
            data_nascimento: user.data_nascimento ? String(user.data_nascimento).slice(0, 10) : "",
            idioma: user.idioma ?? "",
            cidade: user.cidade ?? "",
            cod_postal: user.cod_postal ?? "",
            pais: user.pais ?? "",
        }
    });

    const onSubmit = async (data) => {
        try {
            const payload = {}
            if (data.nome) payload.nome = data.nome
            if (data.data_nascimento) payload.data_nascimento = data.data_nascimento
            if (data.idioma) payload.idioma = data.idioma
            if (data.cidade) payload.cidade = data.cidade
            if (data.cod_postal) payload.cod_postal = data.cod_postal
            if (data.pais) payload.pais = data.pais
            if (data.password) payload.password = data.password

            if (Object.keys(payload).length === 0) return;

            // const response = await userService.updateUser(user.id, payload)
            const response = await userService.updateUser(payload)
            console.log(response)
            const updatedUser = response.data.user

            setUser(updatedUser)
            localStorage.setItem('user', JSON.stringify(updatedUser));
            // setSuccess('root', { message: "Perfil atualizado com sucesso"})
            clearErrors('root');
        } catch {
            setError('root', { message: "Erro ao atualizar o perfil. Tente novamente." })
        }
    }

    return (
        <div className="flex flex-col-reverse md:flex-row gap-8">
            {/* form dados */}
            <div className="w-full md:flex-3">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="">
                        <p className="text-error text-xs">{errors.root?.message}</p>
                        {/* nome e apelido */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="username">Nome e Apelido</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <EndUserIcon className="w-5 h-5 mr-2" />
                                <input
                                    type="text"
                                    // id="username"
                                    {...register("nome", {
                                        required: "Nome é necessário",
                                        maxLength: {
                                            value: 50,
                                            message: "Não pode exceder 50 caracteres",
                                        }
                                    })}
                                    className="w-full outline-0 bg-inherit"
                                />
                            </div>
                            <p className="text-error text-xs">{errors.nome?.message}</p>
                        </div>

                        {/* email */}
                        <div className="flex flex-col my-2">
                            <label htmlFor="email">Email</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <EmailIcon className="w-5 h-5 mr-2" />
                                <input
                                    // type="email"
                                    type="text"
                                    {...register("email")}
                                    disabled
                                    onChange={() => clearErrors("email")}
                                    className="w-full outline-0 focus:bg-transparent active:bg-transparent"
                                />
                            </div>
                            {errors.email && (<p className="text-error text-xs">{errors.email.message}</p>)}
                        </div>

                        {/* data de nascimento */}
                        <div className="flex flex-col my-2">
                            <label>Data de Nascimento</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                {/* controller faz a ligação entre um componente nao nativo e o react-hook-form */}
                                <Controller name="data_nascimento" control={control} rules={{
                                    validate: (value) => {
                                        if (!value) return true;
                                        const data = new Date(value);
                                        const hoje = new Date();
                                        const idade = hoje.getFullYear() - data.getFullYear();
                                        if (data >= hoje) return "Data não pode ser no futuro";
                                        if (idade < 18) return "Idade mínima é 18 anos";
                                        return true;
                                    },
                                }}
                                    render={({ field }) => (
                                        <DatePicker onChange={field.onChange} value={field.value} />
                                    )}
                                />
                            </div>
                            {errors.data_nascimento && (
                                <p className="text-error text-xs">{errors.data_nascimento.message}</p>
                            )}
                        </div>

                        {/* cidade */}
                        <div className="flex flex-col my-2">
                            <label>Cidade</label>
                            <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                <input
                                    type="text"
                                    // disabled={!!user.cidade}
                                    {...register("cidade", {
                                        maxLength: {
                                            value: 100,
                                            message: "Não pode exceder 100 caracteres"
                                        }
                                    })}
                                    className="w-full outline-0 bg-inherit"
                                />
                            </div>
                            {errors.cidade && (
                                <p className="text-error text-xs">{errors.cidade.message}</p>
                            )}
                        </div>

                        {/* código postal e país */}
                        <div className="flex flex-row gap-3 my-2">
                            <div className="flex flex-col flex-1">
                                <label>Código Postal</label>
                                <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                    <input
                                        type="text"
                                        // disabled={!!user.cod_postal}
                                        {...register("cod_postal", {
                                            maxLength: {
                                                value: 20,
                                                message: "Não pode exceder 20 caracteres"
                                            }
                                        })}
                                        className="w-full outline-0 bg-inherit"
                                    />
                                </div>
                                {errors.cod_postal && (
                                    <p className="text-error text-xs">{errors.cod_postal.message}</p>
                                )}
                            </div>

                            <div className="flex flex-col flex-1">
                                <label>País</label>
                                <div className="flex flex-row items-center bg-gray-200 rounded-xl py-1 px-3">
                                    <input
                                        type="text"
                                        // disabled={!!user.pais}
                                        {...register("pais", {
                                            maxLength: {
                                                value: 100,
                                                message: "Não pode exceder 100 caracteres"
                                            }
                                        })}
                                        className="w-full outline-0 bg-inherit"
                                    />
                                </div>
                                {errors.pais && (
                                    <p className="text-error text-xs">{errors.pais.message}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Submit btn */}
                    <div className="mt-8 flex flex-col gap-3 text-center">
                        {errors.root && (
                            <span className="text-error text-sm text-center">
                                {errors.root.msg}
                            </span>
                        )}
                        <button type="submit"
                            className="bg-black w-full text-center text-white rounded-xl py-2 cursor-pointer">
                            Atualizar Conta
                        </button>
                    </div>
                </form>
            </div>
            <div className="w-full md:flex-1 flex flex-col items-center gap-3">
                {/* imagem aqui */}
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                    <span className="text-gray-400 text-sm">Foto</span>
                </div>
                <button type="" className="text-sm text-orange-500 hover:underline cursor-pointer">
                    Alterar foto
                </button>
            </div>
        </div>
    )
}