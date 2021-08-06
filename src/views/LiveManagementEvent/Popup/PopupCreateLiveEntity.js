import React, {useState} from "react";
import {
    CBadge,
    CDropdown,
    CButton, CForm, CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CModal,CDropdownItem,
    CModalBody,CDropdownMenu,
    CModalHeader, CSwitch,CDropdownToggle
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup, openPopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import {sendToast} from "../../../helpers/common";
import ConfigText from "../../../config/ConfigText";
import ConfigData from "../../../config/ConfigData";
import PopupAddRelay from "./PopupAddRelay";

const PopupCreateLiveEntity = ({
     currentPage,
     rowPerPage,
     setCurrentPageList
 }) => {

    const dispatch = useDispatch()

    const [valueNameContent, setValueName] = useState(  '')
    const [checkDvr, setDvr] = useState( false)
    const [desc, setDesc] = useState(  '')
    const [presetId, setPresetId] = useState({
        key: 'fhd',
        name: 'FHD'
    })
    const [relay, setRelay] = useState({
        key: '',
        name:'',
        url: '',
    })
    const [arrRelay, setArrRelay] = useState([])
    console.log(arrRelay)
    const [error, setError] = useState({
        name:'',
        relay:''
    })

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
    const handleKeyPress = () => {
      setError('')
    }

    const [openPopupAdd, setPopupAdd] = useState(false)
    const onAddRelay = () => {
        setPopupAdd(!openPopupAdd)
    }

    const onSave = () => {
        if (!valueNameContent){
            sendToast({message: ConfigText.LIVE.IMPORT_NAME_LIVE_ENTITY})
        }else {
            if (valueNameContent?.length < 3 || desc?.length < 3) {
                setError({...error, name: ConfigText.LIVE.ERR_CHARACTER_LIMIT})
            }else {
                let newArrRelay = [...arrRelay]
                const {key,name,url} = relay || {}
                if (key && name && url){
                    newArrRelay.push(relay)
                    LiveEventApi.setLiveEntity(
                        valueNameContent,
                        desc,
                        checkDvr,
                        newArrRelay,
                        presetId?.key,
                    ).then(res => {
                        const data = res?.data
                        if (data?.code === "SUCCESS"){
                            LiveEventApi?.getListLiveEvent(rowPerPage, currentPage*10).then(resp=>{
                                const dataList = resp?.data
                                if (resp?.success){
                                    setCurrentPageList(dataList?.data?.events)
                                }
                            })
                            dispatch(closePopup())
                        }
                    })
                }else if (!key && !name && !url){
                    LiveEventApi.setLiveEntity(
                        valueNameContent,
                        desc,
                        checkDvr,
                        newArrRelay,
                        presetId?.key,
                    ).then(res => {
                        const data = res?.data
                        if (data?.code === "SUCCESS"){
                            LiveEventApi?.getListLiveEvent(rowPerPage, currentPage*10).then(resp=>{
                                const dataList = resp?.data
                                if (resp?.success){
                                    setCurrentPageList(dataList?.data?.events)
                                }
                            })
                            dispatch(closePopup())
                        }
                    })
                }else {setError({...error, relay: ConfigText.LIVE.ERR_RELAY})}
            }
        }
    }

    return(
        <CModal
            centered={true}
            show={true}
            closeOnBackdrop={false}
        >
            <CModalHeader className="colorHeader">
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">{ConfigText.LIVE.CREATE_LIVE_ENTITY}</h4>
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
                                    placeholder= {ConfigText.LIVE.NAME_LIVE_ENTITY}
                                    onChange={onChangeNameLiveEntity}
                                    onKeypress={handleKeyPress}
                                    maxLength={100}
                                    minLength={3}/>
                        </CInputGroup>
                    </div>
                    <div className="pb-3">
                        <CInputGroup>
                            <CInputGroupPrepend>
                                <CInputGroupText>{'Dvr'}</CInputGroupText>
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
                                     onChange={onChangeDescription}
                                     onKeypress={handleKeyPress}
                                     maxLength={100}
                                     minLength={3}/>
                        </CInputGroup>
                    </div>
                    {error &&
                        <p className="text text__error" >{error?.name}</p>
                    }
                    <div  className="pb-3">
                        <CInputGroup>
                            <CInputGroupPrepend>
                                <CInputGroupText>{ConfigText.LIVE.PRESET_ID}</CInputGroupText>
                            </CInputGroupPrepend>
                            <CDropdown className="btn-group" style={{width: '138px'}}>
                                <CDropdownToggle color="default" className='border inputLive color-white'>
                                    <span className="text-filter" style={{ color: '#222' }}>{presetId?.name}</span>
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
                            <div style={{width:'71%'}}>
                                <CInput
                                    className="inputLive inputKey"
                                    type="text"
                                    placeholder={ConfigText.LIVE.KEY_RELAY}
                                    onChange={onChangeKeyRelay}
                                    onKeypress={handleKeyPress}
                                    maxLength={100}
                                    minLength={3}/>
                                <CInput
                                    className="inputLive inputName"
                                    type="text"
                                    placeholder={ConfigText.LIVE.NAME_RELAY}
                                    onChange={onChangeNameRelay}
                                    onKeypress={handleKeyPress}
                                    maxLength={100}
                                    minLength={3}/>
                                <CInput
                                    className="inputLive inputUrl"
                                    type="text"
                                    placeholder={ConfigText.LIVE.URL_RELAY}
                                    onChange={onChangeUrlRelay}
                                    onKeypress={handleKeyPress}
                                    maxLength={100}
                                    minLength={3}/>
                            </div>
                            <CInputGroupPrepend >
                                <CButton className="btnLive"  onClick={onAddRelay} >{ConfigText.LIVE.ADD_RELAY}</CButton>
                            </CInputGroupPrepend>
                            <PopupAddRelay
                                modal={openPopupAdd} setModal={setPopupAdd}
                                arrRelay={arrRelay}
                                setArrRelay={setArrRelay}
                            />
                        </CInputGroup>
                    </div>
                    {error &&
                    <p className="text text__error">{error?.relay}</p>
                    }
                </CForm>
                <div className="d-flex justify-content-end mt-3">
                    <CButton className="pl-4 pr-4 btnLive"  onClick={onSave} >{ConfigText.LIVE.CREATE_LIVE_ENTITY}</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}
export default PopupCreateLiveEntity