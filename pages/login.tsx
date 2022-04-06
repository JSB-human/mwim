import Link from "next/link";
import { AppProps } from "next/app";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";
import { FaFacebook } from "react-icons/fa";

const Login = ({ Component, pageProps }: AppProps) => {

    return(
        <div className="bg-indigo-900 h-full w-full">
            <div className="text-4xl text-center">
                <div className='grid grid-cols-1 font-blackhansans justify-items-center'>
                    <div className='relative h-[120px] w-52'>
                        {/* <p className='text-blue-400'>내가</p>
                        <p className='text-purple-500'>만든</p>
                        <p className='text-red-400'>세상</p> */}
                        <Image src={"/main_logo.png"} layout="fill" objectFit="contain"/>
                    </div>
                    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 max-w-xl font-sans mt-6 min-w-min">
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
                        <div className="hover:cursor-pointer relative h-[45px]" onClick={()=>signIn('kakao')} >
                            <Image src={"/kakao_login_large_wide.png"} layout="fill" objectFit="contain"/>
                        </div>

                        <div className="ml-16 mr-16 mt-1 h-[45px] bg-[#1778F2] text-white font-bold rounded hover:cursor-pointer" onClick={()=>signIn('facebook')}>
                            <FaFacebook color="white" className="inline text-[20px]"></FaFacebook>
                            <span className="text-[15px] ml-3 ">Facebook으로 로그인</span>
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

