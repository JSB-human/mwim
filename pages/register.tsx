import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Footer from "../component/footer";
import {AiFillCheckCircle} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDimensions } from "@nivo/core";
import address from "./api/address";


const Register = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [Code, setCode] = useState('');
    const [randCode, setRandCode] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [nickname, setNickname] = useState('');

    const [codeSendLoading, setCodeSendLoading] = useState(false);
    const [emailLabel, setEmailLabel] = useState('');
    const [codeLabel, setCodeLabel] = useState('');
    const [nickNameLabel, setNicknameLabel] = useState('');
    const [password1Label, setPassword1Label] = useState('8-16자 영문, 숫자, 특수문자 최소 1개 조합');
    const [password2Label, setPassword2Label] = useState('');
    const [emailGood, setEmailGood] = useState(false);
    const [codeGood, setCodeGood] = useState(false);
    const [p1Good, setP1Good] = useState(false);
    const [p2Good, setP2Good] = useState(false);
    const [nicknameGood, setNicknameGood] = useState(false);
    const [sendBtnDisable, setsendBtnDisable] = useState(true);
    const [codeInputDisable, setCodeInputDisable] = useState(true);

    const [uid, setUid] = useState('');
    const [uidLabel, setUidLabel] = useState('');
    const [uidGood, setUidGood] = useState(false);

    const [registerBtnActivate, setRegisterBtnActivate] = useState(false);

    useEffect(() => {
        if(emailGood && codeGood && p1Good && p2Good && nicknameGood){
            setRegisterBtnActivate(true);
        }else{
            setRegisterBtnActivate(false);
        }

    },[emailGood, codeGood, p1Good, p2Good, nicknameGood])

    const checkAccount = () => {
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        if(email === ""){
            return;
        }
        if(!regExp.test(email)){
            setEmailGood(false);
            setEmailLabel("이메일 형식이 아닙니다.");
            return;
        }

        axios.get('/spring/account/select/'+email)
        .then((res) => {
            if(res.data !== ""){
                setEmailGood(false);
                setEmailLabel("이미 사용중인 이메일 주소입니다.")
            }else{
                setEmailGood(true);
                setsendBtnDisable(false);
                setEmailLabel("사용할 수 있는 이메일 주소입니다.")
            }
        })
    }

    const checkCode = () => {
        if(Code === randCode){
            setCodeLabel('인증완료');
            setCodeGood(true);
            setCodeInputDisable(true);
        }else{
            setCodeLabel('인증번호가 다릅니다.')
            setCodeGood(false);
        }
    }
    
    // 이메일로 코드 전송
    const sendCodeBtn = () => {
        setCodeSendLoading(true);
        setsendBtnDisable(true);
        let params = {
            code : createCode(),
            email : email
        }
        axios.get("/spring/account/sendMail", {params})
        .then((res)=>{
            setCodeSendLoading(false);
            if(res.data === "send"){
                setCodeInputDisable(false);
                setCodeLabel('인증번호가 발송되었습니다.');
            }else if(res.data === "fail"){
                setCodeInputDisable(true);
                setCodeLabel('인증번호를 보내는 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        })
    }
    // 코드생성
    const createCode = () => {
        const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
        let randomStr = '';
        for(let i=0; i<6; i++){
            const num = Math.floor(Math.random() * chars.length);
            randomStr += chars.substring(num, num+1);
        }
        setRandCode(randomStr);
        return randomStr;
    }

    const checkPassword1 = () => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(!regExp.test(password)){
            setPassword1Label("8-16자 영문, 숫자, 특수문자 최소 1개 조합");
            setP1Good(false);
        }else{
            setPassword1Label("적합합니다.");
            setP1Good(true);
        }
    }
    const checkPassword2 = () => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(!regExp.test(password2)){
            setPassword2Label("8-16자 영문, 숫자, 특수문자 최소 1개 조합");
            setP2Good(false);
            return;
        }

        if(password !== password2){
            setPassword2Label("비밀번호가 일치하지 않습니다.");
            setP2Good(false);
        }else{
            setPassword2Label("비밀번호가 일치합니다.");
            setP2Good(true);
        }
    }

    const checkUid = () => {
        if(uid === ""){
            setUidGood(false);
            setUidLabel("아이디를 정해주세요.");
        }
        axios.get('/spring/account/getUid/'+uid)
        .then((res) => {
            if(res.data !== ""){
                setUidLabel("이미 사용중인 아이디입니다.");
                setUidGood(false);
            }else{
                setUidLabel("사용가능한 아이디입니다.");
                setUidGood(true);
            }
        })
    }

    const checkNickname = () => {
        if(nickname === ""){
            setNicknameGood(false);
            setNicknameLabel("닉네임을 정해주세요.");
            return;
        }
        axios.get('/spring/account/getNickname/'+nickname)
        .then((res) => {
            if(res.data !== ""){
                setNicknameLabel("이미 사용중인 닉네임입니다.");
                setNicknameGood(false);
            }else{
                setNicknameLabel("사용가능한 닉네임입니다.");
                setNicknameGood(true);
            }
        })
    }

    const registerBtn = () => {
        axios.post('/spring/account/insert',{
            account_id : email,
            email : email, 
            pwd : password,
            social : 'email',
            uid : uid,
            nickname : nickname
        })
        .then((res) => {
            address();
            if(res.data === 1){
                router.push('/login');
            }
        })
    }

    const sendCodeBtnDisable = () => {
        if(emailGood && !codeSendLoading){
            return false;
        }
        if(!emailGood && codeSendLoading){
            return true;
        }
        
    }

    return (
        <>
        <div className="min-h-screen h-full bg-gray-100">
            <div className="flex justify-center">
                <div className='relative h-[120px] w-52'>
                    <Link href={"/login"} >
                        <a>
                            <Image src={"/main_logo.png"} layout="fill" objectFit="contain" alt="이미지"/>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="container text-left mt-2">
                <label htmlFor="email" className="text-gray-700 text-xl">이메일</label>
                {
                    emailGood ?
                    <span className="ml-2 text-green-600 text-sm inline-flex">{emailLabel}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                    :
                    <span className="ml-2 text-red-500 text-sm">{emailLabel}</span>

                }
                <input type="text" id="email"
                    className="w-full border border-black h-16 p-2 text-xl"
                    onBlur={checkAccount}
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <label htmlFor="emailCheck" className="text-gray-700 text-xl mt-2">인증번호</label>
                <Button type="button" className="ml-2 mb-1" variant="outline-primary"
                    onClick={sendCodeBtn}
                    disabled={sendBtnDisable}
                >인증 보내기
                {
                    codeSendLoading ?
                    <Spinner animation="border" className="mt-1 ml-1" size="sm" />
                    :
                    <></>
                }
                </Button>
                {
                    codeGood ? 
                    <span className="ml-2 text-green-600 text-sm inline-flex">{codeLabel}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                    :
                    <span className="ml-2 text-red-500 text-sm">{codeLabel}</span>
                }
               
                <div className="">
                    <input type="text" id="emailCheck"
                        className="w-4/5 border border-black h-16 p-2 text-xl"
                        disabled={codeInputDisable}
                        value={Code}
                        onChange={(e)=>{setCode(e.target.value)}}
                    />
                    <Button className="w-1/5 h-16 mb-2 bg-purple-500"
                        disabled={codeInputDisable}
                        onClick={checkCode}
                    >확인</Button>
                </div>
                
                <label htmlFor="password" className="text-gray-700 text-xl mt-2">비밀번호</label>
                {
                    p1Good ? 
                    <span className="ml-2 text-green-600 text-sm inline-flex">{password1Label}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                    :
                    <span className="ml-2 text-red-500 text-sm">{password1Label}</span>
                }
                
                <input type="password" id="password" 
                    className="w-full border border-black h-16 p-2 text-xl"
                    onBlur={checkPassword1}
                    value={password}
                    onChange={(e)=>{setPassword(e.target.value)}}
                />
                <label htmlFor="passwordCheck" className="text-gray-700 text-xl mt-2">비밀번호 확인</label>
                {
                    p2Good ?
                     <span className="ml-2 text-green-600 text-sm inline-flex">{password2Label}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                     :
                     <span className="ml-2 text-red-500 text-sm">{password2Label}</span>
                }
                <input type="password" id="passwordCheck"
                    className="w-full border border-black h-16 p-2 text-xl"
                    onBlur={checkPassword2}
                    value={password2}
                    onChange={(e)=>{setPassword2(e.target.value)}}
                />
                <label htmlFor="uid" className="text-gray-700 text-xl mt-2">아이디</label>
                {
                    uidGood ?
                    <span className="ml-2 text-green-600 text-sm inline-flex">{uidLabel}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                    :
                    <span className="ml-2 text-red-500 text-sm">{uidLabel}</span>

                }
                <input type="text" id="uid"
                    className="w-full border border-black h-16 p-2 text-xl"
                    onBlur={checkUid}
                    value={uid}
                    onChange={(e)=>{setUid(e.target.value)}}
                />
                <label htmlFor="nickname" className="text-gray-700 text-xl mt-2">닉네임</label>
                {
                    nicknameGood ?
                    <span className="ml-2 text-green-600 text-sm inline-flex">{nickNameLabel}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                    :
                    <span className="ml-2 text-red-500 text-sm">{nickNameLabel}</span>

                }
                <input type="text" id="nickname"
                    className="w-full border border-black h-16 p-2 text-xl"
                    onBlur={checkNickname}
                    value={nickname}
                    onChange={(e)=>{setNickname(e.target.value)}}
                />

            </div>
            <div className="container text-center p-4">
                <Button type="button" 
                    variant="danger"
                    onClick ={registerBtn}
                    disabled={!registerBtnActivate}
                >회원가입</Button>
            </div>
        </div>
        
        
        <Footer></Footer>
        </>
    )

}


export default Register;