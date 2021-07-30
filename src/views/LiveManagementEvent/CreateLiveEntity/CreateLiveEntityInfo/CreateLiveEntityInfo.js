import React, {useEffect, useState} from 'react'
import {
  CBadge,
  CButton,
  CCol,
  CInput,
  CInputGroup,
  CLink,
  CRow,
  CSwitch,
} from "@coreui/react";
import contentApi from "../../../../apis/contentApi";
import {useHistory, useLocation} from "react-router";
import {handleLocalStorage, sendToast} from "../../../../helpers/common";
import LocalStorage from "../../../../config/LocalStorage";
import LiveEventApi from "../../../../apis/liveEventApi";


const queryString = require('query-string');

const CreateLiveEntityInfo =  (props) => {

  const { dataItem, setDisable, isCreateProvider} = props

  const location = useLocation()
  const history = useHistory()
  const parsedID = queryString.parse(location.search)
  const { name, status, is_default, description} = dataItem || {}

  const isStatus = status === 1
  const isDefault = is_default === 1

  const [valueNameContent, setValueName] = useState(  '')
  const [checkDvr, setDvr] = useState( false)
  const [desc, setDesc] = useState(  '')

  const [valueCheckStatus, setValueStatus] = useState(status || 1)
  const [isBack, setIsBack] = useState(false)

  const [checkAds, setAds] = useState( isDefault || true)

  const [valueCheckDefault, setValueDefault] = useState(is_default || 1)




  useEffect(()=>{
  if (!isCreateProvider){
    setDvr(isStatus)
    setAds(isDefault)
    setValueStatus(status)
    setValueDefault(is_default)
    setValueName(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isDefault, isStatus ,name])


  const onChangeNameLiveEntity = (e) => {
    const value = e.target.value
    setValueName(value)
  }
  const onChangeDescription = (e) => {
    const value = e.target.value
    setDesc(value)
  }
  const onCheckedDvr = (e) =>{
    const value = e.target.checked
    setDvr(value)
  }
  const onCheckedAds = (e) =>{
    const value = e.target.checked
    setAds(value)
    if (value) setValueDefault(1)
    else setValueDefault(0)
  }

  const onSave = () => {
    if (!valueNameContent){
      sendToast({message: 'Vui lòng nhập tên Live Entity'})
    }else {
      const relay = [
        {
          "key": "",
          "name": "test11",
          "url": ""
        }
      ]
      const presetId = 'hd'
      LiveEventApi.setLiveEntity(
        valueNameContent,
        desc,
        checkDvr,
        relay,
        presetId,
      ).then(res => {
        if (res.success){
          history.push('/live/content-live-list')
          window.location.reload()
        }
      })
    }
  }

  return(
    <div className="p-4 mb-4" style={{backgroundColor: 'white'}}>
      <CRow className="justify-content-between pb-4" >
        <CCol className="col-lg-9">
          <h5 className="mb-0 font-weight-bold">THÔNG TIN LIVE ENTITY</h5>
        </CCol>
        <CCol className="col-lg-2">
          <CButton block color="success" onClick={onSave}>{ 'Lưu' }</CButton>
        </CCol>
        <CCol className="col-lg-1">
          <CLink to="/live/content-live-list">
            <CButton block color="danger">Huỷ</CButton>
          </CLink>
        </CCol>
      </CRow>
      <div className="d-flex flex-row justify-content-between">
        <div className="pr-3">
          <CInputGroup>
            <span className='mr-2 mt-2'>Tên</span>
            <CInput type="text" value={valueNameContent || ''}
                    placeholder="Nhập tên Live Entity"
                    style={{borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}
                    onChange={onChangeNameLiveEntity}  />
          </CInputGroup>
        </div>
        <div className="pr-3">
          <span className=' mt-2' style={{verticalAlign: 'super'}}>Trạng thái</span>
          <CBadge >
            <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                     onChange={onCheckedDvr}
                     checked={!!checkDvr}/>
          </CBadge>
        </div>
        {/*<div className="pr-3">*/}
        {/*  <span className=' mt-2' style={{verticalAlign: 'super'}}>Mặc định hiện ads</span>*/}
        {/*  <CBadge >*/}
        {/*    <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}*/}
        {/*             onChange={onCheckedAds} checked={!!checkAds }/>*/}
        {/*  </CBadge>*/}
        {/*</div>*/}
        <div className="pr-3">
          <CInputGroup>
            <span className='mr-2 mt-2'>Thông tin thêm</span>
            <CInput  type="text" value={(desc || description) || ''}
                     style={{borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}
                     placeholder="Nhập thông tin thêm" onChange={onChangeDescription}
                      maxLength={256}/>
          </CInputGroup>
        </div>
      </div>
    </div>
  )
}

export default CreateLiveEntityInfo
