import React from "react";
import "./App.css";
import { store } from "./store/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/Login/Login";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import Search from "./pages/Search/Search";
import Profile from "./pages/profile/Profile.jsx";
import Register from "./pages/Register/Register";
import Error404 from "./pages/Error404/Error404";
import ComingSoon from "./pages/ComingSoon/ComingSoon";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Logo from "./components/Logo/Logo";

function App() {
  return (
    <div>
      <Profile></Profile>
    </div>
    // <Provider store={store}>
    //   <BrowserRouter>
    //     <Logo />
    //     <Routes>
    //       <Route path="/" element={<Landing />} />
    //       <Route path="/get-pet/dashboard" element={<Dashboard />} />
    //       <Route path="/get-pet/login" element={<Login />} />
    //       <Route path="/get-pet//edit-profile" element={<ProfileSettings />} />
    //       <Route path="/get-pet/search" element={<Search />} />
    //       <Route path="/get-pet/profile/:username" element={<Profile />} />
    //       <Route path="/get-pet/register" element={<Register />} />
    //       <Route path="/get-pet/Coming-soon" element={<ComingSoon />} />
    //       <Route path="*" element={<Error404 />} />
    //     </Routes>
    //   </BrowserRouter>
    // </Provider>
  );
}

export default App;
