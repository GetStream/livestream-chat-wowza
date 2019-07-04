import React, { Component } from "react";
import { StreamChat } from "stream-chat";
import { Chat, Channel, Window, Thread, ChannelHeader, MessageList, MessageInput, Message } from "stream-chat-react";
import { extractEmoji } from "extract-emoji";
import Reward from "react-rewards";

// contexts //
import LivestreamContext from "contexts/LivestreamContext";

// Components //
import ChatHeader from "./ChatHeader";

// Styles //
import "./styles.css";

// Stream Chat //
const chatClient = new StreamChat(process.env.REACT_APP_STREAM_KEY);

const rocketKeywords = ["boom", "rocket", "liftoff"];
const loveKeywords = ["love", "like", "amazing"];
const wowKeywords = ["woah", "wow", "omg", "wtf"];

const muxImg = "https://mux.com/files/mux-video-logo-square.png";
const wowzaImg =
    "https://media.licdn.com/dms/image/C4D0BAQE7CwCL3tSUHg/company-logo_200_200/0?e=2159024400&v=beta&t=un7iEFZMfnHSRZ8p9wsXVPu429opPpwH2vDVksLizKs";

class LiveChat extends Component {
    static contextType = LivestreamContext;

    constructor(props) {
        super(props);
        chatClient.disconnect();
        chatClient.setUser(
            {
                ...JSON.parse(localStorage.getItem("user")),
            },
            localStorage.getItem("token"),
        );

        this.setRewardRef = this.setRewardRef.bind(this);

        this.state = {
            channel: chatClient.channel("livestream", `live_stream_${props.provider}`, {
                image: props.provider === "mux" ? muxImg : wowzaImg,
                name: `Stream + ${props.provider}`,
                name: `Stream + ${props.provider}`,
            }),
            emoji: ["🚀"],
        };
    }

    async componentDidMount() {
        await this.state.channel.watch();
        console.log(this.state.channel);
        this.state.channel.on("message.new", this.handleNewMessage);
        this.state.channel.on("reaction.new", this.handleNewReaction);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.provider !== this.props.provider) {
            this.state.channel.off("message.new", this.handleNewMessage);
            this.state.channel.off("reaction.new", this.handleNewReaction);
            this.setState(
                {
                    channel: chatClient.channel("livestream", `live_stream_${this.props.provider}`, {
                        image: this.props.provider === "mux" ? muxImg : wowzaImg,
                        name: `Stream + ${this.props.provider}`,
                    }),
                },
                () => {
                    this.state.channel.on("message.new", this.handleNewMessage);
                    this.state.channel.on("reaction.new", this.handleNewReaction);
                },
            );
        }
    }

    componentWillUnmount() {
        this.state.channel.off("message.new", this.handleNewMessage);
        this.state.channel.off("reaction.new", this.handleNewReaction);
        chatClient.disconnect();
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
        const { provider } = this.props;

        return (
            <div className={`chat-wrapper ${provider}`}>
                <Chat client={chatClient} theme='livestream dark'>
                    <Channel channel={this.state.channel}>
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
                            <MessageList Message={this.renderMessage} />
                            <MessageInput />
                        </Window>
                        <Thread Message={Message} fullWidth />
                    </Channel>
                </Chat>
            </div>
        );
    }
}

export default (props) => (
    <LivestreamContext.Consumer>
        {({ provider, videoUrl }) => <LiveChat {...props} provider={provider} videoUrl={videoUrl} />}
    </LivestreamContext.Consumer>
);
