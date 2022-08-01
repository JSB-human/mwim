import Link from "next/link";
import { Button, ButtonGroup } from "react-bootstrap";
import { BsFillPencilFill } from "react-icons/bs";
import Post from "./post";
import Share from "./share";


const ShareBtns = (props : {newgame : boolean ,url : string , btnTitle : string , title : string, urlString : string}) => {
    const url = props.url;
    const btnTitle = props.btnTitle;
    const title = props.title;
    const newgame = props.newgame;
    const urlString = props.urlString;

    return (
        <div className="text-right mt-2">
            <ButtonGroup aria-label="btns">
                {
                    props.newgame === true ?
                    <Link href={url}>
                        <a>
                            <Button type="button" variant="success"><BsFillPencilFill className="inline-block pr-1"/><b>{btnTitle}</b></Button>
                        </a>
                    </Link>
                    :
                    <></>
                }
                    <Share></Share>
                    <Post title={title} urlString={urlString}></Post>
            </ButtonGroup>
        </div>
    )
}

export default ShareBtns;