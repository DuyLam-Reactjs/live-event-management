
import React, { useEffect, useState } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle,
  CModalHeader,
  CInputGroupAppend,
  CInput,
  CInputGroup,
  CPagination,
  CInputGroupText,
} from "@coreui/react";
import CIcon from '@coreui/icons-react'
import { freeSet } from '@coreui/icons'
import contentApi from "../../../apis/contentApi";

import {parsedPageLimit} from "../../../helpers/common";

const PopupContent = (props) => {
  const { content, setContent, modal, setModal, setValue } = props;


  const [currentPageList, setCurrentPageList] = useState()
  const [total, setTotal] = useState()
  const [currentPage, setCurrentPage] = useState(1);

  const [rowPerPage, setRowPerPage] = useState(10);
  const [maxPage, setMaxPage] = useState(1);

  const [keyWord, setKeyWord] = useState('')
  const [category, setCategory] = useState('')
  const [type, setType] = useState('')

  const [data, setData] = useState(content?.title)

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
  useEffect(()=>{
    if (!keyWord && !category?.id && !type?.id) {
      contentApi?.getContentList(
        currentPage -1,
        rowPerPage,
        keyWord,
        category?.id,
        type?.id
      ).then(
        res => {
          const data = res?.data
          if (res?.success) {
            setCurrentPageList(data?.items)
            setTotal(data?.metadata?.total)
          }
        }
      )
    }else searchAndFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    currentPage,
    rowPerPage,
    keyWord,
    category?.id,
    type?.id,
  ])

  useEffect(() => {
    setData(content?.title)
  }, [content?.title])


  const searchAndFilter = () => {
    contentApi.getContentList(
      currentPage-1,
      rowPerPage,
      keyWord,
      category?.id,
      type?.id
    ).then(res=>{
      if (res.success){
        const data = res?.data
        setCurrentPageList(data?.items)
        setTotal(data?.metadata?.total)
      }
    })
  }



  const handleChangeType = (item) => {
    setType(item)
  }
  const handleChangeGenre = (item) => {
    setCategory(item)
  }
  const handleChangeKeyword = (event) => {
    setKeyWord(event.target.value);
  }
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchAndFilter();
    }
  }
  const handleClose = () => {
    setModal(false);
    setData(content?.title)
  }

  const handleSelect = (data) => {
    setModal(false);
    setContent && setContent(data);
    setValue && setValue(data?.name)
  }

  return (
    <React.Fragment>
      <CModal
        closeOnBackdrop={false}
        size={''}
        show={modal}
        onClose={handleClose}
        centered={true}
      >
        <CModalHeader style={{ backgroundColor: '#646464' }}>
          <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
            <h3 className="mb-0">Chọn nội dung</h3>
            <CButton className='p-0 shadow-none' onClick={handleClose}>
              <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
            </CButton>
          </div>
        </CModalHeader>
        <CModalBody>
          <div >
            <div className="d-flex flex-row mb-2">
              <CDropdown className="m-1 btn-group" style={{ width: '300px' }}>
                <CDropdownToggle color="default" className='border'>
                  <span className="mr-2" style={{ color: '#222' }}>{type === '' ? 'Loại nội dung' : type?.name}</span>
                </CDropdownToggle>
                <CDropdownMenu>
                  {dataType && (dataType || []).map((item, index) => {
                    return (
                      <CDropdownItem key={index} onClick={() => handleChangeType(item)}>{item?.name}</CDropdownItem>
                    )
                  })
                  }
                </CDropdownMenu>
              </CDropdown>
              <CDropdown className="m-1 btn-group" style={{ width: '200px' }}>
                <CDropdownToggle color="default" className='border'>
                  <span className="mr-2" style={{ color: '#222' }}>{category === '' ? 'Thể loại' : category?.name}</span>
                </CDropdownToggle>
                <CDropdownMenu>
                  {dataCategories && (dataCategories || []).map((item, index) => {
                    return (
                      <CDropdownItem key={index} onClick={() => handleChangeGenre(item)}>{item?.name}</CDropdownItem>
                    )
                  })
                  }
                </CDropdownMenu>
              </CDropdown>
              <CInputGroup className="m-1">
                <CInput
                  name='keyword'
                  type="text"
                  value={keyWord}
                  placeholder='Tìm phim / show / kênh'
                  style={{ color: '#222' }}
                  onChange={handleChangeKeyword}
                  onKeyPress={handleKeyPress}
                />
                <CInputGroupAppend style={{ cursor: "pointer" }} onClick={searchAndFilter} >
                  <CInputGroupText >
                    <CIcon content={freeSet.cilSearch} />
                  </CInputGroupText>
                </CInputGroupAppend>
              </CInputGroup>
            </div>

            <div>
              {currentPageList && currentPageList.map((item, index) => {
                return (
                  <div className="m-1 mb-2 d-flex justify-content-between align-items-center" key={index}>
                    <strong>{item.name}</strong>
                    <CButton
                      className='shadow-none'
                      name={item.title}
                      color="success"
                      variant={data?.title === item.title ? "" : "outline"}
                      onClick={()=>handleSelect(item)}>
                      Chọn
                    </CButton>
                  </div>
                )
              })}
              <div className="m-1 mt-4 d-flex justify-content-between align-items-center">
                <CDropdown className="btn-group" style={{ width: '100px' }}>
                  <CDropdownToggle color="default" className='shadow-none row-page color-white'>
                    <span className="mr-2" style={{ color: '#222' }}>{rowPerPage + ' dòng'}</span>
                  </CDropdownToggle>
                  <CDropdownMenu>
                    {rowPerPageList && (rowPerPageList || []).map((item, index) => {
                      return (
                        <CDropdownItem key={index} onClick={() => setRowPerPage(item?.value)}>{item?.name}</CDropdownItem>
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

          </div>
        </CModalBody>
      </CModal>
    </React.Fragment>

  )
}


const rowPerPageList = [
  { id: 1, name: '5 dòng', value: 5 },
  { id: 2, name: '10 dòng', value: 10 },
  { id: 3, name: '20 dòng', value: 20 },

]

export default PopupContent
