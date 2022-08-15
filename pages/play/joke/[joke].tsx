

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import GameReply from "../../../component/game_reply";
import NavBar from "../../../component/navBar";
import ShareBtns from "../../../component/shareBtns";

const Joke = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [subject, setSubject] = useState('');
    const [jokeNo, setJokNo] = useState(0);

    const [check, setCheck] = useState(false);

    const joke_no = router.query.joke || "0";

    useEffect(() => {   
        console.log(joke_no);
        if(joke_no === '0'){
            axios.get('/spring/joke/get/rand')
            .then((res) => {
                setTitle(res.data.title);
                setSubject(res.data.subject);
                setJokNo(res.data.joke_no);
            })
        }else{
            axios.get(`/spring/joke/get/${joke_no}`)
            .then((res) => {
                setTitle(res.data.title);
                setSubject(res.data.subject);
                setJokNo(res.data.joke_no);
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
            <div className="h-full min-h-screen bg-gray-100  font-nexon">
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
                        <Button
                            variant={"dark"}
                            onClick={nextJoke}
                        >다른 유머</Button>
                    </div>
                    <ShareBtns
                        newgame ={true}
                        url={"/play/joke/makejoke"} 
                        btnTitle={"새 유머 만들기"} 
                        title={`유머 - ${title}`}
                        urlString={`/play/joke/${jokeNo}`}
                        ></ShareBtns>
                    {/* <GameReply gameType={3}></GameReply> */}
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default Joke;