import React from "react";
import {CInput, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";
import CIcon from "@coreui/icons-react";

const PasswordCustomer = ({error,password, onChangePassWord,placeholder}) => {
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
                        onChange={onChangePassWord}/>
            </CInputGroup>
            {error &&
            <p className="text text__error mb-0">{error?.password}</p>
            }
        </>
    )
}
export default PasswordCustomer