import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CPagination,
  CImg,
  CSwitch,
  CLink,
} from '@coreui/react'

import { useDispatch } from "react-redux";
import TitleLive from "../LiveManagementEvent/TitleLive/TitleLive";
import {parsedPageLimit} from "../../helpers/common";
import {openPopup} from "../../actions/popup";
import {POPUP} from "../../constants/constants";
import ConfigImage from "../../config/ConfigImage";
import ConfigText from "../../config/ConfigText";
import customerApi from "../../apis/customerApi";

const CustomerList = () => {
  const dispatch = useDispatch();

  const [currentPageList, setCurrentPageList] = useState()

  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [total, setTotal] = useState()

  useEffect(() => {
    customerApi?.listCustomers(rowPerPage,  (currentPage-1)*10 ).then(res => {
      const data = res?.data
      if (res?.success){
        setCurrentPageList(data?.customers)
        setTotal(data?.total)
      }
    })
  }, [currentPage, rowPerPage])

  useEffect(() => {
    if (currentPageList) {
      let max = parsedPageLimit(total, rowPerPage)
      setMaxPage(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rowPerPage])

  const handleChangePage = (item) => {
    setRowPerPage(item?.value)
  }

  const handleUpdateCustomer = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.UPDATE_CUSTOMER,
      item
    }))
  }
  const handleUpdateStatusCustomer = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.UPDATE_STATUS_CUSTOMER,
      item,
      rowPerPage,
      currentPage,
      setCurrentPageList
    }))
  }
  const handleCreateCustomer = () => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.CREATE_CUSTOMER,
      rowPerPage,
      setCurrentPage,
      setCurrentPageList
    }))
  }


  const handleOpenDelete = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.DELETE_CUSTOMER,
      item,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))
  }


  const field = true ? ['Email' ,'Trạng thái', "Quản lý"] : ['Email', 'Trạng thái']
  return (
    <React.Fragment>
      <div>
        <TitleLive title={ConfigText.CUSTOMER.CUSTOMER_LIST}/>
        <CRow className={'row mx-0'}>
          <CCol  className="col-sm-12 p-0 ">
            <div className="form-inline justify-content-sm-end c-datatable-items-per-page">
              <CLink>
                <button className="btn btnLive mb-3"  onClick={handleCreateCustomer}>
                  Tạo Customer
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
                  fields={field}
                  itemsPerPage={10}
                  scopedSlots={{
                    'Email':
                      (item) => (
                        <td className="text-name-provider">
                          <strong>{item.email}</strong>
                        </td>
                      ),
                    'Trạng thái':
                      (item) => (
                          <td style={{verticalAlign: "middle"}}>
                            {item?.status === 0 &&
                              <CBadge>
                                  <CButton  className="btn btnDefault"  block >{ConfigText.CUSTOMER.NOT_ACTIVE_CUSTOMER}</CButton>
                              </CBadge>
                            }
                            {item?.status === 1 &&
                            <CBadge>
                              <CButton  className="btn btnLive" block >{ConfigText.CUSTOMER.ACTIVE_CUSTOMER}</CButton>
                            </CBadge>
                            }
                            {item?.status === -1 &&
                            <CBadge>
                              <CButton  className="btn btnDefault"  block >{ConfigText.CUSTOMER.LOCK_CUSTOMER}</CButton>
                            </CBadge>
                            }
                            {item?.status === -2 &&
                            <CBadge>
                              <CButton  className="btn btnDefault" block >{ConfigText.CUSTOMER.DELETE}</CButton>
                            </CBadge>
                            }
                          </td>
                      ),
                    'Quản lý':
                      (item) => (
                        <td>
                          {/*<CBadge>*/}
                          {/*  <CButton block color="info" onClick={()=>handleUpdateCustomer(item)}>*/}
                          {/*    <CImg src={ConfigImage.edit} alt="edit" />*/}
                          {/*    <span className="ml-1">{ConfigText.GENERAL.EDIT}</span>*/}
                          {/*  </CButton>*/}
                          {/*</CBadge>*/}
                          <CBadge>
                            <CButton block color="info" onClick={()=>handleUpdateStatusCustomer(item)}>
                              <CImg src={ConfigImage.edit} alt="edit status" />
                              <span className="ml-1">{ConfigText.GENERAL.EDIT_STATUS}</span>
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
                  <CDropdownItem key={index} onClick={()=>handleChangePage(item)}>{item?.name}</CDropdownItem>
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
      </div>
    </React.Fragment>
  )
}
const rowPerPageList = [
  { id: 1, name: '5 dòng', value: 5 },
  { id: 2, name: '10 dòng', value: 10 },
  { id: 3, name: '20 dòng', value: 20 },
]

export default CustomerList
