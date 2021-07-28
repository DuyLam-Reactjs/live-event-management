import React, { useState} from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {validateEmail, saveAccessToken, handleLocalStorage} from "../../../helpers/common";

import {
  useHistory, useLocation,
} from "react-router-dom"
import UserApi from "../../../apis/userApi";
import LocalStorage from "../../../config/LocalStorage";


const queryString = require('query-string');


const Login = () => {
  const [emailValue, setEmail] = useState({
    email:'devtest1905@vieon.vn',
    password:'String1905@',
  })
  const history = useHistory()
  const location = useLocation();

  const parsedURL = queryString.parse(location.search)

  const [error, setError] = useState({
    errorUserName: '',
    errorPassword: '',
  })


  const onChangeUserName = (e) => {
    const value = e.target?.value
    setEmail({...emailValue, email: value})
  }
  const onChangePassWord = (e) => {
    const value = e.target.value
    setEmail({...emailValue, password: value})
  }

  const onLogin = async () => {
    const timeNow = new Date()
    timeNow.setFullYear(timeNow.getFullYear() + 1)
    const checkValueEmail = validateEmail(emailValue?.email)
    if (checkValueEmail){
      UserApi.login(emailValue?.email, emailValue?.password).then(res=>{
        const data = res?.data
        const apiKey = data?.apiKey
        const idUser = data?.id
        handleLocalStorage(LocalStorage.SET, 'idUser', idUser)
        const url = parsedURL?.rel
        saveAccessToken(apiKey)

        if (apiKey){
          history.push(
              url !== '/'
              ? url
              : '/live/content-live-list')
          // save cookie
        }else {
          setError({...error, errorPassword: data?.message})
        }
      })
    }else {
      setError({...error, errorUserName: 'Email không hợp lệ' })
    }

  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onLogin()
    }
  }

  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md="9" lg="7" xl="6">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-muted">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="text" placeholder="Username" autoComplete="username"
                              value={emailValue.email}
                              onChange={onChangeUserName}
                              onKeyPress={handleKeyPress}/>
                    </CInputGroup>
                    {error?.errorUserName &&
                      <p className="text" style={{color: 'red', textAlign: 'end'}}>{error?.errorUserName}</p>
                    }
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Password" autoComplete="current-password"
                              value={emailValue.password}
                              onChange={onChangePassWord}
                              onKeyPress={handleKeyPress}/>
                    </CInputGroup>
                    {error?.errorPassword &&
                      <p  style={{color: 'red', textAlign: 'end'}}>{error?.errorPassword}</p>
                    }
                    <CButton color="success" className="px-4" block onClick={onLogin}>Login</CButton>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
