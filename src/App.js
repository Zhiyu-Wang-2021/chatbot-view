import './App.css';
import React from 'react'
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";
import DialogList from "./components/DialogList";
import {Divider} from "@mui/material";
import CustomizedBotPreview from "./components/CustomizedChatbot/CustomizedBotPreview"

function App() {

    const [wtsnAssistant, setWtsnAssistant] = React.useState({
        instanceId: "d049a552-ee69-4a04-aa9b-1fa4e7994ece",
        workspaceId: "",
        token: ""
    })

  return (
        <div className="App">
            <div style={{
                margin: "auto",
                width: "60%"
            }}>
                <UrlInput />
                <DialogSearch wtsnAssistant={wtsnAssistant} setWtsnAssistant={setWtsnAssistant}/>
                <Divider sx={{margin: "15px"}}/>
                <DialogList />
                <CustomizedBotPreview wtsnAssistant={wtsnAssistant} setWtsnAssistant={setWtsnAssistant}/>
            </div>
        </div>
  );
}

export default App;
