namespace NodeJS{
    interface ProcessEnv extends NodeJS.ProcessEnv {
        KAKAO_ID : string
        KAKAO_SECRET : string

        FACEBOOK_CLIENT_ID : string
        FACEBOOK_CLIENT_SECRET : string

        NAVER_CLIENT_ID : string
        NAVER_CLIENT_SECRET : string
    }
}