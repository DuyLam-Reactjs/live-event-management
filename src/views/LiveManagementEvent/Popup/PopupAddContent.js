import React, {useEffect, useState} from 'react'
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import StatusContentItem from "../ContentList/ItemContentList/StatusContentItem";
import {parsedIdAdsGroups, parsedIdContentProvider} from "../../../helpers/common";
import contentApi from "../../../apis/contentApi";
import GroupNameContentProvider from "../ContentList/GroupNameContentProvider";
import GroupsAdsProvider from "../ContentList/GroupsAdsProvider";

const PopupAddContent = (props) => {

  const {
    modal,
    setPopupAdd,
    dataContentList,
    listAdsGroups
    ,currentItem,
    currentPage,
    rowPerPage,
    setCurrentPageList,
    getListAdsGroups,
    keyWord,
    category,
    type,
    idContentProvider,
    idAdsGroup,
    handleScroll
  } = props || {}

  const {contentProviders} = currentItem || {}
  const arrIdContentProvider = parsedIdContentProvider(contentProviders)
  const arrIdInStreamAds = parsedIdAdsGroups(contentProviders)

  const [idContentProviders, setIdContentProvider] = useState([])
  const [idAdsGroups, setIdAdsGroup] = useState([])
  const [idAndStatus, setIdAndStatus] = useState({
    id:'',
    status: 0
  })


  useEffect(()=>{
    if(idAndStatus?.id) handleChangeIdAdsGroups(idAndStatus)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[idAndStatus?.status])


  const handleClose = () => {
    setPopupAdd(false)
  }
  const handleChangeContentProvider = (item) => {
    const arrNew = [...arrIdContentProvider]
    arrNew.push(item?.id)
    if (arrNew[0] === undefined){
      arrNew.splice(0,1)
      setIdContentProvider(arrNew)
    }else setIdContentProvider(arrNew)
  }
  const handleChangeAds = (item) => {
    setIdAndStatus({...idAndStatus, id: item?.id, status: item?.status})
    handleChangeIdAdsGroups(idAndStatus)
  }
  const onChangeStatus = (item) => {
    if(idAndStatus?.id) {
      setIdAndStatus({...idAndStatus, status: item?.status})
    }
    handleChangeIdAdsGroups(idAndStatus)
  }

  const handleChangeIdAdsGroups = (idAndStatus) => {
    let idAds = [...arrIdInStreamAds]
    idAds.push(idAndStatus)
    if (idAds[0]?.id === undefined){
      idAds.splice(0,1)
      setIdAdsGroup(idAds)
    }else {
      setIdAdsGroup(idAds)
    }
  }
  const handleCreate = () => {
    const idContent = currentItem?.id
    contentApi?.editContent(idContent, idContentProviders, idAdsGroups).then(res=>{
        if (res?.success){
          contentApi?.getContentList(
            currentPage-1,
            rowPerPage,
            keyWord,
            category,
            type,
            idContentProvider,
            idAdsGroup
          ).then(resList =>{
              const data = resList?.data
              if (resList?.success) {
                setCurrentPageList(data?.items)
              }
            }
          )
        setPopupAdd(false)
      }
    })
  }


  return(

    <React.Fragment>
      <CModal
        closeOnBackdrop={false}
        show={modal}
        onClose={handleClose}
        centered={true}
        style={{minWidth:'555px'}}
      >
        <CModalHeader style={{ backgroundColor: '#646464' }}>
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
            <h4 className="mb-0">Add Content</h4>
            <CButton className='p-0 shadow-none' onClick={handleClose}>
              <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex flex-row">
            <GroupNameContentProvider
              dataContentList={dataContentList}
              handleChangeContentProvider={handleChangeContentProvider}
              getListAdsGroups={getListAdsGroups}
              handleScroll={handleScroll}
            />
            <GroupsAdsProvider
              listAdsGroup={listAdsGroups}
              handleChangeAds={handleChangeAds}
            />
            <StatusContentItem
              onChangeStatus={onChangeStatus}
              status ={idAndStatus?.status}
            />
          </div>
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4" color="success" onClick={handleCreate}>Tạo</CButton>
          </div>
        </CModalBody>
      </CModal>
    </React.Fragment>
  )
}
export default PopupAddContent
