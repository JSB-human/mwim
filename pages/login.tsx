import Link from "next/link";
import { AppProps } from "next/app";
import Image from "next/image";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { AiFillFacebook } from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { AiOutlineMail } from "react-icons/ai";
import { Button } from "react-bootstrap";

const Login = ({ Component, pageProps }: AppProps) => {
    const { data : token, status } = useSession();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [warningLabel, setWarningLabel] = useState('');

    useEffect(() => {
        if(token){
            router.push('/main');
        }
    },[token, router])

    const emailLoginBtn = () => {
        axios.post('/spring/account/login',{
            account_id : email,
            pwd : password
        })
        .then((res) => {
            // console.log(res);
            if(res.data === "일치"){
                signIn("credentials", {username : email, password : password})
            }else if(res.data === "틀림"){
                setWarningLabel('이메일주소나 비밀번호가 틀립니다.');
            }
        })
        .catch((err) => {
            setWarningLabel('이메일주소나 비밀번호가 틀립니다.');
        })
    }

    const pressEnter = (e: { key: string; }) => {
        if(e.key === 'Enter'){
            emailLoginBtn();
        }
    }

    return(
        <div className="bg-white h-full w-full">
            <div className="text-4xl text-center">
                <div className='grid grid-cols-1 font-blackhansans justify-items-center'>
                    <div className='relative h-[120px] w-52'>
                        {/* <p className='text-blue-400'>내가</p>
                        <p className='text-purple-500'>만든</p>
                        <p className='text-red-400'>세상</p> */}
                        <Image src={"/main_logo.png"} layout="fill" objectFit="contain" alt="이미지"/>
                    </div>
                    <form className="bg-white  rounded px-8 pt-6 pb-8 mb-4 max-w-xl font-sans mt-6 min-w-min">
                        <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            이메일 주소
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username@email.com"
                            value={email} onChange={(e)=>setEmail(e.target.value)}
                        />
                        </div>
                        <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            비밀번호
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******" 
                            value={password} onChange={(e)=>setPassword(e.target.value)}
                            onKeyDown={pressEnter}
                        />
                        <p className="text-red-500 text-xs italic">{warningLabel}</p>
                        </div>
                        <div className="w-full">
                            <Button className="hover:bg-yellow-400 text-white w-full font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button"
                                onClick={emailLoginBtn}
                                variant="dark"
                            >
                                로그인
                            </Button>
                        </div>
                        <div className="flex items-center justify-between mt-2 mb-2 p-2">
                            <Link href="findPwd">
                                <a className="inline-block align-baseline font-bold text-sm text-black hover:text-yellow-400" href="#">
                                    비밀번호 찾기
                                </a>
                            </Link>
                            <Link href="/register">
                                <a className="inline-block align-baseline font-bold text-sm text-black hover:text-yellow-400" href="#">
                                    회원가입
                                </a>
                            </Link>
                        </div>
                        <Link href="/main" passHref>
                            <button className="bg-red-400 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                둘러보기
                            </button>
                        </Link>
                        <br></br>
                        <hr/>
                        
                        <div className="border border-black hover:cursor-pointer hover:bg-gray-200" 
                            onClick={()=>signIn('kakao')} >
                            {/* <Image src={"/kakao_login_large_wide.png"} layout="fill" objectFit="contain" alt="이미지"/> */}
                            <RiKakaoTalkFill className="inline text-[25px]"></RiKakaoTalkFill>
                            <span className="text-[16px] ml-3 text-gray-600 font-bold">Kakaotalk 로그인</span>
                        </div>

                        <div className="border border-black mt-1 hover:cursor-pointer hover:bg-gray-200" 
                            onClick={()=>signIn('facebook')}>
                            <AiFillFacebook color="#0165E1" className="inline text-[30px]"></AiFillFacebook>
                            <span className="text-[16px] ml-3 text-gray-600 font-bold">Facebook 로그인</span>
                        </div>

                        <div className="border border-black mt-1 hover:cursor-pointer hover:bg-gray-200" 
                            onClick={()=>signIn('naver')}>
                            <SiNaver color="#2DB400" className="inline text-[25px]"></SiNaver>
                            <span className="text-[16px] ml-3 text-gray-600 font-bold">Naver 로그인</span>
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

