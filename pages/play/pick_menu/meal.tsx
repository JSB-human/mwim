import { ChangeEvent, useEffect, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import Footer from "../../../component/footer";
import KakaoMap from "../../../component/kakaomap";
import NavBar from "../../../component/navBar";
import ShareBtns from "../../../component/shareBtns";

const Meal = () => {
    const [time, setTime] = useState('');
    const [step, setStep] = useState('place');
    const [choose, setChoose] = useState('');
    const [mode , setMode] = useState(0);
    const [winner, setWinner] = useState('');
    const [place, setPlace] = useState('');
    // useEffect(() => {
    //     console.log(choose, step);
    // }, [choose, step])

    const onChange = (e:ChangeEvent<HTMLInputElement>, mode:number) => {
        setChoose(e.target.value);
        setMode(mode);

    }

    const nextBtn = () => {
        if(mode === 0){
            setStep(choose);
        }else if(mode === 1){
            setStep('final');
            setWinner(choose);
        }
    }

    const checkbox = (name:string, labels:Array<string>, num:number) => {
        return (
            labels.map((val, i) => {
                return (
                    <Form.Check
                        key={i}
                        type={'radio'}
                        name={name}
                        label={val}
                        id={val}
                        value={val}
                        onChange={(e)=>onChange(e, num)}
                    />
                )
            })
            
        )
    }

    const stepComponent = () => {
        switch(step){
            case 'place' : 
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>식사하실 지역을 입력해주세요.</h3>
                        <FloatingLabel controlId="floatingInput" label="장소">
                            <Form.Control type="text" className="border border-black w-full h-10"
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                placeholder="서울"
                                onKeyDown={(e)=>{
                                    if(e.key === 'Enter'){
                                        setChoose('first');
                                        setStep('first');
                                    }
                                }}
                            />
                        </FloatingLabel>
                        <Button variant="outline-dark"
                            onClick={() => {
                                setChoose('first');
                                setStep('first');
                            }}
                        >다음</Button>
                    </div>
                )

            case 'first' :
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>당신의 성별은?</h3>
                        <Form.Check
                            type={'radio'}
                            name="first"
                            label="남성"
                            id='male'
                            value={'male'}
                            checked={choose === 'male'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="first"
                            label="여성"
                            id='female'
                            value={'female'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="first"
                            label="성별은 메뉴와 무관"
                            id='day'
                            value={'day'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Button variant="outline-dark"
                            onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case 'male' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>아래 음식 중 땡기는 음식이 있나요?</h3>
                        <Form.Check
                            type={'radio'}
                            name="male"
                            label="국밥"
                            id='국밥'
                            value={'국밥'}
                            checked={choose === '국밥'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                         <Form.Check
                            type={'radio'}
                            name="male"
                            label="제육볶음"
                            id='제육볶음'
                            value={'제육볶음'}
                            checked={choose === '제육볶음'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                         <Form.Check
                            type={'radio'}
                            name="male"
                            label="돈까스"
                            id='돈까스'
                            value={'돈까스'}
                            checked={choose === '돈까스'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                          <Form.Check
                            type={'radio'}
                            name="male"
                            label="아니오"
                            id='day'
                            value={'day'}
                            checked={choose === 'day'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case 'female' :
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>아래 음식 중 땡기는 음식이 있나요?</h3>
                        <Form.Check
                            type={'radio'}
                            name="female"
                            label="마라탕"
                            id='마라탕'
                            value={'마라탕'}
                            checked={choose === '마라탕'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="female"
                            label="떡볶이"
                            id='떡볶이'
                            value={'떡볶이'}
                            checked={choose === '떡볶이'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="female"
                            label="곱창"
                            id='곱창'
                            value={'곱창'}
                            checked={choose === '곱창'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="female"
                            label="닭발"
                            id='닭발'
                            value={'닭발'}
                            checked={choose === '닭발'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                         <Form.Check
                            type={'radio'}
                            name="female"
                            label="아니요"
                            id='day'
                            value={'day'}
                            checked={choose === 'day'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )

            case '국밥' : 
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>지금 먹을 뜨끈한 국밥을 고르세요.</h3>
                         {
                            checkbox(
                                "국밥",
                                ['순대국밥','소머리국밥',"돼지국밥","설렁탕",'선지해장국','뼈다귀 해장국','콩나물 해장국'],
                               1
                            )
                        }
                        <Button variant="outline-dark"
                            onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case 'day' : 
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>무엇을 드시나요?</h3>
                        <Form.Check
                            type={'radio'}
                            name="day"
                            label="아침"
                            id="breakfast"
                            value={"breakfast"}
                            checked={choose === 'breakfast'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="day"
                            label="점심"
                            id="lunch"
                            value={"lunch"}
                            checked={choose === 'lunch'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="day"
                            label="저녁"
                            id="dinner"
                            value={"dinner"}
                            checked={choose === 'dinner'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        {/* <Form.Check
                            type={'radio'}
                            name="day"
                            label="간식"
                            id="snack"
                            value={"snack"}
                            checked={choose === 'snack'}
                            onChange={(e)=>onChange(e, 0)}
                        /> */}
                        <Form.Check
                            type={'radio'}
                            name="day"
                            label="야식"
                            id="midnight"
                            value={"midnight"}
                            checked={choose === 'midnight'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >
                            다음
                        </Button>
                    </div>
                )
            case 'breakfast' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>아침은 역시...</h3>
                        <Form.Check
                            type={'radio'}
                            name="breakfast"
                            label="한식"
                            id="breakfastkFood"
                            value={"breakfastkFood"}
                            checked={choose === 'breakfastkFood'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="breakfast"
                            label="빵식"
                            id="bread"
                            value={"bread"}
                            checked={choose === 'bread'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="breakfast"
                            label="과일"
                            id="과일"
                            value={"과일"}
                            checked={choose === '과일'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case 'breakfastkFood' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>오늘 아침은 뭐 먹지?</h3>
                        <Form.Check
                            type={'radio'}
                            name="breakfastkFood"
                            label="죽"
                            id="죽"
                            value={"죽"}
                            checked={choose === '죽'}
                            onChange={(e)=>onChange(e, 1)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="breakfastkFood"
                            label="국"
                            id="국"
                            value={"국"}
                            checked={choose === '국'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        <Form.Check
                            type={'radio'}
                            name="breakfastkFood"
                            label="찌개"
                            id="찌개"
                            value={"찌개"}
                            checked={choose === '찌개'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                         <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '국' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>국은 역시</h3>
                        {
                            checkbox(
                                "국",
                                ['닭개장','미역국',"사골국","시래깃국",'떡국','우거짓국','수제비'],
                                1
                            )
                        }
                         <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '찌개' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>보글보글 찌개</h3>
                        {
                            checkbox(
                                "찌개",
                                ['김치찌개','된장찌개','비지찌개',"청국장","매운탕",'고추장찌개','순두부찌개','부대찌개'],
                                1
                            )
                        }
                         <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )

            case 'bread' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>빵이 좋아.</h3>
                        {
                            checkbox(
                                "bread",
                                ['샌드위치',"빵","햄버거"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )

            case 'lunch' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>점심은 뭐 먹지?</h3>
                        {
                            checkbox(
                                "lunch",
                                ['국물요리','튀김',"면","밥"],
                                0
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '국물요리' : 
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>국물이 땡기는데...</h3>
                        <Form.Check
                             type={'radio'}
                             name="국물요리"
                             label="찌개"
                             id="찌개"
                             value={"찌개"}
                             checked={choose === '찌개'}
                             onChange={(e)=>onChange(e, 0)}
                         />
                         <Form.Check
                             type={'radio'}
                             name="국물요리"
                             label="국밥"
                             id="국밥"
                             value={"국밥"}
                             checked={choose === '국밥'}
                             onChange={(e)=>onChange(e, 0)}
                         />
                        {
                            checkbox(
                                "국물요리",
                                ['해장국',"설렁탕","삼계탕"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '튀김' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>바삭한 튀김이 좋아.</h3>
                        {
                            checkbox(
                                "튀김",
                                ['돈까스',"생선까스","텐동","치킨","탕수육","분식"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '면' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>면이 땡기는데...</h3>
                        <Form.Check
                            type={'radio'}
                            name="면"
                            label="국수"
                            id="국수"
                            value={"국수"}
                            checked={choose === '국수'}
                            onChange={(e)=>onChange(e, 0)}
                        />
                        {
                            checkbox(
                                "면",
                                ['냉면',"짜장면","짬뽕","우동","파스타","라멘","팟타이"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '국수' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>국수는 역시...</h3>
                        {
                            checkbox(
                                "국수",
                                ['막국수',"콩국수","칼국수","잔치국수","쌀국수","장터국수","잔치국수"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case '밥' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>밥이 땡기는데...</h3>
                        {
                            checkbox(
                                "밥",
                                ['백반',"덮밥","볶음밥","초밥","쌈밥","비빔밥","김밥"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )

            case 'dinner' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>저녁식사는...</h3>
                        {
                            checkbox(
                                "dinner",
                                ['닭',"소","돼지","국밥","탕","찌개","국","찜"],
                                0
                            )
                        }
                         {
                            checkbox(
                                "dinner",
                                ['분식',"회","피자","중국집","햄버거","뷔페","돈까스","전골"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
            case "돼지":
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>꿀꿀!!</h3>
                        {
                            checkbox(
                                "돼지",
                                ['삼겹살',"족발","바베큐","돼지껍데기","보쌈","막창","수육","편육"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                </div>
                )

            case "닭":
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>꼬꼬댁!!</h3>
                        {
                            checkbox(
                                "닭",
                                ['치킨',"찜닭","닭발","백숙","닭곰탕","닭볶음탕","닭갈비","닭꼬치"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                </div>
                )
            case "소":
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>음메~~</h3>
                        {
                            checkbox(
                                "소",
                                ['소고기',"스테이크","소곱창","소불고기","규동"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                </div>
                )
            case "탕":
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>탕탕탕...</h3>
                        {
                            checkbox(
                                "탕",
                                ['해물탕',"매운탕","새우탕","추어탕","홍합탕","감자탕"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                </div>
                )
            case "찜":
                return(
                    <div className="text-left space-y-4 font-bold">
                        <h3>푹 찐...</h3>
                        {
                            checkbox(
                                "찜",
                                ['해물찜',"꽃게찜","아구찜","명태찜","갈비찜","찜닭"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                </div>
                )
            // case 'snack' :
            //     return (
            //         <div className="text-left space-y-4 font-bold">
            //             <h3>간식</h3>

            //             <Button variant="outline-dark"
            //                onClick={() => nextBtn()}
            //             >다음</Button>
            //         </div>
            //     )
            case 'midnight' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>야식</h3>
                        {
                            checkbox(
                                "찜",
                                ['치킨',"햄버거","피자","족발","닭발","곱창","떡볶이"],
                                1
                            )
                        }
                        <Button variant="outline-dark"
                           onClick={() => nextBtn()}
                        >다음</Button>
                    </div>
                )
                

            case 'final' :
                return (
                    <div className="text-left space-y-4 font-bold">
                        <h3>최종 선택</h3>
                        {choose}
                        <div className="font-normal">
                            <KakaoMap place={place} food={winner} ></KakaoMap>
                        </div>
                        <div className="text-right">
                            <Button
                            variant="outline-dark" 
                            onClick={() => {
                                setStep('place');
                                setChoose('');
                                setMode(0);
                                setWinner('');
                                setPlace('');
                            }}>
                                다시 고르기
                            </Button>
                        </div>
                        <ShareBtns
                        newgame ={false}
                        url={""} 
                        btnTitle={""} 
                        title={`메뉴 정하기`}
                        urlString={`/play/pick_menu/meal`}
                        ></ShareBtns>
                    </div>
                )

        }
    }

    return (
        <>
        <NavBar></NavBar>
        <div className="h-full min-h-screen bg-gray-100 text-center  font-nexon">
             <div className="container">
                <div className="text-2xl">
                    <b>메뉴 정하기</b>
                </div>
                <div className="bg-white p-4 mt-2 rounded-lg">
                   {stepComponent()}
                </div>
            </div>
        </div>

        <Footer></Footer>
        </>
    )
}

export default Meal;