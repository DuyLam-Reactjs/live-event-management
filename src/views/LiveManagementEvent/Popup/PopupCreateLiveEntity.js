import React, {useState} from "react";
import {
    CBadge,
    CButton, CForm, CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText, CLink,
    CModal,
    CModalBody,
    CModalHeader, CSwitch
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import {sendToast} from "../../../helpers/common";
import ConfigText from "../../../config/ConfigText";

const PopupCreateCustomer = () => {

    const dispatch = useDispatch()

    const [valueNameContent, setValueName] = useState(  '')
    const [checkDvr, setDvr] = useState( false)
    const [desc, setDesc] = useState(  '')

    const [error, setError] = useState(false)

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

    const onSave = () => {
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
                const presetId = 'hd'
                LiveEventApi.setLiveEntity(
                    valueNameContent,
                    desc,
                    checkDvr,
                    relay,
                    presetId,
                ).then(res => {
                    if (res.success){
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
            <CModalHeader style={{ backgroundColor: '#646464' }}>
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
                                     placeholder={ConfigText.LIVE.IMPORT_DESCRIPTION_INFO} onChange={onChangeDescription}
                                     maxLength={100}
                                     minLength={3}/>
                        </CInputGroup>
                    </div>
                    {error &&
                    <p className="text" style={{color: 'red', textAlign: 'end'}}>{ConfigText.LIVE.ERR_CHARACTER_LIMIT}</p>
                    }
                </CForm>
                <div className="d-flex justify-content-end mt-3">
                    <CButton className="pl-4 pr-4 btn__live"  onClick={onSave} >{ConfigText.LIVE.CREATE_LIVE_ENTITY}</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PopupCreateCustomer
