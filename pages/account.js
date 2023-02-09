import Login from '../components/login'
import Profile from "../components/profile"
import { useSession } from '@supabase/auth-helpers-react'

// https://supabase.com/docs/guides/getting-started/tutorials/with-nextjs
const Account = () => {
    const session = useSession()

    return (
        <div className="contain">
            {!session ? (
                <Login />
                ) : (
                <Profile
                    session={session}
                />
            )}
        </div>
    )
}

export default Account