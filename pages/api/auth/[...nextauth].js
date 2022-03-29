import NextAuth from "next-auth";
// import Twitter from 'next-auth/providers/twitter';
import KakaoProvider from "next-auth/providers/kakao";


export default NextAuth({
   providers: [
    KakaoProvider({
           clientId : process.env.KAKAO_CLIENT_ID,
           clientSecret : process.env.KAKAO_CLIENT_SECRET,
       }),
    //    Facebook({
    //        clientId : process.env.FACEBOOK_ID,
    //        clientSecret : process.env.FACEBOOK_SECRET,
    //    }),
        // TwitterProvider({
        //     clientId : process.env.TWITTER_ID,
        //     clientSecret : process.env.TWITTER_SECRET,
        // })
   ],
//    pages : {
//        signIn : '/login'
//    },
   callbacks : {
    //    redirect({url, baseUrl}){
    //        if(url.startsWith(baseUrl)) return url;
    //        else if(url.startsWith("/")) return new URL(url, baseUrl).toString();
    //        return baseUrl;
    //    },
    //    session({session, token, user}){
    //        return session;
    //    }
   },
   secret : process.env.NEXTAUTH_SECRET,

   
   
})