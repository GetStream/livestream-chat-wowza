import React, { Component } from "react";
import LivestreamContext from "contexts/LivestreamContext";

const urls = {
    mux: {
        fallback:
            "https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8",
        video: "",
    },
    wowza: {
        fallback: "http://184.72.239.149/vod/smil:BigBuckBunny.smil/playlist.m3u8",
        video: "",
    },
};

class LivestreamProvider extends Component {
    state = {
        provider: "mux",
        toggleProvider: this.toggleProvider.bind(this),
        videoUrl: urls.mux.videoUrl,
        fallbackUrl: urls.mux.fallbackUrl,
    };

    toggleProvider() {
        const provider = this.state.provider === "mux" ? "wowza" : "mux";
        this.setState({
            provider,
            videoUrl: urls[provider].video,
            fallbackUrl: urls[provider].fallback,
        });
    }

    render() {
        const { children } = this.props;
        return <LivestreamContext.Provider value={this.state}>{children}</LivestreamContext.Provider>;
    }
}

export default LivestreamProvider;
