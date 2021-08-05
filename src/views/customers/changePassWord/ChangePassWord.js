import React, {useEffect, useState} from 'react'
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
  CInputGroupText, CLink,
  CRow
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import CustomerApi from "../../../apis/customerApi";
import {useDispatch} from "react-redux";
import {getCustomer} from "../../../actions/customer";
import {useHistory} from "react-router";
import ConfigUrl from "../../../config/ConfigUrl";

const ChangePassWord = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(()=>{
    function getList () {
      dispatch(getCustomer())
    }
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const [changePassWord, setChangePassword] = useState({
    old_password: '',
    new_password: ''
  })

  const onChangeOldPassword = (e) => {
    const value = e.target.value
    setChangePassword({...changePassWord, old_password: value})
  }
  const onChangeNewPassword = (e) => {
    const value = e.target.value
    setChangePassword({...changePassWord, new_password: value})
  }

  const onAppLyPassword = async () => {
    await CustomerApi.changePassword(changePassWord?.old_password, changePassWord?.new_password).then(res=>{
      if (res){
        history.push(ConfigUrl.user.LOGIN + '?rel=/')
      }
    })
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onAppLyPassword()
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
                    <h1>Đổi Mật Khẩu</h1>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="Old Password" autoComplete="current-password"
                              onKeyPress={handleKeyPress}
                              onChange={onChangeOldPassword} />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput type="password" placeholder="New Password" autoComplete="current-password"
                              onChange={onChangeNewPassword}
                              onKeyPress={handleKeyPress}/>
                    </CInputGroup>
                    <CButton color="success" block className="px-4"
                             onClick={onAppLyPassword}>Xác nhận</CButton>
                    <CLink to="/live/content-live-list">
                      <p className="mt-3 mb-0 register-back">Quay lại Instream Ads Tool</p>
                    </CLink>
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

export default ChangePassWord
