import './App.css';
import React from 'react'
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";
import DialogList from "./components/DialogList";
import {Divider} from "@mui/material";
import CustomizedBotPreview from "./components/CustomizedChatbot/CustomizedBotPreview"
import Navbar from "./components/Navbar";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Settings from "./components/Settings";

function App() {
    const [settingOpen, setSettingOpen] = React.useState(false)
    const [wtsnAssistant, setWtsnAssistant] = React.useState({
        iamKey: "fK1ry7X3D0HFVHC_kJXKlLA6900sxeHH6Yc0MKtEdGHm",
        instanceId: "d049a552-ee69-4a04-aa9b-1fa4e7994ece",
        workspaceId: "",
        token: ""
    })

  return (
        <div className="App">
            <Navbar setSettingOpen={setSettingOpen}/>
            <div style={{
                marginTop: "80px",
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
