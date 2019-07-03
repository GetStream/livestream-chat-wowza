import React from "react";

// Assets //
import muxLogo from "assets/mux_logo.png";

// Components //
import Logo from "components/Logo";

const Credit = () => (
    <p className='credit' style={{ color: "white" }}>
        Powered by{" "}
        <span>
            <img src={muxLogo} />
        </span>{" "}
        &{" "}
        <span>
            <Logo fill='#2F7DEB' width={40} height={20} />
        </span>{" "}
        Chat
    </p>
);

export default Credit;
