import { useState, useEffect } from "react"
import { supabase } from '../pages/api/supabaseClient'
import { useSupabaseClient } from "@supabase/auth-helpers-react"

const Profile = ({ session }) => {
    const user = session.user
    const [loading, setLoading] = useState(true)
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

    const updateProfile = async () => {
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
        }
    }

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            <form
                className="form-widget"
                onSubmit={updateProfile}
            >
                Account
                {/* <div>
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
                </div> */}
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
                        onClick={() => updateProfile({ username, website })}
                        disabled={loading}
                    >
                        {loading ? 'Loading ...' : 'Update'}
                    </button>
                </div>

                <button
                    className="button block"
                    type="submit"
                    onClick={() => supabase.auth.signOut()}
                >
                    Cerrar sesión
                </button>
            </form>
        </div>
    )
}

export default Profile