import React from "react";
import PopupDeleteUser from "../../users/PopupDeleteUser";
import {POPUP} from "../../../constants/constants";
import {useSelector} from "react-redux";
import PopupCreateNewAds from "./PopupCreateNewAds";
import PopupCreateNewInStreamAds from "./PopupCreateNewInStreamAds";
import PopupEditUser from "../../users/PopupEditUser";
import PopupEditContent from "./PopupEditContent";
import PopupDeleteAds from "./PopupDeleteAds";
import PopupDuplicateAds from "./PopupDuplicateAds";
import PopupEditAds from "./PopupEditAds";
import PopupAddContentList from "./PopupAddContentList";
import PopupEditContentList from "./PopupEditContentList";
import PopupLogout from "../../users/PopupLogout";
import PopupDeleteLiveItem from "./PopupDeleteLiveItem";
import PopupEditLiveEvent from "./PopupEditLiveEvent";

const Popup = React.memo((props)=>{
    const params = useSelector(state => state?.Popup)
    const {popupName} = params || {}
    switch (popupName) {
    case POPUP.NAME.USER.LOGOUT:
        return <PopupLogout {...params} />
    case POPUP.NAME.USER.DELETE_USER:
        return <PopupDeleteUser {...params} />
    case POPUP.NAME.USER.EDIT_USER:
        return <PopupEditUser {...params} />
    case POPUP.NAME.IN_STREAM_ADS.CREATE_INSTREAM_ADS:
        return <PopupCreateNewAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.CREATE_NEW_INSTREAM_ADS:
        return <PopupCreateNewInStreamAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.DELETE_INSTREAM_ADS:
        return <PopupDeleteAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.DUPLICATE_INSTREAM_ADS:
        return <PopupDuplicateAds {...params} />
    case POPUP.NAME.IN_STREAM_ADS.EDIT_INSTREAM_ADS:
        return <PopupEditAds {...params} />
    case POPUP.NAME.CONTENT.EDIT_CONTENT:
        return <PopupEditContentList {...params} />
    case POPUP.NAME.CONTENT.ADD_CONTENT:
        return <PopupAddContentList {...params} />
    case POPUP.NAME.LIVE_EVENT.DELETE_LIVE_ITEM:
        return <PopupDeleteLiveItem {...params} />
    case POPUP.NAME.LIVE_EVENT.EDIT_LIVE_ITEM:
        return <PopupEditLiveEvent {...params} />
    default:
        return null
}
})
export default Popup
