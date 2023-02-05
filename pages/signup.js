import { useState } from "react"
import { supabase } from './api/supabaseClient'
import IconHide from "../public/img/icons/hide.svg"
import IconShow from "../public/img/icons/show.svg"

const Signup = () => {
    const [showPass, setShowPass] = useState(false)
    // const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await supabase.auth.signUp({
            email,
            password
        })
        //     try {
        //         setLoading(true)

        //         await supabase.auth.signUp({
        //             email,
        //             password
        //         })
        //     } catch (err) {
        //         setError(err.message)
        //     }

    }

    return (
        <form
            className="form-widget"
            onSubmit={handleSubmit}
        >
            <label
                htmlFor="email"
            >
                Email
            </label>
            <input
                className="inputField"
                name="email"
                type="email"
                value={email}
                placeholder="Ejemplo, ppotts@stark.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label
                htmlFor="pass"
            >
                Crea una contraseña
            </label>
            <div
                className="input-password"
            >
                <input
                    className="inputField"
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
            <button
                className="button primary block"
                type="submit"
            // disabled={loading}
            >
                {/* {loading ? 'Crear cuenta' : 'Loading ...'} */}
                Crear cuenta
            </button>
            {/* {hintError && <p>{hintError}</p>} */}
        </form>
    )
}

export default Signup