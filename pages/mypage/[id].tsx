import { useRouter } from "next/router";
import NavBar from "../../component/navBar";


const MyPage = () => {
    const router = useRouter();
    const {id} = router.query;

    return(
        <>
            <NavBar></NavBar>
            <div className="h-screen bg-slate-200">
                <div className="grid grid-cols-1 place-items-center">
                    <div className="w-11/12 lg:w-1/2 md:w-4/6 sm:w-11/12 text-center bg-white mt-5 rounded border-zinc-300 border">
                        <p>이름</p>
                        asdf
                    </div>
                    <div className="w-11/12 lg:w-1/2 md:w-4/6 sm:w-11/12 text-center bg-white mt-5 rounded border-zinc-300 border">
                        내 세상을 만들어보세요
                    </div>
                </div>

            </div>
        </>
    )

}


export default MyPage;