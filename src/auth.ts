/* import Google from "next-auth/providers/google" */
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { SvelteKitAuth } from "@auth/sveltekit"
import nodemailer from "@auth/sveltekit/providers/nodemailer"
import github from "@auth/sveltekit/providers/github"
import { 
    GITHUB_CLIENT_SECRET, 
    GITHUB_CLIENT_ID,
    EMAIL_FROM,
    EMAIL_SERVER,
} from "$env/static/private"

const prisma = new PrismaClient()

export const { handle, signIn, signOut } = SvelteKitAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        nodemailer({
            server: EMAIL_SERVER,
            from: EMAIL_FROM,
        }),
        github({
            clientId: GITHUB_CLIENT_ID,
            clientSecret: GITHUB_CLIENT_SECRET,
        }),
    ],
    callbacks: {
        session: async ({session, user}) => {
            /* console.log("session callback", session, user); */
            session.userId = user?.id
            return session
        }
    },
})