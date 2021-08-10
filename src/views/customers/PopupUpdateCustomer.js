import React, {useState} from "react";
import {
    CButton,
    CInput, CInputGroup, CInputGroupPrepend, CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import CustomerApi from "../../apis/customerApi";
import ConfigText from "../../config/ConfigText";
import {validateEmail, validatePassword} from "../../helpers/common";
import EmailCustomer from "./basicCustomer/EmailCustomer";
import PasswordCustomer from "./basicCustomer/PasswordCustomer";

const PopupUpdateCustomer = ({id, status, email}) => {
  const dispatch = useDispatch()
    const [emailValue, setEmail] = useState({
        email: email || '',
        password:'',
        oldPassword: '',
    })
  const [error, setError] =  useState({
      email: '',
      oldPassword: '',
      password: ''
  })
  const handleClose = () => {
      dispatch(closePopup())
  }

    const onChangeUserName = (e) => {
        const value = e.target?.value
        setEmail({...emailValue, email: value})
    }
    const onChangePassWord = (e) => {
        const value = e.target.value
        setEmail({...emailValue, password: value})
    }
    const onChangeOldPassWord = (e) => {
        const value = e.target.value
        setEmail({...emailValue, oldPassword: value})
    }
  const saveCustomer = () => {
      const password = validatePassword(emailValue?.password)
      const email  = validateEmail(emailValue?.email)
      if (password && email) {
          CustomerApi.updateInfoCustomer(id, emailValue?.email, emailValue?.password, emailValue?.oldPassword, status ).then(res => {
              if (res?.success) {
                  dispatch(closePopup())
              }
          })
      }else if (!email) {
          setError({...error, email: ConfigText.CUSTOMER.INVALID_EMAIL})
      } else if(!password){
          setError({...error, password: ConfigText.CUSTOMER.INVALID_PASSWORD})
      }
  }

  return (
    <CModal closeOnBackdrop={false} show={true} onClose={handleClose} centered={true} size={''}>
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">{'Customer Name: ' + email} </h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
          <EmailCustomer
              error={error}
              email={emailValue?.email}
              onChangeUserName={onChangeUserName}
          />
          <PasswordCustomer
              placeholder={'Old Password'}
              error={error}
              password={emailValue?.oldPassword}
              onChangePassWord={onChangeOldPassWord}
          />
          <PasswordCustomer
            placeholder={'New Password'}
            error={error}
            password={emailValue?.password}
            onChangePassWord={onChangePassWord}
          />
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton className="btnLive pl-4 pr-4 "  onClick={saveCustomer}>{ConfigText.GENERAL.SAVE}</CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}
export default PopupUpdateCustomer
