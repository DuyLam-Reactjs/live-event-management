
import {combineReducers} from "redux";
import User from "./user";
import App from "./app"
import Content from "./content"
import InStreamAds from "./inStreamAds"
import Popup from "./popup"

const rootReducer = combineReducers({
  User,
  App,
  Content,
  InStreamAds,
  Popup,
})
export default rootReducer
