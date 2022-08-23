import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
export interface LoginStatus {
  success: boolean;
  user: string | number;
}
export interface Popular {
  namemovie: string;
}

export interface Trending {
  nameTrending: string;
}

export interface Search {
  searchName: string | number;
}
interface InitiaStateinterface {
  login: LoginStatus;
  popular: Popular;
  trending: Trending;
  search: Search;
}

const initialState: InitiaStateinterface = {
  ///tt ban đầu
  login: {
    success: false,
    user: "",
  },
  popular: {
    namemovie: "popular",
  },
  trending: {
    nameTrending: "day",
  },
  search: {
    searchName: "",
  },
};

export const CartMovieSlice = createSlice({
  name: "cartmovie",
  initialState,
  reducers: {
    statusLoginAction: (state, action: PayloadAction<LoginStatus>) => {
      state.login = action.payload;
    },
    intheaterAction: (state, action: PayloadAction<Popular>) => {
      state.popular = action.payload;
    },
    trendingAction: (state, action: PayloadAction<Trending>) => {
      state.trending = action.payload;
    },
    searchAciton: (state, action: PayloadAction<Search>) => {
      state.search = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  statusLoginAction,
  intheaterAction,
  trendingAction,
  searchAciton,
} = CartMovieSlice.actions;
//selector
export const selectstatusLogin = (state: any) => state.cartmovie.login;
export const selectIntheater = (state: any) => state.cartmovie.popular;
export const selectTrending = (state: any) => state.cartmovie.trending;
export const selectSearch = (state: any) => state.cartmovie.search;
//reducer
const cartmovieReducer = CartMovieSlice.reducer;
export default cartmovieReducer;
