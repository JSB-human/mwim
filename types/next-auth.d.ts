import FacebookProvider from "next-auth/providers/facebook";
import KaKaoProvider from "next-auth/providers/kakao";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth"{

    interface Session {
        user : {
            address : string
        } & DefaultSession["user"]
    }
}
