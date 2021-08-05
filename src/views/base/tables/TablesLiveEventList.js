import React, {useEffect, useState} from 'react'
import {
  CBadge, CButton,
  CCard,
  CCardBody,
  CCol,
  CDataTable, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CImg, CInput, CInputGroup,
  CLink, CPagination,
  CRow, CSwitch
} from '@coreui/react'

import CIcon from "@coreui/icons-react";
import {useHistory} from 'react-router-dom';
import {parsedTimeCreate, parsedPageLimit} from "../../../helpers/common";
import {freeSet} from "@coreui/icons";
import contentApi from "../../../apis/contentApi";
import TitleLive from "../../LiveManagementEvent/TitleLive/TitleLive";
import ConfigImage from "../../../config/ConfigImage";
import {openPopup} from "../../../actions/popup";
import {POPUP} from "../../../constants/constants";
import {useDispatch} from "react-redux";
import ConfigText from "../../../config/ConfigText";
import LiveEventApi from "../../../apis/liveEventApi";



const getBadge = status => {
  switch (status) {
    case 'Active': return 'white'

    default: return 'white'
  }
}
const fields = ['Tên Event Live','Trạng Thái', 'Preset ID', 'Nội Dung', 'Ngày Tạo', 'Quản lý']


const TablesLiveEventList = () => {
  const history = useHistory()
  const dispatch = useDispatch()


  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [total, setTotal] = useState()
  const [currentPageList, setCurrentPageList] = useState()
  const [valueKeyword, setKeyword] = useState('')

  useEffect(()=>{
    LiveEventApi?.getListLiveEvent(rowPerPage, currentPage*10).then(res=>{
      const dataList = res?.data
      if (res?.success){
        setCurrentPageList(dataList?.data?.events)
        setTotal(dataList?.data?.total)
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rowPerPage, currentPage])

  useEffect(() => {
    if (currentPageList) {
      let max = parsedPageLimit(total, rowPerPage)
      setMaxPage(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rowPerPage])
  const handleChange = e => {
    let value = e.target.value.toLowerCase()
    setKeyword(value)
  }

  const onClickSearch = () => {
      contentApi.getListContentLive(rowPerPage, currentPage-1, valueKeyword.trim()).then(res=>{
        if (res?.success){
          const data = res?.data
          setCurrentPageList(data?.items)
          setTotal(data?.metadata?.total)
          setCurrentPage(1)
        }
      })
  }

  const onChangePage = (item) => {
    setRowPerPage(item?.value)
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onClickSearch();
    }
  }

  const handleAddLiveItem = () =>{
    dispatch(openPopup({
      name: POPUP.NAME.LIVE_EVENT.CREATE_LIVE_ENTITY,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))

  }

  const handleEditLiveItem = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.LIVE_EVENT.EDIT_LIVE_ITEM,
      item,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))
  }
  const handleDeleteLiveItem = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.LIVE_EVENT.DELETE_LIVE_ITEM,
      item,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))
  }
  return (
    <>
      <TitleLive title={ConfigText.LIVE.LIVE_EVENT_MANAGE_LIST}/>
      <CRow className={'row mx-0'}>
        {/*<CCol  className="col-sm-6 form-inline p-0 c-datatable-filter">*/}
        {/*  <CInputGroup className="mb-3">*/}
        {/*    <CInput*/}
        {/*            className="input-search"*/}
        {/*            type="text" placeholder="Tìm Content Live" autoComplete="search"*/}
        {/*            onChange={handleChange}*/}
        {/*            value={valueKeyword}*/}
        {/*            onKeyPress={handleKeyPress}*/}
        {/*    />*/}
        {/*    <button className="btn btn-square btn-default color-black btn-search"*/}
        {/*            onClick={onClickSearch}>*/}
        {/*      <CIcon content={freeSet.cilSearch} size={'lg'}style={{margin: 0}} />*/}
        {/*    </button>*/}
        {/*  </CInputGroup>*/}
        {/*</CCol>*/}
        <CCol  className="col-sm-12 p-0 ">
          <div className="form-inline justify-content-sm-end c-datatable-items-per-page">
            <CLink>
              <button className="btn mb-3 btnLive"  onClick={handleAddLiveItem}>
                {ConfigText.LIVE.CREATE_LIVE_ENTITY}
              </button>
            </CLink>
          </div>
        </CCol>
      </CRow>
      <CRow className={'justify-content-between'}>
        <CCol>
          <CCard>
            <CCardBody>
              <CDataTable
                items={ currentPageList}
                fields={fields}
                itemsPerPage={10}
                scopedSlots = {{
                  'Tên Event Live':
                    (item)=>(
                      <td className="text-name-provider" title={item?.name}>
                        <strong>{item?.name}</strong>
                      </td>
                    ),
                  'Trạng Thái':
                    (item)=>(
                      <td style={{verticalAlign: "middle"}}>
                            <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                                     checked={item?.status === 1 ? true : false } readOnly/>
                      </td>
                    ),
                  'Preset ID':
                      (item)=>(
                          <td className="text-name-provider" title={item?.preset_id} style={{textTransform: 'uppercase'}}>
                            {item?.preset_id}
                          </td>
                      ),
                  'Nội Dung':
                    (item)=>(
                      <td style={{verticalAlign: "middle"}}>
                        <p>{item?.description}</p>
                      </td>
                    ),
                  'Ngày Tạo':
                    (item)=>(
                      <td style={{verticalAlign: "middle"}}>
                        <p style={{marginBottom: "0px"}}>{parsedTimeCreate(item?.created_at)}</p>
                      </td>
                    ),
                  'Quản lý':
                    (item)=>(
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          <CButton block color="info" onClick={()=>handleEditLiveItem(item)}>
                            <CImg src={ConfigImage.edit} alt="edit"/> <span className="ml-1">{ConfigText.GENERAL.EDIT}</span>
                          </CButton>
                        </CBadge>
                        <CBadge>
                          <CButton block color="danger" onClick={()=>handleDeleteLiveItem(item)}>
                            <CImg src={ConfigImage.deleteAds} alt="delete"/> <span className="ml-1">{ConfigText.GENERAL.DELETE}</span>
                          </CButton>
                        </CBadge>
                      </td>
                    ),
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <div className="m-1 d-flex justify-content-between align-items-center">
        <CDropdown className="btn-group" style={{ width: '100px',  }}>
          <CDropdownToggle color="default" className='shadow-none mb-2 row-page color-white'>
            <span className="mr-2" style={{ color: '#222'}}>{rowPerPage + ' dòng'}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {rowPerPageList && (rowPerPageList || []).map((item, index) => {
              return (
                <CDropdownItem key={index} onClick={()=>onChangePage(item)}>{item?.name}</CDropdownItem>
              )
            })
            }
          </CDropdownMenu>
        </CDropdown>
        <CPagination
          nextButton={ConfigText.GENERAL.AFTER}
          previousButton={ConfigText.GENERAL.BEFORE}
          activePage={currentPage}
          pages={maxPage}
          onActivePageChange={setCurrentPage}
        />
      </div>
    </>
  )
}
const rowPerPageList = [
  { id: 1, name: '5 dòng', value: 5 },
  { id: 2, name: '10 dòng', value: 10 },
  { id: 3, name: '20 dòng', value: 20 },
]

export default TablesLiveEventList
