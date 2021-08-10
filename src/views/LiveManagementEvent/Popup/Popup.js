import React from "react";
import PopupDeleteCustomer from "../../customers/PopupDeleteCustomer";
import {POPUP} from "../../../constants/constants";
import {useSelector} from "react-redux";
import PopupCreateNewAds from "./PopupCreateNewAds";
import PopupCreateNewInStreamAds from "./PopupCreateNewInStreamAds";
import PopupUpdateCustomer from "../../customers/PopupUpdateCustomer";
import PopupEditContent from "./PopupEditContent";
import PopupDeleteAds from "./PopupDeleteAds";
import PopupDuplicateAds from "./PopupDuplicateAds";
import PopupAddContentList from "./PopupAddContentList";
import PopupEditContentList from "./PopupEditContentList";
import PopupLogout from "../../customers/PopupLogout";
import PopupDeleteLiveItem from "./PopupDeleteLiveItem";
import PopupEditLiveEvent from "./PopupEditLiveEvent";
import PopupCreateCustomer from "../../customers/PopupCreateCustomer";
import PopupCreateLiveEntity from "./PopupCreateLiveEntity";
import PopupUpdateStatusCustomer from "../../customers/PopupUpdateStatusCustomer";
import PopupAddRelay from "./PopupAddRelay";
import PopupEditRelay from "./PopupEditRelay";
import PopupBlockLiveItem from "./PopupBlockLiveItem";
import PopupReloadRelay from "./PopupReloadRelay";
import PopupRelayLiveItem from "./PopupRelayLiveItem";

const Popup = React.memo((props)=>{
    const params = useSelector(state => state?.Popup)
    const {popupName} = params || {}
    switch (popupName) {
    case POPUP.NAME.CUSTOMER.LOGOUT:
        return <PopupLogout {...params} />
    case POPUP.NAME.CUSTOMER.DELETE_CUSTOMER:
        return <PopupDeleteCustomer {...params} />
    case POPUP.NAME.CUSTOMER.UPDATE_CUSTOMER:
        return <PopupUpdateCustomer {...params} />
    case POPUP.NAME.CUSTOMER.UPDATE_STATUS_CUSTOMER:
        return <PopupUpdateStatusCustomer {...params} />
    case POPUP.NAME.CUSTOMER.CREATE_CUSTOMER:
        return <PopupCreateCustomer {...params} />
    case POPUP.NAME.IN_STREAM_ADS.CREATE_INSTREAM_ADS:
        return <PopupCreateNewAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.CREATE_NEW_INSTREAM_ADS:
        return <PopupCreateNewInStreamAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.DELETE_INSTREAM_ADS:
        return <PopupDeleteAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.DUPLICATE_INSTREAM_ADS:
        return <PopupDuplicateAds {...params} />
    case POPUP.NAME.CONTENT.EDIT_CONTENT:
        return <PopupEditContentList {...params} />
    case POPUP.NAME.CONTENT.ADD_CONTENT:
        return <PopupAddContentList {...params} />
    case POPUP.NAME.LIVE_EVENT.DELETE_LIVE_ITEM:
        return <PopupDeleteLiveItem {...params} />
    case POPUP.NAME.LIVE_EVENT.BLOCK_LIVE_ITEM:
        return <PopupBlockLiveItem {...params} />
    case POPUP.NAME.LIVE_EVENT.RELOAD_LIVE_ITEM:
        return <PopupReloadRelay {...params} />
    case POPUP.NAME.LIVE_EVENT.RELAY_LIVE_ITEM:
        return <PopupRelayLiveItem {...params} />
    case POPUP.NAME.LIVE_EVENT.EDIT_LIVE_ITEM:
        return <PopupEditLiveEvent {...params} />
    case POPUP.NAME.LIVE_EVENT.CREATE_LIVE_ENTITY:
        return <PopupCreateLiveEntity {...params} />
    case POPUP.NAME.LIVE_EVENT.ADD_RELAY:
        return <PopupAddRelay {...params} />
    case POPUP.NAME.LIVE_EVENT.EDIT_RELAY:
        return <PopupEditRelay {...params} />
    default:
        return null
}
})
export default Popup
