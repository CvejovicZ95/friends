import { LoginPage } from "./components/loginPage/LoginPage";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { FeedPage } from "./components/feedPage/FeedPage";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />

      <Route path="/register" element={<RegisterPage/>}/>
      
      <Route path="/feed" element={<FeedPage/>}/>

    </Routes>
  );
}

export default App;
