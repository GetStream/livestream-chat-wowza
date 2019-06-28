import React, { Component } from "react";
import { StreamChat } from "stream-chat";
import {
    Chat,
    Channel,
    Window,
    Thread,
    ChannelHeader,
    MessageList,
    MessageInput,
    MessageLivestream,
} from "stream-chat-react";
import { extractEmoji } from "extract-emoji";
import Reward from "react-rewards";

// Stream Chat //
const chatClient = new StreamChat("qk4nn7rpcn75");
const userToken =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiYnJva2VuLXdhdGVyZmFsbC01In0.d1xKTlD_D0G-VsBoDBNbaLjO-2XWNA8rlTm4ru4sMHg";

chatClient.setUser(
    {
        id: "broken-waterfall-5",
        name: "Broken waterfall",
        image: "https://getstream.io/random_svg/?id=broken-waterfall-5&amp;name=Broken+waterfall",
    },
    userToken,
);

const channel = chatClient.channel("livestream", "rocketlaunch3", {
    // add as many custom fields as you'd like
    image: "https://image.flaticon.com/icons/svg/201/201901.svg",
    name: "Rocket Launch Central",
});

class LiveChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emoji: ["🚀"],
        };

        this.setRewardRef = this.setRewardRef.bind(this);
    }

    async componentDidMount() {
        await channel.watch();
        channel.on("message.new", this.handleNewMessage);
        channel.on("reaction.new", this.handleNewReaction);
    }

    componentWillUnmount() {
        channel.off("message.new", this.handleNewMessage);
        channel.off("reaction.new", this.handleNewReaction);
    }

    handleNewMessage = async ({ message }) => {
        const emoji = extractEmoji(message.text);
        if (emoji.length) {
            await this.setState({
                emoji,
            });
            this.reward.rewardMe();
        }
    };

    handleNewReaction = async ({ reaction }) => {
        const emojiMap = {
            like: ["👍"],
            love: ["❤️", "💙", "💚", "💛", "💜", "🧡"],
            haha: ["😂", "🤣"],
            wow: ["😲", "😦", "😮"],
            sad: ["😔", "😢", "😭"],
            angry: ["😠", "😡"],
        };

        await this.setState({
            emoji: emojiMap[reaction.type],
        });

        this.reward.rewardMe();
    };

    setRewardRef(el) {
        this.reward = el;
    }

    get rewardConfig() {
        const { emoji } = this.state;
        return {
            emoji,
            elementSize: 40,
            spread: 160,
        };
    }

    renderMessage(props) {
        return <MessageLivestream {...props} />;
    }

    render() {
        return (
            <Chat client={chatClient} theme={"livestream dark"}>
                <Channel channel={channel}>
                    <Window hideOnThread>
                        <ChannelHeader live watcher_count />
                        <MessageList Message={this.renderMessage} />
                        <Reward ref={this.setRewardRef} type='emoji' config={this.rewardConfig}>
                            <MessageInput />
                        </Reward>
                    </Window>
                    <Thread Message={MessageLivestream} fullWidth />
                </Channel>
            </Chat>
        );
    }
}

export default LiveChat;
