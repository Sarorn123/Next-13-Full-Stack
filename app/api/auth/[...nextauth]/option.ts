import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '@/db/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "username" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const user = { id: "1", name: "John", email: "john@gmail.com", username: "john@gmail.com", role: "Admin" }

                if (credentials?.username && credentials.password) {
                    if (credentials.username === user.username && credentials.password === "12345") {
                        return user
                    }
                    return null
                } else {
                    return null
                }
            }
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
        }),
    ],

    callbacks: {
        async jwt({ token, user }) {
            return {
                ...token,
                ...user
            };
        },
        async session({ session, token }) {
            session.user = token
            return session;
        },
    },
    pages: {
        signIn: "/auth/signin"
    }
}