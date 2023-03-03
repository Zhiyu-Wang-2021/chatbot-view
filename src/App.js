import './App.css';
import React from 'react'
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";
import DialogList from "./components/DialogList";
import {Divider} from "@mui/material";
import CustomizedBotPreview from "./components/CustomizedChatbot/CustomizedBotPreview"
import Navbar from "./components/Navbar";
import Settings from "./components/Settings";
import {iamKey, instanceId} from "./env";

function App() {
    const [settingOpen, setSettingOpen] = React.useState(false)
    const [wtsnAssistant, setWtsnAssistant] = React.useState({
        iamKey: localStorage.getItem('iamKey') || iamKey,
        instanceId: localStorage.getItem('instanceId') || instanceId,
        workspaceId: "",
        token: ""
    })

    localStorage.setItem('iamKey', wtsnAssistant.iamKey)
    localStorage.setItem('instanceId', wtsnAssistant.instanceId)

  return (
        <div className="App">
            <Navbar setSettingOpen={setSettingOpen}/>
            <div style={{
                paddingTop: "50px",
                margin: "auto",
                width: "60%"
            }}>
                <UrlInput />
                <DialogSearch wtsnAssistant={wtsnAssistant} setWtsnAssistant={setWtsnAssistant}/>
                <Divider sx={{margin: "15px"}}/>
                <DialogList />
                <CustomizedBotPreview wtsnAssistant={wtsnAssistant} setWtsnAssistant={setWtsnAssistant}/>
                <Settings settingOpen={settingOpen} setSettingOpen={setSettingOpen} wtsnAssistant={wtsnAssistant} setWtsnAssistant={setWtsnAssistant}/>
            </div>

        </div>
  );
}

export default App;
