import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";


import studentReducer from "../Slices/studentSlice/studentSlice";
import tutorReducer from "../Slices/tutorSlice/tutorSlice";
import adminReducer from "../Slices/adminSlice/adminSlice";
import courseReducer from "../Slices/tutorSlice/courseSlice";


const tutorConfig = {
  key: 'tutor',
  storage
};

const studentConfig = {
  key: 'student',
  storage
};

const courseConfig = {
  key: 'course',
  storage 
};

const adminConfig = {
  key: 'admin',
  storage 
};


const persistedTutorReducer = persistReducer(tutorConfig, tutorReducer);
const persistedCourseReducer = persistReducer(courseConfig, courseReducer);
const persistedStudentReducer = persistReducer(studentConfig, studentReducer);
const persistedAdminReducer = persistReducer(adminConfig, adminReducer);


const store = configureStore({
  reducer: {
    user: persistedStudentReducer,
    tutor: persistedTutorReducer,
    admin: persistedAdminReducer,
    course: persistedCourseReducer,
  }
});

const persistedStore = persistStore(store);


export { store, persistedStore };
