import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Replys } from "../types/types";
moment.locale('ko');

const GameReply = (props: { gameType: number; }) => {
    const { data : token, status } = useSession();
    const {gameType} = props;

    const router = useRouter();
    const result = router.query.result;

    const [reply, setReply] = useState([]);
    const [nickname, setNickname] = useState('');
    const [txt, setTxt] = useState(''); 
    const [accountId, setAccountId] = useState('');

    useEffect(() => {
        axios.get('/api/login_api')
        .then((res) => {
            setAccountId(res.data.sub);
            axios.get(`/spring/account/select/${res.data.sub}`)
            .then((res) => {
                setNickname(res.data.nickname);
            })
        })

        if(result != undefined){
            let params = {
                game_no : result,
                game_type : gameType 
            }
            axios.get('/spring/game_reply/select', { params })
            .then((res) => {
                setReply(res.data);
            })
        }
        
    },[result])

    const AddReply = async () => {
        if(nickname.replace(/ /g,"")==="" || txt.replace(/ /g,"")===""){
            alert("내용을 전부 작성해주세요.")
            return;
        }   

        const sub = await axios.get('/api/login_api');
        axios.post('/spring/game_reply/add', {
            game_type : gameType,
            game_no : result,
            writer : accountId,
            nickname : nickname,
            content : txt
        })
        .then(() => {
            let params = {
                game_no : result,
                game_type : gameType 
            }
            axios.get('/spring/game_reply/select', { params })
            .then((res) => {
                setReply(res.data);
            })
            setTxt('');
        })
    }
    const wantLogin = () => {
        if(confirm("로그인 하시겠습니까?")){
            router.push('/login');
        }
    }

    return(
        <>
        <div className="text-left mt-3 text-2xl">
                    코멘트
                </div>
                <div className="bg-slate-200 w-full h-full border-t border-b border-black p-3">
                    {
                        token ? 
                        <div>
                            <textarea className="w-full resize-none border border-black" placeholder="댓글 추가..."
                                onChange={(e : React.ChangeEvent<HTMLTextAreaElement>) : void => setTxt(e.target.value)}
                                value={txt}
                            ></textarea>
                            <div className="text-right">
                                <Button variant="success" type="button" size="sm" onClick={AddReply}>작성</Button>
                            </div>
                        </div>
                        :
                        <div onClick={wantLogin}>
                            <textarea className="w-full resize-none border border-black" placeholder="로그인 해주세요."
                                disabled={true}
                            ></textarea>
                            <div className="text-right">
                                <Button variant="success" type="button" size="sm" disabled={true}>작성</Button>
                            </div>
                        </div>
                    }
                </div>
        <div className="bg-white w-full h-full text-left text-sm">
            {
                reply.map((Replys : Replys, index) => (
                    <div className="border-b border-b-gray-400" key={index}>
                        <b className="text-zinc-700 mr-3 ">{Replys.nickname}</b>
                        {moment(Replys.writeTime).format('YYYY-MM-DD HH:mm:ss')}
                        <br></br>
                        <span className="ml-1">
                            {Replys.content}
                        </span>
                    </div>  
                ))
            }
        </div>
        </>
    )
}

export default GameReply;