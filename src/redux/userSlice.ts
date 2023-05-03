import { createSlice, PayloadAction } from '@reduxjs/toolkit'


// TODO: change to camel case
export interface UserData {
    oid: string;
    username: string;
    email: string;
    is_guest: boolean;
}

export const userSlice = createSlice({
  name: 'user',
  initialState: null as UserData | null,
  reducers: {
    loggedIn: (state, action: PayloadAction<UserData>) => {
      return {...action.payload};
    },
    loggedOut: (state) => {
      return null;
    },
  },
})

// Action creators are generated for each case reducer function
export const { loggedIn, loggedOut } = userSlice.actions

export default userSlice.reducer;
