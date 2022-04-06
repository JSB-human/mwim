import { getToken } from "next-auth/jwt";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {FaUser, FaBars} from "react-icons/fa";
import login_api from "../pages/api/login_api";
import {IoPersonCircle, IoLogInOutline} from "react-icons/io5";

const NavBar = () => {

    useEffect(() => {
        
        // console.log(login_api);
    })

    const { data : token, status } = useSession();
    console.log('token',token);
    return(
        <div className="grid grid-cols-3 bg-indigo-900 text-white "> 
                <div className="grid grid-cols-2">
                    {/* <FaBars size={25}/> */}
                    {/* <div className="place-self-center">
                        내 세상
                    </div>
                    <div className="place-self-center">
                        친구 세상
                    </div> */}
                </div>
                <div className='font-blackhansans text-sm text-center relative h-[55px]'>
                    <Link href="/main">
                        <a>
                            <Image src={"/main_logo.png"} layout="fill" objectFit="contain"/>
                        </a>
                    </Link>
                </div>
                <div className="place-self-center">
                    {/* <FaUser size={25}/> */}
                    {token ? <div className="hover:cursor-pointer font-bold">
                                <Link href={"/mypage/1"}>
                                    <IoPersonCircle size={40}/>
                                </Link>
                            </div> 
                            : 
                            <div className="hover:cursor-pointer">
                                <Link href={"/login"}>
                                    <IoLogInOutline size={30}/>
                                </Link>
                            </div>}
                </div>

        </div>
    )
}

export default NavBar;