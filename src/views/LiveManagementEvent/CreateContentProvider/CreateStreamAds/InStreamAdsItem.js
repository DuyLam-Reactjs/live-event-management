import React from 'react'
import {
  CButton, CButtonGroup,
  CCol, CImg,
  CRow
} from "@coreui/react";
import {parsedNumberUrl} from "../../../../helpers/common";
import ConfigImage from "../../../../config/ConfigImage";
import {useDispatch} from "react-redux";
import {openPopup} from "../../../../actions/popup";
import {POPUP} from "../../../../constants/constants";

const InStreamAdsItem = (props) => {
  const {
    newData,
    setNewData,
    itemAdsGroup,
    index,
    parsedID,
  } = props


  const  {
    group,
    can_skip,
    is_all_content,
    is_all_platform,
    platform, skip_after,
    type, vast_url,
    status,content,
  } = itemAdsGroup || {}

  const dispatch = useDispatch()
  const numberUrl = parsedNumberUrl(vast_url)


  const onDuplicate = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.IN_STREAM_ADS.DUPLICATE_INSTREAM_ADS,
      itemAds: item,
      newData,
      setNewData,
      index,
      parsedID
    }))
  }

  const onDeleteInStreamAdsGroup = (itemGroup) => {
    dispatch(openPopup({
      name: POPUP.NAME.IN_STREAM_ADS.DELETE_INSTREAM_ADS,
      itemGroup,
      setNewData,
      newData,
      index
    }))
  }

  const onEditInStreamAds = (item, index) => {
    dispatch(openPopup({
      name: POPUP.NAME.IN_STREAM_ADS.EDIT_INSTREAM_ADS,
      itemAds: item,
      newData,
      setNewData,
      index,
      parsedID
    }))
  }
  return(
    <div key={index} className="p-4 mt-3" style={{backgroundColor: 'white'}}>
      <CRow className="justify-content-between pb-4" >
        <CCol className="col-lg-11">
          <h5 className="mb-0 mt-2">Nhóm - <strong className='font-weight-bold'>{itemAdsGroup?.group}</strong></h5>
        </CCol>
      </CRow>
      <CRow className={'justify-content-between'}>
        <CCol>
          <p className="mb-3">Nhóm</p>
          <div>
            <p className='mt-2 mb-0'>{group}</p>
          </div>
        </CCol>
        <CCol>
          <p className="mb-3">Loại</p>
          <div>
            <p className='mt-2 mb-0'>{type}</p>
          </div>
        </CCol>
        <CCol className="pl-0">
          <p className="mb-3">Vast Url</p>
          <div>
            <p className='mt-2 mb-0'>{numberUrl ? 'Có ' + numberUrl + ' URL' : 'Không có URL'} </p>
          </div>
        </CCol>
        <CCol>
          <p className="mb-3">Trạng thái</p>
          <div>
            <p className='mt-2 mb-0'>{status === 0 ? 'Ẩn' : 'Hiện'}</p>
          </div>
        </CCol>
        <CCol>
          <p className="mb-3">Skip</p>
          <div>
            <p className='mt-2 mb-0'>{can_skip ? 'Có' : 'Không'}</p>
          </div>
        </CCol>
        <CCol className="pl-0">
          <p className="mb-3" style={{width: '100px'}}>Skip sau (giây)</p>
          <div>
            <p className='mt-2 mb-0'>{can_skip ? skip_after : '0'}</p>
          </div>
        </CCol>
        <CCol>
          <p className="mb-3">Platform</p>
          <div>
            <p className='mt-2 mb-0'>{is_all_platform ? 'Tất cả' : platform}</p>
          </div>
        </CCol>
        <CCol className="pl-0">
          <p className="mb-3">Content</p>
          <div>
            <p className='mt-2 mb-0'>{is_all_content ? 'Tất cả' : content?.title || ''}</p>
          </div>
        </CCol>
        <div>
          <p className="ml-1mb-3">Action</p>
          <div>
            <CButtonGroup className="mr-2">
              <CButton className="mr-1"  color="secondary" onClick={()=>onDuplicate(itemAdsGroup, index)} style={{height: '35px', }}>
                <CImg src={ConfigImage.duplicate} alt="duplicate"/>
              </CButton>
              <CButton className="mr-1"  color="info" onClick={()=>onEditInStreamAds(itemAdsGroup, index)} style={{height: '35px', }}>
                <CImg src={ConfigImage.edit} alt="edit"/>
              </CButton>
              <CButton color="danger" style={{height: '35px'}} onClick={()=>onDeleteInStreamAdsGroup(itemAdsGroup, index)}>
                <CImg src={ConfigImage.deleteAds} alt="delete"/>
              </CButton>
            </CButtonGroup>
          </div>
        </div>
      </CRow>
    </div>
  )
}
export default InStreamAdsItem
