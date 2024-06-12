import { useDispatch } from "react-redux";
import { URL } from "../../config/URL/urls";
import { toast } from "react-toastify";
import { useGoogleOneTapLogin } from "@react-oauth/google";
import { setLoginData } from "../../features/login/loginSlice";

export default function GoogleOneTapLogin(props) {
  const dispatch = useDispatch();
  const googleLoginHandler = (response) => {
    localStorage.setItem("accessToken", response.credential);
    fetch(URL.SERVER.HOST + URL.SERVER.ENDPOINT.AUTH, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + response.credential,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        return response.json();
      })
      .then((data) => {
        if (data.success && data.token) {
          dispatch(setLoginData(data.token));
          localStorage.setItem("authToken", JSON.stringify(data.token));
          toast.success("Logged in successfully");
        }
      })
      .catch((error) => {
        console.error("Fetch error:", error);
      });
  };

  const login = useGoogleOneTapLogin({
    onSuccess: (credentialResponse) => {
      googleLoginHandler(credentialResponse);
    },
    onError: (e) => {
      toast.error("Login failed");
      console.log(e);
    },
  });

  return null;
}
