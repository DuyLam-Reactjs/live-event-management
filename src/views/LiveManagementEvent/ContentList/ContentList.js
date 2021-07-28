import React, {useEffect, useState} from 'react'
import TablesContentList from "../../base/tables/TablesContentList";
import {
  CInput, CInputGroup,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import TypeContent from "./TypeContent";
import CategotyContent from "./CategoryContent";
import ListNameContentProvider from "./ListNameContentProvider";
import AdsGroupContent from "./AdsGroupContent";
import {freeSet} from "@coreui/icons";
import {useDispatch, useSelector} from "react-redux";
import contentApi from "../../../apis/contentApi";
import {getListAllInStreamAds} from "../../../actions/inStreamAds";
import TitleAds from "../TitleAds/TitleAds";
import {parsedPageLimit} from "../../../helpers/common";
import {useHistory, useLocation} from "react-router";

const queryString = require('query-string');


const ContentList = () => {

  const dataListAds = useSelector(state => state.InStreamAds)

  const history = useHistory()
  const dispatch = useDispatch()
  const location = useLocation()
  const parsedID = queryString.parse(location.search)
  const idProvider = parsedID?.id
  const listAdsGroups = dataListAds?.LIST_ALL_INSTREAM_ADS?.items

  const [currentPageList, setCurrentPageList] = useState([])
  const [total, setTotal] = useState()
  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [keyWord, setKeyWord] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')
  const [idContentProvider, setIdContentProvider] = useState(idProvider || '')
  const [idAdsGroup, setIdAdsGroup] = useState('')


  const [currentPageProvider, setPageProvider] = useState(0)
  const [dataContentList, setDataProvider] = useState([])
  const [metadataProvider, setMetadataProvider] = useState()

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


  const [dataType, setDataType] = useState()
  useEffect(()=>{
    contentApi?.getContentType().then(res=>{
      const data = res?.data
      if (res.success) {
        setDataType(data?.items)
      }
    })
  },[])
  const [dataCategories, setDataCategories] = useState()
  useEffect(()=>{
    contentApi?.getContentCategories().then(res=>{
      const data = res?.data
      if (res.success) {
        setDataCategories(data?.items)
      }
    })
  },[])

  useEffect(() => {
    if (currentPageList) {
      let max = parsedPageLimit(total, rowPerPage)
      setMaxPage(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rowPerPage])



  const handleChangeType = async (item) => {
    const type = item?.id
    await setType( type)
    setCurrentPage(1)
  }
  const handleChangeCategory = (item) =>{
    const category = item?.id
    setCategory( category)
    setCurrentPage(1)
  }
  const handleChangeListName = (item) => {
    if (item?.id === 'all'){
      history.push('/instream-ads/content-list')
      setIdContentProvider('')
    }else {
      const idContentProviderItem = item?.id
      setIdContentProvider(idContentProviderItem)
      setCurrentPage(1)
      if (idContentProviderItem){
        getListAdsGroups(idContentProviderItem)
      }
    }
  }

  const getListAdsGroups = (id) => {
    dispatch(getListAllInStreamAds(id))
  }

  const handleChangeAdsGroups = (item) => {
    if (item?.id === 'all'){
      history.push('/instream-ads/content-list')
      setIdAdsGroup('')
    }else {
      const idAdsGroupsItem = item?.id
      setIdAdsGroup(idAdsGroupsItem)
      setCurrentPage(1)
    }
  }
  const handleChangeKeyword = (e) => {
    const value = e.target.value?.toLowerCase()
    setKeyWord(value)
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchAndFilter();
    }
  }
  const searchAndFilter = () => {
    contentApi.getContentList(
      currentPage-1,
      rowPerPage,
      keyWord,
      category,
      type,
      idContentProvider,
      idAdsGroup,
    ).then(res=>{
      if (res.success){
        const data = res?.data
        setCurrentPageList(data?.items)
        setTotal(data?.metadata?.total)
      }
    })
  }

  useEffect(()=>{

    if (!category && !type && !idContentProvider && !idAdsGroup) {
      contentApi?.getContentList(
        currentPage -1,
        rowPerPage,
        keyWord,
        category,
        type,
        idContentProvider,
        idAdsGroup,
      ).then(
        res => {
          const data = res?.data
          if (res?.success) {
            setCurrentPageList(() => data?.items)
            setTotal(data?.metadata?.total)
          }
        }
      )
    }else searchAndFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    rowPerPage,
    category,
    type,
    idContentProvider,
    idAdsGroup,
  ])

  return (
    <div>
      <TitleAds title={"Content List"}/>
      <div className={'d-flex flex-row'} style={{marginBottom: '1rem', maxWidth: '100%'}}>
        <TypeContent
          typeFilter={dataType}
          handleChangeType={handleChangeType}
        />
        <CategotyContent
          categoryFilter={dataCategories}
          handleChangeCategory={handleChangeCategory}
        />
        <ListNameContentProvider
          dataContentList={dataContentList}
          handleChangeListName={handleChangeListName}
          handleScroll={handleScroll}
          parsedID={parsedID}
        />
        <AdsGroupContent
          listAdsGroup={listAdsGroups}
          handleChangeAdsGroup={handleChangeAdsGroups}
        />
        <div className="pr-2 pl-1">
            <CInputGroup className="pt-4" style={{marginTop: '0.64rem'}}>
              <CInput
                className="input-search"
                name='keyword'
                type="text"
                placeholder='Tìm phim / show / kênh'
                style={{ color: '#222'}}
                onChange={handleChangeKeyword}
                onKeyPress={handleKeyPress}
              />
              <button className="btn btn-square btn-default color-black btn-search"
                      onClick={searchAndFilter}>
                <CIcon content={freeSet.cilSearch} size={'lg'} style={{margin: 0}} />
              </button>
            </CInputGroup>
        </div>
      </div>
      <div>
        <TablesContentList
          currentPageList={currentPageList }
          setRowPerPage={setRowPerPage}
          setCurrentPage={setCurrentPage}
          rowPerPage={rowPerPage}
          currentPage={currentPage}
          maxPage={maxPage}
          setCurrentPageList={setCurrentPageList}
          keyWord={keyWord}
          category={category}
          type={type}
          idContentProvider={idContentProvider}
          idAdsGroup={idAdsGroup}
        />
      </div>
    </div>
  )
}


export default ContentList
