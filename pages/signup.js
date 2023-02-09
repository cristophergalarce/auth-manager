import { useState } from "react"
// import { supabase } from './api/supabaseClient'
import { useSupabaseClient } from "@supabase/auth-helpers-react"
import IconHide from "../public/img/icons/hide.svg"
import IconShow from "../public/img/icons/show.svg"
import Link from "next/link"

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const supabase = useSupabaseClient()

    const handleSignup = async (e) => {
        e.preventDefault()

        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signUp({
                email,
                password
            })
            if (error) throw error
        } catch (error) {
            console.log(error.error_description || error.message)
        } finally {
            setLoading(false)
            alert('Cuenta creada exitosamente. Confirma tu cuenta en el correo que te enviamos.')
        }
    }

    return (
        <>
            <div className="contain">
                <form
                    className="form-widget"
                    onSubmit={handleSignup}
                >
                    Crea tu cuenta
                    <div>
                        <label
                            htmlFor="email"
                        >
                            Email
                        </label>
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
                            Crea una contraseña
                        </label>
                        <div
                            className="input-password"
                        >
                            <input
                                className="input"
                                name="pass"
                                type={showPass ? "text" : "password"}
                                value={password}
                                placeholder="Crea una constraseña para tu cuenta"
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
                        {loading ? 'Creando cuenta ...' : 'Crear cuenta'}
                    </button>
                    {/* {hintError && <p>{hintError}</p>} */}
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
            </div>
        </>
    )
}

export default Signup