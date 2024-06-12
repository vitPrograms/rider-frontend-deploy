import BuildIcon from "@mui/icons-material/Build";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import BedIcon from "@mui/icons-material/Bed";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import TrafficIcon from "@mui/icons-material/Traffic";
import { useDispatch, useSelector } from "react-redux";
import {
  getTypeFilter,
  isEditMode,
  setTypeFilter,
} from "../../features/map/mapSlice";
import {
  Checkbox,
  FormControlLabel,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { PLACE_TYPES } from "../../config/types";
import { useState } from "react";
import clsx from "clsx";

const icons = {
  workshop: <BuildIcon />,
  food: <RestaurantIcon />,
  rest: <BedIcon />,
  park: <LocalParkingIcon />,
  traffic: <TrafficIcon />,
};

export default function LeftPanel({ props }) {
  const editMode = useSelector(isEditMode);
  const [selectedTypes, setSelectedTypes] = useState(
    Object.values(PLACE_TYPES)
  );
  const dispatch = useDispatch();

  const handleToggle = (value) => () => {
    const currentIndex = selectedTypes.indexOf(value);
    const newSelectedTypes = [...selectedTypes];

    if (currentIndex === -1) {
      newSelectedTypes.push(value);
    } else {
      newSelectedTypes.splice(currentIndex, 1);
    }

    setSelectedTypes(newSelectedTypes);
    dispatch(setTypeFilter(newSelectedTypes));
  };

  return (
    <div className="left-panel">
      {editMode ? (
        <div className="type-select-block"></div>
      ) : (
        <>
          <List className="places-option-list">
            {Object.keys(PLACE_TYPES).map((key) => {
              const value = PLACE_TYPES[key];
              return (
                <ListItem
                  key={value}
                  button
                  onClick={handleToggle(value)}
                  className={clsx("place-option-el", {
                    selected: selectedTypes.includes(value),
                  })}
                >
                  <ListItemIcon className="icon">{icons[value]}</ListItemIcon>
                  <ListItemText
                    className="name"
                    primary={key.charAt(0) + key.slice(1).toLowerCase()}
                  />
                </ListItem>
              );
            })}
          </List>
        </>
      )}
    </div>
  );
}
