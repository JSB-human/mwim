import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import parse from 'html-react-parser';
import {BsFillHeartFill} from 'react-icons/bs';
import Footer from "../../../component/footer";
import ShareBtns from "../../../component/shareBtns";

interface Shop {
    title : string;
    lprice : number;
    hprice : number;
    mallName : string;
    image : string;
    link : string;
    productType : number;
    maker	: string;
    brand : string;
}

const Price = () => {
    const [mode, setMode] = useState(1);
    const [queryTxt, setQueryTxt] = useState('');
    const [ShopArr, setShopArr] = useState<Array<Shop>>([]);
    const [nowIndex, setNowIndex] = useState(0);
    const [nowDisplay, setNowDisplay] = useState(0);
    const [guessPrice, setGuessPrice] = useState('');
    const [heart, setHeart] = useState(6);
    const [statusTxt, setStatusTxt] = useState('맞춰보세요.');
    const [finish, setFinish] = useState(false);
    const [hideNext, setHideNext] = useState(false);

    useEffect(() => {
        if(heart === 0){
            setFinish(true);
            setStatusTxt(`실패! 값 : ${ShopArr[nowIndex].lprice}원`);
        }
    },[heart, ShopArr, nowIndex])

    useEffect(() => {
        if(nowIndex === 0){
            return;
        }
        if(nowIndex === nowDisplay){
            setHideNext(true);
        }
    }, [nowIndex, nowDisplay])

    const queryBtn = async () => {
        if(queryTxt === ''){
            return;
        }
        const client_id = process.env.NEXT_PUBLIC_NAVER_ID;
        const client_secret = process.env.NEXT_PUBLIC_NAVER_SECRET;

        await axios.get('/naver_shop',{
            params : {
                query : queryTxt,
                display : 100,
                sort : 'sim'
            },
            headers : {
                //@ts-ignore
                'X-Naver-Client-Id' : client_id,
                //@ts-ignore
                'X-Naver-Client-Secret' : client_secret
            }
        })
        .then((res) => {
            // console.log(res);
            setShopArr(res.data.items);
            setMode(2);
            setNowIndex(0);
            setNowDisplay(res.data.display);
        })
        .catch((err) => {
            alert('다른 키워드를 정해주세요');
        })
    }

    const dateFormat = (date : string) => {
        let str = "";
        str = date.slice(0,4) + "." + date.slice(4,6) + "." + date.slice(6,8);
        return str;
    }

    const guessBtn = () => {
        //@ts-ignore
        if(guessPrice === '' || isNaN(guessPrice)){
            return;
        }
        if(parseInt(guessPrice) < ShopArr[nowIndex].lprice){
            setStatusTxt('업!');
            setHeart(heart - 1);
        }else if(parseInt(guessPrice) === ShopArr[nowIndex].lprice){
            setStatusTxt('정답!');
            setFinish(true);
        }else if(parseInt(guessPrice) > ShopArr[nowIndex].lprice){
            setStatusTxt('다운!');
            setHeart(heart - 1);
        }

    }

    const renderHeart = () => {
        let arr = []
        for(var i = 0; i < heart; i++){
            arr.push(
                <BsFillHeartFill key={i} size={40} color="red" />
            )
        }
        return arr;
        
    }

    const nextBtn = () => {
        if(nowIndex + 1 < nowDisplay){
            setNowIndex(nowIndex + 1);
            setStatusTxt('맞춰보세요.')
            setHeart(6);
            setFinish(false);
            setGuessPrice('');
        }
    }

    const changeKeyword = () => {
        setMode(1);
        setStatusTxt('맞춰보세요.')
        setHeart(6);
        setFinish(false);
        setQueryTxt('');
        setShopArr([]);
        setGuessPrice('');
        setHideNext(false);
    }

    return(
        <>
            <NavBar/>
            {
                mode === 1 ?

                <div className="h-full min-h-screen bg-gray-100  font-nexon">
                    <div className="text-center text-2xl p-2">
                        <b className="">상품 가격 맞추기</b>
                    </div>
                    <div className="container bg-white rounded-lg p-4">
                        맞출 상품
                        <input className="w-full h-full text-2xl p-2 border border-black"
                            placeholder="상품 입력"
                            value={queryTxt}
                            onChange={(e) => setQueryTxt(e.target.value)}
                        />
                        <div className="text-right">
                            <Button onClick={queryBtn} variant="primary"
                            >시작</Button>
                        </div>
                        <ShareBtns
                            newgame ={false}
                            url={""} 
                            btnTitle={""} 
                            title={`상품 최저가 맞추기`}
                            urlString={`/play/guess_book/book`}
                            ></ShareBtns>
                    </div>
                </div>
                :
                <div className="h-full min-h-screen bg-gray-100">
                    <div className="text-center text-2xl p-2">
                        <b className=""> 책 가격 맞추기</b>
                    </div>
                    <div className="container bg-white rounded-lg p-4">
                        <div className="flex">
                            <div className="w-1/5 text-center place-items-center">
                                <Image
                                    src={ShopArr[nowIndex].image}
                                    width={82}
                                    height={120}
                                    alt="이미지"
                                />
                            </div>
                            <div className="w-4/5">
                                    <span className="mb-7"><span className="text-gray-500">상품명 : </span>{parse(ShopArr[nowIndex].title)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">쇼핑몰 : </span>{parse(ShopArr[nowIndex].mallName)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">제조사 : </span>{parse(ShopArr[nowIndex].maker)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">브랜드 : </span>{parse(ShopArr[nowIndex].brand)}</span><br/>
                            </div>
                        </div>
                       {/* <span>
                            {'어쩌구'}
                       </span> */}
                    </div>
                    <div className="container bg-white rounded-lg p-4 mt-2">
                        <div className="flex justify-center">
                            <div className="w-1/2 text-2xl p-2 text-center bg-gray-200 rounded-lg">
                                {statusTxt}
                            </div>
                        </div>
                        <div className="p-2 border border-black flex mb-2 mt-2">
                                {renderHeart()}
                        </div>

                        <input 
                            type="text"
                            className="w-full h-full text-2xl p-2 border border-black"
                            placeholder="원가 (원)"
                            value={guessPrice}
                            onChange={(e) => setGuessPrice(e.target.value)}
                        />
                        <Button className="w-full mt-2" variant="success"
                            onClick={guessBtn}
                            disabled={finish}
                        >
                            제출
                        </Button>
                    </div>
                    <div className="container text-right">
                        {
                            hideNext ?
                            <></>
                            :
                            <Button 
                                onClick={nextBtn}
                                variant="danger"
                            >다음</Button>
                        }
                        <Button
                            onClick={changeKeyword}
                            variant="primary"
                        >
                            키워드 변경
                        </Button>
                        <ShareBtns
                            newgame ={false}
                            url={""} 
                            btnTitle={""} 
                            title={`책 가격 맞추기`}
                            urlString={`/play/guess_price/price`}
                            ></ShareBtns>
                    </div>
                </div>
            }
            <Footer></Footer>
        </>

    )
       

}


export default Price;