import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface UserInfo {
  id: string | number;
  email: string | null;
  displayName: string | null;
  photoURL: null | string;
}

interface InitialState {
  userInfo: UserInfo | null;
}

const initialState: InitialState = {
  userInfo: null,
};

// Load the user info from localStorage when the app initializes
const storedUserInfo = typeof window !== "undefined" ? localStorage.getItem("userInfo") : null;
const initialUserInfo = storedUserInfo ? JSON.parse(storedUserInfo) : null;

const initialStateWithUser = {
  ...initialState,
  userInfo: initialUserInfo,
};

export const commentsSlice = createSlice({
  name: "slice",
  initialState: initialStateWithUser, 
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    setSignOut: (state) => {
      state.userInfo = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});

export const { setUserInfo, setSignOut } = commentsSlice.actions;

export default commentsSlice.reducer;
