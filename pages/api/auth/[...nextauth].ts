import { decode, encode } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import KakaoProvider from "next-auth/providers/kakao";
import FacebookProvider from "next-auth/providers/facebook";
import NaverProvider from "next-auth/providers/naver";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

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
        }),
        CredentialsProvider({
            name : "Credentials",
            credentials : {
                username : { label : "이메일", type : "email", placeholder : "user@email.com"},
                password : { label : "비밀번호", type : "password" }
            },
            async authorize(credentials, req) {
                
                // if(credentials?.username === userEmail &&
                //     credentials.password === userPassword    
                // ){
                    return {
                        id : credentials?.username,
                        name : '',
                        email : credentials?.username
                    }
                // }

                // return null;
            }
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
                return '/loading/LoadLogin';
            }
            return baseUrl;
        }
    },
    jwt: {
      maxAge : 60*60*24*30*3,
    }
})
