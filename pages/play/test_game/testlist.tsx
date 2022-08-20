import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";

interface testJson {
    test_no : number;
    title : string;
}

const TestList = () => {
    const [testArr, setTestArr] = useState<Array<testJson>>([]);

    useEffect(() => {
        axios.get('/spring/testGame/list')
        .then((res)=> {
            setTestArr(res.data);
        })
    },[])

    return(
        <>
        <NavBar />
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-white">테스트</h1>
                </div>
                <div className="border-4 border-green-400 bg-white p-2">
                    <div>
                        <Table >
                            <thead>
                                <tr>
                                    <th>
                                        <h3>테스트 리스트</h3>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    testArr.map((val, i) => {
                                        return (
                                            <Link href={`/play/test_game/${val.test_no}`} key={i}>
                                                <tr key={i} className="hover:cursor-pointer">
                                                    <td>
                                                        <a className="text-black decoration-white">
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
            </div>
        </div>
        <Footer />
        </>
    )
}

export default TestList;