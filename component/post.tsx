import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { AiFillLike } from 'react-icons/ai';



const Post = (props : {title : string}) => {
    const [show, setShow] = useState(false);
    const { data : token, status } = useSession();

    let currentUrl : string = '';
    if (typeof window !== "undefined") {
        currentUrl = window.location.href;
    }

    const [comment, setComment] = useState('');
    const [accountId, setAccountId] = useState('');
    const [uid, setUid] = useState('');
    const [nickname, setNickname] = useState('');

    const title = props.title;

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

    const modalClose = () => setShow(false);
    const modalShow = () => {
        if(!token){
            alert("로그인해주세요.");
        }else{
            setShow(true);
        }
        
    }

    const posting = () => {
        axios.post('/spring/world/add',{
            maker : uid,
            nickname : nickname,
            title : title,
            url : currentUrl,
            comment : comment,
            pic : ''
        })
        .then((res) => {
            if(res.data === 1){
                modalClose();
            }else{
                alert("등록하는데 오류가 발생했습니다. 다시 시도해주세요");
            }
        })
    }
    

    return(
        <>
            <Button type="button" variant="danger"
                onClick={modalShow}>
                <AiFillLike className="inline-block pr-1"/><b>내꺼하기</b>
            </Button>

            <Modal show={show} onHide={modalClose}>
                <Modal.Header closeButton>
                    <Modal.Title>내꺼하기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>{title}</p>
                    {currentUrl}
                    <div>
                        <textarea
                            className="w-full border border-black h-40 p-2"
                            value={comment}
                            onChange={(e) => setComment(e.currentTarget.value)}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={posting}>내꺼하기</Button>
                    <Button onClick={modalClose} variant="secondary">취소</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Post;