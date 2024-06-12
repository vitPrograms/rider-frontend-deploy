import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const poiDetailSlice = createSlice({
  name: "poiDetail",
  initialState,
  reducers: {
    setPoiDetailData: (state, action) => {
      return action.payload;
    },
    addPOIFeedback: (state, action) => {
      state.feedbacks.push(action.payload);
    },
  },
});

export const selectPoiDetailData = (state) => state.poiDetail;
export const selectPoiFeedbacks = (state) => state.poiDetail.feedbacks;
export const selectPoiId = (state) => state.poiDetail.id;
export const selectPoiLikes = (state) => state.poiDetail.likes;
export const selectPoiDislikes = (state) => state.poiDetail.dislikes;

export const { setPoiDetailData, addPOIFeedback } = poiDetailSlice.actions;
export default poiDetailSlice.reducer;
