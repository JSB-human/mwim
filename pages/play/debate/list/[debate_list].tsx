import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import Footer from "../../../../component/footer";
import NavBar from "../../../../component/navBar";

interface debate {
    title : string;
    debate_no : number;
}

const Debate_List = () => {
    const router = useRouter();
    const [debateArr, setDebateArr] = useState<Array<debate>>([]);
    const debate_list = router.query.debate_list || "0";

    useEffect(() => {
        axios.get('/spring/debate_list/1')
        .then((res) => {
            setDebateArr(res.data);
        })
    }, [])

    return (
        <>
            <NavBar/>
            <div className="h-full min-h-screen bg-gray-100">
                <div className="container p-2">
                    <div className="text-center text-2xl p-2">
                        <b className="">토론</b>
                    </div>
                    <Table striped bordered hover variant="light">
                        <thead>
                            <tr>
                                <th>제목</th>
                            </tr>
                        </thead>
                        <tbody>
                    {
                        debateArr.map((val, i) => {
                            return (
                                <Link href={`/play/debate/${val.debate_no}`} key={i}>
                                    <tr className="cursor-pointer">
                                        <td className="">
                                                <a className="text-black no-underline">
                                                    {val.title}
                                                </a>
                                        </td>
                                    </tr>
                                </Link>
                            )
                        })
                    }
                        </tbody>
                    </Table>
                </div>
            </div>
            <Footer/>
        </>
    )

}

export default Debate_List;