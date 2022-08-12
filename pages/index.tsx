import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import Wave from 'react-wavify';
import Footer from '../component/footer';



const Home: NextPage = () => {
  const { data : session } = useSession();

  

  return (
    <div className="min-h-screen h-full w-full text-center overflow-hidden">
      <main>
        <div className='row'>
          <div className='relative h-[240px] w-52'>
           <Image src={"/main_logo.png"} layout="fill" objectFit="contain" alt={"이미지"}/>
          </div>

          <Wave 
            fill='#049CD8'
            paused={false}
            options={{
              height: 20,
              amplitude: 20,
              speed: 0.15,
              points: 3
            }}
          />
          <div className="bg-[#049CD8] min-h-screen h-full">
            <div>
              <Image src="/imgs/imgs.gif" className="bg-white p-3 rounded-full" width={180} height={180} alt="contents"/>
              <h1 className="text-white">많은 놀이가 준비되어있어요.</h1>
              <Link href="/main" passHref>
                <button className="bg-green-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    둘러보기
                </button>
              </Link>
              <Link href="/login" passHref>
                <button className="bg-violet-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    로그인
                </button>
              </Link>
            </div>

            <div className="container text-2xl font-bold flex flex-col space-y-10 mt-5 mb-5">

              <div data-aos="fade-right">
                 <Image src="/imgs/vs.png" width={180} height={180} alt="contents"/>
                <p>밸런스게임</p>
              </div>
              <div data-aos="fade-left">
                 <Image src="/imgs/archive.png" width={180} height={180} alt="contents"/>
                <p>투표</p>
              </div>
              <div data-aos="fade-right">
                 <Image src="/imgs/laugh.png" width={180} height={180} alt="contents"/>
                <p>고급 유머</p>
              </div>
              <div data-aos="fade-left">
                 <Image src="/imgs/smile-hand-drawn-emoticon.png" width={180} height={180} alt="contents"/>
                <p>행맨</p>
              </div>
              <div data-aos="fade-right">
                 <Image src="/imgs/discussion.png" width={180} height={180} alt="contents"/>
                <p>토론</p>
              </div>
              <div data-aos="fade-left">
                 <Image src="/imgs/bitcoin.png" width={180} height={180} alt="contents"/>
                <p>코인 가격 예측</p>
              </div>
              <div data-aos="fade-right">
                 <Image src="/imgs/video-camera.png" width={180} height={180} alt="contents"/>
                <p>영화 퀴즈</p>
              </div>
              <div data-aos="fade-left">
                 <Image src="/imgs/won.png" width={180} height={180} alt="contents"/>
                <p>상품 최저가 맞추기</p>
              </div>
              <div data-aos="fade-right">
                 <Image src="/imgs/music.png" width={180} height={180} alt="contents"/>
                <p>음악 맞추기</p>
              </div>
              <div data-aos="fade-left">
                 <Image src="/imgs/cutlery.png" width={180} height={180} alt="contents"/>
                <p>메뉴 정하기</p>
              </div>
              <Link href="/main" passHref>
                <button className="bg-green-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    시작하기
                </button>
              </Link>

            </div>

           
            

          </div>

        </div>

        
      </main>
      <Footer/>
    </div>
  )
}

export default Home
