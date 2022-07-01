import axios from "axios";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";

const vote = () => {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [vote, setVote] = useState([]);
    const [check, setCheck] = useState('');
    const [voteNo, setVoteNo] = useState(0);
    const [dis, setDis] = useState(true);

    useEffect(() => {
        axios.get('/spring/vote/view/rand')
        .then((res)=> {
            console.log(res);
            setTitle(res.data.title);
            setVote(JSON.parse(res.data.vote));
            setVoteNo(res.data.vote_no);
        })
    },[title])

    const checkRadio = (e : ChangeEvent<HTMLInputElement>) => {
        setCheck(e.target.value);
        setDis(false);
    }

    const clickBtn = () => {
        if(check != ''){
            axios.put('/spring/play/vote/choice',{
                vote_no : voteNo,
                vote : check
            })
            .then(() => {
                router.push('/play/vote/result/'+voteNo);
            })
        }
        
    }

    const Votes = vote.map((val : {subject : string | number | readonly string[] | undefined, count: Number}, i) => {
        let bg = '';

        if(i % 3 === 2){
            bg = 'bg-blue-400';
        }else if(i % 3 === 1){
            bg = 'bg-purple-500';
        }else{
            bg = 'bg-red-400';
        }

        return (
            <div key={i} className={`w-full p-2 text-center`}>
                <label className={`w-11/12 mr-3 border border-black text-white p-3 ${bg}`} htmlFor={i.toString()}>
                    {val.subject}
                </label>
                <input type="radio"
                    name="vote"
                    value={val.subject}
                    id={i.toString()}
                    checked={check === val.subject}
                    onChange={e => checkRadio(e)}
                />
            </div>
        )
    })
    return(
        <>
            <NavBar/>
            <div className="h-screen min-h-full bg-gray-100">
                <div className="container mx-auto px-4 text-center">
                    <div className="text-center text-3xl">
                        <b>투표</b> 
                    </div>
                    <div className="bg-white border border-black mt-2 rounded-lg p-2">
                        <div className="text-2xl text-center">
                            {title}
                        </div>
                        <div className="w-full">
                            {Votes}
                        </div>
                        <Button onClick={clickBtn} disabled={dis}>투표하기</Button>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default vote;