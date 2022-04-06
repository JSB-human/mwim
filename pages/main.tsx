import NavBar from "../component/navBar";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

const Main = () => {
    const [hi, setHi] = useState();

    useEffect(() => {
        axios.get('/spring/hi')
        .then(res => {
            setHi(res.data);
        })
        
    })
    

    return (
        <>
            <NavBar/>
            <div className="grid grid-cols-1 text-center h-screen w-full bg-slate-200">
               
            </div>
        </>
    )
}

export default Main;