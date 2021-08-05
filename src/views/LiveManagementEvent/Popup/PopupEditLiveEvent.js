import React, {useEffect, useState} from 'react'
import {
  CBadge,
  CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CInput,
  CInputGroup,
  CInputGroupPrepend, CInputGroupText,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CSwitch
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../../actions/popup";
import {sendToast} from "../../../helpers/common";
import LiveEventApi from "../../../apis/liveEventApi";
import ConfigText from "../../../config/ConfigText";
import ConfigData from "../../../config/ConfigData";



const PopupEditLiveEvent = ({
  item, rowPerPage, currentPage, setCurrentPageList
}) => {
  const [valueNameContent, setValueName] = useState(  item?.name || '')
  const [checkDvr, setDvr] = useState( false)
  const [desc, setDesc] = useState(  item?.description || '')
  const [presetId, setPresetId] = useState({
    key: item?.preset_id,
    name: item?.preset_id
  })
  const [relay, setRelay] = useState({
    key: item?.relay[0]?.key,
    name:item?.relay[0]?.name,
    url: item?.relay[0]?.url,
  })
  const [error, setError] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(closePopup())
  }

  const onChangeNameLiveEntity = (e) => {
    const value = e.target.value
    setValueName(value)
  }
  const onChangeDescription = (e) => {
    const value = e.target.value
    setDesc(value)
  }
  const onCheckedDvr = (e) =>{
    const value = e.target.checked
    setDvr(value)
  }
  const onCLickPresetId = (item) =>{
    setPresetId(item)
  }
  const onChangeKeyRelay = (e) =>{
    const value = e.target.value
    setRelay({...relay, key: value})
  }
  const onChangeNameRelay = (e) =>{
    const value = e.target.value
    setRelay({...relay, name: value})
  }
  const onChangeUrlRelay = (e) =>{
    const value = e.target.value
    setRelay({...relay, url: value})
  }
  const onEditInStreamAds = () => {
    if (!valueNameContent){
      sendToast({message: ConfigText.LIVE.IMPORT_NAME_LIVE_ENTITY})
    }else {
      if (valueNameContent?.length < 3 || desc?.length < 3) {
        setError(true)
      }else {
        let arrRelay = []
        arrRelay.push(relay)
        const id = item?.id
        LiveEventApi.editLiveEntity(
            id,
            valueNameContent,
            desc,
            checkDvr,
            arrRelay,
            presetId?.key,
        ).then(res => {
          if (res?.success){
              LiveEventApi?.getListLiveEvent(rowPerPage, currentPage*10).then(resp=>{
                const dataList = resp?.data
                if (resp?.success){
                  setCurrentPageList(dataList?.data?.events)
                }
              })
              dispatch(closePopup())
          }
        })
      }
    }
  }


  return(
    <>
    <CModal
      closeOnBackdrop={false}
      show={true} onClose={handleClose} centered={true}>
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">{ConfigText.LIVE.LIVE_EVENT_INFO}</h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <div className="pb-3 pt-3">
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.GENERAL.NAME}</CInputGroupText>
              </CInputGroupPrepend>
              <CInput type="text"
                      placeholder={ConfigText.LIVE.NAME_LIVE_ENTITY}
                      value={valueNameContent}
                      maxLength={100}
                      minLength={3}
                      onChange={onChangeNameLiveEntity}  />
            </CInputGroup>
          </div>
          <div className="pb-3">
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.DVR}</CInputGroupText>
              </CInputGroupPrepend>
              <CBadge >
                <CSwitch className={'mx-1'} color={'success'} labelOn={'ON'} labelOff={'OFF'}
                         onChange={onCheckedDvr}
                         checked={!!checkDvr}/>
              </CBadge>
            </CInputGroup>
          </div>
          <div  className="pb-3">
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.DESCRIPTION_INFO}</CInputGroupText>
              </CInputGroupPrepend>
              <CInput  type="text"
                       placeholder={ConfigText.LIVE.IMPORT_DESCRIPTION_INFO}
                       value={desc}
                       onChange={onChangeDescription}
                       maxLength={100}
                       minLength={3}/>
            </CInputGroup>
          </div>
          {error &&
            <p className="text" style={{color: 'red', textAlign: 'end'}}>{ConfigText.LIVE.ERR_CHARACTER_LIMIT}</p>
          }
          <div  className="pb-3">
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.PRESET_ID}</CInputGroupText>
              </CInputGroupPrepend>
              <CDropdown className="btn-group" style={{width: '138px'}}>
                <CDropdownToggle color="default" className='border inputLive color-white'>
                  <span className="text-filter" style={{ color: '#222', textTransform: 'uppercase' }}>{presetId?.name}</span>
                </CDropdownToggle>
                <CDropdownMenu>
                  <div>
                    {(ConfigData.dataPresetId || []).map((item, index) => {
                      return (
                          <CDropdownItem key={index} onClick={()=>onCLickPresetId(item)}>{item?.name}</CDropdownItem>
                      )
                    })
                    }
                  </div>
                </CDropdownMenu>
              </CDropdown>
            </CInputGroup>
          </div>
          <div className="pb-3">
            <CInputGroup>
              <CInputGroupPrepend>
                <CInputGroupText>{ConfigText.LIVE.REPLAY}</CInputGroupText>
              </CInputGroupPrepend>
              <div style={{width:'85%'}}>
                <CInput
                    className="inputLive inputKey"
                    type="text"
                    placeholder={ConfigText.LIVE.KEY_RELAY} onChange={onChangeKeyRelay}
                    value={relay?.key}
                    maxLength={100}
                    minLength={3}/>
                <CInput
                    className="inputLive inputName"
                    type="text"
                    placeholder={ConfigText.LIVE.NAME_RELAY} onChange={onChangeNameRelay}
                    value={relay?.name}
                    maxLength={100}
                    minLength={3}/>
                <CInput
                    className="inputLive inputUrl"
                    type="text"
                    placeholder={ConfigText.LIVE.URL_RELAY} onChange={onChangeUrlRelay}
                    value={relay?.url}
                    maxLength={100}
                    minLength={3}/>
              </div>
            </CInputGroup>
          </div>
        </CForm>
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end mt-3">
          <CButton className="pl-4 pr-4" color="success" onClick={()=>onEditInStreamAds()}>{ConfigText.GENERAL.SAVE}</CButton>
        </div>
      </CModalFooter>
    </CModal>
    </>
  )
}
export default PopupEditLiveEvent
