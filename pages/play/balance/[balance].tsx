import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import { BsFillPencilFill, BsShareFill } from "react-icons/bs";
import {AiFillLike} from "react-icons/ai";
import { useRouter } from "next/router";
import Footer from "../../../component/footer";
import axios from "axios";

const Balance = () => {
    const router = useRouter();
    const [gameNo, setGameNo] = useState();

    const [sel1, setSel1] = useState('');
    const [sel2, setSel2] = useState('');    

    const [title, setTitle] = useState('');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');
    const [writer, setWriter] = useState('');

    const balance = router.query.balance || "0";

    useEffect(() => {
        if(balance === "0"){
            axios.get('/spring/play/balance/getby/rand')
            .then((res) => {
                setGameNo(res.data.game_no);
                setTitle(res.data.title0);
                setLeft(res.data.title1);
                setRight(res.data.title2);
                setWriter(res.data.maker);
            })
        }else{
            axios.get('/spring/play/balance/get/' + balance)
            .then((res) => {
                setGameNo(res.data.game_no);
                setTitle(res.data.title0);
                setLeft(res.data.title1);
                setRight(res.data.title2);
                setWriter(res.data.maker);
            })
        }
    },[balance])

    const clickSel1 = () : void => {
        axios.put('/spring/play/balance/choice',{
            game_no : gameNo,
            pick1 : 1,
            pick2 : 0
        })
        .then(() => {
            router.push('/play/balance/result/'+gameNo);
        })
    }

    const clickSel2 = () : void=> {
        axios.put('/spring/play/balance/choice',{
            game_no : gameNo,
            pick1 : 0,
            pick2 : 1
        })
        .then((res) => {
            console.log(res);
            router.push('/play/balance/result/'+gameNo);
        })
        
    }


    return(
        <>
            <NavBar/>
            <div className="h-screen min-h-full bg-slate-100">
                <div className="container mx-auto px-4">
                    <div className="text-center text-3xl">
                        <b className="">밸런스 게임</b>
                    </div>
                    <div className="text-2xl bg-blue-400 text-white text-center mt-4">
                        {title}
                    </div>
                    <div className="grid grid-cols-2  h-96 ">
                        <div onClick={clickSel1} className={"w-full overflow-clip flex justify-center items-center bg-purple-500 border-r border-r-black text-2xl text-white hover:cursor-pointer p-2"}>
                            {left}
                        </div>
                        <div onClick={clickSel2} className={"w-full overflow-clip flex justify-center items-center bg-red-400 border-l border-l-black text-2xl text-white hover:cursor-pointer p-2"}>
                            {right}
                        </div>
                        
                    </div>
                    <div className="text-right">
                        
                        <ButtonGroup aria-label="btns">
                            <Link href={"/play/balance/makebalance"}>
                                <a>
                                    <Button type="button" variant="success"><BsFillPencilFill className="inline-block pr-1"/><b>새 게임 만들기</b></Button>
                                </a>
                            </Link>
                            <Button type="button" variant="warning"><BsShareFill className="inline-block pr-1"/><b>공유하기</b></Button>
                            <Button type="button" variant="danger"><AiFillLike className="inline-block pr-1"/><b>내꺼하기</b></Button>
                        </ButtonGroup>
                    </div>

                </div>
            </div>
            <Footer></Footer>
        </>

    )
       

}
export default Balance;