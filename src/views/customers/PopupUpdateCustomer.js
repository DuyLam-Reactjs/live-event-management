import React, {useState} from "react";
import {
    CBadge,
    CButton,
    CFormGroup, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader, CSwitch,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import CustomerApi from "../../apis/customerApi";
import ConfigText from "../../config/ConfigText";

const PopupUpdateCustomer = (props) => {
  const { userItem, editField, setEditField} = props || {}
  const {email, id} = userItem || {}
  const dispatch = useDispatch()
  const [value, setValue] = useState(editField)
    const [emailValue, setEmail] = useState({
        email:userItem?.email,
        password:'',
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
  const saveCustomer = (item) => {
    let data = [...value];
    CustomerApi.updateInfoCustomer(emailValue?.email, emailValue.password).then(res => {
        if (res?.success){
            setEditField(data)
            dispatch(closePopup())
        }
    })
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
      <CModalHeader style={{ backgroundColor: '#646464' }}>
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
          <CInputGroup className="mb-4">
              <CInputGroupPrepend>
                  <CInputGroupText>
                      <CIcon name="cil-lock-locked" />
                  </CInputGroupText>
              </CInputGroupPrepend>
              <CInput type="password" placeholder="New Password" autoComplete="current-password"
                onChange={onChangePassWord}/>
          </CInputGroup>

      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton className="pl-4 pr-4" color="success" onClick={()=>saveCustomer(userItem)}>{ConfigText.GENERAL.SAVE}</CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}
export default PopupUpdateCustomer
