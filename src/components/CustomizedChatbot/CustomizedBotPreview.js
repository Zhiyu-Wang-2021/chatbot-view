import * as React from 'react';
import Chatbot, {createCustomMessage} from "react-chatbot-kit";
import ChatIcon from '@mui/icons-material/Chat';
import 'react-chatbot-kit/build/main.css'

import {validateInput, saveMessages, loadMessages} from "./chatbot"
import {CircularProgress, Fab} from "@mui/material";

import {getBearerToken, getWorkspaceList, sendMsgToWatsonAssistant} from "./watsonAssistantConnection";
import HtmlMessage from "./customMsg";
import assert from "assert";

const botName = "NHSBot"


export default function ChatbotPreview({wtsnAssistant, setWtsnAssistant}) {
    const [showBot, setShowBot] = React.useState(false)
    const [isConnecting, setIsConnecting] = React.useState(false)

    const chatbotConfig = {
        state: {
            token: wtsnAssistant.token,
        },
        initialMessages: [
            createCustomMessage("custom", 'htmlMsg', {
                payload: {
                    message: `Hi! I'm ${botName}. How can I help you?`
                }
            })
        ],
        botName: botName,
        customStyles: {
            botMessageBox: {
                backgroundColor: '#005EB8',
            },
            chatButton: {
                backgroundColor: '#005EB8',
            },
        },
        customComponents: {
            // Replaces the default header
            header: () => (<div
                style={{
                    backgroundColor: '#005EB8',
                    padding: "12px",
                    borderRadius: "3px",
                    color: "white",
                }}
            >
                <div style={{
                    display: "table",
                    width: "100%"
                }}>
                    <p style={{
                        display: "table-cell",
                        textAlign: "left"
                    }}>Preview</p>
                    <p onClick={() => setShowBot(false)} style={{
                        display: "table-cell",
                        textAlign: "right"
                    }}>X</p>
                </div>

            </div>),
            botAvatar: () => (<div></div>),
            userAvatar: () => (<div></div>),

        },
        customMessages: {
            htmlMsg: (props) => <HtmlMessage {...props} />,
        },
    };

    const MessageParser = ({ children, actions }) => {
        const parse = (message) => {
            if(message !== ""){
                actions.handleMessage(message).catch(err => console.error((err)))
            }
        };

        return (
            <div>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        parse: parse,
                        actions,
                    });
                })}
            </div>
        );
    };

    const ActionProvider = ({ setState, children }) => {
        const handleMessage = async (userMsg) => {

            const resp = await sendMsgToWatsonAssistant(wtsnAssistant.instanceId, wtsnAssistant.workspaceId, wtsnAssistant.token, userMsg)
            console.log(resp)
            const botMessage = createCustomMessage("custom", 'htmlMsg', {
                payload: {
                    message: resp !== undefined ? resp["text"] : "ERROR"
                }
            })

            setState((prev) => ({
                ...prev,
                messages: [...prev.messages, botMessage],
            }));
        };

        // Put the handleMessage function in the actions object to pass to the MessageParser
        return (
            <div>
                {React.Children.map(children, (child) => {
                    return React.cloneElement(child, {
                        actions: {
                            handleMessage,
                        },
                    });
                })}
            </div>
        );
    };
    const handleStartChatSession = async () => {
        console.log(wtsnAssistant)
        let accessToken
        try {
            setIsConnecting(true)
            accessToken = (await getBearerToken(wtsnAssistant.iamKey))["access_token"]

            assert(accessToken !== undefined && accessToken !== "", "failed to get token")
        } catch (e) {
            console.error("failed to get a token - " + accessToken)
            setIsConnecting(false)
        }
        let wsId
        try {
            wsId = (await getWorkspaceList(accessToken, wtsnAssistant.instanceId))["workspaces"][0]["workspace_id"]
            console.log("workspace id:\n" + wsId)
            setShowBot(true)
            console.log("Watson Assistant session established")
        } catch (e) {
            console.error("failed to get the workspace id - " + wsId)
        } finally {
            setIsConnecting(false)
        }

        setWtsnAssistant({
            iamKey: wtsnAssistant.iamKey,
            instanceId: wtsnAssistant.instanceId,
            token: accessToken,
            workspaceId: wsId
        })
        console.log(wtsnAssistant)


    }

    if(showBot) {
        return (
            <div style={{
                position: "fixed",
                bottom: "3%",
                right: "2%",
                zIndex: "999",
                boxShadow: "3px 3px 20px rgba(0, 0, 0, 0.5)"
            }}>
                <Chatbot
                    config={chatbotConfig}
                    messageParser={MessageParser}
                    actionProvider={ActionProvider}
                    messageHistory={loadMessages()}
                    saveMessages={saveMessages}
                    validator={validateInput}
                />
            </div>
        );
    } else {
        return (
            <Fab
                onClick={handleStartChatSession}
                color={isConnecting ? "warning": "primary"}
                aria-label="add"
                sx={{
                    position: "fixed",
                    bottom: "3%",
                    right: "2%",
                    zIndex: "999"
                }}
            >
                {
                    isConnecting ? <CircularProgress color="inherit" /> : <ChatIcon />
                }
            </Fab>
        )
    }
}
