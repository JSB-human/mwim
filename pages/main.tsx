import NavBar from "../component/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Footer from "../component/footer";
import {BsFillPlayFill} from "react-icons/bs";
import {IoMdCreate} from "react-icons/io";
import {AiOutlineUnorderedList} from "react-icons/ai";

const Main = () => {

    useEffect(() => {
    })
    

    return (
        <>
            <NavBar/>
            <div className="text-center min-h-screen h-full w-full pt-2 pb-2 font-nexon">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/smile-hand-drawn-emoticon.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>행맨</Card.Title>
                                <Card.Text>
                                    행맨을 살려주세요.
                                </Card.Text>
                                <Link href="/play/hangman/hangman">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/bitcoin.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>코인 가격 예측</Card.Title>
                                <Card.Text>
                                    현재 코인 가격을 예측하세요.
                                </Card.Text>
                                <Link href="/play/coin/guessCoin">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/video-camera.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>영화 퀴즈</Card.Title>
                                <Card.Text>
                                    사진을 보고 제목을 맞춰보세요.
                                </Card.Text>
                                <Link href="/play/guess_movie/movie">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/won.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>상품 최저가 맞추기</Card.Title>
                                <Card.Text>
                                    최저가를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/guess_price/price">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/music.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>음악 맞추기</Card.Title>
                                <Card.Text>
                                    전주를 듣고 음악을 맞춰보세요.
                                </Card.Text>
                                <Link href="/play/guess_music/music">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/cutlery.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>메뉴 정하기</Card.Title>
                                <Card.Text>
                                    오늘은 뭐 먹지...
                                </Card.Text>
                                <Link href="/play/pick_menu/meal">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div className="col-span-2">
                        <p>백엔드 프리티어 만료로 서버 종료</p>
                    </div>
                    <div>
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/test.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title className="line-through">테스트</Card.Title>
                                <Card.Text>
                                    테스트를 즐겨보세요.
                                </Card.Text>
                                {/* <Link href="/play/test_game/0">
                                    <a>  */}
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/test_game/maketest">
                                    <a> */}
                                        <Button style={{backgroundColor : "#E52521"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/test_game/testlist">
                                    <a> */}
                                        <Button style={{backgroundColor : "#43B047"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/vs.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title className="line-through">밸런스 게임</Card.Title>
                                <Card.Text>
                                    밸런스게임을 해보세요.
                                </Card.Text>
                                {/* <Link href="/play/balance/0">
                                    <a>  */}
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/balance/makebalance">
                                    <a> */}
                                        <Button style={{backgroundColor : "#E52521"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/balance/list/balance_list">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/archive.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title className="line-through">투표</Card.Title>
                                <Card.Text>
                                    투표를 해보세요.
                                </Card.Text>
                                {/* <Link href="/play/vote/0">
                                    <a>  */}
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/vote/makevote">
                                <a> */}
                                    <Button style={{backgroundColor : "#E52521"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/balance/list/balance_list">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/laugh.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title className="line-through">고급 유머</Card.Title>
                                <Card.Text>
                                    재밌는 유머를 공유하세요.
                                </Card.Text>
                                {/* <Link href="/play/joke/0">
                                    <a>  */}
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/joke/makejoke">
                                    <a> */}
                                        <Button style={{backgroundColor : "#E52521"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/joke/list/joke_list">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/discussion.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title className="line-through">토론</Card.Title>
                                <Card.Text>
                                    토론을 해보세요.
                                </Card.Text>
                                {/* <Link href="/play/debate/0">
                                    <a>  */}
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/debate/makedebate">
                                    <a> */}
                                        <Button style={{backgroundColor : "#E52521"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                                {/* <Link href="/play/debate/list/1">
                                    <a> */}
                                        <Button style={{backgroundColor : "#43B047"}} variant="outline-light" disabled>
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    {/* </a>
                                </Link> */}
                            </Card.Body>
                        </Card>
                    </div>
                    {/* <div >
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/front-of-bus.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>대중교통 정보</Card.Title>
                                <Card.Text>
                                    버스, 지하철 길 찾기
                                </Card.Text>
                                <Link href="#">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div> */}
                    {/* <div>
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/vacations.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>여행지 찾기</Card.Title>
                                <Card.Text>
                                    여행을 떠나볼까요?
                                </Card.Text>
                                <Link href="#">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                플레이
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div> */}
                    <div>
                        <Card>
                            <div className="p-2 flex items-center justify-center ">
                                <Card.Img variant="top" src="/imgs/engineer.png" className="h-20 w-auto"/>
                            </div>
                            <Card.Body>
                                <Card.Title>추가 예정</Card.Title>
                                <Card.Text>
                                    새로운 컨텐츠 준비중
                                </Card.Text>
                                <Link href="#">
                                    <a> 
                                        <Button style={{backgroundColor : "#049CD8"}} variant="outline-light">
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                예정
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                
            </div>
            <Footer></Footer>
        </>
    )
}

export default Main;