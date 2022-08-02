/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites(){

      return [
        {
          source : "/spring/:path*",
          destination : process.env.DESTINATION_URL,
        },
        {
          source : "/movie_api/:page",
          destination : `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko&page=:page`
        },
        {
          source : "/naver_shop/:path*",
          destination : 'https://openapi.naver.com/v1/search/shop.json', 
        },
        {
          source : "/upbit_coin/:path*",
          destination : "https://api.upbit.com/:path*"
        },
        {
          source : "/random_words",
          destination : "https://random-word-api.herokuapp.com/word"
        }
      ]
    
  },
  images : {
    domains :['image.tmdb.org','bookthumb-phinf.pstatic.net','shopping-phinf.pstatic.net'],
  },
  env : {
    BASE_URL : process.env.BASE_URL
  }
}

module.exports = nextConfig
