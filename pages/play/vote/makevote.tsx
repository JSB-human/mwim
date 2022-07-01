import axios from "axios";
import Router, { useRouter } from "next/router";
import React, { HTMLInputTypeAttribute, ReactElement, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";


const MakeVote = () => {
    const [title, setTitle] = useState<string>('');
    
    const [vote, setVote] = useState([{ subject: "", count: 0 }]);

    const voteChange = (e : React.ChangeEvent<HTMLInputElement>, i : number) => {
        const { name, value } = e.target;
        const list = [...vote];
        //@ts-ignore
        list[i][name] = value;
        setVote(list);
    }

    const votes = vote.map((val, i) => {
        return (
            <div key={i}>
                <input 
                    name = "subject"
                    placeholder="항목을 입력해주세요."
                    className="w-3/4 border border-black p-2"
                    value={val.subject}
                    onChange={(e) => voteChange(e, i)}
                />
                <Button variant="outline-dark" className="h-full"
                    onClick={() => RemoveContent(i)}
                    size={"sm"}
                >X</Button>
            </div>
        )
    })

    const AddContent = () => {
        setVote([...vote, { subject: "", count: 0 }])
    }

    const RemoveContent = (index : number) => {
        const list = [...vote];
        list.splice(index, 1);
        setVote(list);
    }

    const AddVote = async () => {
        const sub = await axios.get('/api/login_api');
        try {
            axios.post('/spring/vote/add',
                {
                    maker : sub.data.sub,
                    title : title,
                    vote : JSON.stringify(vote),
                }
            )
            .then((res) => {
                Router.push('/play/vote/0');
            })
        } catch (error) {
            //
        }
       
    }


    return (
        <>
        <NavBar></NavBar>
        <div className="min-h-screen h-full bg-slate-100">
            <div className="container mx-auto px-4 text-center">
                <div className="text-center text-2xl">
                    투표 만들기
                </div>
                <div className="text-center">
                    <input type="text" className="text-3xl text-center border border-black w-full h-24"
                        placeholder="투표 제목을 적어주세요."
                        value={title}
                        onChange={(e : React.FormEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                    />
                    <br/>
                    <div className="text-right">
                        <Button className="justify-end"
                            onClick={AddContent}
                        >항목 추가</Button>
                    </div>
                    <div id="votes" className="border border-black bg-white w-full h-full place-items-center">
                        {votes}
                    </div>
                </div>

                <Button variant="success" onClick={AddVote}>새 투표 등록</Button>
            </div>
        </div>
        <Footer></Footer>
        </>
        
    )
}

export default MakeVote;