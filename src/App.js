import './App.css';
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";
import DialogList from "./components/DialogList";

function App() {
  return (
    <div className="App">
        <div style={{
            margin: "auto",
            width: "60%"
        }}>
            <UrlInput />
            <DialogSearch />
            <DialogList />
        </div>
    </div>
  );
}

export default App;
