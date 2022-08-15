import axios from "axios";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import Footer from "../../../component/footer";
import upbitCoins from '../../../jsons/coins.json';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ShareBtns from "../../../component/shareBtns";

interface coinJsonType {
    market : string;
    trade_price : number;
    prev_closing_price : number;
    acc_trade_price_24h : number;
    acc_trade_volume_24h : number;
    change : string;
    change_rate : number;
    change_price : number;
    high_price : number;
    low_price : number;
    highest_52_week_price : number;
    highest_52_week_date: string;
    lowest_52_week_price : number;
    lowest_52_week_date : string;
    timestamp : number;
}

const cj = {
    market : '',
    trade_price : 0,
    prev_closing_price : 0,
    acc_trade_price_24h : 0,
    acc_trade_volume_24h : 0,
    change : '',
    change_rate : 0,
    change_price : 0,
    high_price : 0,
    low_price : 0,
    highest_52_week_price: 0,
    highest_52_week_date: "",
    lowest_52_week_price: 0,
    lowest_52_week_date: "",
    timestamp : 0,
}

const GuessCoin = () => {
    const [coinJson, setCoinJson] = useState<coinJsonType>(cj);
    const [nowCoinJson, setNowCoinJson] = useState<coinJsonType>(cj);
    const [nowIndex, setNowIndex] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [guess, setGuess] = useState('');
    const [progress, setProgress] = useState(100);
    const [mode, setMode] = useState(0);
    const [resultTxt, setResultTxt] = useState('');
    
    useEffect(() => {
        const rand = Math.floor(Math.random() * upbitCoins.length);
        setNowIndex(rand);
        axios.get(`/upbit_coin/v1/ticker?markets=${upbitCoins[rand].market}`)
        .then((res) => {
            // console.log(upbitCoins[rand])
            // console.log(res);
            setCoinJson(res.data[0])
        })
        .catch((err) => {
            console.log(err);
        })
    },[])

    
    const checkPrice = useCallback(() => {
        axios.get(`/upbit_coin/v1/ticker?markets=${upbitCoins[nowIndex].market}`)
        .then((res) => {
            setNowCoinJson(res.data[0])
            setMode(1);
            if(parseFloat(guess) === res.data[0].trade_price){
                setResultTxt('정답!');
            }else{
                setResultTxt('틀렸습니다.');
            }
        })
        .catch((err) => {
            console.log(err);
        })
    },[guess, nowIndex])

    useEffect(() => {

        const timer = setInterval(() => {
            if(seconds === 0){
                clearInterval(timer);
                checkPrice();
            }else{
                setSeconds(seconds-1);
            }
        }, 1000)
        return () => clearInterval(timer);
    }, [seconds, checkPrice])

    useEffect(() => {
        
        const gaugeTimer = setInterval(() => {
            if(progress < 1){
                clearInterval(gaugeTimer);
            }else{
                setProgress(progress-0.333333)
            }
        }, 100)
        return () => clearInterval(gaugeTimer);
    }, [progress])

   

    const reset = () => {
        setCoinJson(cj);
        setNowCoinJson(cj);
        const rand = Math.floor(Math.random() * upbitCoins.length);
        setNowIndex(rand);
        setSeconds(30);
        setGuess('');
        setProgress(100);
        setMode(0);

        axios.get(`/upbit_coin/v1/ticker?markets=${upbitCoins[rand].market}`)
        .then((res) => {
            // console.log(upbitCoins[rand])
            // console.log(res);
            setCoinJson(res.data[0])
        })
        .catch((err) => {
            console.log(err);
        })
    }


    return(
        <>
            <NavBar/>
                <div className="h-full min-h-screen bg-gray-100 font-nexon">
                    <div className="text-center text-2xl p-2">
                        <b className="">랜덤 코인 가격 맞추기</b>
                    </div>
                    <div className="container bg-white rounded-lg p-4">
                        <div className="border-b-2 border-gray-400 p-2">
                            <span className="text-xl font-bold">
                                {upbitCoins[nowIndex].korean_name+"  "}  
                            </span>
                            <span className="">
                                {upbitCoins[nowIndex].english_name+"  "}
                            </span>
                            {
                                
                                coinJson.change === 'EVEN' ?
                                <span className="text-gray-600">
                                    {(coinJson.change_rate * 100).toFixed(2) + '%'}
                                </span>
                                :
                                coinJson.change === 'RISE' ? 
                                <span className="text-red-600">
                                    {'+' + (coinJson.change_rate * 100).toFixed(2) + '%'}
                                </span>
                                :
                                <span className="text-blue-800">
                                    {'-' + (coinJson.change_rate * 100).toFixed(2) + '%'}
                                </span>
                              
                            }
                        </div>
                        <div className="p-2">
                            <div className="text-gray-600">
                                {/* <b>단위 </b> */}
                                {upbitCoins[nowIndex].market.split('-',1 ) + " 마켓"}  
                            </div>
                            <div >
                                <span className="mr-2 text-xs">
                                    <b className="text-gray-600 mr-2">{`거래대금(24h)`}</b>
                                    <span>{((coinJson.acc_trade_price_24h).toFixed(2))}</span>
                                </span>
                            </div>
                            <hr></hr>
                            <div>
                                <span className="mr-2 text-xs">
                                    <b className="text-gray-600">52주 최고</b>
                                </span>
                                <span className="text-red-600 mr-1">{coinJson.highest_52_week_price}</span>
                                <span className="text-xs">{`(${coinJson.highest_52_week_date})`}</span>
                                <br></br>
                                <span className="mr-2 text-xs">
                                    <b className="text-gray-600">52주 최저</b>
                                </span>
                                <span className="text-blue-800 mr-2">{coinJson.lowest_52_week_price}</span>
                                <span className="text-xs">{`(${coinJson.lowest_52_week_date})`}</span>
                            </div>
                            <hr/>
                            <div>
                                <span className="mr-2 text-xs">
                                    <b>당일 고가</b>
                                </span>
                                <span className="text-red-600">{coinJson.high_price} </span>
                                <br/>
                                <span className="mr-2 text-xs">
                                    <b>당일 저가</b>
                                </span>
                                <span className="text-blue-800">{coinJson.low_price} </span>
                            </div>
                            <hr></hr>
                            <div className="text-xl">
                                현재가 <b>{`${coinJson.trade_price} ${upbitCoins[nowIndex].market.split('-',1 )}`}</b>
                            </div>
                        </div>
                    </div>
                    <div className="container bg-white rounded-lg p-4 mt-2">
                        {seconds}초
                        <div>
                            <ProgressBar now={progress} 
                                variant={"danger"}
                                visuallyHidden 
                            />
                        </div>
                    </div>
                    <div className="container bg-white rounded-lg p-4 mt-2">
                        {
                            mode === 0 ?
                            <div>
                                <b className="text-xl">30초 뒤의 가격을 예측해주세요. (숫자만 입력)</b>
                                <input className="border-2 border-black w-full rounded-lg p-2" 
                                    placeholder="가격"
                                    value={guess}
                                    onChange={(e) => setGuess(e.target.value)}
                                />
                            </div>
                            :
                            <div>  
                                <p>예측 가격 : {`${guess} ${upbitCoins[nowIndex].market.split('-',1 )}`}</p>
                                <p>현재 가격 : {`${nowCoinJson.trade_price} ${upbitCoins[nowIndex].market.split('-',1 )}`}</p>
                                <p className="text-xl">{resultTxt}</p>
                            </div>
                        }
                        
                        
                    </div>
                    <div className="container text-right p-2">
                        <Button
                            onClick={reset}
                        >다른 코인</Button>
                        <Button className="ml-2"
                            variant="danger"
                        >다른 게임</Button>
                        <ShareBtns
                            newgame ={false}
                            url={""} 
                            btnTitle={""} 
                            title={`코인 가격 맞추기`}
                            urlString={"/play/coin/guessCoin"}
                            ></ShareBtns>
                    </div>
                </div>
            <Footer></Footer>
        </>

    )
       

}


export default GuessCoin;