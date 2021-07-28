import React from 'react'
import {
  CBadge,
  CButton,
  CCard, CCardBody,
  CCol, CImg,
  CRow
} from "@coreui/react";
import {parsedTimeCreate} from "../../../helpers/common";
import CIcon from "@coreui/icons-react";
import {freeSet} from "@coreui/icons";
import ConfigImage from "../../../config/ConfigImage";



const CustomTableContentList = (props) => {
  const {currentPageList, fields, onHandleAdd, onEditContentItem} = props || {}
  const  handleAddContentProvider = (content, provider, adsGroup) => {
    onHandleAdd && onHandleAdd(content, provider, adsGroup)
  }
  const handleContentItem = (content, provider, adsGroup) => {
    onEditContentItem && onEditContentItem(content, provider, adsGroup)
  }

  const handleContentId = (content) => {
    let temp = [];
    (content?.contentProviders||[]).forEach(pr => {
      temp = [...temp, ...(pr?.adsGroups || [])]
    })
    return (temp||[]).length
  }

  return(
      <CRow className={'justify-content-between'}>
        <CCol>
          <CCard>
            <CCardBody>
            <table>
              <thead>
                <tr>
                  {fields.map((item, ind)=>{
                    return(
                      <th key={item?.key + ind || ind}>{item?.key}</th>
                    )
                  })}
                </tr>
              </thead>
              <tbody>
                {
                  (currentPageList||[]).map((content, ctIndex) => {
                    return (
                      <>
                        {
                          (content?.contentProviders||[]).map((provider, prIndex) => {
                            return (
                              <>
                                {
                                  (provider?.adsGroups || []).map((adsGroup, adgIndex)=> {
                                    let contentTD = null
                                    let contentType = null
                                    let contentStatus = null
                                    let time = null
                                    let providerTD = null
                                    let add = null
                                    const contentRowSpan = handleContentId(content)
                                    const providerRowSpan = (provider?.adsGroups || []).length
                                    if(prIndex === 0 && adgIndex === 0) {
                                      contentTD = <td className="content" rowSpan={contentRowSpan}>{content?.name}</td>
                                      contentType = <td className="content" rowSpan={contentRowSpan}>{content?.type}</td>
                                      contentStatus = <td className="content" rowSpan={contentRowSpan}>{content?.status}</td>
                                      time = <td className="content" rowSpan={contentRowSpan}>{parsedTimeCreate(content?.updated_at)}</td>
                                      add = <td className="content " rowSpan={contentRowSpan}>
                                                  <CBadge>
                                                    <CButton block color="success" onClick={()=>handleAddContentProvider(content, provider, adsGroup)}>
                                                      <CIcon  content={freeSet.cilPlus}/>
                                                      <span className="mt-1"> Add</span>
                                                    </CButton>
                                                  </CBadge>
                                                </td>
                                      providerTD = <td  className="content" rowSpan={providerRowSpan}>{provider?.name}</td>
                                    }
                                    if(prIndex !== 0 && adgIndex === 0) {
                                      providerTD = <td className="content" rowSpan={providerRowSpan}>{provider?.name}</td>
                                    }

                                    return(
                                      <tr>
                                        {contentTD}
                                        {contentType}
                                        {contentStatus}
                                        {providerTD}
                                        <td className="content">{adsGroup?.group}</td>
                                        <td className="content">{adsGroup?.status === 1 ? 'Hiện' : adsGroup?.status === 0 ? 'Ẩn' : ''}</td>
                                        {time}
                                        <td className="content ">
                                          {provider?.id && <CBadge>
                                            <CButton block color="info" onClick={()=>handleContentItem(content, provider, adsGroup)}>
                                              {/*<CIcon  name={'cil-pencil'}/>*/}
                                              <CImg src={ConfigImage.edit} alt="edit" />
                                              <span className="ml-1">Edit</span>
                                            </CButton>
                                          </CBadge>}
                                        </td>
                                        {add}
                                      </tr>
                                    )
                                  })
                                }
                              </>
                            )
                          })
                        }
                      </>
                    )
                  })
                }
              </tbody>
            </table>
            </CCardBody>

          </CCard>
        </CCol>
      </CRow>

  )
}



export default CustomTableContentList
