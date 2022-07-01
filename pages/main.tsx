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
            <div className="text-center min-h-screen h-full w-full bg-gray-100 pt-2">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>밸런스 게임</Card.Title>
                                <Card.Text>
                                    밸런스게임을 해보세요.
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a> 
                                        <Button>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/balance/makebalance">
                                    <a>
                                        <Button variant="success">
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/balance/list/balance_list">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>투표</Card.Title>
                                <Card.Text>
                                    투표를 해보세요.
                                </Card.Text>
                                <Link href="/play/vote/0">
                                    <a> 
                                        <Button>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/vote/makevote">
                                <a>
                                        <Button variant="success">
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/balance/list/balance_list">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>고급 유머</Card.Title>
                                <Card.Text>
                                    재밌는 유머를 공유하세요.
                                </Card.Text>
                                <Link href="/play/joke/0">
                                    <a> 
                                        <Button>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/joke/makejoke">
                                    <a>
                                        <Button variant="success">
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
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
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>행맨</Card.Title>
                                <Card.Text>
                                    행맨을 살려주세요.
                                </Card.Text>
                                <Link href="/play/hangman/hangman">
                                    <a> 
                                        <Button>
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
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>토론</Card.Title>
                                <Card.Text>
                                    토론을 해보세요.
                                </Card.Text>
                                <Link href="/play/debate/0">
                                    <a> 
                                        <Button>
                                            <span className="flex">
                                                <BsFillPlayFill size={22}/>
                                                무작위
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="/play/debate/makedebate">
                                    <a>
                                        <Button variant="success">
                                            <span className="flex">
                                                <IoMdCreate size={20}/>
                                                만들기
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="danger">
                                            <span className="flex">
                                                <AiOutlineUnorderedList size={20}/>
                                                목록
                                            </span>
                                        </Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>코인 가격 맞추기</Card.Title>
                                <Card.Text>
                                    현재 코인 가격을 맞춰보세요.
                                </Card.Text>
                                <Link href="/play/coin/guessCoin">
                                    <a> 
                                        <Button>
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
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>영화 퀴즈</Card.Title>
                                <Card.Text>
                                    사진을 보고 제목을 맞춰보세요.
                                </Card.Text>
                                <Link href="/play/guess_movie/movie">
                                    <a> 
                                        <Button>
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
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>책 가격 맞추기</Card.Title>
                                <Card.Text>
                                    책 가격를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/guess_book/book">
                                    <a> 
                                        <Button>
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
                </div>
                
            </div>
            <Footer></Footer>
        </>
    )
}

export default Main;