import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { themeSettings } from "./theme";
import { setMode } from "./state";
import Navbar from "./scenes/navbar";
import ChatPage from "./scenes/chatPage";
function App() {
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const toggleMode = () => {
   
      // localStorage.setItem("mode", "dark");
      dispatch(setMode(mode));
    };
    const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div  className={mode}>
    <BrowserRouter>
     <Routes>
        
      <Route path="/" element={<LoginPage/>} />
      <Route path='/home' element={isAuth ? <HomePage/> : <Navigate to='/'/>} />
      <Route path="/profile/:userId" element={isAuth ? <ProfilePage/> : <Navigate to="/"/>} />
      <Route path="/cluster" element={<ChatPage/>} />
     </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
