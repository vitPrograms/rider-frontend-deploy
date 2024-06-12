import Map from "../components/Map/Map";
import "../assets/styles/base.scss";
import POIList from "../components/POIs/POIList";
import {
  BrowserRouter,
  Route,
  Router,
  Routes,
  useParams,
} from "react-router-dom";
import POIDetails from "../components/POIs/POIDetails";
import POIForm from "../components/POIs/POIForm";
import Profile from "../components/Profile/Profile";
import { useSelector } from "react-redux";
import { selectUserId } from "../features/login/loginSlice";
import { URL } from "../config/URL/urls";
import { useEffect, useRef, useState } from "react";
import RiderProfile from "../components/Profile/RiderProfile";

export default function HomePage(props) {
  const userId = useSelector(selectUserId);
  const [riderId, setRiderId] = useState(null);
  const { name } = useParams();

  return (
    <>
      <div className="container">
        <Routes>
          <Route
            path={`${URL.CLIENT.ENDPOINT.PROFILE}/*`}
            element={<Profile />}
          />
          <Route
            path={URL.CLIENT.ENDPOINT.RIDER + URL.CLIENT.ENDPOINT.USERNAME}
            element={<Profile setRiderId={setRiderId} />}
          />
        </Routes>
        <Map />
        <Routes>
          <Route path="/" element={<POIList />} />
          <Route
            path={URL.CLIENT.ENDPOINT.PROFILE}
            element={
              <POIList userId={userId} link={URL.CLIENT.ENDPOINT.PROFILE} />
            }
          />
          <Route
            path={URL.CLIENT.ENDPOINT.RIDER + URL.CLIENT.ENDPOINT.USERNAME}
            element={
              <POIList
                userId={riderId ? riderId : null}
                link={URL.CLIENT.ENDPOINT.PROFILE}
              />
            }
          />
          <Route path={URL.CLIENT.ENDPOINT.POI} element={<POIDetails />} />
          <Route
            path={`${URL.CLIENT.ENDPOINT.PROFILE}${URL.CLIENT.ENDPOINT.POI}`}
            element={<POIDetails form={false} />}
          />
          <Route path="/edit" element={<POIForm />} />
        </Routes>
      </div>
    </>
  );
}
