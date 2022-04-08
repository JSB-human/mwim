import axios from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import Router from "next/router";

const secret = process.env.NEXTAUTH_SECRET;

const login_api = async (req : NextApiRequest, res : NextApiResponse) => {
    const token = await getToken({req, secret});

    console.log(token);

    // if(token){
    //     axios.post('/spring/account/insert',{
    //         account_id : 'test',
    //         email : 'test',
    //         pwd : 'test',
    //         name : 'test',
    //         social : 'test',
    //     })
    //     console.log("됨");
    //     Router.replace('/main');
    // }else{
    //     console.log("안됨");
    //     Router.replace('/login');
    // }

    res.end();
    
    return token?.sub;
}

export default login_api;
