import { getToken } from "next-auth/jwt";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {FaUser, FaBars} from "react-icons/fa";
import {IoPersonCircle, IoLogInOutline} from "react-icons/io5";
import {AiFillSetting} from "react-icons/ai";
import axios from "axios";
import { Button, Form, InputGroup } from "react-bootstrap";
import { FaSearch } from 'react-icons/fa';
import { useRouter } from "next/router";

const NavBar = () => {
    const { data : token, status } = useSession();
    const [uid, setUid] = useState('');
    const [searchTxt, setSearchTxt] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        axios.get('/api/login_api')
        .then((res) => {
            axios.get(`/spring/account/select/${res.data.sub}`)
            .then((res) => {
                setUid(res.data.uid);
            })
        })
        // console.log(token);
    },[])

    const SearchEnter = (e : any) => {
        if(searchTxt === ''){
            return;
        }

        if(e.key === 'Enter'){
            router.push(`/user/${searchTxt}`)
        }
    }
    const Search = () => {
        router.push(`/user/${searchTxt}`)
    }
 
    return(
        <div className="grid grid-cols-3 bg-indigo-800 border-b border-gray-300 p-1 text-white h-full"> 
                <div className='font-blackhansans text-sm relative h-[55px]'>
                    <Link href="/main">
                        <a>
                            <Image src={"/main_logo.png"} layout="fill" objectFit="contain"/>
                        </a>
                    </Link>
                </div>
                <div className="grid grid-cols-1">
                     <InputGroup className="rounded-lg text-black p-2 font-bold">
                        <Form.Control
                        type="search"
                        placeholder="사용자 검색"
                        value={searchTxt}
                        onChange={(e) => {setSearchTxt(e.target.value)}}
                        onKeyDown={(e) => SearchEnter(e)}
                        />
                        <Button variant="dark" id="button-addon2"
                            onClick={Search}
                        >
                            <FaSearch size={20}></FaSearch>
                        </Button>
                    </InputGroup>
                </div>
                <div className="place-self-center">
                    {/* <FaUser size={25}/> */}
                    {token ? <div className="hover:cursor-pointer font-bold flex gap-2">
                                <Link href={`/user/${uid}`}>
                                    <a className="text-white">
                                        <IoPersonCircle size={35}/>
                                    </a>
                                </Link>
                                <Link href={"/mypage/setting"}>
                                    <a className="text-white">
                                        <AiFillSetting size={32}/>
                                    </a>
                                </Link>
                            </div> 
                            : 
                            <div className="hover:cursor-pointer">
                                <Link href={"/login"}>
                                    <a className="text-white">
                                        <IoLogInOutline size={30}/>
                                    </a>
                                </Link>
                            </div>}
                </div>

        </div>
    )
}

export default NavBar;