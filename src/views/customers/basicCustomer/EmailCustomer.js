import React from "react";
import {CInput, CInputGroup, CInputGroupPrepend, CInputGroupText} from "@coreui/react";

const EmailCustomer = ({error,email, onChangeUserName, onKeyPress}) => {
    return(
        <>
            <CInputGroup className="mb-4 mt-4">
                <CInputGroupPrepend>
                    <CInputGroupText>@</CInputGroupText>
                </CInputGroupPrepend>
                <CInput type="text" placeholder="Email" autoComplete="email" value={email}
                        onKeyPress={onKeyPress}
                        onChange={onChangeUserName}/>
            </CInputGroup>
            {error &&
            <p className="text text__error">{error?.email}</p>
            }
        </>
    )
}
export default EmailCustomer