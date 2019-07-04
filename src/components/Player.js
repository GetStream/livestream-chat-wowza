import React, { Component } from "react";
import ReactPlayer from "react-player";

// Contexts //
import LivestreamContext from "contexts/LivestreamContext";

// Components //
import Credit from "components/Credit";
import NotStreamingIcon from "components/Icons/not_streaming";
import EnterURL from "components/EnterURL";

class Player extends Component {
    static contextType = LivestreamContext;

    constructor(props) {
        super(props);

        this.state = {
            url: "",
        };
    }

    get playerConfig() {
        return {
            file: {
                forceHLS: true,
            },
        };
    }

    handleInputChange = (e) => {
        this.setState({
            url: e.target.value,
        });
    };

    setVideoURL = () => {
        const { url } = this.state;
        this.context.setVideo(url);
    };

    render() {
        const { error, provider, handleError, videoUrl, useFallback } = this.context;
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

        if (!videoUrl) {
            return (
                <EnterURL
                    provider={provider}
                    onChange={this.handleInputChange}
                    setVideo={this.setVideoURL}
                    useFallback={useFallback}
                />
            );
        }

        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='player'
                    controls
                    muted
                    config={this.playerConfig}
                    url={videoUrl}
                    playing
                    width='100%'
                    height='100%'
                    onError={handleError}
                />
                <Credit />
            </div>
        );
    }
}

export default Player;
