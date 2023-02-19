import React from 'react';

export default function HealthBotPreview() {
    let [showBot, setShowBot] = React.useState(false)

    if(showBot) {
        return (
            <div style={{
                position: "fixed",
                bottom: "3%",
                right: "2%",
                zIndex: "999",
                width: 380,
                height: 650,
                backgroundColor: "white",
                boxShadow: "3px 3px 20px rgba(0, 0, 0, 0.5)"
            }}>
                <button onClick={() => setShowBot(false)} style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    right: "2%",
                    top: "2%",
                    width: 30,
                    height: 30,
                    position: "absolute"
                }}>X
                </button>
                <div style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden"
                }}>
                    <iframe id="healthBot" src="https://healthcare-bot-j4ipj6gcnqsvw.azurewebsites.net" style={{
                        width: "99%",
                        height: "99%",
                        margin: 'auto'
                    }}></iframe>
                </div>
            </div>

        );
    } else {
        return (
            <button style={{
                position: "fixed",
                bottom: "3%",
                right: "2%",
                zIndex: "999",
                width: 50,
                height: 50,
                backgroundColor: "white",
                borderRadius: "50%",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                cursor: "pointer"
            }} onClick={() => setShowBot(true)}>
                Chat
            </button>

            )
    }
}