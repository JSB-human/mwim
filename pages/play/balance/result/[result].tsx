import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../../component/footer";
import GameReply from "../../../../component/game_reply";
import NavBar from "../../../../component/navBar";





const Balance_Result = () => {
    const router = useRouter();
    const balance_result = router.query.result;



    const [title, setTitle] = useState('');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [leftCnt, setLeftCnt] = useState(0);
    const [rightCnt, setRightCnt] = useState(0);
    const [leftP, setLeftP] = useState(0);
    const [rightP, setrightP] = useState(0);
    

    useEffect(() => {

        if(balance_result !== undefined){
            axios.get('/spring/play/balance/get/' + balance_result)
            .then((res) => {
                setTitle(res.data.title0);
                setLeft(res.data.title1);
                setRight(res.data.title2);
                setLeftP(Number((res.data.pick1/(res.data.pick1+res.data.pick2) * 100).toFixed(2)));
                setrightP(Number((res.data.pick2/(res.data.pick1+res.data.pick2) * 100).toFixed(2)));
                setLeftCnt(res.data.pick1);
                setRightCnt(res.data.pick2);
            })
            
        }

    }, [balance_result])
        
    return (
        <>
        <NavBar></NavBar>
        <div className="h-full min-h-screen bg-slate-100 font-nexon">
            <div className="container mx-auto px-4 text-center">
                <div className="text-3xl">
                    결과
                    <hr></hr>
                </div>
                <div className="text-2xl bg-blue-400 text-white">
                    {title}
                </div>
                <div className="h-72 grid grid-cols-2">
                    <div className={"h-72 w-full overflow-clip flex justify-center items-center bg-purple-500 border-r border-r-black text-2xl text-white p-2"}>
                        {left}
                        <br></br>
                        ({leftP}%)
                    </div>
                    <div className={"h-72 w-full overflow-clip flex justify-center items-center bg-red-400 border-r border-r-black text-2xl text-white p-2"}>  
                        {right}
                        <br></br>
                        ({rightP}%)
                    </div>
                </div>
                <div className="mt-2 border-4 border-stone-600 h-10 rounded-full">
                    <span style={{width : `${leftP}%`}} className="rounded-l-full h-full inline-flex justify-center items-center bg-purple-500">{leftCnt}</span>
                    <span style={{width : `${rightP}%`}} className="rounded-r-full h-full inline-flex justify-center items-center bg-red-400">{rightCnt}</span>
                </div>
                <div className="text-right">
                    <Link href="/main" passHref >
                        <Button variant="primary" type="button" size="sm">
                            <a>
                                다른 게임 하러가기
                            </a>
                        </Button>
                    </Link>
                    <Link href="/play/balance/0" passHref >
                        <Button variant="danger" type="button" size="sm">
                            <a>
                                다음
                            </a>
                        </Button>
                     </Link>
                </div>
                
                <GameReply gameType={1}></GameReply>
               

            </div>
        </div>
        <Footer></Footer>
        </>

    )
}

export default Balance_Result;