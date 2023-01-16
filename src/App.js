import './App.css';
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";
import DialogList from "./components/DialogList";
import {Divider} from "@mui/material";

function App() {
  return (
    <div className="App">
        <div style={{
            margin: "auto",
            width: "60%"
        }}>
            <UrlInput />
            <DialogSearch />
            <Divider sx={{margin: "15px"}}/>
            <DialogList />
        </div>
    </div>
  );
}

export default App;
