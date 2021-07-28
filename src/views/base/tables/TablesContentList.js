import React, {useState} from 'react'
import {
  CDropdown, CDropdownItem,
  CDropdownMenu, CDropdownToggle,
  CPagination,
} from '@coreui/react'
import 'semantic-ui-css/semantic.min.css'
import CustomTableContentList from "./CustomTableContentList";
import {useDispatch} from "react-redux";
import {openPopup} from "../../../actions/popup";
import {POPUP} from "../../../constants/constants";


const TablesContentList = (props) => {
  const {
    currentPageList, setCurrentPageList,
    listAdsGroups, getListAdsGroups,
    setCurrentPage , setRowPerPage, currentPage,
    rowPerPage, maxPage, keyWord,
    category, type, idContentProvider,
    idAdsGroup,
  } = props
  const dispatch = useDispatch()


  const [updateItemContent, setItemContent] = useState({
    content_provider_ids: [],
    instream_ads_ids: [],
    is_visible_ads: ''
  })

  const onChangePage = (item) => {
    setRowPerPage(item?.value)
  }

  const onEditContentItem = (content, provider, adsGroup ) => {
    dispatch(openPopup({
      name: POPUP.NAME.CONTENT.EDIT_CONTENT,
      currentItemAds: adsGroup,
      currentItem: content,
      currentItemContentProvider: provider,
      currentPage,
      rowPerPage,
      setCurrentPageList,
      keyWord,
      category,
      type,
      idContentProvider,
      idAdsGroup,
    }))
  }

  const onHandleAdd = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.CONTENT.ADD_CONTENT,
      listAdsGroups,
      currentItem: item,
      currentPage,
      rowPerPage,
      setCurrentPageList,
      getListAdsGroups,
      keyWord,
      category,
      type,
      idContentProvider,
      idAdsGroup,
    }))
  }

  const onChangeStatus = (item) => {
        if (item?.id === 'show') {
          setItemContent({...updateItemContent, is_visible_ads: true})
        }
        else setItemContent({...updateItemContent, is_visible_ads: false})
  }

  const fields = [
    { key: 'Tên Nội Dung' },
    { key: 'Loại Nội Dung' },
    { key: 'Trạng Thái Nội Dung'},
    { key: 'Content Provider'},
    { key: 'Ads Group'},
    { key: 'Trạng Thái'},
    { key: 'Ngày Cập Nhật'},
    { key: 'Action'},
    { key: 'Add+'},
  ]

  return (
    <>
      <CustomTableContentList
        fields={fields}
        onChangeStatus={onChangeStatus}
        StatusData={StatusData}
        onHandleAdd={onHandleAdd}
        onEditContentItem={onEditContentItem}
        currentPageList={currentPageList}
      />
      <div className="m-1 d-flex justify-content-between align-items-center">
        <CDropdown className="btn-group" style={{ width: '100px' }}>
          <CDropdownToggle color="default" className='shadow-none row-page color-white'>
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
    </>
  )
}

const rowPerPageList = [
  { id: 1, name: '5 dòng', value: 5 },
  { id: 2, name: '10 dòng', value: 10 },
  { id: 3, name: '20 dòng', value: 20 },
]
const StatusData = [
  {id: 'show', name: " Hiện"},
  {id: 'hide', name: "Ẩn"}
]

export default TablesContentList
