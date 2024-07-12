import { combineReducers, configureStore } from "@reduxjs/toolkit";
import navbarReducer from "./slices/navbarSlice";
import educationSlice from "./slices/educationSlice";
import personalDetailsSlice from "./slices/personalDetailsSlice";
import experienceSlice from "./slices/experienceSlice";
import projectDetailsSlice from "./slices/projectDetailsSlice";
import skillsSlice from "./slices/skillSlice";
import resumeSlice from "./slices/resumeSlice";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  navbarFixed: navbarReducer,
  educationSlice: educationSlice,
  personalDetailsSlice: personalDetailsSlice,
  experienceSlice: experienceSlice,
  projectDetailsSlice: projectDetailsSlice,
  skillsSlice: skillsSlice,
  resumeSlice: resumeSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: {
    persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);

export default store;
