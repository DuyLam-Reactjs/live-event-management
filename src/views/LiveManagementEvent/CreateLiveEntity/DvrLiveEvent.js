import React from "react";
import {CBadge, CInputGroup, CInputGroupPrepend, CInputGroupText, CSwitch} from "@coreui/react";

const DvrLiveEvent = ({onCheckedDvr, checkDvr}) => {
    return (
        <CInputGroup>
            <CInputGroupPrepend>
                <CInputGroupText>{'Dvr'}</CInputGroupText>
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