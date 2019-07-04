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
        const { provider, videoUrl, fallbackUrl } = this.context;
        if (error) {
            return null;
        }

        if (!videoUrl) {
            return <EnterURL provider={provider} onChange={this.handleInputChange} />;
        }

        return (
            <div className='player-wrapper'>
                <ReactPlayer
                    className='player'
                    controls
                    muted
                    config={this.playerConfig}
                    url={error ? fallbackUrl : videoUrl}
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
