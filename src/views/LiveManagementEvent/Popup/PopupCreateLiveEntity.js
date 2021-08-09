import React, {useState} from "react";
import {
    CButton, CForm,
    CModal,
    CModalBody,
    CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import {sendToast} from "../../../helpers/common";
import ConfigText from "../../../config/ConfigText";
import PopupAddRelay from "./PopupAddRelay";
import PopupEditRelay from "./PopupEditRelay";
import NameLiveEvent from "../CreateLiveEntity/NameLiveEvent";
import DvrLiveEvent from "../CreateLiveEntity/DvrLiveEvent";
import PresetIdLiveEvent from "../CreateLiveEntity/PresetIdLiveEvent";
import RelayListLiveEvent from "../CreateLiveEntity/RelayListLiveEvent";
import PopupDeleteRelay from "./PopupDeleteRelay";

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
    const [arrRelay, setArrRelay] = useState([])

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
    const handleKeyPress = () => {
      setError('')
    }

    const [openPopupAdd, setPopupAdd] = useState(false)
    const onAddRelay = () => {
        setPopupAdd(!openPopupAdd)
    }

    const [openPopupEditRelay, setEditRelay] = useState(false)
    const [openDeleteRelay, setDeleteRelay] = useState(false)
    const [itemRelay, setItemRelay] = useState('')
    const [indexItemRelay, setIndexItemRelay] = useState('')
    const onEditRelayItem = (item, index) => {
        setEditRelay(!openPopupEditRelay)
        setItemRelay(item)
        setIndexItemRelay(index)
    }
    const onDeleteRelayItem = (item, index) => {

        setDeleteRelay(!openDeleteRelay)
        setItemRelay(item)
        setIndexItemRelay(index)
    }
    const onSave = () => {
        if (!valueNameContent){
            sendToast({message: ConfigText.LIVE.IMPORT_NAME_LIVE_ENTITY})
        }else {
            if (valueNameContent?.length < 2 || desc?.length < 2) {
                setError({...error, name: ConfigText.LIVE.ERR_CHARACTER_LIMIT})
            }else {
                    LiveEventApi.setLiveEntity(
                        valueNameContent,
                        desc,
                        checkDvr,
                        arrRelay,
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
                        <NameLiveEvent
                            onChangName={onChangeNameLiveEntity}
                            handleKeyPress={handleKeyPress}
                            name={ConfigText.GENERAL.NAME}
                            namePlaceHolder={ConfigText.LIVE.NAME_LIVE_ENTITY}
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
                        />
                    </div>
                    {error &&
                        <p className="text text__error" >{error?.name}</p>
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
                <div className="d-flex justify-content-end mt-3">
                    <CButton className="pl-4 pr-4 btnLive"  onClick={onSave} >{ConfigText.LIVE.CREATE_LIVE_ENTITY}</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}
export default PopupCreateLiveEntity