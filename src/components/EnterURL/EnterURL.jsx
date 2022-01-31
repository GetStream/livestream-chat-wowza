import React, { Component } from "react";

// Assets //
import wowzaLogo from "../../assets/wowza_logo.svg";

// Styles //
import "./styles.scss";

const EnterURL = ({ onChange, setVideo, useFallback }) => (
    <div className='enter-url'>
        <img src={wowzaLogo} />
        <p>Enter a Wowza stream url:</p>
        <input name='videoUrl' onChange={onChange} placeholder='Livestream URL' />
        <button className='primary' onClick={setVideo}>
            Start Streaming
        </button>
        <button className='primary flat' onClick={useFallback}>
            Use default fallback
        </button>
    </div>
);

export default EnterURL;
