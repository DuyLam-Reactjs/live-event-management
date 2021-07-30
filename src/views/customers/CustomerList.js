import React, { useState, useEffect } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CDataTable,
  CRow,
  CButton, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CPagination, CImg, CSwitch,
} from '@coreui/react'

import { useDispatch } from "react-redux";
import TitleLive from "../LiveManagementEvent/TitleLive/TitleLive";
import {parsedPageLimit} from "../../helpers/common";
import customerApi from "../../apis/customerApi";
import {openPopup} from "../../actions/popup";
import {POPUP} from "../../constants/constants";
import ConfigImage from "../../config/ConfigImage";
import ConfigTestData from "../../config/ConfigTestData";

const CustomerList = () => {
  const dispatch = useDispatch();


  const [currentPageList, setCurrentPageList] = useState()
  const [editField, setEditField] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);
  const [total, setTotal] = useState()


  useEffect(() => {
    // customerApi?.listCustomers(currentPage, rowPerPage).then(res => {
    //   const data = res?.data
    //   if (res?.success){
    //     setCurrentPageList(data?.items)
    //     setTotal(data?.metadata?.total)
    //   }
    // })
    const dataCustomer = ConfigTestData?.dataCustomer
    setCurrentPageList(dataCustomer?.data?.customers)
    setTotal(dataCustomer?.data?.total)
    console.log(dataCustomer?.data.customers)

  }, [currentPage, rowPerPage])

  useEffect(() => {
    if (currentPageList) {
      let max = parsedPageLimit(total, rowPerPage)
      setMaxPage(max)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, rowPerPage])

  useEffect(() => {
    let data = (currentPageList || []).map(i => ({ ...i, isEdit: false }));
    data?.forEach(i => {
      const user = editField?.find(j => j.id === i.id);
      i.isEdit = user ? user.isEdit : false;
    })
    setEditField(data)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPageList])

  const onChangePage = (item) => {
    setRowPerPage(item?.value)
  }

  const handleSaveEdit = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.UPDATE_CUSTOMER,
      editField,
      setEditField,
      userItem: item
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


  const field = true ? ['Email', 'Thông báo', "Quản lý"] : ['Email', 'Thông báo']
  return (
    <React.Fragment>
      <div>
        <TitleLive title={'Customers List'}/>
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
                          {item.email}
                        </td>
                      ),
                    'Thông báo':
                      (item) => (
                          <td style={{verticalAlign: "middle"}}>
                            <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                                     checked={item?.status === 1 ? true : false } readOnly/>
                          </td>
                      ),
                    'Quản lý':
                      (item) => (
                        <td>
                          <CBadge>
                            <CButton block color="info" onClick={()=>handleSaveEdit(item)}>
                              {/*<CIcon  name={'cil-pencil'}/> */}
                              <CImg src={ConfigImage.edit} alt="edit" />
                              <span className="ml-1">Chỉnh sửa</span>
                            </CButton>
                          </CBadge>
                          <CBadge>
                            <CButton block color="danger" onClick={()=>handleOpenDelete(item)}>
                              <CImg src={ConfigImage.deleteAds} alt="delete"/>
                              <span className="ml-1">Xoá</span>
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
            nextButton={'Sau'}
            previousButton={'Trước'}
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
