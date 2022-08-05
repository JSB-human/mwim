import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { AiOutlinePauseCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import YouTube, { YouTubeEvent, YouTubeProps } from "react-youtube";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";
import ShareBtns from "../../../component/shareBtns";

interface youtube_json {
    id : string;
    snippet : {
        title : string;
        resourceId :{
            videoId : string;
        }
    }
}

const Music = () => {

    const [video, setVideo] = useState<any>();
    const [showBtn, setShowBtn] = useState('hidden');
    const [idArr, setIdArr] = useState<Array<youtube_json>>([]);
    const [cnt, setCnt] = useState(Math.floor(Math.random() * 50));
    const [nowPlaying, setNowPlaying] = useState(false);
    const [region, setRegion] = useState('PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m');
    const [regionTxt, setRegionTxt] = useState('한국');
    
    useEffect(() => {
        axios.get(`/youtube_top/${region}`)
        .then((res) => {
            console.log(res);
            setIdArr(res.data.items);
        })
        .catch((err) => {
            // console.log(err);
        })

    },[region])

    const onReady:YouTubeProps['onReady'] = (e) => {
        // e.target.pauseVideo();
        setVideo(e.target);
    }

    const opts:YouTubeProps['opts'] = {
        width : '100%',
        height : '100%',
    }

    const nextMusic = () => {
        const rand = Math.floor(Math.random() * 50);
        console.log(rand);
        setNowPlaying(false);
        setShowBtn('hidden');
        setCnt(rand);
        
    }

    const onStateChange:YouTubeProps['onStateChange'] = (e) =>{
        if(e.data === YouTube.PlayerState.PLAYING){
            setNowPlaying(true);
        }else if(e.data === YouTube.PlayerState.PAUSED){
            setNowPlaying(false);
        }
    }

    const DDBtn = (title:string, rg:string) => {
        setShowBtn('hidden');
        setRegionTxt(title);
        setRegion(rg);
    }

    return(
        <>
        <NavBar></NavBar>
        <div className="h-full min-h-screen bg-gray-100">
            <div className="container">
                <div className="text-center text-3xl">
                        <b className="">음악 맞추기</b>
                </div>
                <div className="mt-4">
                
                    <DropdownButton id='dropdownBtn' title={regionTxt} className="mb-4" variant="outline-dark">
                        <Dropdown.Item onClick={() => DDBtn('한국', 'PL4fGSI1pDJn6jXS_Tv_N9B8Z0HTRVJE0m')}>한국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('글로벌', 'PL4fGSI1pDJn6puJdseH2Rt9sMvt9E2M4i')}>글로벌</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('미국', 'PL4fGSI1pDJn6O1LS0XSdF3RyO0Rq_LDeI')}>미국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('멕시코', 'PL4fGSI1pDJn6fko1AmNa_pdGPZr5ROFvd')}>멕시코</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('캐나다', 'PL4fGSI1pDJn57Q7WbODbmXjyjgXi0BTyD-')}>캐나다</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('영국', 'PL4fGSI1pDJn6_f5P3MnzXg9l3GDfnSlXa')}>영국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('스페인', 'PL4fGSI1pDJn6sMPCoD7PdSlEgyUylgxuT')}>스페인</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('일본', 'PL4fGSI1pDJn4-UIb6RKHdxam-oAUULIGB')}>일본</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('프랑스', 'PL4fGSI1pDJn50iCQRUVmgUjOrCggCQ9nR')}>프랑스</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('이탈리아', 'PL4fGSI1pDJn5JiDypHxveEplQrd7XQMlX')}>이탈리아</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('독일', 'PL4fGSI1pDJn6KpOXlp0MH8qA9tngXaUJ-')}>독일</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('호주', 'PL4fGSI1pDJn7xvYy-bP6UFeG5tITQgScd-')}>호주</Dropdown.Item>
                        {/* <Dropdown.Item onClick={() => DDBtn('한국', 'kr')}>한국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('미국', 'us')}>미국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('영국', 'gb')}>영국</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('스페인', 'es')}>스페인</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('일본', 'jp')}>일본</Dropdown.Item>
                        <Dropdown.Item onClick={() => DDBtn('프랑스', 'fr')}>프랑스</Dropdown.Item> */}
                    </DropdownButton>
                    {
                        nowPlaying? 
                        <Button onClick={() => video.pauseVideo()}
                            variant="danger"
                            className="w-full"
                        >
                            <span className="flex items-center justify-center">
                                <AiOutlinePauseCircle size={22}/>
                                정지
                            </span>
                        </Button>
                        :
                        <Button onClick={() => {
                                try {
                                    video.playVideo();
                                } catch (error) {
                                    alert('다시 시도해주세요.');
                                }
                            }
                        }
                        variant="primary"
                        className="w-full"
                        >
                            <span className="flex items-center justify-center">
                                <BsFillPlayFill size={22}/>
                                시작
                            </span>
                        </Button>
                    }
                   
                </div>
                <div className="mt-4">
                    <Button onClick={() => {setShowBtn('')}}
                        variant="success"
                        className="w-full"
                    >
                        확인
                    </Button>
                </div>
                <div className={`mt-4 ${showBtn} w-full h-80`}>
                    {
                        idArr.length === 0 ?
                        <></>
                        :
                        <YouTube 
                            videoId={idArr[cnt].snippet.resourceId.videoId}
                            onReady={onReady}
                            opts={opts}
                            onStateChange={onStateChange}
                        />
                    }
                    <Button variant="dark" className="w-full mt-4"
                        onClick={nextMusic}
                    >다음 곡</Button>
                </div>
                <div className="text-right">
                    <ShareBtns
                        newgame ={false}
                        url={""} 
                        btnTitle={""} 
                        title={`음악 맞추기`}
                        urlString={`/play/guess_music/music`}
                    ></ShareBtns>
                </div>
            </div>

        </div>
        <Footer></Footer>
        </>

    )
}

export default Music;