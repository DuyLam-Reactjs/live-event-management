import React from "react";
import {CButton, CImg, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import ConfigText from "../../../config/ConfigText";
import ConfigImage from "../../../config/ConfigImage";

const RelayLiveEvent = ({
    item, onDeleteRelayItem, onEditRelayItem, index
}) => {
    return(
        <CInputGroup style={{marginTop: '2px'}}>
            <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.REPLAY}</CInputGroupText>
            </CInputGroupPrepend>
            <div className="relay inputLive">
                <p>key: {item?.key}</p>
                <p>name: {item?.name}</p>
                <p>url: {item?.url}</p>
            </div>
            <CButton className="btn inputLive inputName" color={'info'}  onClick={()=>onEditRelayItem(item, index)} >
                <CImg src={ConfigImage.edit} alt="edit"/>
            </CButton>
            <CButton className="btn btn-danger inputLive"  onClick={()=>onDeleteRelayItem(item, index)} >
                <CImg src={ConfigImage.deleteAds} alt="delete"/>
            </CButton>
        </CInputGroup>
    )
}

export default RelayLiveEvent