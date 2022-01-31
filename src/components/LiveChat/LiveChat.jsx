import React, { Component } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, Thread, ChannelHeader, MessageList, MessageInput, Message } from "stream-chat-react";
import { extractEmoji } from "extract-emoji";
import Reward from "react-rewards";

// contexts //
import LivestreamContext from "../../contexts/LivestreamContext";

// Components //
import ChatHeader from "./ChatHeader";

// Styles //
import "./styles.scss";

// Stream Chat //
const chatClient = StreamChat.getInstance(import.meta.env.VITE_STREAM_KEY);

const rocketKeywords = ["boom", "rocket", "liftoff"];
const loveKeywords = ["love", "like", "amazing"];
const wowKeywords = ["woah", "wow", "omg", "wtf"];

const chatImg =
    "https://media.licdn.com/dms/image/C4D0BAQE7CwCL3tSUHg/company-logo_200_200/0?e=2159024400&v=beta&t=un7iEFZMfnHSRZ8p9wsXVPu429opPpwH2vDVksLizKs";

class LiveChat extends Component {
    static contextType = LivestreamContext;

    constructor(props) {
        super(props);
		if (!chatClient.userID) {
			chatClient.connectUser(
				{
					...JSON.parse(localStorage.getItem("user")),
				},
				localStorage.getItem("token"),
			);
		}

        this.setRewardRef = this.setRewardRef.bind(this);

        this.state = {
            channel: chatClient.channel("livestream", `live_stream_wowza`, {
                image: chatImg,
                name: "Stream + Wowza",
            }),
            emoji: ["🚀"],
        };
    }

    async componentDidMount() {
        await this.state.channel.watch();
        this.state.channel.on("message.new", this.handleNewMessage);
        this.state.channel.on("reaction.new", this.handleNewReaction);
    }

    componentWillUnmount() {
        this.state.channel.off("message.new", this.handleNewMessage);
        this.state.channel.off("reaction.new", this.handleNewReaction);
    }

    checkForKeywords(keyword, text) {
        return new RegExp(keyword).test(text);
    }

    handleNewMessage = async ({ message }) => {
        const emoji = extractEmoji(message.text);
        if (emoji.length) {
            await this.setState({
                emoji,
            });
            this.reward.rewardMe();
        }

        if (rocketKeywords.some((keyword) => this.checkForKeywords(keyword, message.text))) {
            await this.setState({
                emoji: ["🚀"],
            });
            this.reward.rewardMe();
        }

        if (loveKeywords.some((keyword) => this.checkForKeywords(keyword, message.text))) {
            await this.setState({
                emoji: ["❤️", "😍"],
            });
            this.reward.rewardMe();
        }

        if (wowKeywords.some((keyword) => this.checkForKeywords(keyword, message.text))) {
            await this.setState({
                emoji: ["😲", "😦", "😮"],
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
            <div className='chat-wrapper'>
                <Chat client={chatClient} theme='livestream dark'>
                    <Channel ReactionsList={() => null} channel={this.state.channel}>
                        <div className='emoji-wrapper'>
                            <Reward
                                decay={1}
                                decay={2000}
                                zIndex={999}
                                ref={this.setRewardRef}
                                type='emoji'
                                config={this.rewardConfig}
                            />
                        </div>
                        <Window hideOnThread>
                            <ChatHeader data={this.state.channel.data} />
                            <MessageList />
                            <MessageInput />
                        </Window>
                        <Thread Message={Message} fullWidth />
                    </Channel>
                </Chat>
            </div>
        );
    }
}

export default LiveChat;
