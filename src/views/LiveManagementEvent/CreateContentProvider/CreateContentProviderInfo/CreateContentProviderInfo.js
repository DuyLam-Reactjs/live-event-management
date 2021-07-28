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


const queryString = require('query-string');

const CreateContentProviderInfo =  (props) => {

  const { dataItem, setDisable, isCreateProvider} = props

  const location = useLocation()
  const parsedID = queryString.parse(location.search)
  const { name, status, is_default, description} = dataItem || {}

  const isStatus = status === 1
  const isDefault = is_default === 1

  const [valueNameContent, setValueName] = useState( name || '')
  const [checkStatus, setStatus] = useState( isStatus || true)


  const [valueCheckStatus, setValueStatus] = useState(status || 1)
  const [isBack, setIsBack] = useState(false)

  const [checkAds, setAds] = useState( isDefault || true)

  const [valueCheckDefault, setValueDefault] = useState(is_default || 1)
  const [desc, setDesc] = useState(  '')
  const history = useHistory()


  useEffect(()=>{
  if (!isCreateProvider){
    setStatus(isStatus)
    setAds(isDefault)
    setValueStatus(status)
    setValueDefault(is_default)
    setValueName(name)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[isDefault, isStatus ,name])


  const onChangeNameContent = (e) => {
    const value = e.target.value
    setValueName(value)
    if (value === '' && !dataItem) {
      setDisable('')
      setIsBack(false)
    }
  }
  const onChangeDescription = (e) => {
    const value = e.target.value
    setDesc(value)
  }
  const onCheckedStatus = (e) =>{
    const value = e.target.checked
    setStatus(value)
    if (value) setValueStatus(1)
    else setValueStatus(0)

  }

  const onCheckedAds = (e) =>{
    const value = e.target.checked
    setAds(value)
    if (value) setValueDefault(1)
    else setValueDefault(0)
  }

  const onSave = () => {
    if (parsedID?.id) {
      contentApi.editContentProvider(
        valueNameContent || name,
        valueCheckStatus,
        valueCheckDefault,
        desc || description,
        parsedID?.id,
      ).then(res => {
        if (res.success){
          history.push('/live/content-live-list')
          window.location.reload()
        }
      })
    } else
    if (valueNameContent && !isBack){
      const idContentProvider = handleLocalStorage(LocalStorage.GET, LocalStorage.CONTENT_PROVIDER)
      if (idContentProvider){
        contentApi.editContentProvider(
          valueNameContent,
          valueCheckStatus,
          valueCheckDefault,
          desc,
          idContentProvider,
        ).then(res => {
          if (res?.success){
            setDisable(valueNameContent)
            setIsBack(true)
          }
        })
      }else {
        contentApi.createContentProvider(valueNameContent , valueCheckStatus, valueCheckDefault, desc).then(res=>{
          const data = res?.data
          const idContent = data?.id
          if (res.success){
            handleLocalStorage(LocalStorage.SET, LocalStorage.CONTENT_PROVIDER, idContent)
            setDisable(valueNameContent)
            setIsBack(true)
          }
        })
      }
    }
    if (isBack) {
      const idContentProvider = handleLocalStorage(LocalStorage.GET, LocalStorage.CONTENT_PROVIDER)
      if (idContentProvider){
        contentApi.editContentProvider(
          valueNameContent || name,
          valueCheckStatus,
          valueCheckDefault,
          desc || description,
          idContentProvider,
        ).then(res => {
          if (res?.success){
            setDisable(valueNameContent)
          }
        })
      }
      handleLocalStorage(LocalStorage.REMOVE, LocalStorage.CONTENT_PROVIDER)
      history.push('/instream-ads/content-provider-list')
      window.location.reload()
    }
    if (!valueNameContent){
      sendToast({message: 'Vui lòng nhập tên Content Provider'})
    }

  }

  return(
    <div className="p-4 mb-4" style={{backgroundColor: 'white'}}>
      <CRow className="justify-content-between pb-4" >
        <CCol className="col-lg-9">
          <h5 className="mb-0 font-weight-bold">THÔNG TIN CONTENT PROVIDER</h5>
        </CCol>
        <CCol className="col-lg-2">
          {/*<CButton block color="success" onClick={onSave}>{!valueNameContent ? 'Tạo' : isBack ? 'Trở về ' : 'Lưu' }</CButton>*/}
          <CButton block color="success" onClick={onSave}>{ 'Lưu' }</CButton>
        </CCol>
        <CCol className="col-lg-1">
          <CLink to="/instream-ads/content-provider-list">
            <CButton block color="danger">Huỷ</CButton>
          </CLink>
        </CCol>
      </CRow>
      <div className="d-flex flex-row justify-content-between">
        <div className="pr-3">
          <CInputGroup>
            <span className='mr-2 mt-2'>Tên</span>
            <CInput type="text" value={valueNameContent || ''}
                    placeholder="Nhập tên Content Provider"
                    style={{borderTopLeftRadius: '0.25rem', borderBottomLeftRadius: '0.25rem'}}
                    onChange={onChangeNameContent}  />
          </CInputGroup>
        </div>
        <div className="pr-3">
          <span className=' mt-2' style={{verticalAlign: 'super'}}>Trạng thái</span>
          <CBadge >
            <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                     onChange={onCheckedStatus}
                     checked={!!checkStatus}/>
          </CBadge>
        </div>
        <div className="pr-3">
          <span className=' mt-2' style={{verticalAlign: 'super'}}>Mặc định hiện ads</span>
          <CBadge >
            <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                     onChange={onCheckedAds} checked={!!checkAds }/>
          </CBadge>
        </div>
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

export default CreateContentProviderInfo
