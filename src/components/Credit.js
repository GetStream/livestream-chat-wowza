import React from "react";

// Assets //
import muxLogo from "assets/mux_logo.png";

// Components //
import Logo from "components/Logo";

const Credit = () => (
    <p className='credit' style={{ color: "white" }}>
        Powered by{" "}
        <span>
            <a target='_blank' rel='noopener noreferrer' href='https://mux.com'>
                <img src={muxLogo} />
            </a>
        </span>{" "}
        &{" "}
        <span>
            <a target='_blank' rel='noopener noreferrer' href='https://getstream.io'>
                <Logo fill='#2F7DEB' width={40} height={20} />
            </a>
        </span>
    </p>
);

export default Credit;
