import NextAuth from 'next-auth'
import EmailProvider from "next-auth/providers/email"

export default NextAuth({
    providers: [
        // Passwordless / email sign in
        EmailProvider({
            server: process.env.EMAIL_SERVER,
            from: process.env.EMAIL_FROM
        }),
    ]
})