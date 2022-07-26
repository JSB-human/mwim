
import axios from "axios";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";


const MakeDebate = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [opinion1, setOpinion1] = useState('');
    const [opinion2, setOpinion2] = useState('');

    const addDebate = async () => {   
        if(title.replace(/ /g,"")==="" || description.replace(/ /g,"")===""){
            alert("내용을 전부 작성해주세요.")
            return;
        }

        const sub = await axios.get('/api/login_api');

        axios.post('/spring/debate/add', {
            title : title,
            description : description,
            maker : sub.data.sub,
            opinion1 : opinion1,
            opinion2 : opinion2
        })
        .then(() => {
            router.push('/play/debate/0');
        })
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="min-h-screen h-full bg-gray-100">
            <div className="container mx-auto px-4 bg-white p-2">
                <div className="text-center text-2xl">
                    토론 만들기
                </div>
                <div className="w-full pt-2">
                    <input className="w-full border border-black p-1"
                        placeholder="토론 주제"
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                    />
                    <textarea className="w-full mt-2 border border-black h-40 p-1"
                        placeholder="토론 설명"
                        onChange={(e) => setDescription(e.currentTarget.value)}
                        value={description}
                    />
                </div> 
                <div className="grid grid-cols-2">
                    <div>
                        <input 
                            className="w-full border border-black"
                            placeholder="의견1"
                            value={opinion1}
                            onChange={(e) => setOpinion1(e.target.value)}
                        />
                    </div>
                    <div>
                        <input 
                            className="w-full border border-black"
                            placeholder="의견2"
                            value={opinion2}
                            onChange={(e) => setOpinion2(e.target.value)}
                        />
                    </div>
                </div>

                
                <div className="text-right pt-2">
                    <Button
                        onClick = {addDebate}
                    >만들기</Button>
                </div>

            </div>
           
        </div>
        <Footer></Footer>
        </>
        
    )
}

export default MakeDebate;