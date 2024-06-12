import { useQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import { QUERY } from "../../config/graphql/query";
import Loading from "../Loading/Loading";
import { useParams } from "react-router-dom";
import PersonalBlock from "./PersonalBlock";
import FriendsBlock from "./FriendsBlock";
import OptionsBlock from "./OptionsBlock";
import ChangesBlock from "./ChangesBlock";

export default function RiderProfile(props) {
  const { username } = useParams();
  const [fullname, setFullname] = useState("fullname");
  const [user, setUser] = useState(null);
  const profileRef = useRef(null);

  const { data, loading, error } = useQuery(QUERY.USER, {
    variables: {
      username: username,
    },
    skip: !username,
  });

  useEffect(() => {
    if (data) {
      const fetcherUser = data.user;
      setUser(fetcherUser);
      setFullname(fetcherUser.name);
    }
  }, [data]);

  if (error) return <p>User not found!</p>;
  if (loading || !user) return <Loading />;

  return (
    <div className="profile-block" ref={profileRef}>
      <div className="info-block">
        <div className="personal-friends-block">
          <PersonalBlock user={user} username={username} fullname={fullname} />
          <FriendsBlock user={user} />
        </div>
        <OptionsBlock username={username} fullname={fullname} user={user} />
      </div>
      <ChangesBlock userId={user.id} profileRef={profileRef} />
    </div>
  );
}
