import logo from "./logo.svg";
import "./App.css";
import Main from "./components/Main";
import { AppWrapper } from "./contexts/useApp";

function App() {
  return (
    <div className="App">
      <AppWrapper>
        <Main />
      </AppWrapper>
    </div>
  );
}

export default App;
