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
import TitleAds from "../../LiveManagementEvent/TitleAds/TitleAds";
import ConfigImage from "../../../config/ConfigImage";
import {openPopup} from "../../../actions/popup";
import {POPUP} from "../../../constants/constants";
import {useDispatch} from "react-redux";



const getBadge = status => {
  switch (status) {
    case 'Active': return 'white'

    default: return 'white'
  }
}
const fields = ['Tên Event Live','Trạng Thái', 'Nội Dung', 'Ngày Tạo', 'Quản lý']


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
    if (!valueKeyword)
    // contentApi?.getListContentLive(rowPerPage, currentPage -1).then(res=>{
    //   const data = res?.data
    //   const {items, metadata} = data || {}
    //   if (res?.success){
    //     setCurrentPageList(items)
    //     setTotal(metadata?.total)
    //   }
    // })
    {
      const items = dataLiveEx?.data?.events
      const total = dataLiveEx?.data?.total
      setCurrentPageList(items)
      setTotal(total)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[rowPerPage, currentPage-1])

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
        if (res.success){
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


  const onAddContentProvider = () =>{
    history.push('/instream-ads/content-provider-list/create-content-provider')
  }
  const onEditContentItem = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.LIVE_EVENT.EDIT_LIVE_ITEM,
      item,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))
  }
  const handleOpenDelete = (item) => {
    dispatch(openPopup({
      name: POPUP.NAME.LIVE_EVENT.DELETE_LIVE_ITEM,
      item,
      currentPage,
      rowPerPage,
      setCurrentPageList
    }))
  }
  const handleContent = (item) => {
    history.push('/instream-ads/content-list?id=' + item?.id)
  }

  return (
    <>
      <TitleAds title={"Live Event Management List"}/>
      <CRow className={'row mx-0'}>
        <CCol  className="col-sm-6 form-inline p-0 c-datatable-filter">
          <CInputGroup className="mb-3">
            <CInput
                    className="input-search"
                    type="text" placeholder="Tìm Content Live" autoComplete="search"
                    onChange={handleChange}
                    value={valueKeyword}
                    onKeyPress={handleKeyPress}
            />
            <button className="btn btn-square btn-default color-black btn-search"
                    onClick={onClickSearch}>
              <CIcon content={freeSet.cilSearch} size={'lg'}style={{margin: 0}} />
            </button>
          </CInputGroup>
        </CCol>
        <CCol  className="col-sm-6 p-0 ">
          <div className="form-inline justify-content-sm-end c-datatable-items-per-page">

            <CLink to="/instream-ads/content-provider-list/create-content-provider">
              <button className="btn btn-success mb-3"  onClick={onAddContentProvider}>
                Tạo Content Live
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
                          <CButton block color="info" onClick={()=>onEditContentItem(item)}>
                            <CImg src={ConfigImage.edit} alt="edit"/> <span className="ml-1">{'Chỉnh sửa'}</span>
                          </CButton>
                        </CBadge>
                        <CBadge>
                          <CButton block color="danger" onClick={()=>handleOpenDelete(item)}>
                            <CImg src={ConfigImage.deleteAds} alt="delete"/> <span className="ml-1">{'Xoá'}</span>
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
    </>
  )
}
const rowPerPageList = [
  { id: 1, name: '5 dòng', value: 5 },
  { id: 2, name: '10 dòng', value: 10 },
  { id: 3, name: '20 dòng', value: 20 },
]

