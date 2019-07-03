import React, { Component } from "react";
import Switch from "components/Switch";
import LivestreamContext from "contexts/LivestreamContext";

class ChatHeader extends Component {
    static contextType = LivestreamContext;

    render() {
        const { data } = this.props;
        const { provider, toggleProvider } = this.context;
        return (
            <div className='chat-header'>
                <div className='avatar-wrapper'>
                    <img src={data.image} />
                </div>
                <div>
                    <p className='chat-name'>{data.name}</p>
                    <span className='str-chat__header-livestream-left--livelabel'>Live</span>
                </div>
                <span style={{ flex: "1 1 auto" }} />
                <Switch checked={provider === "wowza"} onChange={toggleProvider} />
            </div>
        );
    }
}

export default ChatHeader;
