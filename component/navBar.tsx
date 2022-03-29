import { useSession } from "next-auth/react";
import {FaUser, FaBars} from "react-icons/fa";
const NavBar = () => {
    const { data : session } = useSession();
    console.log(session);
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
                <div className='font-blackhansans text-sm text-center'>
                    <p className='text-blue-400'>내가</p>
                    <p className='text-purple-500'>만든</p>
                    <p className='text-red-400'>세상</p>
                </div>
                <div className="place-self-center">
                    {/* <FaUser size={25}/> */}
                    {session ? <div>로그아웃</div> : <div>로그인</div>}
                </div>

        </div>
    )
}

export default NavBar;