import React, {useEffect, useState} from 'react'
import {CButton, CModal, CModalBody, CModalFooter, CModalHeader, CRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import {useDispatch} from "react-redux";
import {closePopup} from "../../../actions/popup";
import inStreamAdsApi from "../../../apis/liveEventApi";
import {handleLocalStorage, sendToast} from "../../../helpers/common";
import LocalStorage from "../../../config/LocalStorage";



const PopupDuplicateAds = (props) => {
  const {
    newData, setNewData,
    itemAds,
    parsedID
  } = props

  const [dataInStreamAds, setDataAds] = useState({
    group: 'default',
    type: 'Pre-roll',
    vast_url: {url_1: '', url_2: '', url_3: '', bumper: ''},
    status: 1,
    can_skip: true,
    skip_after: 5,
    platform: '',
    is_all_platform: true,
    content: {
      id:'',
      title:''
    }
  })
  const dispatch = useDispatch()

  useEffect(()=>{
    if (itemAds)
      setDataAds(itemAds)
  },[itemAds])

  const handleClose = () => {
    dispatch(closePopup())
  }
  const onChangeNameGroup = (value) => {
    setDataAds({...dataInStreamAds, group: value})
  }
  const onChangeTimeSkip = (value) => {
    setDataAds({...dataInStreamAds, skip_after: value})
  }
  const onChangeType = (item) =>{
    setDataAds({...dataInStreamAds, type: item })
  }
  const onChangeStatus = (item) => {
    setDataAds({...dataInStreamAds, status: item?.status})
  }
  const onChangeSkip = (item) => {
    setDataAds({...dataInStreamAds, can_skip: item?.can_skip})
  }
  const onChangePlatform = (item) => {
    setDataAds({...dataInStreamAds, platform: item?.name, is_all_platform: item?.is_all_platform})
  }
  const setVastUrl = (vastUrl) => {
    setDataAds({
      ...dataInStreamAds,
      vast_url: vastUrl
    })
  }

  const setContent = (content) => {
    const title = content?.name
    const id = content?.id
    const newContent = new Object({id, title})
    setDataAds({...dataInStreamAds, content: newContent})
  }


  const onCreateInStreamAds = () => {
    let idContentProvider = handleLocalStorage(LocalStorage.GET, LocalStorage.CONTENT_PROVIDER)
    if (dataInStreamAds?.content?.id) {
      if (dataInStreamAds?.group){
        inStreamAdsApi.setInStreamAds(dataInStreamAds, parsedID?.id || idContentProvider, false).then(res=>{
          const data = res?.data
          if (res?.success){
            const newDataGroup = [...newData, data]
            const sortNewDataGroup = newDataGroup.reverse()
            setNewData(sortNewDataGroup)
            dispatch(closePopup())
          }
          else {
            sendToast({message: data?.message})
          }
        })
      }
      else {
        sendToast({message: 'Tên nhóm là trường bắt buộc. '})
      }
    }else {
      if (dataInStreamAds?.group){
        inStreamAdsApi.setInStreamAds(dataInStreamAds, parsedID?.id || idContentProvider, true).then(res=>{
          const data = res?.data
          if (res?.success){
            const newDataGroup = [...newData, data]
            const sortNewDataGroup = newDataGroup.reverse()
            setNewData(sortNewDataGroup)
            dispatch(closePopup())
          }
          else {
            sendToast({message: data?.message})
          }
        })
      }else {
        sendToast({message: 'Tên nhóm là trường bắt buộc.'})
      }

    }
  }

  return(
    <>
    <CModal
      closeOnBackdrop={false}
      show={true} onClose={handleClose} centered={true} size={'xl'}>
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">Thông tin quảng cáo </h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        {/*<CRow className={'justify-content-between'} >*/}
        {/*  <GroupInStreamAds*/}
        {/*    itemAds={dataInStreamAds}*/}
        {/*    onChangeNameGroup={onChangeNameGroup}*/}
        {/*  />*/}
        {/*  <TypeInStreamAds*/}
        {/*    itemAds={dataInStreamAds}*/}
        {/*    dataInStreamAdsType={dataInStreamAdsType}*/}
        {/*    onChangeType={onChangeType}*/}
        {/*  />*/}
        {/*  <VastUrlInStreamAds*/}
        {/*    itemAds={dataInStreamAds}*/}
        {/*    setVastUrl={setVastUrl}*/}
        {/*    dataInStreamAdsType={dataInStreamAdsType}*/}
        {/*  />*/}
        {/*  <StatusInStreamAds*/}
        {/*      itemAds={dataInStreamAds}*/}
        {/*    dataInStreamAdsStatus={dataInStreamAdsStatus}*/}
        {/*    onChangeStatus={onChangeStatus}*/}
        {/*  />*/}
        {/*  <SkipInStreamAds*/}
        {/*      itemAds={dataInStreamAds}*/}
        {/*    dataInStreamAdsSkip={dataInStreamAdsSkip}*/}
        {/*    onChangeSkip={onChangeSkip}*/}
        {/*  />*/}
        {/*  <SkipAfterInStreamAds*/}
        {/*      itemAds={dataInStreamAds}*/}
        {/*    onChangeTimeSkip={onChangeTimeSkip}*/}
        {/*  />*/}
        {/*  <PlatformInStreamAds*/}
        {/*      itemAds={dataInStreamAds}*/}
        {/*    onChangePlatform={onChangePlatform}*/}
        {/*    dataInStreamAdsPlatForm={dataInStreamAdsPlatForm}*/}
        {/*  />*/}
        {/*  <ContentInStreamAds*/}
        {/*    itemAds={dataInStreamAds}*/}
        {/*    dataInStreamAdsContent={dataInStreamAdsContent}*/}
        {/*    setContent={setContent}*/}
        {/*    dataInStreamAdsType={dataInStreamAdsType}*/}
        {/*  />*/}
        {/*</CRow>*/}
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end mt-3">
          <CButton className="pl-4 pr-4" color="success" onClick={onCreateInStreamAds}>{'Tạo'}</CButton>
        </div>
      </CModalFooter>
    </CModal>
    </>
  )
}
const dataInStreamAdsType = [
  {id:'Pre-roll',name: 'Pre-roll'},
  {id:'Mid-roll', name: 'Mid-roll'}
]
const dataInStreamAdsStatus = [
  {id: 'show', name: 'Hiện', status: 1},
  {id: 'hide', name: 'Ẩn', status: 0},
]
const dataInStreamAdsSkip = [
  {id: 'yes', name: 'Có', can_skip: true},
  {id: 'no', name: 'Không', can_skip: false}
]
const dataInStreamAdsPlatForm = [
  {id: 'all', name: 'Tất cả', is_all_platform: true},
  {id: 'web', name:'Web', is_all_platform: false},
  {id: 'iOS', name:'iOS', is_all_platform: false},
  {id: 'Android', name:'Android', is_all_platform: false},
  {id: 'AndroidTV', name:'AndroidTV', is_all_platform: false},
  {id: 'Samsung-TV', name:'Samsung-TV', is_all_platform: false},
  {id: 'LG-TV', name:'LG-TV', is_all_platform: false},
]
const dataInStreamAdsContent = [
  {id: 'all', name: 'Tất cả', is_all_content: true},
  {id: 'filter', name: 'Chọn nội dung ...', is_all_content: false},
]
export default PopupDuplicateAds
