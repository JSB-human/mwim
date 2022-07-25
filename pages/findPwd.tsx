import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Footer from "../component/footer";
import {AiFillCheckCircle} from "react-icons/ai";
import {ImCancelCircle} from "react-icons/im";
import Link from "next/link";
import { useRouter } from "next/router";


const Register = () => {
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [Code, setCode] = useState('');
    const [codeStatus, setCodeStatus] = useState('');
    const [randCode, setRandCode] = useState('');

    const [alreadySend, setAlreadySend] = useState(false);

    const [codeSendLoading, setCodeSendLoading] = useState(false);

    const [codeDisable, setCodeDisable] = useState(true);
    const [codeCorrect, setCodeCorrect] = useState(false);
    
    const [pwd, setPwd] = useState('');
    const [pwd2, setPwd2] = useState('');

    const [password1Label, setPassword1Label] = useState('8-16자 영문, 숫자, 특수문자 최소 1개 조합');
    const [password2Label, setPassword2Label] = useState('');

    const [p1Good, setP1Good] = useState(false);
    const [p2Good, setP2Good] = useState(false);

    const [changeBtnAct, setChangeBtnAct] = useState(true);

    useEffect(() => {
        if(p1Good && p2Good){
            setChangeBtnAct(false);
        }else{
            setChangeBtnAct(true);
        }

    }, [p1Good, p2Good])


    const sendCode = () => {   
        var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
        setCodeStatus('');
        if(email === ""){
            setCodeStatus("이메일을 입력해주세요.");
            return;
        }
        if(!regExp.test(email)){
            setCodeStatus("이메일 형식이 아닙니다.");
            return;
        }

        axios.get('/spring/account/select/'+email)
        .then((res) => {
            setCodeSendLoading(true);
            if(res.data === ""){
                setCodeStatus('존재하지 않는 이메일입니다.');
                setCodeDisable(true);
                setCodeSendLoading(false);
            }else{
                let params = {
                    code : createCode(),
                    email : email
                }
                axios.get("/spring/account/sendMail", {params})
                .then((res)=>{
                    setCodeSendLoading(false);
                    if(res.data === "전송"){
                        setCodeStatus('인증번호가 발송되었습니다.');
                        setAlreadySend(true);
                        setCodeDisable(false);
                    }else if(res.data === "실패"){
                        setCodeStatus('인증번호를 보내는 중 오류가 발생했습니다. 다시 시도해주세요.');
                        setCodeDisable(true);
                    }
                })
            }
        })

       
    }

    const codeConfirm = () => {
        if(Code === randCode){
            setCodeStatus('');
            setCodeDisable(true);
            setCodeCorrect(true);
        }else{
            setCode('');
            setCodeStatus('인증번호가 틀립니다.');
        }

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

    const pwdCheck = () => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(!regExp.test(pwd)){
            setPassword1Label("8-16자 영문, 숫자, 특수문자 최소 1개 조합");
            setP1Good(false);
        }else{
            setPassword1Label("적합합니다.");
            setP1Good(true);
        }
    }

    const pwd2Check = () => {
        if(pwd2 === ''){
            return;
        }
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(!regExp.test(pwd2)){
            setPassword2Label("8-16자 영문, 숫자, 특수문자 최소 1개 조합");
            setP2Good(false);
            return;
        }

        if(pwd !== pwd2){
            setPassword2Label("비밀번호가 일치하지 않습니다.");
            setP2Good(false);
        }else{
            setPassword2Label("비밀번호가 일치합니다.");
            setP2Good(true);
        }
    }

    const changePwd = () => {
        if(p1Good && p2Good){
            if(pwd === pwd2){
                axios.put('/spring/account/changePwd',{
                    account_id : email,
                    pwd : pwd
                })
                .then((res) => {
                    if(res.data === 1){
                        router.push('/login');
                    }
                })
                .catch((err) => {
                    // console.log(err);
                })
            }
        }
    }

    return (
        <>
        <div className="min-h-screen h-full bg-gray-100">
            <div className="flex justify-center">
                <div className='relative h-[120px] w-52'>
                    <Link href={"/login"} >
                        <a>
                            <Image src={"/main_logo.png"} layout="fill" objectFit="contain"/>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="container text-left mt-2">
                <h1 className="font-bold">비밀번호 찾기</h1>
                <hr/>
                <label htmlFor="email" className="text-gray-700 text-xl">이메일</label>
                <input type="text" id="email"
                    className="w-full border border-black h-16 p-2 text-xl"
                    value={email}
                    onChange={(e)=>{setEmail(e.target.value)}}
                />
                <div className="mt-2"> 
                    <label htmlFor="emailCheck" className="text-xl">인증번호</label>
                    <Button className="ml-2 mb-1"
                        variant="success"
                        onClick={sendCode}
                        disabled={alreadySend}
                    >인증번호 전송
                    {
                        codeSendLoading ?
                        <Spinner animation="border" className="mt-1 ml-1" size="sm" />
                        :
                        <></>
                    }
                    </Button>
                    <span className="ml-2 text-red-500">{codeStatus}</span>
                </div>
                <div className="">
                    <input type="text" id="emailCheck"
                        className="w-4/5 border border-black h-16 p-2 text-xl"
                        disabled={codeDisable}
                        value={Code}
                        onChange={(e)=>{setCode(e.target.value)}}
                    />
                    <Button className="w-1/5 h-16 mb-2 bg-purple-500"
                        disabled={codeDisable}
                        onClick={codeConfirm}
                    >확인</Button>
                </div>
                <hr/>
                <div className="">
                    {
                        codeCorrect ? 
                        <>
                        <label htmlFor="newPwd" className="text-xl">새 비밀번호</label>
                        {
                            p1Good ?
                            <span className="ml-2 text-green-600 text-sm inline-flex">{password1Label}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                            :
                            <span className="text-red-500 ml-2">{password1Label}</span>
                        }
                        <input type="password" id="newPwd"
                            className="w-full border border-black h-16 p-2 text-xl"
                            value={pwd}
                            onBlur={pwdCheck}
                            onChange={(e)=>{setPwd(e.target.value)}}
                        />
                        <label htmlFor="newPwd2" className="text-xl">새 비밀번호 확인</label>
                        {
                            p2Good ?
                            <span className="ml-2 text-green-600 text-sm inline-flex">{password2Label}<AiFillCheckCircle className="mt-1 ml-1"></AiFillCheckCircle></span>
                            :
                            <span className="text-red-500 ml-2">{password2Label}</span>
                        }
                        
                        <input type="password" id="newPwd2"
                            className="w-full border border-black h-16 p-2 text-xl"
                            value={pwd2}
                            onBlur={pwd2Check}
                            onChange={(e)=>{setPwd2(e.target.value)}}
                        />
                        <div className="text-center">
                            <Button variant="dark" className="mt-2"
                                onClick={changePwd}
                                disabled={changeBtnAct}
                            >비밀번호 변경</Button>
                        </div>
                        </>
                        :
                        <div></div>
                    }
                    
                </div>
            </div>
            
        </div>
        
        
        <Footer></Footer>
        </>
    )

}


export default Register;