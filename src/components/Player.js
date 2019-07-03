import React, { Component } from "react";
import ReactPlayer from "react-player";

// Components //
import Credit from "components/Credit";
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

        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='player'
                    controls
                    muted
                    config={this.playerConfig}
                    url={
                        error
                            ? "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
                            : "https://stream.mux.com/a5LFXNgjonhofUbuNQwV6OXPmnURfu21.m3u8"
                    }
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
