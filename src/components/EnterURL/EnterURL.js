import React, { Component } from "react";

// Assets //
import muxLogo from "assets/mux_logo.png";
import wowzaLogo from "assets/wowza_logo.svg";

// Styles //
import "./styles.scss";

const EnterURL = ({ provider, onChange }) => (
    <div class='enter-url'>
        <img src={provider === "mux" ? muxLogo : wowzaLogo} />
        <p>Enter a {provider} stream url:</p>
        <input name='videoUrl' onChange={onChange} placeholder='Livestream URL' />
        <button>Start Streaming</button>
        <button class='flat'>Use default fallback</button>
    </div>
);

export default EnterURL;
