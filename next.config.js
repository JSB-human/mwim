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
        },
        {
          source : "/location",
          destination : "https://geolocation-db.com/json/"
        },
        {
          source : "/youtube_api/:region",
          destination : `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=:region&videoCategoryId=10&maxResults=30&key=${process.env.YOUTUBE_API_KEY}`
        },
        {
          source : "/youtube_top/:playlist",
          destination : `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=:playlist&maxResults=50&key=${process.env.YOUTUBE_API_KEY}`
        }
      ]
    
  },
  images : {
    domains :['image.tmdb.org','bookthumb-phinf.pstatic.net','shopping-phinf.pstatic.net','mwim-imgs.s3.ap-northeast-2.amazonaws.com'],
  },
  env : {
    BASE_URL : process.env.BASE_URL
  }
}

module.exports = nextConfig
