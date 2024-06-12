import { createSlice } from "@reduxjs/toolkit";
import { PLACE_TYPES } from "../../config/types";

const initialState = {
  editMode: false,
  pois: [],
  newPath: [],
  sortOrder: "recent",
  typeFilter: Object.values(PLACE_TYPES),
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setMapPOIs: (state, action) => {
      state.pois = action.payload;
    },
    setEditModeState: (state, action) => {
      state.editMode = action.payload;
    },
    setNewPath: (state, action) => {
      state.newPath = action.payload;
    },
    changeSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
    setZoomLevel: (state, action) => {
      state.zoomLevel = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.typeFilter = action.payload;
    },
  },
});

export const getMapPOIs = (state) => state.map.pois;
export const getPOIById = (state, id) =>
  state.map.pois.find((pois) => pois.id === state.id);
export const isEditMode = (state) => state.map.editMode;
export const getNewPath = (state) => state.map.newPath;
export const getSelectedType = (state) => state.map.selectedType;
export const getSortOrder = (state) => state.map.sortOrder;
export const getPOIPlaces = (state) =>
  state.map.pois.filter(
    (poi) =>
      poi.type == "place" &&
      poi.types.some((type) => state.map.typeFilter.includes(type))
  );
export const getPOIPaths = (state) =>
  state.map.pois.filter((poi) => poi.type == "path");
export const getZoomLevel = (state) => state.map.zoomLevel;
export const getTypeFilter = (state) => state.map.typeFilter;

export const {
  setMapPOIs,
  setEditModeState,
  setNewPath,
  changeSelectedType,
  setSortOrder,
  setZoomLevel,
  setTypeFilter,
} = mapSlice.actions;
export default mapSlice.reducer;
