import { LoginPage } from "./components/loginPage/LoginPage";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />

      <Route path="/register" element={<RegisterPage/>}/>

    </Routes>
  );
}

export default App;
