import wishListReducer from "./wishlist.js";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  wishList: wishListReducer,
});

export default rootReducer;
