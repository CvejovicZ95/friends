import { LoginPage } from "./components/loginPage/LoginPage";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { FeedPage } from "./components/feedPage/FeedPage";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/authContext";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>
      <Route 
        path="/"
        element={authUser ? <Navigate to={"/feed"} /> : <LoginPage/>}
      />

      <Route path="/register" element={<RegisterPage/>}/>
      
      <Route 
        path="/feed"
        element={!authUser ? <Navigate to={"/"}></Navigate> : <FeedPage/>}
      />

    </Routes>
  );
}

export default App;
