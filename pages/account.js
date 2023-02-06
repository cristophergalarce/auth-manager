import { useState, useEffect } from "react"
import { useSession } from "@supabase/auth-helpers-react"
import Login from '../components/login'
import Profile from "../components/profile"

// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
const Account = () => {
    const session = useSession()

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
                <Login/>
            ) : (
                <Profile
                    session={session}
                />
            )}
        </div>
    )
}

export default Account