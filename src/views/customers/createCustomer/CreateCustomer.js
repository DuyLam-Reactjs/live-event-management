import React, { useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText, CLink,
  CRow, CSwitch
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {validateEmail} from "../../../helpers/common";
import CustomerApi from "../../../apis/customerApi";
import {useHistory} from "react-router";
import ConfigUrl from "../../../config/ConfigUrl";

const CreateCustomer = () => {
  const [createCustomer, setCustomer] = useState({
    email:'',
    password:'',
    partner: 2
  })
  const history = useHistory()
  const [validatedEmail, setValidatedEmail] = useState(false)
  let [error, setError] = useState('')


  const onChangEmail = (e) => {
    const value = e.target.value
    const checkValueEmail = validateEmail(value)
    setValidatedEmail(checkValueEmail)
    setCustomer({...createCustomer, email: value})
  }
  const onChangPassword = (e) => {
    const value = e.target.value
    setCustomer({...createCustomer, password: value})
  }
  const onChangPartner = (e) => {
    const value = e.target.value
    setCustomer({...createCustomer, partner: value})
  }

  const onClickCreatAccount = async () => {
    if (validateEmail(createCustomer?.email)) {
      CustomerApi.createUser(createCustomer).then(res=>{
        const data = res?.data
        if (data?.code === "SUCCESS"){
          history.push(ConfigUrl.user.LOGIN + '?rel=/')
        }else {
          setError(data?.message)
        }
      })
    } else {
      setError('Email không hợp lệ')
    }
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickCreatAccount()
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Register</h1>
                  <p className="text-muted">Create customer</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>@</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="text" placeholder="Email" autoComplete="email"
                            onKeyPress={handleKeyPress}
                            onChange={onChangEmail}/>
                  </CInputGroup>
                  {!validatedEmail && <p className="" style={{color: 'red', textAlign: 'end'}}>{error}</p>}
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>
                        <CIcon name="cil-lock-locked" />
                      </CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="password" placeholder="Password" autoComplete="new-password"
                            onKeyPress={handleKeyPress}
                            onChange={onChangPassword} />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupPrepend>
                      <CInputGroupText>admin</CInputGroupText>
                    </CInputGroupPrepend>
                    <CInput type="number" placeholder="Partner" autoComplete="partner"
                            value={createCustomer?.partner}
                            onKeyPress={handleKeyPress}
                            onChange={onChangPartner}/>
                  </CInputGroup>
                  {error &&
                  <p className="text" style={{color: 'red', textAlign: 'end'}}>{error}</p>
                  }
                  <CButton color="success" block onClick={onClickCreatAccount}>Create Account</CButton>
                  <CLink to="/live/content-live-list">
                    <p className="mt-3 mb-0 register-back">Quay lại Live Event Management Tool</p>
                  </CLink>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}


export default CreateCustomer
