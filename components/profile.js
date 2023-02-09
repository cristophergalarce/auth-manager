import { useState, useEffect } from "react"
import { useSupabaseClient } from '@supabase/auth-helpers-react'

const Profile = ({ session }) => {
    const supabase = useSupabaseClient()
    const user = session.user
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    const getProfile = async () => {
        try {
            setLoading(true)

            let { data, error, status } = await supabase
                .from('profiles')
                .select('username, website')
                .eq('id', user.id)
                .single()

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    const updateProfile = async ({ username, website }) => {
        try {
            setLoading(true)

            const updates = {
                id: user.id,
                username,
                website,
                updated_at: new Date()
            }

            let { error } = await supabase.from('profiles').upsert(updates)
            if (error) {
                throw error
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
            alert('Perfil actualizado exitosamente.')
        }
    }

    const handleLogout = async () => {
        await supabase.auth.signOut()
    }

    return (
        <>
            <form
                className="form-widget"
                onSubmit={() => updateProfile({ username, website })}
            >
                Perfil
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
                    <label
                        htmlFor="username"
                    >
                        Nombre de usuario
                    </label>
                    <input
                        id="username"
                        type="text"
                        value={username || ''}
                        placeholder="Ejemplo, pepper"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label
                        htmlFor="website"
                    >
                        Website
                    </label>
                    <input
                        id="website"
                        type="website"
                        value={website || ''}
                        placeholder="Ejemplo, stark.com"
                        onChange={(e) => setWebsite(e.target.value)}
                    />
                </div>

                <div>
                    <button
                        className="button button-cta"
                        disabled={loading}
                    >
                        {loading ? 'Guardando ...' : 'Guardar'}
                    </button>
                </div>
            </form>
            <button
                className="button"
                type="submit"
                onClick={handleLogout}
            >
                Cerrar sesión
            </button>
        </>
    )
}

export default Profile