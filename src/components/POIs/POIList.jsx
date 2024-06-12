import { useEffect, useMemo, useState } from "react";
import "./pois.scss";
import POIElement from "./POIElement";
import POISortOptions from "./POISortOptions";
import { useQuery } from "@apollo/client";
import { QUERY } from "../../config/graphql/query";
import { useDispatch, useSelector } from "react-redux";
import { getMapPOIs, setMapPOIs } from "../../features/map/mapSlice";
import Loading from "../Loading/Loading";

export default function POIList(props) {
  const { userId, type, link } = props;
  const { data, loading, error } = useQuery(QUERY.ALL_POIS, {
    variables: {
      ...(userId && { userId: userId }),
      ...(type && { type: type }),
    },
  });

  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(setMapPOIs(data?.pois));
    }
  }, [loading, userId]);

  const pois = useSelector(getMapPOIs);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="places-block">
      <POISortOptions />
      <ul className="places-list">
        {pois.map((poi) => {
          return <POIElement key={poi.id} poi={poi} link={link} />;
        })}
      </ul>
    </div>
  );
}
