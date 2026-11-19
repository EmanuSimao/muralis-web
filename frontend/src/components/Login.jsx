import { useForm } from "react-hook-form";
import EmailIcon from "../assets/icons/email-icon.svg?react";
import PasswdIcon from "../assets/icons/passwd-icon.svg?react";
// import UsersDataService from "../services/user.service";
import { useContext, useState } from "react";
// import { useNavigate } from "react-router";
import { AuthContext } from "../auth/AuthContext";
import { useNavigate } from "react-router";

export default function LoginForm({ onSuccess, onSwitchToSignUp }) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useContext(AuthContext); // ← usa o login do contexto

    const {
        register,
        handleSubmit,
        clearErrors,
        formState: { errors },
    } = useForm();

    const fetchUser = async (data) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });
            onSuccess();
            navigate("/perfil")
            
        } catch {
            setError("Email ou password inválidas!");
        }
    };

    return (
        <>
            <div className="px-6 my-2">
                <p>É bom ter-te de volta</p>
                <p>Inicia sessão na tua conta Muralis</p>
            </div>
            <div className="px-6 my-2">
                <form onSubmit={handleSubmit(fetchUser)}>
                    {error && <p className="text-error mb-4">{error}</p>}
                    {/* Text Labels */}
                    <div className="">
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
                                            message: "Email inválido",
                                        },
                                    })}
                                    onChange={() => clearErrors("email")}
                                    className="w-full outline-0 focus:bg-transparent active:bg-transparent"
                                />
                            </div>
                            {errors.email && (
                                <p className="text-error text-xs">{errors.email.message}</p>
                            )}
                        </div>
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
                            {errors.password && (
                                <span className="text-error text-xs">Password obrigatória</span>
                            )}
                        </div>
                    </div>

                    {/* Submit btn */}
                    <div className="mt-8 flex flex-col gap-3 text-center">
                        {errors.root && (
                            <span className="text-error text-sm text-center">
                                {errors.root.msg}
                            </span>
                        )}

                        <button
                            type="submit"
                            className="bg-black w-full text-center text-white rounded-xl py-2 cursor-pointer"
                        >
                            Iniciar Sessão
                        </button>
                        <span className="">
                            Ainda não tens conta?
                            <button
                                className="cursor-pointer font-semibold"
                                type="button"
                                onClick={onSwitchToSignUp}
                            >
                                &nbsp;Criar Conta
                            </button>
                        </span>
                    </div>
                </form>
            </div>
        </>
    );
}
