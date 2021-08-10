import React from "react";
import {CInput, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const PasswordCustomer = ({error,password, onChangePassWord,placeholder, onKeyPress}) => {
    return(
        <>
            <CInputGroup className="mb-4">
                <CInputGroupPrepend>
                    <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                    </CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="password" placeholder={placeholder} autoComplete="current-password"
                        value={password}
                        onKeyPress={onKeyPress}
                        onChange={onChangePassWord}/>
            </CInputGroup>
            {error &&
            <p className="text text__error">{error}</p>
            }
        </>
    )
}
export default PasswordCustomer