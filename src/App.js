import './App.css';
import DialogSearch from "./components/DialogSearch";
import UrlInput from "./components/UrlInput";

function App() {
  return (
    <div className="App">
        <div style={{
            margin: "auto"
        }}>
            <UrlInput />
            <DialogSearch />
        </div>
    </div>
  );
}

export default App;
