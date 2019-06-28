import React from "react"; // eslint-disable-line no-unused-vars
import "./App.css";
import "stream-chat-react/dist/css/index.css";

// Components //
import LiveChat from "components/LiveChat";
import Player from "components/Player";

const App = () => (
    <>
        <Player />
        <LiveChat />
    </>
);

export default App;
