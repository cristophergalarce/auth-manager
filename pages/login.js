import { useState } from "react"
import { supabase } from '../supabase/supabaseClient'

const Login = () => {
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async (email) => {
        // e.preventDefault()
        try {
            setLoading(true)
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })
            if (error) throw error
        } catch (error) {
            alert('No pudimos iniciar tu sesión. Inténtalo nuevamente.')
            console.log( error.error_description || error.message )
        } finally {
            setLoading(false)
        }
    }

    return (
        <form
            className="form-widget"
            onSubmit={handleLogin}
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
            <label htmlFor="pass">Contraseña</label>
            <input
                className="inputField"
                name="pass"
                type="password"
                value={password}
                placeholder="Ingresa tu constraseña"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button
                className="button primary block"
                type="submit"
                disabled={loading}
            >
                {loading ? 'Loading ...' : 'Ingresar'}
            </button>
        </form>
    )
}

export { Login }