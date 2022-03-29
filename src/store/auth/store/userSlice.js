import { createSlice } from '@reduxjs/toolkit';
// import { Auth } from 'aws-amplify';
import { setInitialSettings } from '../../settingsSlice';
// import { loginDefault } from './loginSlice';
import history from '../../../configurations/@history';
// import { setDefault } from '../../orgSlice';

const initialState = {
  role: [], // guest
  data: {
    displayName: '',
    photoURL: '',
    email: '',
    name: '',
    org_name: ''
  },
  user: null,
  loginStatus: false,
  open: true
};

const userSlice = createSlice({
  name: 'auth/user',
  initialState,
  reducers: {
    setUser: (state, action) => ({ ...state, ...action.payload }),
    updateUserData: (state, action) => ({ ...state, user: action.payload }),
    userLoggedOut: (state) => ({ ...state, ...initialState }),
    setToolbar: (state, action) => ({ ...state, open: action.payload })
  },
  extraReducers: {}
});

export const { setUser, updateUserData, userLoggedOut, setToolbar } = userSlice.actions;

export const logoutUser = () => async (dispatch) => {
  localStorage.clear();

  // return Auth.signOut({ global: true })
  //   .then(() => {
  //     const user = {
  //       role: [], // guest
  //       data: initialState.data,
  //       redirectUrl: '/login',
  //       user: null,
  //       loginStatus: false
  //     };
  //     // dispatch(setDefault());
  //     // dispatch(loginDefault());
  //     dispatch(userLoggedOut());
  //     dispatch(setInitialSettings());
  //     if (user.redirectUrl) {
  //       history.location.state = {
  //         redirectUrl: user.redirectUrl
  //       };
  //     }
  //     // window.location.reload();
  //   })
  //   .catch(() => {
  //     // console.log(err);
  //   });
  const user = {
    role: [], // guest
    data: initialState.data,
    redirectUrl: '/login',
    user: null,
    loginStatus: false
  };
  // dispatch(setDefault());
  // dispatch(loginDefault());
  dispatch(userLoggedOut());
  dispatch(setInitialSettings());
  if (user.redirectUrl) {
    history.location.state = {
      redirectUrl: user.redirectUrl
    };
  }
  return true;
};

export const setUserData = (user) => async (dispatch) => {
  // if (user.redirectUrl) {
  //   history.location.state = {
  //     redirectUrl: user.redirectUrl
  //   };
  // }
  if (user.redirectUrl && !user.loginStatus) {
    localStorage.clear();
  }
  dispatch(setUser(user));
};

export default userSlice.reducer;
