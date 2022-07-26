import axios from "axios";
import moment from "moment";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

interface worldReplyJson {
    reply_no : number,
    world_no : number,
    uid : string,
    nickname : string,
    comment : string,
    pic : string,
    writeTime : Date
}

const World_Reply = (props : {world_no : number}) => {
    const { data : token, status } = useSession();

    const world_no = props.world_no;
    const [reply, setReply] = useState<Array<worldReplyJson>>([]);
    const [comment, setComment] = useState('');
    const [uid, setUid] = useState('');
    const [nickname, setNickname] = useState('');

    const router = useRouter();

    useEffect(() => {
        axios.get('/api/login_api')
        .then((res) => {
            axios.get(`/spring/account/select/${res.data.sub}`)
            .then((res) => {
                setUid(res.data.uid);
                setNickname(res.data.nickname);
                // setAccountId(res.data.account_id);
            })
        })
    },[])

    useEffect(() => {
        axios.get(`/spring/worldReply/get/${world_no}`)
        .then((res) => {
            setReply(res.data);
        })
    },[world_no])

    
    
    const addReply = () => {
        if(comment === ""){
            return;
        }

        axios.post('/spring/worldReply/add', {
            world_no : world_no,
            uid : uid,
            nickname : nickname,
            comment : comment,
            //s3 작업후 진행
            pic : '',
            writeTime : Date
        })
        .then((res) => {
            if(res.data === 1){
                setComment('');
            }else{
                alert("댓글을 다시 달아주세요.");
            }
        })
    }

    return (
        <div className="">
            {
                token  ?
                <div className="text-right">
                    <input type="text"
                        className="w-full border border-black bg-gray-100 rounded-lg p-1"
                        onChange={(e) => {setComment(e.target.value)}}
                        value={comment}
                    />
                    <Button
                        variant="dark"
                        onClick={addReply}
                    ><b>댓글달기</b></Button>
                </div>
                :
                <div className="text-right"
                    onClick={() => {
                        if(confirm("로그인 하시겠습니까?")){
                            router.push('/login');
                        }
                    }}
                >
                    <input type="text"
                        className="w-full border border-black bg-gray-100 rounded-lg p-1"
                        disabled={true}
                        placeholder="로그인해주세요."
                    />
                    <Button
                        variant="dark"
                        disabled={true}
                    ><b>댓글달기</b></Button>
                </div>
            }
            
            <div className="">
            {
                reply.map((val, i) => {
                    return(
                        <div className="" key={i}>
                            <div><b>{`${val.nickname}  `}</b>{ `${moment(val.writeTime).format('MM/DD HH:mm')}`}</div>
                            <div>{val.comment}</div>
                        </div>
                    )
                })
            }
            </div>
        </div>
    )

}

export default World_Reply;