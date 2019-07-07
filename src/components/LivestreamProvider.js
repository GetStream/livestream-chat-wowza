import React, { Component } from "react";
import LivestreamContext from "contexts/LivestreamContext";

const fallbackUrl =
    "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8";
class LivestreamProvider extends Component {
    state = {
        error: false,
        handleError: this.handleError.bind(this),
        setVideo: this.setVideo.bind(this),
        toggleProvider: this.toggleProvider.bind(this),
        useFallback: this.useFallback.bind(this),
        videoUrl: "",
    };

    handleError() {
        this.setState({
            error: true,
        });
    }

    toggleProvider() {
        this.setState({
            error: false,
            videoUrl: "",
        });
    }

    setVideo(url) {
        this.setState({
            videoUrl: url,
        });
    }

    useFallback() {
        this.setState({
            videoUrl: fallbackUrl,
        });
    }

    render() {
        const { children } = this.props;
        return <LivestreamContext.Provider value={this.state}>{children}</LivestreamContext.Provider>;
    }
}

export default LivestreamProvider;
