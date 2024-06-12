import PlaceIcon from "@mui/icons-material/Place";
import PersonIcon from "@mui/icons-material/Person";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import "./pois.scss";
import { Button, IconButton } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewPath, setEditModeState } from "../../features/map/mapSlice";
import { selectLoginName, selectUserId } from "../../features/login/loginSlice";
import { toast } from "react-toastify";
import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import PlaceTypeSelector from "./PlaceTypeSelector";
import RouteIcon from "@mui/icons-material/Route";
import { MUTATION } from "../../config/graphql/mutation";
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

export default function POIForm({ props }) {
  const placeTypes = {
    workshop: <BuildIcon value="workshop" />,
    food: <RestaurantIcon />,
    rest: <BedIcon />,
    park: <LocalParkingIcon />,
    traffic: <TrafficIcon />,
  };
  const [selectedType, setSelectedType] = useState("place");
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [selectedPlaceTypes, setSelectedPlaceTypes] = useState([]);
  const titleInputRef = useRef(null);
  const addressInputRef = useRef(null);
  const descriptionInputRef = useRef(null);
  const placeTypesInputRef = useRef(null);
  const dispatch = useDispatch();
  const name = useSelector(selectLoginName);
  const path = useSelector(getNewPath);
  const navigate = useNavigate();
  const [addPoi, { data, loading, error }] = useMutation(MUTATION.NEW_POI);
  const userId = useSelector(selectUserId);
  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const handlePlaceTypeRemove = (placeType) => {
    setSelectedPlaceTypes(
      selectedPlaceTypes.filter((type) => type !== placeType)
    );
  };

  const newPOIhandler = (event) => {
    event.preventDefault();
    if (path.length === 0) {
      return toast.warn("Please add a place or a path on map");
    }
    if (!title) {
      titleInputRef.current.focus();
      return toast.warn("Please add a title");
    }
    if (!address) {
      addressInputRef.current.focus();
      return toast.warn("Please add an address");
    }
    if (selectedPlaceTypes.length === 0 && selectedType == "place") {
      placeTypesInputRef?.current?.focus();
      return toast.warn("Please add a place type");
    }

    const poiData = {
      type: selectedType,
      title: title,
      address: address,
      description: description,
      placeTypes: selectedPlaceTypes,
      path: path,
    };

    let query = {
      type: selectedType,
      userId: userId,
      title: poiData.title,
      address: poiData.address,
      description: poiData.description,
      coordinates: poiData.path,
      types: selectedPlaceTypes,
      imageUrls: null,
    };

    addPoi({
      variables: query,
    })
      .then((result) => {
        toast.success("POI successfully added");
        navigate("/");
      })
      .catch((err) => {
        toast.error("Error adding poi");
        console.error(err);
      });
  };

  useEffect(() => {
    if (path.length > 1) {
      setSelectedType("path");
    } else {
      setSelectedType("place");
    }
  }, [path]);

  return (
    <>
      <form className="poi-form">
        <div className="place-el">
          <div className="place-head">
            <div className="main-info">
              <div className="type-select">
                {selectedType == "place" ? (
                  <div className="type-item" title={"Place"}>
                    <PlaceIcon className="type-icon" />
                  </div>
                ) : selectedType == "path" ? (
                  <div className="type-item" title={"Path"}>
                    <RouteIcon className="type-icon" />
                  </div>
                ) : null}
              </div>

              <div className="adress-block">
                <input
                  ref={titleInputRef}
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                  type="text"
                  placeholder="Title"
                  className="place-name"
                  required
                />
                <input
                  ref={addressInputRef}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  placeholder="Address"
                  className="place-address"
                  required
                />
              </div>
            </div>
            <div className="author-block">
              <PersonIcon className="author-icon" />
            </div>
          </div>
          <div className="place-content">
            <textarea
              ref={descriptionInputRef}
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              className="place-text"
              placeholder="Describe this point of interest..."
              required
            ></textarea>
          </div>
          {selectedType == "place" ? (
            <div className="place-types">
              {selectedPlaceTypes.map((selectedPlaceType) => (
                <IconButton
                  sx={{ color: "#000" }}
                  key={selectedPlaceType}
                  className="icon-type"
                  onClick={() => handlePlaceTypeRemove(selectedPlaceType)}
                >
                  {placeTypes[selectedPlaceType]}
                </IconButton>
              ))}
              <PlaceTypeSelector
                buttonRef={placeTypesInputRef}
                placeTypes={placeTypes}
                selectedPlaceTypes={selectedPlaceTypes}
                setSelectedPlaceTypes={setSelectedPlaceTypes}
              />
            </div>
          ) : null}
        </div>
        <Button
          disabled={loading}
          onClick={newPOIhandler}
          sx={{ display: "flex", alignItems: "center" }}
        >
          CREATE
          <AddCircleOutlineIcon />
        </Button>
      </form>
    </>
  );
}
