import React from "react";

// Assets //
import wowzaLogo from "../assets/wowza_logo.svg";
import streamLogo from "../assets/stream_logo.svg";

const Credit = () => (
    <p className='credit'>
        Powered by{" "}
        <span>
            <a target='_blank' rel='noopener noreferrer' href='https://www.wowza.com/'>
                <img src={wowzaLogo} />
            </a>
        </span>{" "}
        &{" "}
        <span>
            <a target='_blank' rel='noopener noreferrer' href='https://getstream.io'>
                <img src={streamLogo} width={40} height={20} />
            </a>
        </span>
    </p>
);

export default Credit;
