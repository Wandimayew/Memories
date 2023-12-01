import "./App.css";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import AddImage from "./components/AddImage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { SnackbarProvider } from "notistack";
import Profile from "./components/Profile";
function App() {
  return (
    <BrowserRouter>
      <SnackbarProvider maxSnack={3}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/home/:id" element={<Home />}></Route>
            <Route path="/home/:id/gallery" element={<AddImage />}></Route>
            <Route path="/home/:id/profile" element={<Profile />}></Route>
          </Routes>
        </AuthProvider>
      </SnackbarProvider>
    </BrowserRouter>
  );
}
export default App;