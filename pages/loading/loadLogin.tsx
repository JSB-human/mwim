import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import login_api from "../api/login_api";

const LoadLogin = () => {
    const { data : token, status } = useSession();
    const router = useRouter();
    const [load, setLoad] = useState(true);
    const [nickName, setNickName] = useState('');
    const [label, setLabel] = useState('');
    const [nicknameBad, setNicknameBad] = useState(true);

    const [uid, setUid] = useState('');
    const [uidBad, setUidBad] = useState(true);
    const [uidLabel, setUidLabel] = useState('');

    const [bad, setBad] = useState(true);

    useEffect(() => {
        if(token === null){
            router.push("/login");
        }
        if(token!==undefined && token!==null){
            axios.get('/api/login_api')
            .then((res) => {
                if(res.data.sub === undefined){
                    router.push("/login");
                }else{
                    setLoad(false);
                }
            })
        }
    }, [router, token])

    useEffect(() => {
        if(!uidBad && !nicknameBad){
            setBad(false);
        }else{
            setBad(true);
        }
    },[uidBad, nicknameBad])

    const CheckNickname = () => {
        if(nickName === ""){
            setLabel('닉네임을 입력해주세요.');
            setNicknameBad(true);
            return;
        }

        axios.get(`/spring/account/getNickname/${nickName}`)
        .then((res) => {
            if(res.data !== ""){
                setLabel('이미 사용중인 닉네임입니다.');
                setNicknameBad(true);
            }else{
                setLabel('사용가능한 닉네임입니다.');
                setNicknameBad(false);
            }
        })
    }

    const CheckUid = () => {
        if(uid === ""){
            setUidLabel('아이디를 입력해주세요.');
            setUidBad(true);
            return;
        }
        axios.get(`/spring/account/getUid/${uid}`)
        .then((res) => {
            if(res.data !== ""){
                setUidLabel('이미 사용중인 아이디입니다.');
                setUidBad(true);
            }else{
                setUidLabel('사용가능한 아이디입니다.');
                setUidBad(false);
            }
        })
    }

    const ChangeBtn = () => {
        if(nicknameBad === true){
            return;
        }
        
        if(token === undefined){
            alert("서버에 문제가 있습니다. 다시 시도해주세요.");
            router.push("/login");
        }else{
            axios.get('/api/login_api')
            .then((res) => {
                axios.get('/spring/account/select/' + res.data.sub)
                .then((res2) => {
                    if(res2.data === ""){
                        axios.post('/spring/account/insert',{
                            account_id : res.data.sub,
                            uid : uid,
                            email : res.data.email,
                            name : res.data.name,
                            nickname : nickName,
                            social : 'social'
                        })
                        .then((res3) => {
                            if(res3.data === 1){
                                router.push("/main");
                            }
                        })
                        .catch((err) => {
                            alert('서버에 문제가 있습니다. 다시 시도해주세요.');
                        })
                    }else{
                        router.push("/main");
                    }
                })
            })
        }
        
    }



    return (
        <div className="w-full h-full min-h-screen bg-gray-100 text-center p-10">
            <div className="flex justify-center mb-5">
                <div className='relative h-[120px] w-52'>
                    <Image src={"/main_logo.png"} layout="fill" objectFit="contain" alt={"이미지"}/>
                </div>
            </div>
            {load ? 
            <>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            
            <h1>
                <Spinner animation="border" variant="primary" />
                로그인 정보 확인중...
                <Spinner animation="border" variant="danger" />
            </h1>

            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>
            <Spinner animation="grow" className="" variant="danger"/>
            <Spinner animation="grow" className="" variant="warning"/>
            <Spinner animation="grow" className="" variant="success"/>
            <Spinner animation="grow" className="" variant="primary"/>

            </> 
            : 
            
            <div className="container ">
                <h1>아이디를 정해주세요.</h1>
                <input type="text"
                    className="w-full h-15 rounded-lg p-2 text-2xl text-center border border-black"
                    value={uid}
                    onChange={(e)=>setUid(e.target.value)}
                    onBlur={CheckUid}
                />
                <h5>{uidLabel}</h5>
                <h1>닉네임을 정해주세요.</h1>
                <input type="text"
                    className="w-full h-15 rounded-lg p-2 text-2xl text-center border border-black"
                    value={nickName}
                    onChange={(e)=>setNickName(e.target.value)}
                    onBlur={CheckNickname}
                />
                <h5>{label}</h5>
                <Button
                    className="w-full mt-5"
                    variant="dark"
                    onClick={ChangeBtn}
                    disabled={bad}
                >시작하기</Button>
            </div>
            }


        </div>
    )

}

export default LoadLogin;