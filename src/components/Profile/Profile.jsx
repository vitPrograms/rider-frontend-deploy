import "./profile.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoginData,
  selectUserId,
  setLoginData,
} from "../../features/login/loginSlice";

import Loading from "../Loading/Loading";
import PersonalBlock from "./PersonalBlock";
import ChangesBlock from "./ChangesBlock";
import FriendsBlock from "./FriendsBlock";
import OptionsBlock from "./OptionsBlock";

export default function Profile(props) {
  const { setRiderId = null } = props;
  const { name } = useParams();
  const [username, setUsername] = useState("username");
  const [fullname, setFullname] = useState("fullname");
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  const userId = useSelector(selectUserId);

  const { data, loading, error } = useQuery(QUERY.USER, {
    variables: {
      username: name ? name : null,
      id: name ? null : userId,
    },
    skip: !name && !userId,
  });

  useEffect(() => {
    if (data) {
      const fetcherUser = data.user;
      setUsername(fetcherUser.username);
      setFullname(fetcherUser.name);
      setUser(fetcherUser);
      if (setRiderId) setRiderId(fetcherUser.id);
    }
  }, [data]);

  if (error) return <p>Error</p>;
  if (loading || !user) return <Loading />;

  return (
    <div className="profile-block" ref={profileRef}>
      <div className="info-block">
        <div className="personal-friends-block">
          <PersonalBlock
            user={user}
            username={username}
            fullname={fullname}
            setUsername={setUsername}
            setFullname={setFullname}
          />
          <FriendsBlock user={user} />
        </div>
        <OptionsBlock username={username} fullname={fullname} user={user} />
      </div>
      <ChangesBlock userId={userId} profileRef={profileRef} />
    </div>
  );
}
