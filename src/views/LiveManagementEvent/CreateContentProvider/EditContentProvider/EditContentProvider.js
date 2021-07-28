
import React, {useEffect, useState} from 'react'
import InStreamAdsItem from "../CreateStreamAds/InStreamAdsItem";
import CreateContentProviderInfo from "../CreateContentProviderInfo/CreateContentProviderInfo";
import {useDispatch, useSelector} from "react-redux";
import { useLocation} from "react-router";
import {getContentProviderById} from "../../../../actions/content";
import CreateInStreamAds from "../CreateStreamAds/CreateInStreamAds";
import inStreamAdsApi from "../../../../apis/liveEventApi";
import {parsedPageLimit} from "../../../../helpers/common";
import TitleAds from "../../TitleAds/TitleAds";


const queryString = require('query-string');

const EditContentProvider = () => {


  const dispatch = useDispatch()
  const location = useLocation()
  const parsedID = queryString.parse(location.search)

  const itemContentProvider = useSelector(state=>state.Content)
  const dataItem = itemContentProvider?.CONTENT_PROVIDER
  const [newData, setNewData] = useState(  [])


  const [currentPageAds, setPageAds] = useState(1)
  const [metadataAds, setMetadataAds] = useState()
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
    const { page, limit, total } = metadataAds || {}
    let maxPage = parsedPageLimit(total, limit)

    if ((page + 1) * limit >= total && (page + 1) > maxPage) return
    setPageAds((page || 0) + 1 )
  }

  useEffect(()=>{
    dispatch(getContentProviderById(parsedID.id))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  useEffect(()=>{
    async function getList () {
      inStreamAdsApi.getListInStreamAds( parsedID.id, 10, currentPageAds ).then(res=>{
        const data = res?.data
        if (res?.success) {
          setMetadataAds(data?.metadata)
          let dataList = [...newData]
          let newDataList = dataList.concat(data?.items)
          setNewData(newDataList)
        }
      })
    }
    getList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentPageAds])

  return (
    <div onScroll={handleScroll}>
      <TitleAds editContentProvider/>
      <CreateContentProviderInfo dataItem={dataItem}/>
      <CreateInStreamAds
        newData={newData}
        setNewData={setNewData}
        disable
      />
      { (newData || []).map((itemGroup, index)=>{
        if (itemGroup === null) return
        return(
          <InStreamAdsItem
            key={index}
            newData={newData}
            setNewData={setNewData}
            parsedID={parsedID}
            itemAdsGroup={itemGroup}
            index={index}
            />
        )
      })}
    </div>

  )
}

export default EditContentProvider
