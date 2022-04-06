import FacebookProvider from "next-auth/providers/facebook";
import KaKaoProvider from "next-auth/providers/kakao";
import NextAuth, { DefaultSession } from "next-auth";
import {JWT} from "next-auth/jwt";

declare module "next-auth"{

    interface Session {
        user : {
            address : string
        } & DefaultSession["user"]
    }
}

declare module "next-auth/jwt"{
    interface JWT{
        idToken?: string
    }
}
