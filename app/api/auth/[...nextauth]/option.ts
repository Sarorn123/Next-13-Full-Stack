import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from '@/db/client';
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { defaultContainer } from "@/db/defualt-container";

export const authOption: NextAuthOptions = {
    adapter: PrismaAdapter(prisma),
    session: {
        strategy: "jwt"
    },
    providers: [
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
            session.user = token;

            const check = await prisma.container.findFirst({
                where: {
                    userId: token.sub
                }
            })

            if (!check) {
                await prisma.container.createMany({
                    data: defaultContainer.map(container => {
                        return { ...container, userId: token.sub || "" }
                    })
                })

            }

            return session;
        },
    },
}