import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Chat, Channel, Window, Thread, ChannelHeader, MessageList, MessageInput, MessageLivestream } from "stream-chat-react"
import {StreamChat} from "stream-chat"
import 'stream-chat-react/dist/css/index.css';
import ReactPlayer from 'react-player'
import { Player } from 'video-react';


const chatClient = new StreamChat('qk4nn7rpcn75');
const userToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYnJva2VuLXdhdGVyZmFsbC01In0.d1xKTlD_D0G-VsBoDBNbaLjO-2XWNA8rlTm4ru4sMHg';

chatClient.setUser(
  {
       id: 'broken-waterfall-5',
       name: 'Broken waterfall',
       image: 'https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=Broken+waterfall'
  },
  userToken,
);

const channel = chatClient.channel('livestream', 'rocketlaunch3', {
  // add as many custom fields as you'd like
  image: 'https://image.flaticon.com/icons/svg/201/201901.svg',
  name: 'Rocket Launch Central',
});

const playbackId = "8W4dsnSoF95U00UQP8Zk01vWcqs3vLjpQQ";
let url = "https://stream.mux.com/"+playbackId+".m3u8";
url = 'https://stream.mux.com/a5LFXNgjonhofUbuNQwV6OXPmnURfu21.m3u8'

function App() {
  return (
    //<div id="playerElement"></div>
    // <ReactPlayer url={url} playing  className='react-player' width='100%'
  // height='100%' />
    <React.Fragment>
      <div className="example-video-container">
        <div className="example-video">
          <div className="videoWrapper player-wrapper">
<div id='wowza_player'></div>
          </div>
        </div>
      </div>
      <div>
        <Chat client={chatClient} theme={'livestream dark'}>
          <Channel channel={channel}>
            <Window hideOnThread>
              <ChannelHeader />
              <MessageList Message={MessageLivestream} />
              <MessageInput />
            </Window>
            <Thread Message={MessageLivestream} fullWidth />
          </Channel>
        </Chat>
       </div>
     </React.Fragment>
  );
}


export default App;
