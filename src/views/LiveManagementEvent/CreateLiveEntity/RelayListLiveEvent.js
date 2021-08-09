import React from "react";
import {CButton, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import RelayLiveEvent from "./RelayLiveEvent";

const RelayListLiveEvent = ({
    name,
    title,
    onAddRelay,
    arrRelay,
    onDeleteRelayItem,
    onEditRelayItem,
    }) => {
    return (
        <>
            <CInputGroup>
                <CInputGroupPrepend>
                    <CInputGroupText>{name}</CInputGroupText>
                </CInputGroupPrepend>
                <CButton className="btnLive inputLive"  onClick={onAddRelay} >{title}</CButton>
            </CInputGroup>
            {arrRelay && (arrRelay || []).map((item, index)=>{
                return (
                    <RelayLiveEvent
                        item={item}
                        onDeleteRelayItem={onDeleteRelayItem}
                        onEditRelayItem={onEditRelayItem}
                        index={index}
                    />
                )
            })}
        </>
    )

}

export default RelayListLiveEvent