import React, {useEffect, useState} from 'react'
import {
  CBadge,
  CButton, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle, CForm, CImg, CInput,
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
import ConfigImage from "../../../config/ConfigImage";
import PopupEditRelay from "./PopupEditRelay";



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
  const [openPopupEditRelay, setEditRelay] = useState(false)
  const [itemRelay, setItemRelay] = useState('')
  const [relay, setRelay] = useState({
    key: '',
    name:'',
    url:''
  })
  const [error, setError] = useState(false)
  const [arrRelay, setArrRelay] = useState(item?.relay || [])
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
  const onDeleteRelayItem = (item, index) => {
    arrRelay.splice(index,1)
    const newArrRelay = [...arrRelay]
    setArrRelay(newArrRelay)
  }


  const onEditRelayItem = (item) => {
    setEditRelay(!openPopupEditRelay)
    setItemRelay(item)
  }

  const onSaveLiveEvent = () => {
    if (!valueNameContent){
      sendToast({message: ConfigText.LIVE.IMPORT_NAME_LIVE_ENTITY})
    }else {
      if (valueNameContent?.length < 3 || desc?.length < 3) {
        setError(true)
      }else {
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
            {arrRelay && (arrRelay || []).map((item, index)=>{

              return(
                  <CInputGroup style={{marginTop: '2px'}}>
                    <CInputGroupPrepend>
                      <CInputGroupText>{ConfigText.LIVE.REPLAY}</CInputGroupText>
                    </CInputGroupPrepend>
                    <div className="relay inputLive">
                      <p>key: {item?.key}</p>
                      <p>name: {item?.name}</p>
                      <p>url: {item?.url}</p>
                    </div>
                    <CButton className="btn inputLive inputName" color={'info'}  onClick={()=>onEditRelayItem(item, index)} >
                      <CImg src={ConfigImage.edit} alt="edit"/>
                    </CButton>
                    <CButton className="btn btn-danger inputLive"  onClick={()=>onDeleteRelayItem(item, index)} >
                      <CImg src={ConfigImage.deleteAds} alt="delete"/>
                    </CButton>
                  </CInputGroup>
              )
            })}
          </div>
          <PopupEditRelay
              modal={openPopupEditRelay}
              setModal={setEditRelay}
              item={itemRelay}
              arrRelay={arrRelay}
              setArrRelay={setArrRelay}
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end mt-3">
          <CButton className="pl-4 pr-4 btnLive" color="success" onClick={()=>onSaveLiveEvent()}>{ConfigText.GENERAL.SAVE}</CButton>
        </div>
      </CModalFooter>
    </CModal>
    </>
  )
}
export default PopupEditLiveEvent
