import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isAdmin : boolean;
  isLoggedIn: boolean;
  hasPaid: boolean;
  token: string;
  userID:string|null;
}

const initialState: UserState = {
  isLoggedIn: false,
  hasPaid: false,
  isAdmin: false,
  token: '',
  userID: localStorage.getItem('userID'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<{ token: string, user: string,userID: string }>) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.isAdmin = action.payload.user === "admin" ? true : false;
      localStorage.setItem('userID',action.payload.userID);
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.hasPaid = false;
      
    },
    markAsPaid: (state) => {
      state.hasPaid = true;
    },
    adminLogin:(state)=>{
      state.isAdmin = true;
    },
    adminLoginLogout:(state)=>{
      state.isAdmin = false;
    }
  },
});

export const { logIn, logOut, markAsPaid, adminLogin,adminLoginLogout } = userSlice.actions;
export default userSlice.reducer;