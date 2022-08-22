import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Image } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";
import ShareBtns from "../../../component/shareBtns";

interface answers  {
    answer1 : string;
    answer2 : string;
    answer3 : string;
    answer4 : string;
}

const TestGame = () => {
    const router = useRouter();
    const [no, setNo] = useState(1);
    const [pick, setPick] = useState(-1);
    const [testJson, setTestJson] = useState([{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'}]);
    const [answer, setAnswer] = useState<Array<number>>([]);

    const test_no = router.query.test || "2";

    const [title, setTitle] = useState<string>('');
    const [question, setQuestion] = useState<Array<string>>([]);
    const [choice, setChoice] = useState<Array<answers>>([]);
    
    const [imgs, setImgs] = useState<Array<string>>([]);
    const [correct, setCorrect] = useState<Array<number>>([]);
    const [resultTxts, setResultTxts] = useState<Array<string>>([]);
    
    const [rightCnt, setRightCnt] = useState<number>(0);

    useEffect(() => {
        if(test_no === '0'){
            axios.get('/spring/testGame/get/rand')
            .then((res) => {
                try {
                    setTitle(res.data.title);
                    let qusetionArr = [];
                    qusetionArr.push(res.data.q1);
                    qusetionArr.push(res.data.q2);
                    qusetionArr.push(res.data.q3);
                    qusetionArr.push(res.data.q4);
                    qusetionArr.push(res.data.q5);
                    qusetionArr.push(res.data.q6);
                    qusetionArr.push(res.data.q7);
                    qusetionArr.push(res.data.q8);
                    qusetionArr.push(res.data.q9);
                    qusetionArr.push(res.data.q10);
                    setQuestion(qusetionArr);
    
                    let answerArr = [];
                    answerArr.push(JSON.parse(res.data.a1));
                    answerArr.push(JSON.parse(res.data.a2));
                    answerArr.push(JSON.parse(res.data.a3));
                    answerArr.push(JSON.parse(res.data.a4));
                    answerArr.push(JSON.parse(res.data.a5));
                    answerArr.push(JSON.parse(res.data.a6));
                    answerArr.push(JSON.parse(res.data.a7));
                    answerArr.push(JSON.parse(res.data.a8));
                    answerArr.push(JSON.parse(res.data.a9));
                    answerArr.push(JSON.parse(res.data.a10));
                    setChoice(answerArr);
    
                    setResultTxts(JSON.parse(res.data.resultTxt));
                    setCorrect(JSON.parse(res.data.correct));
                    
                    setImgs(JSON.parse(res.data.imgs));
                } catch (error) {
                    setImgs([]);
                }
            })
        }else{
            axios.get(`/spring/testGame/get/${test_no}`)
            .then((res) => {
                try {
                    setTitle(res.data.title);
                    let qusetionArr = [];
                    qusetionArr.push(res.data.q1);
                    qusetionArr.push(res.data.q2);
                    qusetionArr.push(res.data.q3);
                    qusetionArr.push(res.data.q4);
                    qusetionArr.push(res.data.q5);
                    qusetionArr.push(res.data.q6);
                    qusetionArr.push(res.data.q7);
                    qusetionArr.push(res.data.q8);
                    qusetionArr.push(res.data.q9);
                    qusetionArr.push(res.data.q10);
                    setQuestion(qusetionArr);
    
                    let answerArr = [];
                    answerArr.push(JSON.parse(res.data.a1));
                    answerArr.push(JSON.parse(res.data.a2));
                    answerArr.push(JSON.parse(res.data.a3));
                    answerArr.push(JSON.parse(res.data.a4));
                    answerArr.push(JSON.parse(res.data.a5));
                    answerArr.push(JSON.parse(res.data.a6));
                    answerArr.push(JSON.parse(res.data.a7));
                    answerArr.push(JSON.parse(res.data.a8));
                    answerArr.push(JSON.parse(res.data.a9));
                    answerArr.push(JSON.parse(res.data.a10));
                    setChoice(answerArr);
    
                    setResultTxts(JSON.parse(res.data.resultTxt));
                    setCorrect(JSON.parse(res.data.correct));
                    setImgs(JSON.parse(res.data.imgs));
                } catch (error) {
                    setImgs(['','','','','','','','','','']);
                }
                
            })
        }

    }, [test_no])

    useEffect(() => {
        if(no === 11){
            let cnt = 0;
            for(var i=0; i<10; i++){
                if(correct[i] === answer[i]){
                    cnt++;
                }
            }
            setRightCnt(cnt);
        }
    }, [no])

    const NextBtn = () => {
        if(pick === -1){
            return;
        }
        if(no < 11){
            setNo(no + 1);
        }else{
            return;
        }

        let arr : Array<number> = answer;
        arr.push(pick);
        setAnswer(arr);
        setPick(-1);
    }

    const RenderAnsers = () => {
        try {
                const arr = [choice[no-1].answer1,choice[no-1].answer2,choice[no-1].answer3,choice[no-1].answer4];
            
            let result = arr.map((val, i) => {
                if(i === pick){
                    return  (
                        <button className="border-4 border-black rounded-2xl p-2 bg-[#d7f95e] hover:bg-[#f25350] w-full" key={i}
                            onClick={() => setPick(i)}
                        >
                            <span className="flex items-center justify-center">
                                <FaArrowRight size={20} className="text-blue-500" />{val}
                            </span>
                        </button>
                    )
                }else{
                    return  (
                        <button className="border-4 border-black rounded-2xl p-2 bg-[#43B047] hover:bg-[#f25350] w-full" key={i}
                            onClick={() => setPick(i)}
                        >
                            <span className="text-white">
                                {val}
                            </span>    
                        </button>
                    )
                }
            })
            return result;

        } catch (error) {
            return (
                <div>

                </div>
            )
        }
        
    }

    return (
        <>
        <NavBar/>
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center text-white">
                    <h1>{title}</h1>
                </div>
                {
                no === 11 ? 
                <div className="bg-lime-500 p-5 border-4 border-lime-100 rounded-3xl">
                    <h2 className="text-lime-900">결과</h2>
                    <div className="mt-10">
                        <h1>
                            <span className="text-white">맞은 개수 </span>
                            <span className="text-black">{`${rightCnt}/10`}</span>
                        </h1>
                        <h2>{resultTxts[0]}</h2>
                        <ShareBtns
                            btnTitle=""
                            newgame={false}
                            url=""
                            title=""
                            urlString=""
                         
                        />
                    </div>
                    <div className="mt-10 rounded-lg p-2">
                        <h1>정답</h1>
                        {
                            choice.map((val, i) => {
                                let result = '';
                                let resultColor = '';
                                if(correct[i] === answer[i]){
                                    result = 'O';
                                    resultColor = 'text-blue-500';
                                }else{
                                    result = 'X';
                                    resultColor = 'text-red-500';
                                }
                                
                                let correct_answer = '';
                                if(correct[i] === 0){
                                    correct_answer = val.answer1;
                                }else if(correct[i] === 1){
                                    correct_answer = val.answer2;
                                }else if(correct[i] === 2){
                                    correct_answer = val.answer3;
                                }else if(correct[i] === 3){
                                    correct_answer = val.answer4;
                                }

                                return(
                                    <div className="mt-4 rounded-lg bg-[#C8EE9D] p-2 border-2" key={i}>
                                        <h4>{`${i+1}번 `}<span className={`${resultColor}`}>{result}</span></h4>
                                        {
                                            imgs[i] !== ''?
                                            <LazyLoadImage src={imgs[i]} 
                                                        className="scale-90"
                                                        alt = "이미지"
                                                        effect="black-and-white"
                                                        
                                            />
                                            :
                                            <></>
                                        }
                                        <h5>Q.{question[i]}</h5>
                                        <p>A.{correct_answer}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                :
                <div>
                    <div className="bg-white p-5 border-4 border-lime-500 rounded-3xl">
                        <h2>{no}번째 문제</h2>
                        {
                            imgs[no-1] !== ''?
                            <LazyLoadImage src={imgs[no-1]} 
                                        className="scale-90"
                                        alt = "이미지"
                                        effect="black-and-white"
                            />
                            :
                            <div></div>
                        }
                        <p className="text-xl">{question[no-1]}</p>
                    </div>
                    <div className="mt-4 flex flex-col space-y-5">
                        {RenderAnsers()}
                    </div>
                    <div className="mt-10">
                        <button className="w-full border-4 border-black bg-white text-4xl p-2 rounded-full"
                            onClick={NextBtn}
                        >
                            다음 문제
                        </button>
                    </div>
                </div>
                }
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default TestGame;