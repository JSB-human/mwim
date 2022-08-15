



import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";
import address from "../../api/address";

const MakeJoke = () => {
    const router = useRouter();

    const [title, setTitle] = useState<string>('');
    const [subject, setSubject] = useState<string>('');

    const addJoke = async () => {
        try {
            if(title.replace(/ /g,"")==="" || subject.replace(/ /g,"")===""){
                alert("내용을 전부 작성해주세요.")
                    return;
            }

            const sub = await axios.get('/api/login_api');
    
            axios.post("/spring/joke/add", {
                title : title,
                subject : subject,
                maker : sub.data.sub
            })
            .then(() => {
                address();
                router.push("/main");
            })
        } catch (error) {
            //
        }
        
    }


    return(
        <>
            <NavBar/>
            <div className="h-screen bg-gray-100 font-nexon">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-center text-2xl">
                        고급 유머 만들기
                    </div> 
                    <div className="border border-black mt-2">
                            <input
                            type="text"
                            placeholder="질문"
                            className="w-full text-xl h-20 p-2"
                            value={title} 
                            onChange={(e : React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                            />
                    </div>
                    <div className="border border-black mt-3">
                            <input
                            type="text"
                            placeholder="답변"
                            className="w-full text-xl h-20 p-2"
                            value={subject} 
                            onChange={(e : React.FormEvent<HTMLInputElement>) => setSubject(e.currentTarget.value)}
                            />
                    </div>
                    <Button variant="success"
                        onClick={() => {addJoke()}}
                    >생성</Button>

                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default MakeJoke;