const dataLiveEx = {
  "code": "SUCCESS",
  "data": {
    "events": [
      {
        "id": "93366ed6-3219-44ea-8a40-9294ff237f34",
        "name": "thanhtv test",
        "description": "thanhtv test",
        "status": 1,
        "token": "aWQ9MzI0OWQ2ODAtMTJhZS00NDllLWFlM2MtZDNiZTNiN2VmODMzJnNpZ249RHFJcFVNMWloTk9PQWJwbmUzdW5Xdz09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_2?publishsign=aWQ9MzI0OWQ2ODAtMTJhZS00NDllLWFlM2MtZDNiZTNiN2VmODMzJnNpZ249RHFJcFVNMWloTk9PQWJwbmUzdW5Xdz09JmlwPQ==/3249d680-12ae-449e-ae3c-d3be3b7ef833",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_2?publishsign=aWQ9MzI0OWQ2ODAtMTJhZS00NDllLWFlM2MtZDNiZTNiN2VmODMzJnNpZ249RHFJcFVNMWloTk9PQWJwbmUzdW5Xdz09JmlwPQ==/3249d680-12ae-449e-ae3c-d3be3b7ef833",
        "stream_key": "3249d680-12ae-449e-ae3c-d3be3b7ef833",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_fhd_gpu_2",
        "partner": 2,
        "relay": [
          {
            "url": "b.rtmp.youtube.com",
            "key": "y80b-gug3-ws16-u4x1-3k6w",
            "name": "live2?backup=1"
          }
        ],
        "created_at": "2021-06-17T08:42:17.921Z",
        "updated_at": "2021-06-17T08:42:17.921Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "f00c8759-10f4-49f5-af49-20db3d76c454",
        "name": "Test local",
        "description": "Thư test local",
        "status": 0,
        "token": "aWQ9OTJmOTg1OTAtNDY1NS00NzkyLThmNzItNjJkZGJlZjNmMzhkJnNpZ249ZGhLRXpNbUJHMDI3UTlVanNEb3FtUT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_hd_gpu_2?publishsign=aWQ9OTJmOTg1OTAtNDY1NS00NzkyLThmNzItNjJkZGJlZjNmMzhkJnNpZ249ZGhLRXpNbUJHMDI3UTlVanNEb3FtUT09JmlwPQ==/92f98590-4655-4792-8f72-62ddbef3f38d",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_hd_gpu_2?publishsign=aWQ9OTJmOTg1OTAtNDY1NS00NzkyLThmNzItNjJkZGJlZjNmMzhkJnNpZ249ZGhLRXpNbUJHMDI3UTlVanNEb3FtUT09JmlwPQ==/92f98590-4655-4792-8f72-62ddbef3f38d",
        "stream_key": "92f98590-4655-4792-8f72-62ddbef3f38d",
        "preset_id": "hd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_hd_gpu_2",
        "partner": 2,
        "relay": [
          {
            "url": "b.rtmp.youtube.com",
            "key": "y80b-gug3-ws16-u4x1-3k6w",
            "name": "live2?backup=1"
          }
        ],
        "created_at": "2021-06-16T06:29:46.975Z",
        "updated_at": "2021-06-16T06:29:46.975Z",
        "updated_by": "17a87370-4a0f-4f11-a367-f134ff864fa1"
      },
      {
        "id": "9d971394-2833-42d0-8ad9-2bf5cf846f05",
        "name": "Test flow",
        "description": "Tìm hiểu flow chạy",
        "status": 0,
        "token": "aWQ9YzU3ZDQ3N2YtNzdlYS00MjdmLTk4MTQtYjMwYzA2YzhjM2M5JnNpZ249NGZmNmUzcUx3cnI4NHVRYnU2Z3YxUT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_hd_gpu_3?publishsign=aWQ9YzU3ZDQ3N2YtNzdlYS00MjdmLTk4MTQtYjMwYzA2YzhjM2M5JnNpZ249NGZmNmUzcUx3cnI4NHVRYnU2Z3YxUT09JmlwPQ==/c57d477f-77ea-427f-9814-b30c06c8c3c9",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_hd_gpu_3?publishsign=aWQ9YzU3ZDQ3N2YtNzdlYS00MjdmLTk4MTQtYjMwYzA2YzhjM2M5JnNpZ249NGZmNmUzcUx3cnI4NHVRYnU2Z3YxUT09JmlwPQ==/c57d477f-77ea-427f-9814-b30c06c8c3c9",
        "stream_key": "c57d477f-77ea-427f-9814-b30c06c8c3c9",
        "preset_id": "hd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_hd_gpu_3",
        "partner": 2,
        "relay": [
          {
            "url": "y80b-gug3-ws16-u4x1-3k6w",
            "key": "b.rtmp.youtube.com",
            "name": "live2?backup=1"
          }
        ],
        "created_at": "2021-06-15T03:54:39.161Z",
        "updated_at": "2021-06-15T03:54:39.161Z",
        "updated_by": "5e97c72a-d400-4b9a-920c-7f4b8e20dfd5"
      },
      {
        "id": "69e3a0c4-3a2e-4e30-957d-28d15bbc6edd",
        "name": "thanhtv test lai ne",
        "description": "thanhtv test lai ne",
        "status": 0,
        "token": "aWQ9OTRlMGQ1ZjYtY2NlYy00ZTM0LTg3ZDMtN2U4NDU4MGYwMGNkJnNpZ249NVVCaDR1L2dKNk5CcnlxUGdoU3Q2QT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/fhd_gpu_0?publishsign=aWQ9OTRlMGQ1ZjYtY2NlYy00ZTM0LTg3ZDMtN2U4NDU4MGYwMGNkJnNpZ249NVVCaDR1L2dKNk5CcnlxUGdoU3Q2QT09JmlwPQ==",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/fhd_gpu_0?publishsign=aWQ9OTRlMGQ1ZjYtY2NlYy00ZTM0LTg3ZDMtN2U4NDU4MGYwMGNkJnNpZ249NVVCaDR1L2dKNk5CcnlxUGdoU3Q2QT09JmlwPQ==",
        "stream_key": "94e0d5f6-ccec-4e34-87d3-7e84580f00cd",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "fhd_gpu_0",
        "partner": 2,
        "relay": [
          {
            "url": "b.rtmp.youtube.com",
            "key": "y80b-gug3-ws16-u4x1-3k6w",
            "name": "live2?backup=1"
          }
        ],
        "created_at": "2021-06-02T08:04:15.838Z",
        "updated_at": "2021-06-02T08:15:48.312Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "b1535628-a394-4239-a465-9ad74591864f",
        "name": "thanhtv test",
        "description": "thanhtv test",
        "status": 0,
        "token": "aWQ9MjQ4OWVhZjEtMjhlOS00YzJiLTgzNjQtZjU5ODY0YTEyNjU2JnNpZ249WnZwRjFFcWowM3NQeEVZODVOUDBDQT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_3?publishsign=aWQ9MjQ4OWVhZjEtMjhlOS00YzJiLTgzNjQtZjU5ODY0YTEyNjU2JnNpZ249WnZwRjFFcWowM3NQeEVZODVOUDBDQT09JmlwPQ==/2489eaf1-28e9-4c2b-8364-f59864a12656",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_3?publishsign=aWQ9MjQ4OWVhZjEtMjhlOS00YzJiLTgzNjQtZjU5ODY0YTEyNjU2JnNpZ249WnZwRjFFcWowM3NQeEVZODVOUDBDQT09JmlwPQ==/2489eaf1-28e9-4c2b-8364-f59864a12656",
        "stream_key": "2489eaf1-28e9-4c2b-8364-f59864a12656",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_fhd_gpu_3",
        "partner": 2,
        "relay": [],
        "created_at": "2021-06-02T03:25:14.454Z",
        "updated_at": "2021-06-02T03:25:14.454Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "a02837e7-c60d-4527-a826-76f0110c2e39",
        "name": "thanhtv test",
        "description": "thanhtv test",
        "status": 0,
        "token": "aWQ9MGU2N2Q0Y2YtYjUxNy00NWQ5LWIzMTUtYzgxNTFhMTkyMGY1JnNpZ249Z3k2NmpsMHBvTGw1bHpQRERwSE9VUT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_2?publishsign=aWQ9MGU2N2Q0Y2YtYjUxNy00NWQ5LWIzMTUtYzgxNTFhMTkyMGY1JnNpZ249Z3k2NmpsMHBvTGw1bHpQRERwSE9VUT09JmlwPQ==/0e67d4cf-b517-45d9-b315-c8151a1920f5",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_2?publishsign=aWQ9MGU2N2Q0Y2YtYjUxNy00NWQ5LWIzMTUtYzgxNTFhMTkyMGY1JnNpZ249Z3k2NmpsMHBvTGw1bHpQRERwSE9VUT09JmlwPQ==/0e67d4cf-b517-45d9-b315-c8151a1920f5",
        "stream_key": "0e67d4cf-b517-45d9-b315-c8151a1920f5",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_fhd_gpu_2",
        "partner": 2,
        "relay": [],
        "created_at": "2021-06-02T03:16:24.514Z",
        "updated_at": "2021-06-02T03:16:24.514Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "f0088526-b240-4b49-abb9-d222d6948f10",
        "name": "thanhtv-test",
        "description": "thanhtv-test",
        "status": 1,
        "token": "aWQ9Y2RmNTRkYWMtNmRhZi00NjBkLTg2NWQtYjRhYTY0ZjRlMDVkJnNpZ249cHZlK0FuTTV0M1Jldlk4VzNvOXZUdz09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_3?publishsign=aWQ9Y2RmNTRkYWMtNmRhZi00NjBkLTg2NWQtYjRhYTY0ZjRlMDVkJnNpZ249cHZlK0FuTTV0M1Jldlk4VzNvOXZUdz09JmlwPQ==/cdf54dac-6daf-460d-865d-b4aa64f4e05d",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/dvr_fhd_gpu_3?publishsign=aWQ9Y2RmNTRkYWMtNmRhZi00NjBkLTg2NWQtYjRhYTY0ZjRlMDVkJnNpZ249cHZlK0FuTTV0M1Jldlk4VzNvOXZUdz09JmlwPQ==/cdf54dac-6daf-460d-865d-b4aa64f4e05d",
        "stream_key": "cdf54dac-6daf-460d-865d-b4aa64f4e05d",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "dvr_fhd_gpu_3",
        "partner": 2,
        "relay": [
          {
            "url": "b.rtmp.youtube.com",
            "key": "y80b-gug3-ws16-u4x1-3k6w",
            "name": "live2?backup=1"
          }
        ],
        "created_at": "2021-06-01T06:35:26.084Z",
        "updated_at": "2021-06-01T06:35:26.084Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "d97f66a4-d655-4cd9-aa74-74f4e6298cc0",
        "name": "test ne",
        "description": "test ne",
        "status": 0,
        "token": "aWQ9YjQzM2ZkMTgtZjFjNC00ZDJlLTkxYTItYjQ1OTVmMzBiYmU5JnNpZ249UEJFS2ozdDE5OXFHT0trMC9qdHFXdz09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/fhd_gpu_1?publishsign=aWQ9YjQzM2ZkMTgtZjFjNC00ZDJlLTkxYTItYjQ1OTVmMzBiYmU5JnNpZ249UEJFS2ozdDE5OXFHT0trMC9qdHFXdz09JmlwPQ==/b433fd18-f1c4-4d2e-91a2-b4595f30bbe9",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/fhd_gpu_1?publishsign=aWQ9YjQzM2ZkMTgtZjFjNC00ZDJlLTkxYTItYjQ1OTVmMzBiYmU5JnNpZ249UEJFS2ozdDE5OXFHT0trMC9qdHFXdz09JmlwPQ==/b433fd18-f1c4-4d2e-91a2-b4595f30bbe9",
        "stream_key": "b433fd18-f1c4-4d2e-91a2-b4595f30bbe9",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "fhd_gpu_1",
        "partner": 2,
        "relay": [],
        "created_at": "2021-05-25T08:56:26.743Z",
        "updated_at": "2021-05-25T08:56:26.743Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "2e8002a4-4cdc-4918-b884-89aa068267f6",
        "name": "a Hai test live event",
        "description": "anh hai test live event",
        "status": 0,
        "token": "aWQ9ZTNlYzc1NjUtNGMyYy00ZTA4LTgzOTgtZTFiZGRiNGQwZDNiJnNpZ249NVFDemFFVXl2b3Z6M1o4VGN3K0VtUT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/fhd_gpu_2?publishsign=aWQ9ZTNlYzc1NjUtNGMyYy00ZTA4LTgzOTgtZTFiZGRiNGQwZDNiJnNpZ249NVFDemFFVXl2b3Z6M1o4VGN3K0VtUT09JmlwPQ==/e3ec7565-4c2c-4e08-8398-e1bddb4d0d3b",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/fhd_gpu_2?publishsign=aWQ9ZTNlYzc1NjUtNGMyYy00ZTA4LTgzOTgtZTFiZGRiNGQwZDNiJnNpZ249NVFDemFFVXl2b3Z6M1o4VGN3K0VtUT09JmlwPQ==/e3ec7565-4c2c-4e08-8398-e1bddb4d0d3b",
        "stream_key": "e3ec7565-4c2c-4e08-8398-e1bddb4d0d3b",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "fhd_gpu_2",
        "partner": 2,
        "relay": [],
        "created_at": "2021-05-25T08:34:26.613Z",
        "updated_at": "2021-05-25T08:46:40.865Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      },
      {
        "id": "beada427-c6cd-452f-8dc7-8d0a94ef32a8",
        "name": "test ne",
        "description": "test ne",
        "status": 0,
        "token": "aWQ9YzdkMDUwNWQtZDVmZC00ZmU5LThlMDgtNTllNWFiNWE5MmZhJnNpZ249ZzY0ZW9ZVHRhSS9UWDBJZ1EwaVRtUT09JmlwPQ==",
        "url_backup": "rtmp://rtmp-01.vieon.vn",
        "url_active": "rtmp://rtmp-01.vieon.vn",
        "rtmp_active": "rtmp://rtmp-01.vieon.vn/fhd_gpu_0?publishsign=aWQ9YzdkMDUwNWQtZDVmZC00ZmU5LThlMDgtNTllNWFiNWE5MmZhJnNpZ249ZzY0ZW9ZVHRhSS9UWDBJZ1EwaVRtUT09JmlwPQ==/c7d0505d-d5fd-4fe9-8e08-59e5ab5a92fa",
        "rtmp_backup": "rtmp://rtmp-01.vieon.vn/fhd_gpu_0?publishsign=aWQ9YzdkMDUwNWQtZDVmZC00ZmU5LThlMDgtNTllNWFiNWE5MmZhJnNpZ249ZzY0ZW9ZVHRhSS9UWDBJZ1EwaVRtUT09JmlwPQ==/c7d0505d-d5fd-4fe9-8e08-59e5ab5a92fa",
        "stream_key": "c7d0505d-d5fd-4fe9-8e08-59e5ab5a92fa",
        "preset_id": "fhd",
        "url_hls": "",
        "url_dash": "",
        "application": "fhd_gpu_0",
        "partner": 2,
        "relay": [],
        "created_at": "2021-05-25T08:31:18.279Z",
        "updated_at": "2021-05-25T08:31:18.279Z",
        "updated_by": "5ee3c2e9-62f7-4058-8e42-18c939ea5bd2"
      }
      ],
    "total": 15
  },
  "message": "OK",
  "status": 200
}
export default TablesLiveEventList
