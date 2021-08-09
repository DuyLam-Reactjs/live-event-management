import React from "react";
import {CBadge, CInputGroup, CInputGroupPrepend, CInputGroupText, CSwitch} from "@coreui/react";
import ConfigText from "../../../config/ConfigText";

const DvrLiveEvent = ({onCheckedDvr, checkDvr}) => {
    return (
        <CInputGroup>
            <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.DVR}</CInputGroupText>
            </CInputGroupPrepend>
            <CBadge >
                <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                         onChange={onCheckedDvr}
                         checked={!!checkDvr}/>
            </CBadge>
        </CInputGroup>
    )
}
export default DvrLiveEvent