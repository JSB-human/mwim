import type { NextPage } from 'next'
import { useSession } from 'next-auth/react';
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';


const Home: NextPage = () => {
  const { data : session } = useSession();
  return (
    <div className="min-h-screen h-full w-full text-center">
      <main className="grid">
        <div className='row'>
          <div className='relative h-[240px] w-52'>
           <Image src={"/main_logo.png"} layout="fill" objectFit="contain" alt={"이미지"}/>
          </div>
        </div>

        <div className='row'>
          <div className="p-20 bg-blue-400">
            <div className='text-2xl text-white'>
              <p><b>가입없이</b></p>
              <p><b>즐길 수 있어요.</b></p>
            </div>
            <br/>
            <Link href="/main" passHref>
              <button className="bg-green-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  둘러보기
              </button>
            </Link>
          </div>
          <div className="p-20 bg-purple-500">
            <div className='text-2xl text-white'>
              <p><b>로그인 후</b></p>
              <p><b>내 놀이터를 만들수있어요.</b></p>
            </div>
            <br/>
            <Link href="/login" passHref>
              <button className="bg-green-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  로그인
              </button>
            </Link>
          </div>
          <div className="p-20 bg-red-400">
            <div className='text-2xl text-white'>
              <p><b>지금 바로</b></p>
              <p><b>다양한 놀이를 즐겨보세요.</b></p>
            </div>
            <br/>
            <Link href="/login" passHref>
              <button className="bg-green-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                  시작하기
              </button>
            </Link>
          </div>
        </div>
        
      </main>

      {/* <footer className={styles.footer}>
      
      </footer> */}
    </div>
  )
}

export default Home
