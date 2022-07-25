import axios from "axios";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { BsShareFill, BsFacebook, BsTwitter } from "react-icons/bs";
import { MdContentCopy } from "react-icons/md";
import {
    FacebookShareButton,
    TwitterShareButton
} from 'react-share';


const Share = () => {
    let currentUrl : string = '';
    if (typeof window !== "undefined") {
        currentUrl = window.location.href;
    }

    const CopyUrl = () => {
        navigator.clipboard.writeText(currentUrl);
    }

    return(
        <Dropdown>
            <Dropdown.Toggle variant="warning" id="share-dropdown">
                <BsShareFill className="inline-block pr-1"/>
                <b>공유하기</b>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item>
                    <FacebookShareButton url={currentUrl}>
                        <BsFacebook className="inline-block pr-1"/>
                        페이스북
                    </FacebookShareButton>
                </Dropdown.Item>
                <Dropdown.Item>
                    <TwitterShareButton url={currentUrl}>
                        <BsTwitter className="inline-block pr-1"/>
                        트위터
                    </TwitterShareButton>
                </Dropdown.Item>
                <Dropdown.Item onClick={CopyUrl}>
                    <MdContentCopy className="inline-block pr-1"/>
                    주소 복사
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Share;