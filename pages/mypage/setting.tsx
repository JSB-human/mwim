import axios from "axios";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../component/footer";
import NavBar from "../../component/navBar";
import {IoCaretBackCircleSharp} from 'react-icons/io5';


const MyPage = () => {
    const { data : token, status } = useSession();
    const router = useRouter();

    const [nowNickName, setNowNickName] = useState('');
    const [accountId, setAccountId] = useState('');
    const [modeLabel, setModeLabel] = useState('설정');
    const [mode, setMode] = useState('default');
    const [nickName, setNickName] = useState('');
    const [pwd, setPwd] = useState('');

    const [nickNameLabel, setNickNameLabel] = useState('');
    const [pwdLabel, setPwdLabel] = useState('8-16자 영문, 숫자, 특수문자 최소 1개 조합');
    const [nickNameGood, setNickNameGood] = useState(false);
    const [pwdGood, setPwdGood] = useState(false);

    const [social, setSocial] = useState('');

    useEffect(() => {
        if(token === null){
            router.push("/login");
        }

        if(mode === 'default'){
            axios.get('/api/login_api')
            .then((res) => {
                setAccountId(res.data.sub);
                axios.get(`/spring/account/select/${res.data.sub}`)
                .then((res) => {
                    setSocial(res.data.social);
                })
            })
        }

        if(mode === 'nickname'){
            let accountId = "";
            axios.get('/api/login_api')
            .then((res) => {
                setAccountId(res.data.sub);
                // axios.get(`/spring/account/select/${accountId}`)
                // .then((res) => {
                //     setNickName(res.data.nickname);
                // })
                axios.get(`/spring/account/select/${res.data.sub}`)
                .then((res) => {
                    setNowNickName(res.data.nickname);
                })
            })
        }

    }, [mode, router, token])
    
    const checkNickname = () => {
        if(nickName === ''){
            setNickNameLabel('');
            return;
        }
      
        axios.get(`/spring/account/getNickname/${nickName}`)
        .then((res) => {
            if(res.data === ''){
                setNickNameLabel('사용가능합니다.');
                setNickNameGood(true);
            }else{
                setNickNameLabel('이미 사용중인 닉네임입니다.');
                setNickNameGood(false);
            }
        })
    }

    const checkPwd = () => {
        var regExp = /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+]).{8,16}$/;
        if(!regExp.test(pwd)){
            setPwdLabel('8-16자 영문, 숫자, 특수문자 최소 1개 조합');
            setPwdGood(false);
        }else{
            setPwdLabel('사용가능합니다.');
            setPwdGood(true);
        }
    }

    const updateNickname = () => {
        if(!nickNameGood){
            return;
        }
        axios.put('/spring/account/changeNickname',{
            account_id : accountId,
            nickname : nickName
        })
        .then((res) => {
            if(res.data === 1){
                setMode('default');
                setNickName('');
            }else{
                alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
            }
        })
        .catch((err) => {
            // console.log(err);
            alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
        })
    }

    const updatePwd = () => {
        if(!pwdGood){
            return;
        }
        axios.put('/spring/account/changePwd',{
            account_id : accountId,
            pwd : pwd
        })
        .then((res) => {
            setMode('default');
        })
        .catch((err) => {
            // console.log(err);
            alert('서버에 문제가 있습니다. 잠시후 다시 시도해주세요.');
        })
    }

    return(
        <>
            <NavBar></NavBar>
            <div className="min-h-screen h-full w-full bg-gray-100">
                <div className="container mx-auto px-4 grid grid-cols-1 gap-2">
                    <div className="bg-white rounded border-black border p-4">
                        <h2 className="font-bold flex">
                            {
                                mode !== 'default' ?
                                <IoCaretBackCircleSharp size={42}
                                        className="hover:cursor-pointer"
                                        onClick={() => setMode('default')}
                                ></IoCaretBackCircleSharp>
                                :
                                <></>
                            }
                        {modeLabel}</h2>
                        <hr/>
                    {
                        mode === 'default' ?
                        <div className="">
                            <div className="text-white font-bold p-2 mt-4 rounded-lg bg-cyan-500  shadow-lg shadow-blue-500/50 hover:bg-black hover:cursor-pointer"
                                onClick={() => setMode('nickname')}
                            >
                                닉네임 변경
                            </div>
                            {
                                social === 'email' ?
                                <div className="text-white font-bold p-2 mt-4 rounded-lg bg-blue-500 shadow-lg shadow-blue-500/50 hover:bg-black hover:cursor-pointer"
                                    onClick={() => setMode('password')}
                                >
                                    비밀번호 변경
                                </div>
                                :
                                <></>
                            }
                           
                            <div className="text-white font-bold p-2 mt-4 rounded-lg bg-indigo-500 shadow-lg shadow-indigo-500/50 hover:bg-black hover:cursor-pointer"
                                onClick={() => signOut()}
                            >
                                로그아웃
                            </div>
                        </div>
                        :
                        mode === 'nickname' ?
                        <>
                            <span>현재 닉네임 : </span> <b>{nowNickName}</b>
                            <br/>
                            <label className="font-bold text-xl mt-2">새 닉네임</label>
                            <span className="ml-2">
                                {nickNameLabel}
                            </span>
                            <input type="text" 
                                className="border-black border w-full p-2"
                                value={nickName}
                                onChange={(e)=>{setNickName(e.target.value)}}
                                onBlur={checkNickname}
                            />
                            <Button variant="primary"
                                onClick={updateNickname}
                                className="w-full"
                                disabled={!nickNameGood}
                            >
                                적용
                            </Button>
                        </>
                        :
                        mode === 'password' ?
                        <>
                            <label className="font-bold mt-2">새 비밀번호</label>
                            <span className="ml-2">
                                {pwdLabel}
                            </span>
                            <input type="password"
                                className="border-black border w-full p-2"
                                value={pwd}
                                onChange={(e)=>{setPwd(e.target.value)}}
                                onBlur={checkPwd}
                            />
                            <Button variant="primary"
                                onClick={updatePwd}
                                className="w-full"
                                disabled={!pwdGood}
                            >
                                적용
                            </Button>
                        </>
                        :
                        mode === 'logout' ? 
                        <>
                            <div className="">
                                <Button onClick={()=>signOut()}
                                    variant="dark"
                                    className="w-full"
                                    >로그아웃</Button>
                            </div>
                        </>
                       :
                       mode === '' ?
                       <>
                       
                       </>
                       :
                       mode === ''
                    }
                    </div>
                   

                    
                </div>

            </div>
            <Footer></Footer>
        </>
    )

}


export default MyPage;