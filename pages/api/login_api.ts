import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

const secret = process.env.NEXTAUTH_SECRET;

const login_api = async (req : NextApiRequest, res : NextApiResponse) => {
    const token = await getToken({req, secret});
    // console.log(token);
    res.status(200).json({
        sub : token?.sub,
        name : token?.name,
        email : token?.email
    });
    res.end();
    return;
}
export default login_api;