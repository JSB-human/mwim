import axios from "axios";
import { cloneNode } from "domhandler";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { Form, Image } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";
import imageCompression from 'browser-image-compression';
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useS3Upload } from 'next-s3-upload';
import { useRouter } from "next/router";

interface answerInterface {
    [index : string] : string;
    answer1 : string;
    answer2 : string;
    answer3 : string;
    answer4 : string;
}

const MakeTest = () => {
    const router = useRouter();
    let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState<Array<string>>([
        '','','','','','','','','',''
    ]);
    const [answer, setAnswer] = useState<Array<answerInterface>>([
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
        { answer1 : "",answer2 : "",answer3 : "",answer4 : "" },
    ]);
    const [correct, setCorrect] = useState<Array<number>>([
        -1,-1,-1,-1,-1,-1,-1,-1,-1,-1
    ])
    const [resultTxt, setResultTxt] = useState<Array<string>>([
        "", "", "", ""
    ]);
    const [files, setFiles] = useState<Array<any>>([
        null,null,null,null,null,null,null,null,null,null
    ]);
    const [fileUrls, setFileUrls] = useState<Array<string>>([
        "","","","","","","","","",""
    ]);


    const changeQuestion = (e : ChangeEvent<HTMLInputElement>, index : number) => {
        const qusetionArr = [...question];
        qusetionArr[index] = e.target.value;
        setQuestion(qusetionArr);
    }

    const changeAnswer = (e : ChangeEvent<HTMLInputElement>, index : number) => {
        const answerArr : Array<answerInterface> = [...answer];
        answerArr[index][e.target.name] = e.target.value;
        setAnswer(answerArr);
    }

    const changeCorrect = (e : ChangeEvent<HTMLInputElement>, index : number) => {
        const correctArr : Array<number> = [...correct];
        correctArr[index] = Number(e.target.value);
        setCorrect(correctArr);
    }

    const changeResult = (e : ChangeEvent<HTMLInputElement>, index : number) => {
        const resultArr : Array<string> = [...resultTxt];
        resultArr[index] = e.target.value;
        setResultTxt(resultArr);
    }

    const imgChange = async (e : any, index : number) => {
        console.log(e,index);
        let file = e.target.files[0];

        const options = {
            maxSizeMB : 1,
            maxWidthOrHeight : 300
        }
        try {
            const compressdFile = await imageCompression(file, options);
            const fileArr = [...files];
            fileArr[index] = compressdFile;
            setFiles(fileArr);

            // const promise = imageCompression.getDataUrlFromFile(compressdFile);
            // promise.then(result => {
            //     const urlArr = [...fileUrls];
            //     urlArr[index] = result;
            //     setFileUrls(urlArr);
            // })
            
            let {url} = await uploadToS3(compressdFile);
            const urlArr = [...fileUrls];
            urlArr[index] = url;
            setFileUrls(urlArr);
        } catch (error) {
            console.log(error);
        } 

    }  

    const makeFinish = async () => {
        const sub = await axios.get('/api/login_api');
        console.log( {
            title : title,
            maker : "익명",
            uid : sub.data.sub,
            q1 : question[0],
            a1 : JSON.stringify(answer[0]),
            q2 : question[1],
            a2 : JSON.stringify(answer[1]),
            q3 : question[2],
            a3 : JSON.stringify(answer[2]),
            q4 : question[3],
            a4 : JSON.stringify(answer[3]),
            q5 : question[4],
            a5 : JSON.stringify(answer[4]),
            q6 : question[5],
            a6 : JSON.stringify(answer[5]),
            q7 : question[6],
            a7 : JSON.stringify(answer[6]),
            q8 : question[7],
            a8 : JSON.stringify(answer[7]),
            q9 : question[8],
            a9 : JSON.stringify(answer[8]),
            q10 : question[9],
            a10 : JSON.stringify(answer[9]),
            imgs : '',
            correct : JSON.stringify(correct),
            resultTxt : JSON.stringify(resultTxt)
        });
       

        axios.post("/spring/testgame/add", {
            title : title,
            maker : "익명",
            uid : sub.data.sub,
            q1 : question[0],
            a1 : JSON.stringify(answer[0]),
            q2 : question[1],
            a2 : JSON.stringify(answer[1]),
            q3 : question[2],
            a3 : JSON.stringify(answer[2]),
            q4 : question[3],
            a4 : JSON.stringify(answer[3]),
            q5 : question[4],
            a5 : JSON.stringify(answer[4]),
            q6 : question[5],
            a6 : JSON.stringify(answer[5]),
            q7 : question[6],
            a7 : JSON.stringify(answer[6]),
            q8 : question[7],
            a8 : JSON.stringify(answer[7]),
            q9 : question[8],
            a9 : JSON.stringify(answer[8]),
            q10 : question[9],
            a10 : JSON.stringify(answer[9]),
            imgs : '',
            correct : JSON.stringify(correct),
            resultTxt : JSON.stringify(resultTxt)
        })
        .then((res) => {
            if(res.data === 1){
                router.push('/play/test_game/testlist');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const QuestionDiv = () => {
        return (
            answer.map((val:any, i:number) => {

                return (
                    <div className="bg-white border-4 border-violet-500 mt-2 p-4 rounded-lg"
                        key={i}
                    >
                        <h4>문제 {i+1}</h4>
                        <input type="file" accept="image/jpg, image/png, image/jpeg, image/gif"
                            id="img_upload" 
                            onChange={(e) => imgChange(e, i)}
                        />
                        {
                            files[i] !== null ?
                            <div className="flex items-center justify-center p-4 w-full">
                                <Image src={fileUrls[i]} 
                                    className="scale-100"
                                    alt = "이미지"
                                />
                            </div>
                            :
                            <></>
                        }
                        <input type="text"
                            className="w-full border-2 border-black text-xl p-2 mt-4"
                            value={question[i]}
                            onChange={(e)=>changeQuestion(e, i)}
                            placeholder={"문제"}
                        />
                        <div className="space-y-5">
                            <label htmlFor={`${i}_1`} className="text-2xl w-1/12">1.</label>
                            <input type="text" id={`${i}_1`}
                                className="w-11/12 text-xl border-2 border-black p-2"
                                name="answer1"
                                value={val.answer1}
                                onChange={(e)=>changeAnswer(e, i)}
                            />
                            <label htmlFor={`${i}_2`} className="text-2xl w-1/12">2.</label>
                            <input type="text" id={`${i}_2`}
                                className="w-11/12 text-xl border-2 border-black p-2"
                                name="answer2"
                                value={val.answer2}
                                onChange={(e)=>changeAnswer(e, i)}
                            />
                            <label htmlFor={`${i}_3`} className="text-2xl w-1/12">3.</label>
                            <input type="text" id={`${i}_3`}
                                className="w-11/12 text-xl border-2 border-black p-2"
                                name="answer3"
                                value={val.answer3}
                                onChange={(e)=>changeAnswer(e, i)}
                            />
                            <label htmlFor={`${i}_4`} className="text-2xl w-1/12">4.</label>
                            <input type="text" id={`${i}_4`}
                                className="w-11/12 text-xl border-2 border-black p-2"
                                name="answer4"
                                value={val.answer4}
                                onChange={(e)=>changeAnswer(e, i)}
                            />
                            <div>
                                <h4>정답</h4>
                                <Form.Check type={"radio"} 
                                    name={i.toString()}
                                    id={`문제${i+1}-1번`}
                                    value={"0"}
                                    label={`문제${i+1}-1번`}
                                    checked={correct[i] === 0}
                                    onChange={(e)=>changeCorrect(e,i)}
                                />
                                <Form.Check type={"radio"} 
                                    name={i.toString()}
                                    id={`문제${i+1}-2번`}
                                    value={"1"}
                                    label={`문제${i+1}-2번`}
                                    checked={correct[i] === 1}
                                    onChange={(e)=>changeCorrect(e,i)}
                                />
                                <Form.Check type={"radio"} 
                                    name={i.toString()}
                                    id={`문제${i+1}-3번`}
                                    value={"2"}
                                    label={`문제${i+1}-3번`}
                                    checked={correct[i] === 2}
                                    onChange={(e)=>changeCorrect(e,i)}
                                />
                                <Form.Check type={"radio"} 
                                    name={i.toString()}
                                    id={`문제${i+1}-4번`}
                                    value={"3"}
                                    label={`문제${i+1}-4번`}
                                    checked={correct[i] === 3}
                                    onChange={(e)=>changeCorrect(e,i)}
                                />
                            </div>
                        </div>
                    </div>
                    )
            })
        )
        
    }
    
       
 

    return(
        <>
        <NavBar />
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-white">테스트 만들기</h1>
                </div>
                <div className="bg-white p-4 border-4 border-yellow-400 rounded-lg">
                    <h4>무슨 테스트인가요?</h4>
                    <input type="text"
                        className="w-full border-2 border-black text-xl p-2"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                        placeholder={"OOO 테스트"}
                    />
                </div>
                <div className="space-y-5">
                    {QuestionDiv()}
                    <div className="bg-white p-4 border-4 border-green-400 rounded-lg">
                        <h4>결과 텍스트</h4>
                        <div className="space-y-5">

                            <label className="text-2xl w-1/6" htmlFor="resultTxt1">0-2</label>
                            <input type="text"
                                id="resultTxt1"
                                className="w-5/6 border-2 border-black text-2xl p-2"
                                value={resultTxt[0]}
                                onChange={(e) => changeResult(e, 0)}
                                placeholder="모르겠다!"
                            />
                            <label className="text-2xl w-1/6" htmlFor="resultTxt2">3-5</label>
                            <input type="text"
                                id="resultTxt2"
                                className="w-5/6 border-2 border-black text-2xl p-2"
                                value={resultTxt[1]}
                                onChange={(e) => changeResult(e, 1)}
                                placeholder="어렵다!"
                            />
                            <label className="text-2xl w-1/6" htmlFor="resultTxt3">6-9</label>
                            <input type="text"
                                id="resultTxt3"
                                className="w-5/6 border-2 border-black text-2xl p-2"
                                value={resultTxt[2]}
                                onChange={(e) => changeResult(e, 2)}
                                placeholder="아까비~"
                            />
                            <label className="text-2xl w-1/6" htmlFor="resultTxt4">10</label>
                            <input type="text"
                                id="resultTxt4"
                                className="w-5/6 border-2 border-black text-2xl p-2"
                                value={resultTxt[3]}
                                onChange={(e) => changeResult(e, 3)}
                                placeholder="10점...10점이요!"
                            />
                        </div>
                    </div>
                    <div className="text-center text-3xl p-4">
                        <button
                            className="p-2 border-4 border-black bg-yellow-500 rounded-full w-full"
                            onClick={makeFinish}
                        >등록</button>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default MakeTest;