import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import { BsFillPencilFill, BsShareFill } from "react-icons/bs";
import {AiFillLike} from "react-icons/ai";
import { useRouter } from "next/router";
import Footer from "../../../component/footer";
import axios from "axios";
import moment from "moment";
import Share from "../../../component/share";
import Post from "../../../component/post";
import ShareBtns from "../../../component/shareBtns";

const Debate = () => {
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [opinion1, setOpinion1] = useState('');
    const [opinion2, setOpinion2] = useState('');
    const [opinion1Cnt, setOpinion1Cnt] = useState(0);
    const [opinion2Cnt, setOpinion2Cnt] = useState(0);

    const [opinionJson, setOpinionJson] = useState([]);

    const [radio, setRadio] = useState(0);

    const [debate_no, setDebate_no] = useState(0);
    
    const [opinion_txt, setOpinion_txt] = useState('');
    const [opinion_like, setOpinion_like] = useState(0);
    const [nickname, setNickname] = useState('');

    const [more, setMore] = useState(false);
    const [opinion_no, setOpinion_no] = useState(1);

    const [last, setLast] = useState(false);

    useEffect(() => {
        axios.get('/spring/debate/getRand')
        .then((res) => {
            // console.log(res.data);
            setDebate_no(res.data.debate_no);
            setTitle(res.data.title);
            setDescription(res.data.description);
            setOpinion1(res.data.opinion1);
            setOpinion2(res.data.opinion2);

            axios.get('/spring/debate_opinion/get/' + res.data.debate_no + "/" + 999999)
            .then((res) => {
                // console.log("debate_no >> ",debate_no)
                // console.log(res.data);
                setOpinionJson(res.data);
                setOpinion_no(res.data[res.data.length-1].opinion_no);
            })
            .catch((err) => {
                // console.error(err);
            })
        })
    },[debate_no])


    const writeButton = async () => {
        const sub = await axios.get('/api/login_api');
        axios.post("/spring/debate_opinion/add", {
            debate_no : debate_no,
            opinion_select : radio,
            opinion_txt : opinion_txt,
            opinion_like : opinion_like,
            maker : sub.data.sub,
            nickname : nickname
        })
        .then(() => {
            setNickname('');
            setOpinion_txt('');
        })
        .then(() => {
            axios.get('/spring/debate_opinion/get/'+debate_no+"/"+999999)
            .then((res) => {
                setOpinionJson(res.data);
                // console.log(res.data);
            })
            .catch((err) => {
                // console.log(err);
            })
        })
    }

    const getMore = () => {
        axios.get('/spring/debate_opinion/get/' + debate_no + "/" + opinion_no)
        .then((res) => {
            let arr = opinionJson;
            res.data;//합치자
            
            // console.log(arr);
            setOpinionJson(arr);
        })
    }

    return(
        <>
            <NavBar/>
            <div className="h-full min-h-screen bg-gray-100 grid">
                <div className="container h-full ">
                    <div className="text-xl text-center p-2 rounded-lg bg-white">
                        {title}
                        <p className="text-sm mt-2">
                            {description}
                        </p>
                    </div>
                    <ShareBtns
                        newgame ={true}
                        url={"/play/vote/makevote"} 
                        btnTitle={"새 토론 만들기"} 
                        title={`토론 - ${title}`}></ShareBtns>
                    <div className="grid grid-cols-1 mt-2 bg-white rounded-lg p-2">
                        <div className="font-bold border-b-2 border-black">
                            의견 추가
                        </div>
                        <div className="mt-2">
                            <input 
                              className="border border-black"  
                              placeholder="닉네임"
                              value={nickname}
                              onChange={(e) => setNickname(e.target.value)}
                            />
                            <br/>
                            <label htmlFor={"1"}>
                                A.{opinion1}
                            </label>
                            <input
                                type="radio"
                                value={1}
                                id={"1"}
                                name="opinion"
                                onChange={(e) => setRadio(parseInt(e.target.value))}
                            />
                            <br/>
                            <label htmlFor={"2"}>
                                B.{opinion2}
                            </label>
                            <input
                                type="radio"
                                value={2}
                                id={"2"}
                                name="opinion"
                                onChange={(e) => setRadio(parseInt(e.target.value))}
                            />
                            <textarea
                                className="w-full h-20 border border-black mt-1 p-2"
                                value={opinion_txt}
                                onChange={(e) => setOpinion_txt(e.currentTarget.value)}
                            />
                        </div>
                        <div className="text-right">
                            <Button variant="outline-danger"
                                onClick={writeButton}
                            >작성</Button>
                        </div>
                    </div>
                    <div className="mt-2 bg-white rounded-lg pb-3">
                        <div className="grid grid-cols-2 ">
                            <div className="text-center border-b-2 border-black font-bold">
                                {"A." + opinion1} 
                            </div>
                            <div className="text-center border-b-2 border-black font-bold">
                                {"B." + opinion2}
                            </div>
                        </div>
                        {
                            opinionJson.length === 0 ?
                            
                            <div className="text-center p-2">
                                아직 의견이 없습니다.
                            </div>
                            :
                            opinionJson.map((val : any, i) => {
                                return (
                                    <div className="grid grid-cols-1 mt-3" key={i}>
                                        {
                                            val.opinion_select === 1 ?
                                            <div className="grid grid-cols-2">
                                                <div className=" text-right">
                                                    <div className="bg-gray-200 rounded-lg p-2 w-full">
                                                        <span className="text-xs font-semibold">
                                                            {"추천 " + val.opinion_like + " "}
                                                        </span>
                                                        <span className="text-xs">
                                                            {moment(val.writeTime).format('YYYY-MM-DD h:mm')}
                                                        </span>
                                                        <b> {val.nickname}</b>
                                                        <br/>
                                                        {val.opinion_txt}
                                                    </div>
                                                </div>
                                                <div className="">
                                                </div>
                                            </div>
                                            :
                                            <div className="grid grid-cols-2">
                                                <div className="">
                                                </div>
                                                <div className=" text-left">
                                                    <div className="bg-gray-200 rounded-lg p-2 w-full">
                                                        <b>{val.nickname} </b>
                                                        <span className="text-xs">
                                                            {moment(val.writeTime).format('YYYY-MM-DD h:mm')}
                                                        </span>
                                                        <span className="text-xs font-semibold">
                                                            {" 추천 " + val.opinion_like}
                                                        </span>
                                                        <br/>
                                                        {val.opinion_txt}
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        }
                                    </div>
                                )
                            })
                        }
                        {/* <div className="grid grid-cols-1 mt-3">
                            {
                                last ? 
                                <></>
                                :
                                <Button className="bg-white text-black"
                                onClick={getMore}
                                variant="info"
                                >더보기</Button>
                            }
                            
                        </div> */}
                    </div>
                    
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}
export default Debate;