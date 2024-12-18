import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store/index";

import Logo from "./components/Logo/Logo";
import Dashboard from "./pages/Dashboard/Dashboard";
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import ProfileSettings from "./pages/ProfileSettings/ProfileSettings";
import Search from "./pages/Search/Search";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Register/Register";
import Error404 from "./pages/Error404/Error404";
import ForgetPassword from "./pages/ForgetPassword/ForgetPassword";
import Settings from "./pages/Settings/Settings";
import Messages from "./pages/Messages/Messages";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          {/* Main layout with Logo */}
          <Route
            element={
              <>
                <Logo customLogoStyle={""} />
                <Outlet />
              </>
            }
          >
            {/* Routes with Logo */}
            <Route path="/" element={<Landing />} />
            <Route path="/get-pet/login" element={<Login />} />
            <Route path="/get-pet/register" element={<Register />} />
            <Route path="/get-pet/search" element={<Search />} />
            <Route path="/get-pet/edit-profile" element={<ProfileSettings />} />
            <Route path="/get-pet/messages" element={<Messages />} />
            <Route path="/get-pet/settings" element={<Settings />} />
            <Route path="/get-pet/profile/:username" element={<Profile />} />
            <Route
              path="/get-pet/forget-password"
              element={<ForgetPassword />}
            />
          </Route>

          {/* Route without Logo */}
          <Route path="/get-pet/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
