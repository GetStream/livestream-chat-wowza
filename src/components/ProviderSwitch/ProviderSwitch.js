import React from "react";
import LivestreamContext from "contexts/LivestreamContext";
import Switch from "components/Switch";

// Assets //
import muxLogo from "assets/mux_logo.png";
import wowzaLogo from "assets/wowza_logo.svg";

// Styles //
import "./styles.scss";

const ProviderSwitch = ({ provider, toggleProvider }) => (
    <div className='provider-switch'>
        <img src={muxLogo} />
        <Switch checked={provider === "wowza"} onChange={toggleProvider} />
        <img src={wowzaLogo} />
    </div>
);

export default () => (
    <LivestreamContext.Consumer>{(context) => <ProviderSwitch {...context} />}</LivestreamContext.Consumer>
);
