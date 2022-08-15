import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";

const TestGame = () => {
    const [no, setNo] = useState(1);
    const [pick, setPick] = useState(-1);
    const [testJson, setTestJson] = useState([{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'},{txt:'어쩌구저쩌구'}]);
    const [answer, setAnswer] = useState<Array<number>>([]);

    useEffect(() => {
      
    }, [])

    const NextBtn = () => {
        if(pick === -1){
            return;
        }
        if(no < 10){
            setNo(no + 1);
        }else{
            return;
        }

        let arr : Array<number> = answer;
        arr.push(pick);
        console.log(arr);
        setAnswer(arr);
        setPick(-1);
    }

    return (
        <>
        <NavBar/>
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center text-white">
                    <h1>테스트</h1>
                </div>
                <div className="bg-white p-5 border-4 border-[#FBD000] rounded-3xl">
                    <h2>{no}번째 문제</h2>
                    <p className="text-xl">ㅁㄴㅇㄻㄴㅇㄹㄴ</p>
                </div>
                <div className="mt-4 flex flex-col space-y-5">
                    {
                        testJson.map((val, i) => {
                            if(i === pick){
                                return  (
                                    <button className="border-4 border-black rounded-2xl p-2 bg-[#d7f95e] hover:bg-[#f25350] w-full" key={i}
                                        onClick={() => setPick(i)}
                                    >
                                        <span className="flex items-center justify-center">
                                            <FaArrowRight size={20} className="text-blue-500" />{val.txt}
                                        </span>
                                    </button>
                                )
                            }else{
                                return  (
                                    <button className="border-4 border-black rounded-2xl p-2 bg-[#43B047] hover:bg-[#f25350] w-full" key={i}
                                        onClick={() => setPick(i)}
                                    >
                                        {val.txt}
                                    </button>
                                )
                            }
                            
                        })
                    }
                </div>
                <div className="mt-10">
                    <button className="w-full border-4 border-black bg-white text-4xl p-2 rounded-full"
                        onClick={NextBtn}
                    >
                        다음 문제
                    </button>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    )
}

export default TestGame;