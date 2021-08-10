import React, {useState} from "react";
import {
    CButton,
    CForm, CInput, CInputGroup, CInputGroupPrepend, CInputGroupText, CLink,
    CModal,
    CModalBody, CModalFooter,
    CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import {validateEmail, validatePassword} from "../../helpers/common";
import CustomerApi from "../../apis/customerApi";
import ConfigText from "../../config/ConfigText";
import customerApi from "../../apis/customerApi";
import EmailCustomer from "./basicCustomer/EmailCustomer";
import PasswordCustomer from "./basicCustomer/PasswordCustomer";

const PopupCreateCustomer = ({
   rowPerPage,
   setCurrentPage,
   setCurrentPageList
 }) => {
  const [createCustomer, setCustomer] = useState({
    email:'',
    password:'',
    partner: 2
  })
  let [error, setError] = useState({
    email:'',
    password: ''
  })


  const onChangEmail = (e) => {
    const value = e.target.value
    setCustomer({...createCustomer, email: value})
  }
  const onChangePassword = (e) => {
    const value = e.target.value
    setCustomer({...createCustomer, password: value})
  }
  const onChangPartner = (e) => {
    const value = e.target.value
    setCustomer({...createCustomer, partner: value})
  }

  const onClickCreatAccount = async () => {
    const checkValuePassword = validatePassword(createCustomer?.password)
    const checkValueEmail  = validateEmail(createCustomer?.email)
    if (checkValueEmail && checkValuePassword) {
      CustomerApi.createCustomer(createCustomer).then(res=>{
        const data = res?.data
        if (data?.code === "SUCCESS"){
          customerApi?.listCustomers(rowPerPage,  0 ).then(resp => {
            const data = resp?.data
            if (resp?.success){
              setCurrentPageList(data?.customers)
                setCurrentPage(1)
            }
          })
          dispatch(closePopup())
        }else {
          setError(data?.message)
        }
      })
    } else if (!checkValueEmail) {
      setError({...error, email: ConfigText.CUSTOMER.INVALID_EMAIL})
    }else if (!checkValuePassword) {
      setError({...error, password: ConfigText.CUSTOMER.INVALID_PASSWORD})
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickCreatAccount && onClickCreatAccount()
    }
  }


  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(closePopup())
  }
  return(
    <CModal
      centered={true}
      show={true}
      closeOnBackdrop={false}
    >
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">{ConfigText.CUSTOMER.REGISTER}</h4>
          <CButton className='p-0 shadow-none' onClick={onClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        <CForm>
            <p className="text-muted">{ConfigText.CUSTOMER.CREATE_ACCOUNT}</p>
            <EmailCustomer
                error={error}
                onChangeUserName={onChangEmail}
                onKeyPress={handleKeyPress}
            />
            <PasswordCustomer
                placeholder={'Password'}
                error={error}
                onChangePassWord={onChangePassword}
                onKeyPress={handleKeyPress}
            />
          {/*<CInputGroup className="mb-3">*/}
          {/*  <CInputGroupPrepend>*/}
          {/*    <CInputGroupText>admin</CInputGroupText>*/}
          {/*  </CInputGroupPrepend>*/}
          {/*  <CInput type="number" placeholder="Partner" autoComplete="partner"*/}
          {/*          value={createCustomer?.partner}*/}
          {/*          onKeyPress={handleKeyPress}*/}
          {/*          onChange={onChangPartner}/>*/}
          {/*</CInputGroup>*/}
        </CForm>
      </CModalBody>
        <CModalFooter>
            <div className="d-flex justify-content-end">
                <CButton className="btn btnLive pl-4 pr-4" block onClick={onClickCreatAccount}>{ConfigText.CUSTOMER.CREATE_ACCOUNT}</CButton>
            </div>
        </CModalFooter>
    </CModal>
  )
}

export default PopupCreateCustomer
