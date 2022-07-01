

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import GameReply from "../../../component/game_reply";
import NavBar from "../../../component/navBar";

const joke = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');

    const [check, setCheck] = useState(false);

    const joke_no = router.query.balance || "0";

    useEffect(() => {   
        if(joke_no === '0'){
            axios.get('/spring/joke/get/rand')
            .then((res) => {
                setTitle(res.data.title);
                setSubject(res.data.subject);
            })
        }else{
            axios.get(`/spring/joke/get/${joke_no}`)
            .then((res) => {
                setTitle(res.data.title);
                setSubject(res.data.subject);
            })
        }
    },[joke_no])

    const nextJoke = () => {
        axios.get('/spring/joke/get/rand')
        .then((res) => {
            setTitle(res.data.title);
            setSubject(res.data.subject);
            setCheck(false);
        })
    }

    
    return(
        <>
            <NavBar/>
            <div className="h-screen bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-center text-3xl">
                        <b className="">고급 유머</b>
                    </div>
                    <div className="mt-3 border border-black bg-white rounded-lg">
                        {title}
                    </div>
                    <div className="mt-3">
                        {
                            check ? 
                            <b className="border border-black bg-white rounded-lg p-2">{subject}</b>
                            :
                            <div>
                                <Button
                                    onClick={() => {setCheck(true)}}
                                >눌러서 확인</Button>
                            </div>
                        }
                    </div>
                    <div className="text-right mt-3">
                        <Link href={"/play/joke/makejoke"}>
                            <a>
                                <Button variant="warning">만들기</Button>
                            </a>
                        </Link>
                        <Button
                            variant={"danger"}
                            onClick={nextJoke}
                        >다른 유머</Button>
                    </div>
                    {/* <GameReply gameType={3}></GameReply> */}
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default joke;