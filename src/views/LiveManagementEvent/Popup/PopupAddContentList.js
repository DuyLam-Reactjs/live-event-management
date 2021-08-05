import React, {useEffect, useState} from 'react'
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {parsedIdAdsGroups, parsedIdContentProvider, parsedPageLimit} from "../../../helpers/common";
import contentApi from "../../../apis/contentApi";

import {useDispatch} from "react-redux";
import {closePopup} from "../../../actions/popup";
import inStreamAdsApi from "../../../apis/liveEventApi";

const PopupAddContentList = (props) => {

  const {
    currentItem,
    currentPage,
    rowPerPage,
    setCurrentPageList,
    keyWord,
    category,
    type,
    idContentProvider,
    idAdsGroup,

  } = props || {}

  const [currentPageProvider, setPageProvider] = useState(0)
  const [dataContentList, setDataProvider] = useState([])
  const [metadataProvider, setMetadataProvider] = useState()

  const [listAdsGroups, setListAdsGroups] = useState([])

  const getListAdsGroups = (id) => {
    inStreamAdsApi.getListAllInStreamAds(id).then(res =>{
      const data = res?.data
      if (res?.success){
        setListAdsGroups(data?.items)
      }
    })
  }
  useEffect( ()=>{
    async function getList () {
      contentApi.getListContentLive(10, currentPageProvider).then(res=>{
        const data = res?.data
        if (res?.success) {
          setMetadataProvider(data?.metadata)
          let dataList = [...dataContentList]
          let newDataList = dataList.concat(data?.items)
          setDataProvider(newDataList)
        }
      })
    }
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPageProvider])


  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", handleScroll);
    }
    watchScroll()
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  const handleScroll = () => {
    const { page, limit, total } = metadataProvider || {}
    let maxPage = parsedPageLimit(total, limit)

    if ((page + 1) * limit >= total && (page + 1) > maxPage) return
    setPageProvider((page || 0) + 1 )
  }
  const dispatch = useDispatch()
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
    dispatch(closePopup())
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
                dispatch(closePopup())
              }
            }
          )
      }
    })
  }


  return(

    <React.Fragment>
      <CModal
        closeOnBackdrop={false}
        show={true}
        onClose={handleClose}
        centered={true}
        style={{minWidth:'555px'}}
      >
        <CModalHeader className="colorHeader">
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
            <h4 className="mb-0">Add Content</h4>
            <CButton className='p-0 shadow-none' onClick={handleClose}>
              <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          <div className="d-flex flex-row">
            {/*<GroupNameContentProvider*/}
            {/*  dataContentList={dataContentList}*/}
            {/*  handleChangeContentProvider={handleChangeContentProvider}*/}
            {/*  getListAdsGroups={getListAdsGroups}*/}
            {/*  handleScroll={handleScroll}*/}
            {/*/>*/}
            {/*<GroupsAdsProvider*/}
            {/*  listAdsGroup={listAdsGroups}*/}
            {/*  handleChangeAds={handleChangeAds}*/}
            {/*/>*/}
            {/*<StatusContentItem*/}
            {/*  onChangeStatus={onChangeStatus}*/}
            {/*  status ={idAndStatus?.status}*/}
            {/*/>*/}
          </div>
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4" color="success" onClick={handleCreate}>Tạo</CButton>
          </div>
        </CModalBody>
      </CModal>
    </React.Fragment>
  )
}
export default PopupAddContentList
