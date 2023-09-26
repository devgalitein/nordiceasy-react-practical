import "./App.css";
import AllClients from "./components/AllClients";
import NavBar from "./components/NavBar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <NavBar />
      <AllClients />
      <ToastContainer />
    </div>
  );
}

export default App;
