import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Pie } from "react-chartjs-2";
import Footer from "../../../../component/footer";
import GameReply from "../../../../component/game_reply";
import NavBar from "../../../../component/navBar";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';




const Balance_Result = () => {
    const router = useRouter();
    const vote_result = router.query.result;


    const [title, setTitle] = useState('');
    const [vote, setVote] = useState([]);
    const [counts, setCounts] = useState<number[]>([]);
    const [subjects, setSubjects] = useState<String[]>([]);

    useEffect(() => {
        if(vote_result !== undefined){
            axios.get('/spring/vote/view/no/' + vote_result)
            .then((res) => {
                setTitle(res.data.title);
                setVote(JSON.parse(res.data.vote));

                let countArr: number[] = [];
                let subjectArr: String[] = [];
                vote.map((val : {count : number, subject : String}, i) => {
                    countArr.push(val.count);
                    subjectArr.push(val.subject)
                })
                setCounts(countArr);
                setSubjects(subjectArr);
            })
        }
    }, [vote,vote_result])

    ChartJS.register(ArcElement, Tooltip, Legend);
    let customLabels = subjects.map((label,index) =>{   
        const sum = counts.reduce((a,b) => (a + b));
        const percent = parseFloat((counts[index]/sum*100).toFixed(1));
        return(
            `${label} (${percent}%)`
        )
    })
    const pieData = {
        labels : customLabels,
        datasets : [
            {
                label : '투표 결과',
                data : counts,
                backgroundColor : [
                    'rgb(96, 165, 250)',
                    'rgb(168, 85, 247)',
                    'rgb(248, 113, 113)',
                    'rgb(253, 230, 138)',
                    'rgb(110, 231, 183)',
                ],
                borderWidth: 1,
            }
        ]
    }

        
    return (
        <>
        <NavBar></NavBar>
        <div className="h-full min-h-screen bg-slate-100 font-nexon">
            <div className="container mx-auto px-4 text-center">
                <div className="text-3xl">
                    <b>결과</b>
                    <hr></hr>
                </div>
                <div className="text-3xl">
                    {title}
                </div>
                <div className="flex justify-center">
                    <div className="w-1/2">
                        <Pie 
                            options={{
                                animation : false,
                                //@ts-ignore
                                legend: { display: true, position: "right" },
                                datalabels: {
                                    display: true,
                                    color: "white",
                                },
                                tooltips: {
                                    backgroundColor: "#5a6e7f",
                                },
                            }}
                            data={pieData}
                            width={300}
                            height={500}
                        />
                    </div>
                </div>
                <div className="text-right">
                    <Link href="/main" passHref>
                        <Button variant="primary" type="button" size="sm">
                            <a>
                                다른 게임 하러가기
                            </a>
                        </Button>
                    </Link>
                    <Link href="/play/vote/0" passHref>
                        <Button variant="danger" type="button" size="sm">
                            <a>
                                다음
                            </a>
                        </Button>
                     </Link>
                </div>
                
                <GameReply gameType={2}></GameReply>
               

            </div>
        </div>
        <Footer></Footer>
        </>

    )
}

export default Balance_Result;