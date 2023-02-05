import { useState, useEffect } from "react"
import { supabase } from "./api/supabaseClient"
import Login from '../components/login'
import Profile from "../components/profile"

const Account = () => {
    const [session, setSession] = useState(null)

    useEffect(() => {
        setSession(supabase.auth.getSession())
        supabase.auth.onAuthStateChange((event, session) => {
            setSession(session),
            console.log(event, session)
        })
    }, [])

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {session ? (
                <Login key={session.user} />
            ) : (
                <Profile
                    session={session}
                />
            )}
        </div>
    )
}

export default Account