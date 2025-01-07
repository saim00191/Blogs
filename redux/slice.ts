import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserInfo {
  id: string | number;
  email: string | null;
  displayName: string | null;
  photoURL: null | string;
}

interface InitialState {
  userInfo: UserInfo | null;
  loading: boolean;
}

const loadUserInfoFromLocalStorage = (): UserInfo | null => {
  if (typeof window !== "undefined") {
    const savedUserInfo = localStorage.getItem("userInfo");
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  }
  return null;
};

const initialState: InitialState = {
  userInfo: loadUserInfoFromLocalStorage(),
  loading: true, 
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      state.loading = false; 
      if (typeof window !== "undefined") {
        localStorage.setItem("userInfo", JSON.stringify(action.payload));
      }
    },
    setSignOut: (state) => {
      state.userInfo = null;
      state.loading = false; 
      if (typeof window !== "undefined") {
        localStorage.removeItem("userInfo");
      }
    },
  },
});


export const { setUserInfo, setSignOut } = commentsSlice.actions;

export default commentsSlice.reducer;
