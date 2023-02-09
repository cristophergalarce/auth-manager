import { useState } from "react"
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import IconHide from "../public/img/icons/hide.svg"
import IconShow from "../public/img/icons/show.svg"
import Link from "next/link"

const Login = () => {
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const supabase = useSupabaseClient()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
        } catch (error) {
            alert('No pudimos iniciar tu sesión. Inténtalo nuevamente.')
            console.log(error.error_description || error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <form
                className="form-widget"
                onSubmit={handleLogin}
            >
                Inicia sesión
                <div>
                    <label htmlFor="email">Email</label>
                    <input
                        className="input"
                        name="email"
                        type="email"
                        value={email}
                        placeholder="Ejemplo, ppotts@stark.com"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="pass"
                    >
                        Contraseña
                    </label>
                    <div
                        className="input-password"
                    >
                        <input
                            className="input"
                            name="pass"
                            type={showPass ? "text" : "password"}
                            value={password}
                            placeholder="Ingresa tu contraseña"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <figure
                            onClick={() => setShowPass(!showPass)}
                        >
                            {showPass ? <IconHide /> : <IconShow />}
                        </figure>
                    </div>
                </div>
                <button
                    className="button button-cta"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? 'Cargando ...' : 'Iniciar sesión'}
                </button>
            </form>
            <Link
                href="/"
            >
                <button
                    className="button button-side"
                    type="submit"
                >
                    Volver al inicio
                </button>
            </Link>
        </>
    )
}

export default Login