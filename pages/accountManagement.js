import { useState, useEffect } from "react"
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from "next/link"

const Account = ({ session }) => {
    const supabase = useSupabaseClient()
    const user = useUser()
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)
    const [error, setError] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select('username, website, avatar_url')
                .eq('id', user.id)
                .single()

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            setError("No pudimos cargar tu perfil. Inténtalo nuevamente.")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date().toISOString(),
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) {
                setError("No pudimos cargar tu perfil. Inténtalo nuevamente.")
            } else {
                setError("Perfil actualizado exitosamente")
            }
        } catch (error) {
            setError("No pudimos cargar tu perfil. Inténtalo nuevamente.")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="form-widget">
            Account
            <div>
                <label
                    htmlFor="email"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="text"
                    value={session.user.email}
                    disabled
                />
            </div>
            <div>
                <label htmlFor="username">Usuario</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="website"
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div>
                <button
                    className="button primary block"
                    onClick={() => updateProfile({ username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Loading ...' : 'Update'}
                </button>
            </div>
            <Link
                href="/"
            >
                <button
                    className="button block"
                    type="submit"
                    onClick={() => supabase.auth.signOut()}
                // disabled={loading}
                >
                    {/* {loading ? 'Crear cuenta' : 'Loading ...'} */}
                    Cerrar sesión
                </button>
            </Link>
        </div>
    )
}

export default Account