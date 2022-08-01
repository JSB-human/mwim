import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import parse from 'html-react-parser';
import {BsFillHeartFill} from 'react-icons/bs';
import Footer from "../../../component/footer";
import ShareBtns from "../../../component/shareBtns";

interface Book {
    author : string;
    description : string;
    discount : string;
    image : string;
    link : string;
    price : string;
    pubdate : string;
    publisher : string;
    title : string;
}

const Guess = () => {
    const [mode, setMode] = useState(1);
    const [queryTxt, setQueryTxt] = useState('');
    const [bookArr, setBookArr] = useState<Array<Book>>([]);
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
            setStatusTxt(`실패! 값 : ${bookArr[nowIndex].price}원`);
        }
    },[heart, bookArr, nowIndex])

    useEffect(() => {
        if(nowIndex === 0){
            return;
        }
        if(nowIndex === nowDisplay){
            setHideNext(true);
        }
    }, [nowIndex, nowDisplay])

    const queryBtn = () => {
        if(queryTxt === ''){
            return;
        }

        axios.get('/naver_book',{
            params : {
                query : queryTxt,
                display : 100,
                sort : 'count'
            },
            headers : {
                //@ts-ignore
                'X-Naver-Client-Id' : process.env.NEXT_PUBLIC_NAVER_ID,
                //@ts-ignore
                'X-Naver-Client-Secret' : process.env.NEXT_PUBLIC_NAVER_SECRET
            }
        })
        .then((res) => {
            // console.log(res);
            setBookArr(res.data.items);
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
        if(parseInt(guessPrice) < parseInt(bookArr[nowIndex].price)){
            setStatusTxt('업!');
            setHeart(heart - 1);
        }else if(parseInt(guessPrice) === parseInt(bookArr[nowIndex].price)){
            setStatusTxt('정답!');
            setFinish(true);
        }else if(parseInt(guessPrice) > parseInt(bookArr[nowIndex].price)){
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
        setBookArr([]);
        setGuessPrice('');
        setHideNext(false);
    }

    return(
        <>
            <NavBar/>
            {
                mode === 1 ?

                <div className="h-full min-h-screen bg-gray-100">
                    <div className="text-center text-2xl p-2">
                        <b className=""> 책 가격 맞추기</b>
                    </div>
                    <div className="container bg-white rounded-lg p-4">
                        맞출 책 키워드
                        <input className="w-full h-full text-2xl p-2 border border-black"
                            placeholder="키워드 입력"
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
                            title={`책 가격 맞추기`}
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
                                    src={bookArr[nowIndex].image}
                                    width={82}
                                    height={120}
                                    alt="이미지"
                                />
                            </div>
                            <div className="w-4/5">
                                    <span className="mb-7"><span className="text-gray-500">이름 : </span>{parse(bookArr[nowIndex].title)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">저자 : </span>{parse(bookArr[nowIndex].author)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">출간일 : </span>{dateFormat(bookArr[nowIndex].pubdate)}</span><br/>
                                    <span className="mb-7"><span className="text-gray-500">출판사 : </span>{parse(bookArr[nowIndex].publisher)}</span><br/>
                            </div>
                        </div>
                       <span>
                            {parse(bookArr[nowIndex].description)}
                       </span>
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
                            urlString={`/play/guess_book/book`}
                            ></ShareBtns>
                    </div>
                </div>
            }
            <Footer></Footer>
        </>

    )
       

}


export default Guess;