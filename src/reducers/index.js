
import {combineReducers} from "redux";
import Customer from "./customer";
import App from "./app"
import Content from "./content"
import InStreamAds from "./inStreamAds"
import Popup from "./popup"

const rootReducer = combineReducers({
  Customer,
  App,
  Content,
  InStreamAds,
  Popup,
})
export default rootReducer
