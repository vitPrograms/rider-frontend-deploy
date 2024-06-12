import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../features/login/loginSlice";
import mapReducer from "../features/map/mapSlice";
import poiDetailReducer from "../features/poiDetail/poiDetailSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    map: mapReducer,
    poiDetail: poiDetailReducer,
  },
});
