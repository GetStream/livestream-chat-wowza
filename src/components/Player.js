import React, { Component } from "react";
import ReactPlayer from "react-player";

// Components //
import Credit from "components/Credit";
import Logo from "components/Logo";
import NotStreamingIcon from "components/Icons/not_streaming";

class Player extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: false,
        };

        this.handleError = this.handleError.bind(this);
    }

    get playerConfig() {
        return {
            file: {
                forceHLS: true,
            },
        };
    }

    handleError() {
        this.setState({
            error: true,
        });
    }

    render() {
        const { error } = this.state;

        if (error) {
            return (
                <div className='player-wrapper'>
                    <div className='player-error'>
                        <NotStreamingIcon width={64} height={64} fill='#fa4659' />
                        <p style={{ color: "white" }}>No Longer Streaming</p>
                        <Credit />
                    </div>
                </div>
            );
        }
        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='player'
                    controls
                    muted
                    config={this.playerConfig}
                    url='https://stream.mux.com/a5LFXNgjonhofUbuNQwV6OXPmnURfu21.m3u8'
                    playing
                    width='100%'
                    height='100%'
                    onError={this.handleError}
                />
                <Credit />
            </div>
        );
    }
}

export default Player;
