import React from "react";

// Contexts //
import LivestreamContext from "contexts/LivestreamContext";

// Assets //
import wowzaLogo from "assets/wowza_logo.svg";
import muxLogo from "assets/mux_logo.png";
import streamLogo from "assets/stream_logo.svg";

const Credit = ({ provider }) => (
    <p className='credit' style={{ color: "white" }}>
        Powered by{" "}
        <span>
            <a
                target='_blank'
                rel='noopener noreferrer'
                href={provider === "mux" ? "https://mux.com" : "https://www.wowza.com/"}
            >
                <img src={provider === "mux" ? muxLogo : wowzaLogo} />
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

export default () => (
    <LivestreamContext.Consumer>{({ provider }) => <Credit provider={provider} />}</LivestreamContext.Consumer>
);
