import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import Footer from "../../component/footer";
import NavBar from "../../component/navBar";


const MyPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return(
        <>
            <NavBar></NavBar>
            <div className="text-center min-h-screen h-full w-full bg-slate-100">
                <div className="container mx-auto px-4 grid grid-cols-1 gap-2">
                    <div className="bg-white mt-2 rounded border-zinc-300 border">
                        <p>이름</p>
                        <button onClick={()=>signOut()}>로그아웃</button>
                    </div>
                    <div className="bg-white mt-2 rounded border-zinc-300 border">
                        내 세상을 만들어보세요
                    </div>
                </div>

            </div>
            <Footer></Footer>
        </>
    )

}


export default MyPage;