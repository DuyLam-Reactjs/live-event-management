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
import PopupDeleteRelay from "./PopupDeleteRelay";
import NameLiveEvent from "../CreateLiveEntity/NameLiveEvent";
import DvrLiveEvent from "../CreateLiveEntity/DvrLiveEvent";
import PresetIdLiveEvent from "../CreateLiveEntity/PresetIdLiveEvent";
import RelayListLiveEvent from "../CreateLiveEntity/RelayListLiveEvent";
import PopupAddRelay from "./PopupAddRelay";



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
  const [openDeleteRelay, setDeleteRelay] = useState(false)
  const [openPopupAdd, setPopupAdd] = useState(false)
  const [itemRelay, setItemRelay] = useState('')
  const [indexItemRelay, setIndexItemRelay] = useState('')

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
    setIndexItemRelay(index)
    setDeleteRelay(!openDeleteRelay)
    setItemRelay(item)
  }
  const onAddRelay = () => {
    setPopupAdd(!openPopupAdd)
  }

  const onEditRelayItem = (item, index) => {
    setEditRelay(!openPopupEditRelay)
    setItemRelay(item)
    setIndexItemRelay(index)
  }
  const handleKeyPress = () => {
    setError('')
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
            <NameLiveEvent
                onChangName={onChangeNameLiveEntity}
                handleKeyPress={handleKeyPress}
                name={ConfigText.GENERAL.NAME}
                namePlaceHolder={ConfigText.LIVE.NAME_LIVE_ENTITY}
                value={valueNameContent}
            />
          </div>
          <div className="pb-3">
            <DvrLiveEvent
                onCheckedDvr={onCheckedDvr}
                checkDvr={checkDvr}
            />
          </div>
          <div  className="pb-3">
            <NameLiveEvent
                onChangName={onChangeDescription}
                handleKeyPress={handleKeyPress}
                name={ConfigText.LIVE.DESCRIPTION_INFO}
                namePlaceHolder={ConfigText.LIVE.IMPORT_DESCRIPTION_INFO}
                value={desc}
            />
          </div>
          {error &&
            <p className="text" style={{color: 'red', textAlign: 'end'}}>{ConfigText.LIVE.ERR_CHARACTER_LIMIT}</p>
          }
          <div  className="pb-3">
            <PresetIdLiveEvent
                name={ConfigText.LIVE.PRESET_ID}
                onCLickPresetId={onCLickPresetId}
                presetId={presetId}
            />
          </div>
          <div className="pb-3">
            <RelayListLiveEvent
                name={ConfigText.LIVE.REPLAY}
                title={ConfigText.LIVE.ADD_RELAY_TITLE}
                onAddRelay={onAddRelay}
                onDeleteRelayItem={onDeleteRelayItem}
                onEditRelayItem={onEditRelayItem}
                arrRelay={arrRelay}
            />
          </div>
          {openPopupAdd &&
            <PopupAddRelay
                modal={openPopupAdd} setModal={setPopupAdd}
                arrRelay={arrRelay}
                setArrRelay={setArrRelay}
            />
          }
          <PopupEditRelay
              modal={openPopupEditRelay} setModal={setEditRelay}
              item={itemRelay}
              arrRelay={arrRelay}
              setArrRelay={setArrRelay}
              index={indexItemRelay}
          />
          <PopupDeleteRelay
              modal={openDeleteRelay} setModal={setDeleteRelay}
              arrRelay={arrRelay}
              setArrRelay={setArrRelay}
              index={indexItemRelay}
              item={itemRelay}
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
