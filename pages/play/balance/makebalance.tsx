import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";


const MakeBalance = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [left, setLeft] = useState('');
    const [right, setRight] = useState('');

    const AddBalance = async () =>{
        try {
            if(title.replace(/ /g,"")==="" || left.replace(/ /g,"")==="" || right.replace(/ /g,"")===""){
                alert("내용을 전부 작성해주세요.")
                return;
            }
            
            const sub = await axios.get('/api/login_api');
            axios.post('/spring/play/balance/add', {
                maker : sub.data.sub,
                title0 : title,
                title1 : left,
                title2 : right
            })
            .then((res) => {
                router.push('/play/balance/0');
            })
        } catch (error) {
            //
        }
       
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="min-h-screen h-full bg-slate-100">
            <div className="container mx-auto px-4">
                <div className="text-center text-2xl">
                    밸런스게임 만들기
                </div>
                <div className="text-center">
                    
                </div>
                <div className="text-center">
                    <input type="text" value={title} onChange={(e : React.FormEvent<HTMLInputElement>) => {setTitle(e.currentTarget.value)}} placeholder="ex)평생 먹어야한다면?" className="text-3xl text-center w-full h-24 rounded border-2 border-black"/>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 text-center text-3xl">
                    <input type="text" value={left} onChange={(e : React.FormEvent<HTMLInputElement>) => {setLeft(e.currentTarget.value)}} placeholder="짜장면" className="h-48 text-center border-2 border-black"/>
                    <span className="justify-center">VS</span>
                    <input type="text" value={right} onChange={(e : React.FormEvent<HTMLInputElement>) => {setRight(e.currentTarget.value)}} placeholder="짬뽕" className="h-48 text-center border-2 border-black"/>
                </div>
                <div className="text-center">
                    <Button onClick={()=> {AddBalance()}}>생성</Button>
                </div>
            </div>
           
        </div>
        <Footer></Footer>
        </>
        
    )
}

export default MakeBalance;