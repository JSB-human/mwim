import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";
import ShareBtns from "../../../component/shareBtns";
import wordJson from "../../../jsons/wordJson.json";

const HangMan = () => {
    const router = useRouter();
    const canvas : any = useRef();
    
    const [playCnt, setPlaycnt] = useState(0);
    const [chance, setChance] = useState<number>(0);
    const [answer, setAnswer] = useState<string>('');
    const [nowWord, setNowWord] = useState<Array<string>>([]);

    const [alphabet, setAlphabet] = useState('');

    const [wrongTxt, setWrongTxt] = useState<string[]>(['_','_','_','_','_','_','_','_','_']);

    const [dis, setDis] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const rand = Math.floor(Math.random() * wordJson.length);

        axios('/random_words')
        .then((res) => {
            setAnswer(wordJson[rand]);
            const cnt = wordJson[rand].length;
            let Arr : string[] = [];
            for(var i=0; i<cnt; i++){
                Arr.push('_');
            }
            setNowWord(Arr);
            setLoading(true);
        })
    },[playCnt])

    useEffect(() => {   
        const canvasEle = canvas.current;
        canvasEle.width = canvasEle.clientWidth;
        canvasEle.height = canvasEle.clientHeight;
        let ctx = null;

        ctx = canvasEle.getContext("2d");

        ctx.beginPath();
        ctx.moveTo(75, 0);
        ctx.lineTo(75, 25);

        if(chance > 0){
            ctx.moveTo(125,75);
            ctx.arc(75, 75, 50, 0, Math.PI * 2, true); // Outer circle
        }
        if(chance > 1){
            ctx.moveTo(110, 75);
            ctx.arc(75, 75, 35, 0, Math.PI, false);  // Mouth (clockwise)
        }
        if(chance > 2){
            ctx.moveTo(65, 65);
            ctx.arc(60, 65, 5, 0, Math.PI * 2, true);  // Left eye
        }
        if(chance > 3){
            ctx.moveTo(95, 65);
            ctx.arc(90, 65, 5, 0, Math.PI * 2, true);  // Right eye
        }
        ctx.stroke();
        // body
        if(chance > 4){
            ctx.moveTo(75, 125);
            ctx.lineTo(75, 200);
        }
        
        //left hand
        if(chance > 5){
            ctx.moveTo(20, 170);
            ctx.lineTo(75, 125);
        }

        //right hand
        if(chance > 6){
            ctx.moveTo(130, 170);
            ctx.lineTo(75, 125);
        }

        //left leg
        if(chance > 7){
            ctx.moveTo(75, 200);
            ctx.lineTo(20, 250);
        }
        

        //right leg
        if(chance > 8){
            ctx.moveTo(75, 200);
            ctx.lineTo(130, 250);
        }
        

        ctx.stroke();

        ctx.font = '20px serif';
        ctx.fillText('틀린 알파벳', 180, 20);
        ctx.fillText(wrongTxt[0], 200, 50);
        ctx.fillText(wrongTxt[1], 220, 50);
        ctx.fillText(wrongTxt[2], 240, 50);
        ctx.fillText(wrongTxt[3], 260, 50);
        ctx.fillText(wrongTxt[4], 200, 80);
        ctx.fillText(wrongTxt[5], 220, 80);
        ctx.fillText(wrongTxt[6], 240, 80);
        ctx.fillText(wrongTxt[7], 260, 80);
        ctx.fillText(wrongTxt[8], 200, 110);

        if(chance === 9){
            alert('패배 (답 : ' + answer +')');
            setDis(true);
        }

    },[chance, answer, wrongTxt])

    // useEffect(() => {
    //     console.log(answer, nowWord.includes('_'));
    //     if(nowWord.length < 1){
    //         return;
    //     }
        
    // }, [nowWord])

    const retry = () => {
        setWrongTxt(['_','_','_','_','_','_','_','_','_']);
        setNowWord([]);
        setDis(false);
        setChance(0);
        setPlaycnt(playCnt + 1);
        setLoading(false);
    }

    const submit = () => {
        // console.log(answer, alphabet);
        if(answer.includes(alphabet)){
            let indexArr : number[] = [];
            for(var i=0; i < answer.length; i++){
                let index = answer.indexOf(alphabet, i);
                indexArr.push(index);
            }
            for(var i=0; i < indexArr.length; i++){
                nowWord[indexArr[i]] = alphabet;
            }

        }else{
            let Arr = wrongTxt;
            Arr[chance] = alphabet;
            setWrongTxt(Arr);
            setChance(chance + 1);
        }
        setAlphabet('');
    }

    
    return(
        <>
            <NavBar/>
            <div className="h-screen min-h-full bg-gray-100">
                <div className="container mx-auto px-4 text-center h-full">
                    <div className="text-center text-3xl">
                        <b className="">행맨</b>
                    </div>
                    <div className="mt-3 border border-black h-72 rounded-lg p-4 bg-white">
                        <canvas ref={canvas} className="h-full"></canvas>
                    </div>
                    <div className="mt-2 border border-black h-15 rounded-lg p-4 bg-white">
                        {
                            !loading ? 
                            <Spinner animation="border" />
                            :
                            nowWord.map((val, i) => { 
                                return (
                                <span className="text-3xl mr-2 h-full" key={i}>
                                    {val}
                                </span>
                            )})
                        }    
                       
                    </div>
                    <div className="mt-2 h-20" >
                        <input type="text" 
                            className="w-10 text-xl h-15 p-2 text-center border-2 border-black"
                            value={alphabet}
                            maxLength={1}
                            onChange={(e : ChangeEvent<HTMLInputElement>) => {setAlphabet(e.target.value)}}
                        />
                        <Button onClick={submit}
                            disabled={dis}
                        >제출</Button>
                    </div>

                    <div className="mt-5 text-right">
                        <Button
                            variant={"danger"}
                            onClick={retry}
                            
                        >다시하기</Button>  
                    </div>
                    <ShareBtns
                        newgame ={false}
                        url={""} 
                        btnTitle={""} 
                        title={`행맨 게임`}></ShareBtns>
                </div>
            </div>
            <Footer></Footer>
        </>
    )
}

export default HangMan;