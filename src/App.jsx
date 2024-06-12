import { ToastContainer, toast } from "react-toastify";
import "./App.css";
import { GoogleLogin, useGoogleOneTapLogin } from "@react-oauth/google";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Navigation from "./components/Navigation/Navigation";
import Footer from "./components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { selectUserId, setLoginData } from "./features/login/loginSlice";
import { URL } from "./config/URL/urls";
import GoogleOneTapLogin from "./components/Google/GoogleOneTabLogin";

function App() {
  const dispatch = useDispatch();
  const userId = useSelector(selectUserId);

  useEffect(() => {
    const tokenString = localStorage.getItem("authToken");
    if (tokenString) {
      const token = JSON.parse(tokenString);
      dispatch(setLoginData(token));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/*" element={<HomePage />} />
          <Route path={URL.CLIENT.ENDPOINT.LOGIN} element={<LoginPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      {!userId && <GoogleOneTapLogin />}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
