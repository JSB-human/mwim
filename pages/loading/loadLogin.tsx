import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import login_api from "../api/login_api";

const loadLogin = () => {
    const router = useRouter();
    const [load, setLoad] = useState(true);

    useEffect(() => {
        axios.get('/api/login_api')
        .then((res) => {
            console.log(res.data.sub)
            if(res.data.sub === undefined){
                document.location.href= "/login";
            }else{
                axios.get('/spring/account/select/' + res.data.sub)
                .then((res2) => {
                    if(res2.data === ""){
                        axios.post('/spring/account/insert',{
                            account_id : res.data.sub,
                            email : res.data.email,
                            name : res.data.name,
                        })
                        .then((res3) => {
                            console.log(res3);
                            if(res3.data === 1){
                                document.location.href= "/main";
                            }
                        })
                    }else{
                        document.location.href= "/main";
                    }
                })
            }
        })
    }, [])



    return (
        <div className="grid w-full h-screen bg-slate-200 text-center">
            {load ? <span>loading...</span> : <span>load end...</span>}

        </div>
    )

}

export default loadLogin;