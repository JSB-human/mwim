import Footer from "../../../component/footer";
import NavBar from "../../../component/navBar";

const TestList = () => {

    return(
        <>
        <NavBar />
        <div className="h-full min-h-screen bg-[#049CD8] font-nexon">
            <div className="container">
                <div className="text-center">
                    <h1 className="text-white">테스트</h1>
                </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default TestList;