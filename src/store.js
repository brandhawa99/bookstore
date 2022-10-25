import { configureStore } from "@reduxjs/toolkit";
import openFormReducer from "./openFormSlice";
export default configureStore({
  reducer: {
    openForm: openFormReducer,
  },
});
