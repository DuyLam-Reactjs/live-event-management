import React from "react";
import {CButton, CImg, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import ConfigText from "../../../config/ConfigText";
import ConfigImage from "../../../config/ConfigImage";
import CIcon from "@coreui/icons-react";
import {cilReload, freeSet} from "@coreui/icons";

const RelayLiveEvent = ({
    item, onDeleteRelayItem, onEditRelayItem, index, onReloadLiveItem
}) => {
    return(
        <CInputGroup style={{marginTop: '2px'}}>
            <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.REPLAY}</CInputGroupText>
            </CInputGroupPrepend>
            <div className="relay inputLive">
                <p className="text-name-provider">key: {item?.key}</p>
                <p className="text-name-provider">name: {item?.name}</p>
                <p className="text-name-provider">url: {item?.url}</p>
            </div>
            <CButton className="btn btnLive inputLive inputName" color="success" onClick={()=>onReloadLiveItem(item, index)}>
                <CIcon  content={freeSet.cilReload}/>
            </CButton>
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