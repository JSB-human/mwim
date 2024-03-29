import Link from "next/link";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Spinner } from "react-bootstrap";
import NavBar from "../../../component/navBar";
import { BsFillPencilFill, BsShareFill } from "react-icons/bs";
import {AiFillLike} from "react-icons/ai";
import { useRouter } from "next/router";
import Footer from "../../../component/footer";
import axios from "axios";
import Image from "next/image";
import ShareBtns from "../../../component/shareBtns";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const Guess_Movie = () => {
    const router = useRouter();
    const [movieArr, setMovieArr] = useState([]);
    const [randuri, setRanduri] = useState('');
    const [title, setTitle] = useState('');
    const [updateNo, setUpdateNo] = useState(0);
    const [overview, setOverView] = useState('');
    const [posterUri, setPosterUri] = useState('');
    const [check, setCheck] = useState(false);
    const [release_date, setRelase_date] = useState('');

    useEffect(() => {
        const rand = Math.floor(Math.random() * 101);
        // console.log(rand);
        axios.get(`/movie_api/${rand}`)
        .then((res) => {
            try {
                // console.log(res.data.results);
                setMovieArr(res.data.results);
                const no =  Math.floor(Math.random() * 21);
                setRanduri(res.data.results[no].backdrop_path);
                setTitle(res.data.results[no].title);
                setOverView(res.data.results[no].overview);
                setPosterUri(res.data.results[no].poster_path);
                setRelase_date(res.data.results[no].release_date);
            } catch (error) {
                setUpdateNo(updateNo + 1);
            }
            
            
        })
    },[updateNo])

    const UpdateNo = () => {
        setRanduri('');
        setPosterUri('');
        setCheck(false);
        setUpdateNo(updateNo + 1);
    }



    return(
        <>
            <NavBar/>
            <div className="h-full min-h-screen bg-gray-100 text-center font-nexon">
             <div className="container">
              <div className="text-2xl">
                <b>영화 제목 맞추기</b>
                <div className="">
                    {
                        randuri === '' ?
                        <Spinner animation="border" />
                        :
                        <LazyLoadImage src={`https://image.tmdb.org/t/p/original/${randuri}`} 
                            className="scale-100"
                            alt="이미지"
                            effect="blur"
                        />
                    }
                    
                </div>
                <div>
                    <Button variant="outline-info"
                        onClick={() => setCheck(true)}
                    >영화 확인</Button>
                </div>
                {
                    check ? 
                    <>
                        <div className="pt-2 text-xl">
                        {title}
                        </div>
                        <div className="flex items-center justify-center">
                            {
                                posterUri==='' ? 
                                <Spinner animation="border" />
                                :
                                <LazyLoadImage src={`https://image.tmdb.org/t/p/original/${posterUri}`} 
                                    className="scale-90"
                                    alt = "이미지"
                                    effect="blur"
                                />
                            }
                        </div>
                        <div>
                            첫 개봉 : {release_date}
                        </div>
                        <div className="bg-white text-sm border border-black">
                            {overview}
                        </div>
                    </>
                    :
                    <div></div>
                }

               
                <div className="text-right pt-20">
                    <Button onClick={UpdateNo}>다음 영화</Button>
                </div>
                <ShareBtns
                    newgame ={false}
                    url={""} 
                    btnTitle={""} 
                    title={`영화 제목 맞추기`}
                    urlString={`/play/guess_movie/movie`}
                    ></ShareBtns>
              </div>
             </div>
            </div>
            <Footer></Footer>
        </>

    )
       

}
export default Guess_Movie;