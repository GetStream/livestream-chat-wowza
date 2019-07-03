import React, { Component } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, Thread, ChannelHeader, MessageList, MessageInput, Message } from "stream-chat-react";
import { extractEmoji } from "extract-emoji";
import Reward from "react-rewards";

// Styles //
import "./styles.css";

// Stream Chat //
const chatClient = new StreamChat(process.env.REACT_APP_STREAM_KEY);

class LiveChat extends Component {
    constructor(props) {
        super(props);

        this.state = {
            emoji: ["🚀"],
        };
        chatClient.disconnect();
        chatClient.setUser(
            {
                ...JSON.parse(localStorage.getItem("user")),
            },
            localStorage.getItem("token"),
        );

        this.channel = chatClient.channel("livestream", "live_stream_mux", {
            image: "https://mux.com/files/mux-video-logo-square.png",
            name: "Stream + Mux: Livestream Chat",
        });

        this.setRewardRef = this.setRewardRef.bind(this);
    }

    async componentDidMount() {
        await this.channel.watch();
        this.channel.on("message.new", this.handleNewMessage);
        this.channel.on("reaction.new", this.handleNewReaction);
    }

    componentWillUnmount() {
        this.channel.off("message.new", this.handleNewMessage);
        this.channel.off("reaction.new", this.handleNewReaction);
        chatClient.disconnect();
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

    render() {
        return (
            <Chat client={chatClient} theme='livestream dark'>
                <Channel channel={this.channel}>
                    <Window hideOnThread>
                        <ChannelHeader live watcher_count />
                        <MessageList Message={this.renderMessage} />
                        <Reward zIndex={1} ref={this.setRewardRef} type='emoji' config={this.rewardConfig}>
                            <MessageInput />
                        </Reward>
                    </Window>
                    <Thread Message={Message} fullWidth />
                </Channel>
            </Chat>
        );
    }
}

export default LiveChat;
