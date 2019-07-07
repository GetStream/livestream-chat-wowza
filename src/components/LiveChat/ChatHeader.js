import React, { Component } from "react";

// Assets //
import wowzaLogo from "assets/wowza_logo.svg";

class ChatHeader extends Component {
    render() {
        const { data } = this.props;
        return (
            <div className='chat-header'>
                <div className='avatar-wrapper'>
                    <img src={wowzaLogo} />
                </div>
                <div>
                    <p className='chat-name'>{data.name}</p>
                    <span className='str-chat__header-livestream-left--livelabel'>Live</span>
                </div>
                <span style={{ flex: "1 1 auto" }} />
            </div>
        );
    }
}

export default ChatHeader;
