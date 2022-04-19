import NavBar from "../component/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Card } from "react-bootstrap";
import Link from "next/link";
import Footer from "../component/footer";

const Main = () => {

    useEffect(() => {

    })
    

    return (
        <>
            <NavBar/>
            <div className="text-center min-h-screen h-full w-full bg-slate-100">
                <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-2">
                    <div>
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>밸런스 게임</Card.Title>
                                <Card.Text>
                                    밸런스게임을 해보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="/play/balance/makebalance">
                                    <a>
                                        <Button variant="warning">만들기</Button>
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
                                    투표를 해보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
                                    </a>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                    <div >
                        <Card>
                            <Card.Img variant="top" src="" />
                            <Card.Body>
                                <Card.Title>퀴즈</Card.Title>
                                <Card.Text>
                                    퀴즈를 맞춰보세요
                                </Card.Text>
                                <Link href="/play/balance/0">
                                    <a>
                                        <Button>시작하기</Button>
                                    </a>
                                </Link>
                                <Link href="#">
                                    <a>
                                        <Button variant="warning">만들기</Button>
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