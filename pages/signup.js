import { useState } from "react"
import { supabase } from '../supabase/supabaseClient'

const Signup = () => {
    const [loading, setLoading] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)

            await supabase.auth.signUp({
                email,
                password
            })
        } catch (err) {
            setError(err.message)
        }
        
    }

    return (
        <form
            className="form-widget"
            onSubmit={handleSubmit}
        >
            <label htmlFor="email">Email</label>
            <input
                className="inputField"
                name="email"
                type="email"
                value={email}
                placeholder="Ejemplo, ppotts@stark.com"
                onChange={(e) => setEmail(e.target.value)}
            />
            <label htmlFor="pass">Crea una contraseña</label>
            <input
                className="inputField"
                name="pass"
                type="password"
                value={password}
                placeholder="Crea una constraseña para tu cuenta"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="button primary block"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Crear cuenta' : 'Loading ...'}
            </button>
            {error && <p>{error}</p>}
        </form>
    )
}

export default Signup