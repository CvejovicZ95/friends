import React from "react";
import { LoginPage } from "./components/loginPage/LoginPage";
import { RegisterPage } from "./components/registerPage/RegisterPage";
import { FeedPage } from "./components/feedPage/FeedPage";
import { UserProfile } from "./components/feedPage/userProfile/UserProfile"
import { OtherUserProfile } from "./components/feedPage/otherUserProfile/OtherUserProfile";
import { Conversation } from "./components/conversationsPage/Converstaion";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/authContext";
import { useGlobalMessageListener } from "./hooks/useGlobalMessageListener";

function App() {
  const { authUser } = useAuthContext();
  useGlobalMessageListener();
  
  return (
    <Routes>
      <Route 
        path="/"
        element={authUser ? <Navigate to={"/feed"} /> : <LoginPage/>}
      />
      
      <Route 
        path="/profile"  
        element={!authUser ? <Navigate to={"/"} /> : <UserProfile/>} 
      />

      <Route 
        path="/profile/:username" 
        element={!authUser ? <Navigate to={"/"} /> : <OtherUserProfile />} 
      />


      <Route path="/register" element={<RegisterPage/>}/>
      
      <Route 
        path="/feed"
        element={!authUser ? <Navigate to={"/"}></Navigate> : <FeedPage/>}
      />

<Route 
    path="/conversation/:username" 
    element={!authUser ? <Navigate to={"/"} /> : <Conversation />} 
/>


    </Routes>
  );
}

export default App;
