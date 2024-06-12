import React, { useState } from "react";
import { Menu, MenuItem, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const PlaceTypeSelector = ({
  placeTypes,
  selectedPlaceTypes,
  setSelectedPlaceTypes,
  buttonRef,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePlaceTypeSelect = (placeType) => {
    if (!selectedPlaceTypes.includes(placeType)) {
      setSelectedPlaceTypes([...selectedPlaceTypes, placeType]);
    }
    handleClose();
  };

  const handlePlaceTypeRemove = (placeType) => {
    setSelectedPlaceTypes(
      selectedPlaceTypes.filter((type) => type !== placeType)
    );
  };

  return (
    <div>
      <IconButton ref={buttonRef} onClick={handleClick}>
        <AddIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        {Object.entries(placeTypes).map(([type, icon]) => (
          <MenuItem key={type} onClick={() => handlePlaceTypeSelect(type)}>
            {icon}
            <span>{type}</span>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default PlaceTypeSelector;
