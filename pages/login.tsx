import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { AppProps } from "next/app";
import Image from "next/image";

const Login = ({ Component, pageProps }: AppProps) => {
    

    return(
        <div className="bg-indigo-900 h-screen w-screen">
            <div className="text-4xl text-center">
                <div className='grid grid-cols-1 font-blackhansans justify-items-center'>
                    <div className=''>
                        <p className='text-blue-400'>내가</p>
                        <p className='text-purple-500'>만든</p>
                        <p className='text-red-400'>세상</p>
                    </div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl font-sans mt-6">
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            이메일 주소
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username@email.com"/>
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******" />
                        <p className="text-red-500 text-xs italic">비밀번호를 입력해주세요.</p>
                        </div>
                        <div className="flex items-center justify-between">
                        <Link href="/main" passHref>
                            <button className="bg-pink-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                로그인
                            </button>
                        </Link>
                    
                        <a className="inline-block align-baseline font-bold text-sm text-pink-400 hover:text-yellow-400" href="#">
                            비밀번호 찾기
                        </a>
                        </div>
                        <br></br>
                        <hr/>
                        <br></br>
                        <div className="" onClick={() => signIn('kakao', {callbackUrl : 'http://localhost:3000/main'})}>
                         <Image src={"/kakao_login_medium_wide.png"} width={100} height={80}/>
                        </div>
                        <div onClick={()=> signOut()}>
                            로그아웃
                        </div>
                        
                    </form>
                   

                    <p className="text-center text-gray-500 text-xs">
                        &copy;2022 MWIM. All rights reserved.
                    </p>

                </div>
            </div>
        </div>
    )
    
}

export default Login

