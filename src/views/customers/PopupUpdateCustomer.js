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

const PopupUpdateCustomer = ({ item, editField, setEditField}) => {
  const {email, id} = item || {}
  const dispatch = useDispatch()
  const [value, setValue] = useState(editField)
    const [emailValue, setEmail] = useState({
        email: item?.email,
        password:'',
    })
  const [error, setError] =  useState({
      email: '',
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
  const saveCustomer = () => {
      const password = validatePassword(emailValue?.password)
      const email  = validateEmail(emailValue?.email)
      if (password && email) {
          CustomerApi.updateInfoCustomer(id, emailValue?.email, emailValue?.password).then(res => {
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

    const handleChange = (item, e) => {
        let data = [...editField];
        const index = data.findIndex(obj => obj.id === item.id);
        data[index].role[e.target.name] = e.target.checked
        setEditField(data);
        setValue(data)
    }
  return (
    <CModal closeOnBackdrop={false} show={true} onClose={handleClose} centered={true} size={''}>
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">Customer Name: {email} </h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
          <CInputGroup className="mb-4 mt-4">
              <CInputGroupPrepend>
                  <CInputGroupText>@</CInputGroupText>
              </CInputGroupPrepend>
              <CInput type="text" placeholder="Email" autoComplete="email" value={emailValue?.email}
                onChange={onChangeUserName}/>
          </CInputGroup>
          {error &&
            <p className="text text__error">{error?.email}</p>
          }
          <CInputGroup className="mb-4">
              <CInputGroupPrepend>
                  <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
              </CInputGroupPrepend>
              <CInput type="password" placeholder="New Password" autoComplete="current-password"
                onChange={onChangePassWord}/>
          </CInputGroup>
          {error &&
            <p className="text text__error mb-0">{error?.password}</p>
          }
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton className="pl-4 pr-4" color="success" onClick={saveCustomer}>{ConfigText.GENERAL.SAVE}</CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}
export default PopupUpdateCustomer
