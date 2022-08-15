import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";

const MakeTest = () => {

    return(
        <>
        <NavBar />
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-white">테스트 만들기</h1>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default MakeTest;