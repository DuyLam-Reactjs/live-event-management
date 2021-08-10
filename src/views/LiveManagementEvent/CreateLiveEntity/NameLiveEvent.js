import React from "react";
import {CInput, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";



const NameLiveEvent = ({name, onChangName, handleKeyPress, namePlaceHolder, value}) => {
    return (
        <CInputGroup>
            <CInputGroupPrepend>
                <CInputGroupText>{name}</CInputGroupText>
            </CInputGroupPrepend>
            <CInput type="text"
                    placeholder= {namePlaceHolder}
                    onChange={onChangName}
                    onKeyPress={handleKeyPress}
                    value={'' || value}
                    maxLength={100}
                    minLength={3}
            />
        </CInputGroup>
    )
}

export default NameLiveEvent