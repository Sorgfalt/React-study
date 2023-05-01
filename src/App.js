import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./components/signIn";
import SignUp from "./components/signUp";
import PhoneList from "./components/phoneList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/phoneList" element={<PhoneList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
