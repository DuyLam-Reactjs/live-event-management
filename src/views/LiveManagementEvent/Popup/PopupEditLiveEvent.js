import React, {useEffect, useState} from 'react'
import {
  CBadge,
  CButton, CForm, CInput,
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



const PopupEditLiveEvent = ({item}) => {
  const [valueNameContent, setValueName] = useState(  item?.name || '')
  const [checkDvr, setDvr] = useState( false)
  const [desc, setDesc] = useState(  item?.description || '')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  console.log(item)
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
  const onEditInStreamAds = () => {
    if (!valueNameContent){
      sendToast({message: ConfigText.LIVE.IMPORT_NAME_LIVE_ENTITY})
    }else {
      if (valueNameContent?.length < 3 || desc?.length < 3) {
        setError(true)
      }else {
        const relay = [
          {
            "key": "",
            "name": "test11",
            "url": ""
          }
        ]
        const id = item?.id
        LiveEventApi.editLiveEntity(
            id,
            valueNameContent,
            desc,
            checkDvr,
            relay,
        ).then(res => {
          if (res.success){
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
      <CModalHeader style={{ backgroundColor: '#646464' }}>
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
