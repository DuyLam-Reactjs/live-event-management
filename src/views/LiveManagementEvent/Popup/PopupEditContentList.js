import React, {useEffect, useState} from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch, useSelector} from "react-redux";
import {getContentProviderById} from "../../../actions/content";
import contentApi from "../../../apis/contentApi";
import {parsedIdAdsGroups, parsedIdContentProvider, parsedPageLimit} from "../../../helpers/common"
import {closePopup} from "../../../actions/popup";
import inStreamAdsApi from "../../../apis/liveEventApi";


const PopupEditContentList = (props) => {
  const {
    currentItemAds,
    currentItem,
    currentItemContentProvider,
    currentPage,
    rowPerPage,
    setCurrentPageList,
    keyWord,
    category,
    type,
    idContentProvider,
    idAdsGroup,
  } = props
  const  { status, group} = currentItemAds || {}
  const idProvider = currentItemContentProvider?.id
  const {contentProviders} = currentItem || {}

  const arrIdContentProvider = parsedIdContentProvider(contentProviders)
  const arrIdInStreamAds = parsedIdAdsGroups(contentProviders)

  const dispatch  = useDispatch()
  const dataContent = useSelector(state => state?.Content)

  const nameItemProvider =  dataContent?.CONTENT_PROVIDER?.name
  const itemContentProvider = dataContent?.CONTENT_PROVIDER



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
  useEffect(()=>{
    setStatus(status)
    setGroupAds(group)
    setNameProvider(nameItemProvider)

  },[status, group, nameItemProvider ])


  useEffect(()=> {
    if (idProvider) dispatch(getContentProviderById(idProvider))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentItemContentProvider])


  const [idContentProviders, setIdContentProvider] = useState( [])
  const [idInStreamAds, setIdInStreamAds] = useState([])

  const [elementAds, setElementAds] = useState({
    id: '',
    status: null
  })


  useEffect(()=> {
    if (elementAds?.id) handleChangeIdAdsGroups(elementAds)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[elementAds?.id, elementAds?.status])

  const onChangeContentProvider = (item) => {
    let arr = [...arrIdContentProvider]
    arr = arr.filter(ite => ite !== itemContentProvider?.id)
    arr.push(item?.id)
    setIdContentProvider(arr)
  }


  const handleChangeIdAdsGroups = (elm) => {
    let idAds = [...arrIdInStreamAds]
    idAds = idAds.filter(ite => ite?.id !== currentItemAds?.id)
    idAds.push(elm)
    if (idAds[0]?.id === undefined){
      idAds.splice(0,1)
      setIdInStreamAds(idAds)
    } else {
      setIdInStreamAds(idAds)
    }
  }
  const onChangeAdsItem = (item) => {
    setElementAds({...elementAds, id: item?.id, status: item?.status})
    handleChangeIdAdsGroups(elementAds)
  }

  const onChangeStatus = (item) => {
    setElementAds({...elementAds, status: item?.status})
    handleChangeIdAdsGroups(elementAds)
  }


  const [currentStatus, setStatus] = useState(status || '')
  const [currentGroup, setGroupAds] = useState(group || '')
  const [currentNameProvider, setNameProvider] = useState(nameItemProvider || '')

  const handleClose =() => {
    dispatch(closePopup())
  }
  const handleSave = () => {
    const idContent = currentItem?.id
    contentApi?.editContent(idContent, idContentProviders, idInStreamAds).then(res=>{
      if (res?.success){
        contentApi?.getContentList(
          currentPage -1,
          rowPerPage,
          keyWord,
          category,
          type,
          idContentProvider,
          idAdsGroup
        ).then(
          resList =>{
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


  return (
    <React.Fragment>
      <CModal
          // size={'lg'}
        show={true}
        onClose={handleClose}
        centered={true}
        closeOnBackdrop={false}
        style={{minWidth: '555px'}}
      >
        <CModalHeader className="colorHeader">
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
            <h4 className="mb-0">Sửa Content</h4>
            <CButton className='p-0 shadow-none' onClick={handleClose}>
              <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          {/*<div className={'d-flex flex-row'}>*/}
          {/*  <NameContentProviderItem*/}
          {/*    dataContentList={dataContentList}*/}
          {/*    nameItemProvider={currentNameProvider}*/}
          {/*    setNameProvider={setNameProvider}*/}
          {/*    onChangeContentProvider={onChangeContentProvider}*/}
          {/*    arrIdContentProvider={arrIdContentProvider}*/}
          {/*    getListAdsGroups={getListAdsGroups}*/}
          {/*    handleScroll={handleScroll}*/}
          {/*  />*/}
          {/*  <AdsContentItem*/}
          {/*    listAdsGroup={listAdsGroups}*/}
          {/*    groupName={currentGroup}*/}
          {/*    setGroupAds={setGroupAds}*/}
          {/*    onChangeAdsItem={onChangeAdsItem}*/}
          {/*  />*/}
          {/*  <StatusContentItem*/}
          {/*    onChangeStatus={onChangeStatus}*/}
          {/*    status={currentStatus} setStatus={setStatus}/>*/}
          {/*</div>*/}
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4" color="success" onClick={handleSave}>Lưu</CButton>
          </div>
        </CModalBody>
      </CModal>
    </React.Fragment>
  )
}
export default PopupEditContentList
