import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEventHandler, SetStateAction, useCallback, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useInView } from "react-intersection-observer";
import Footer from "../../../../component/footer";
import GameReply from "../../../../component/game_reply";
import NavBar from "../../../../component/navBar";

interface balance_game {
    game_no : number;
    maker : string;
    title0 : string;
    title1 : string;
    title2 : string;
    pick1 : number;
    pick2 : number;
}

const Balance_List = () => {
    const router = useRouter();
    const [ref, inView] = useInView();
    const [games, setGames] = useState<Array<balance_game>>();
    const [loading, setLoading] = useState(false);
    const [newGames, setNewGames] = useState<Array<balance_game>>();

    useEffect(() => {
        axios.get('/spring/play/balance/list/first')
        .then((res) => {
            setGames(res.data);
            setNewGames(res.data);
            // console.log(res.data);
            //@ts-ignore
            // setLastNo(7);
        })
    }, [])

    const getItems = (last_game_no : number) => {
        setLoading(true);
        axios.get(`/spring/play/balance/list/${last_game_no}`)
        .then((res) => {
            // console.log(res.data);
            let newArr = games?.concat(res.data);
            setGames(newArr);
            setNewGames(res.data);
        })
        setLoading(false);
    }


    useEffect(() => {
        if(inView && !loading) {
            if(newGames !== undefined){
                //@ts-ignore
                // console.log(newGames[newGames?.length-1].game_no);
                let last_game_no = newGames[newGames?.length-1].game_no;
                if(newGames[newGames?.length-1].game_no !== 1){
                    getItems(last_game_no);
                }
            }
        }
    }, [inView, loading])
    
    const gamesArr = games?.map((val, i) => {
        return(

            <div key={i} className="row bg-white m-2 p-2 text-center border border-black">
                <div className="col-12 text-xl border-b border-b-slate-300"><b>{val.title0}</b></div>
                <div className="col-5">{val.title1}</div>
                <div className="col-2"><b>VS</b></div>
                <div className="col-5">{val.title2}</div>
                <Link href={`/play/balance/${val.game_no}`}>
                    <a>
                        <Button className="col-12" variant="outline-primary">시작</Button>
                    </a>
                </Link>
               
            </div>
        )
    })
        
    return (
        <>
        <NavBar></NavBar>
        <div className="h-full min-h-screen bg-white">
            <div className="container mx-auto px-4" >
                <div>
                    {gamesArr}
                </div>
                <div ref={ref}></div>
            </div>
        </div>
        <Footer></Footer>
        </>

    )
}

export default Balance_List;