import React, { Component } from "react";
import LivestreamContext from "contexts/LivestreamContext";

class LivestreamProvider extends Component {
    state = {
        provider: "mux",
        toggleProvider: this.toggleProvider.bind(this),
    };

    toggleProvider() {
        const provider = this.state.provider === "mux" ? "wowza" : "mux";
        this.setState({
            provider,
        });
    }

    render() {
        const { children } = this.props;
        return <LivestreamContext.Provider value={this.state}>{children}</LivestreamContext.Provider>;
    }
}

export default LivestreamProvider;
