/* import Google from "next-auth/providers/google" */
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import { SvelteKitAuth } from "@auth/sveltekit"
import nodemailer from "@auth/sveltekit/providers/nodemailer"
import github from "@auth/sveltekit/providers/github"
import credentials from "@auth/sveltekit/providers/credentials"
import { 
    GITHUB_CLIENT_SECRET, 
    GITHUB_CLIENT_ID,
    EMAIL_FROM,
    EMAIL_SERVER,
} from "$env/static/private"
import bcrypt from "bcrypt";
import type { User } from "@auth/sveltekit"

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
        credentials({
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },
                password: {
                    label: "Passwort",
                    type: "password",
                },
            },
            authorize: async (credentials) => {
                console.log("credentials", credentials);

                // In case there is no user with this email
                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email as string,
                    },
                })

                if (!user) {
                    console.log('Creating new user ...');
                    
                    // Create new user
                    const new_user = await prisma.user.create({
                        data: {
                            email: credentials.email as string,
                            password: await bcrypt.hash(credentials.password as string, 10) as string,
                        },
                    }) as User

                    console.log('new_user', new_user);

                    return new_user
                }

                // Check if this user has defined a password
                if (!user.password) {
                    throw new Error("Bitte melden Sie sich per E-Mail an.")
                }

                // Check if password is correct
                const passwordCorrect = await bcrypt.compare(credentials.password as string, user.password as string)

                if (!passwordCorrect) {
                    throw new Error("Falsches passwort.")
                } else {
                    console.log('Password correct ...');
                }
                
                return user
            }
        }),
    ],
    callbacks: {
        session: async ({session, user}) => {
            /* console.log("session callback", session);
            console.log(user); */
            session.userId = user?.id
            return session
        },
        /* async signIn({ user, account, profile, email, credentials }) {
            console.log("signIn callback", user, account, profile, email, credentials);
            return true
        }, */
    }
})

//https://nneko.branche.online/next-auth-credentials-provider-with-the-database-session-strategy/