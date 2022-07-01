import { decode, encode } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import NaverProvider from "next-auth/providers/naver";

export default NextAuth({
    providers: [
        KakaoProvider({
            clientId :  process.env.KAKAO_ID,
            clientSecret : process.env.KAKAO_SECRET,
        }),
        FacebookProvider({
            clientId : process.env.FACEBOOK_CLIENT_ID,
            clientSecret : process.env.FACEBOOK_CLIENT_SECRET
        }),
        NaverProvider({
            clientId : process.env.NAVER_CLIENT_ID,
            clientSecret : process.env.NAVER_CLIENT_SECRET
        })
    ],
    secret : process.env.NEXTAUTH_SECRET,
    callbacks : {
        jwt : async ({ token, user, account,  isNewUser }) => {
            user && (token.user = user)
            return token;
        },
        redirect({url, baseUrl}){
            if(url.startsWith(baseUrl)){
                return '/login';
            } 
            else if(url.startsWith("/")){
                return '/loading/loadLogin';
            }
            return baseUrl;
        }
    },
    jwt: {
      maxAge : 60*60*24*30*3,
    }
})