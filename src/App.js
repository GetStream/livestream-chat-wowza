import React from "react"; // eslint-disable-line no-unused-vars
import "./App.css";
import "stream-chat-react/dist/css/index.css";
import ReactPlayer from "react-player";

// Components //
import LiveChat from "components/LiveChat";

const playbackId = "8W4dsnSoF95U00UQP8Zk01vWcqs3vLjpQQ";
const url = `https://stream.mux.com/${playbackId}.m3u8`;

const playerConfig = {
    file: {
        forceHLS: true,
    },
};

const App = () => (
    <>
        <div className='player-wrapper'>
            <ReactPlayer
                className='player'
                controls
                config={playerConfig}
                url='https://stream.mux.com/a5LFXNgjonhofUbuNQwV6OXPmnURfu21.m3u8'
                playing
                width='100%'
                height='100%'
            />
        </div>
        <LiveChat />
    </>
);

export default App;
