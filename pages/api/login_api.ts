import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const login_api = async (req : NextApiRequest, res : NextApiResponse) => {
    const token = await getToken({req, secret});

    res.end();
    
    return token?.sub;
}

export default login_api;
