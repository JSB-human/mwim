import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Footer from "../../component/footer";
import NavBar from "../../component/navBar";
import {LinkPreview} from '@dhaiwat10/react-link-preview';
import moment from "moment";
import World_Reply from "../../component/world_reply";

interface account {
    uid : string,
    nickname : string
}

interface worldJson {
    world_no : number,
    maker : string,
    nickname : string,
    title : string,
    url : string,
    comment : string,
    pic : string,
    write_time : Date,
    replyCnt : number
}

const UserPage = () => {
    const router = useRouter();
    const [userData, setUserData] = useState<account>({
        uid : '',
        nickname : ''
    });
    const [worlds, setWorlds] = useState<Array<worldJson>>([]);
    const [worldLength, setWorldLength] = useState(0);

    const userId = router.query.user || '';

    const [replyShow, setReplyShow] = useState(-1);
    const [notFound, setNotFound] = useState(true);

    useEffect(() => {
        if(userId !== ''){
            axios.get(`/spring/account/getUid/${userId}`)
            .then((res) => {
                if(res.data !== ''){
                    setNotFound(false);
                }
                setUserData(res.data);
            })
            .catch((err) => {}) 

            axios.get(`/spring/world/get/${userId}`)
            .then((res) => {
                setWorlds(res.data);
                if(res.data !== ''){
                    setWorldLength(1);
                }else{
                    setWorldLength(0);
                }
                
            })
            .catch((err) => {}) 
        }
        
    }, [userId])

    return (
        <>
        <NavBar></NavBar>
        <div className="min-h-screen h-full bg-gray-100">
           
                {
                    notFound ? 
                    <div className="container">
                        없음
                    </div>
                    :
                    <div className="container">
                        <div className="p-4">
                            <span className="font-bold mr-2 text-2xl">{userData.nickname }</span>
                            <span className="text-xl">{'('+userData.uid+')'}</span>
                        </div>
                        <hr></hr>
                        <div className="">
                            {
                            worldLength === 1?
                            
                            worlds.map((val, i) => {
                                return(
                                    <div className="bg-white p-4 rounded-lg shadow-lg mt-2" key={i}>
                                    <div >
                                        <b>{
                                        `${val.nickname} (${val.maker})`
                                        }</b>
                                        <p>{moment(val.write_time).format('M월 DD일 h:mm')}</p>
                                    </div>
                                    <div className="rounded-lg bg-gray-100 p-2">
                                        <LinkPreview url={'https://naver.com'} width={'full'} />
                                        <h5>{
                                                val.title
                                            }
                                        </h5>
                                    </div>
                                    <div className="mt-2 p-2">
                                    {
                                    val.comment
                                    }
                                    </div>
                                    <div className="text-right text-gray-500">
                                        <b className="cursor-pointer"
                                            onClick={()=>setReplyShow(i)}
                                        >댓글 {val.replyCnt}</b>
                                    </div>
                                    {
                                        i === replyShow ?
                                        <World_Reply world_no={val.world_no}></World_Reply>
                                        :
                                        <></>
                                    }
                                </div>
                                )
                                
                            })
                            :
                            <div>
                                없음
                            </div>

                            }
                        </div>
                </div>
                }
                
        </div>
        <Footer></Footer>
        </>
    )

}

export default UserPage;