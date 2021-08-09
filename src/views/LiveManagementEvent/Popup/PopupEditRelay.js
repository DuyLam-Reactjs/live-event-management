import React, {useEffect, useState} from "react";
import {
    CButton, CForm, CInput,
    CInputGroup,
    CInputGroupPrepend,
    CInputGroupText,
    CModal,
    CModalBody,
    CModalHeader,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import ConfigText from "../../../config/ConfigText";

const   PopupEditRelay = ({modal, setModal, arrRelay, setArrRelay, item, index}) => {
    const [relay, setRelay] = useState({
        key: item?.key || '',
        name: item?.name || '',
        url: item?.url || '',
    })
    useEffect(()=>{
        setRelay(item)
    },[item])

    const [error, setError] = useState('')

    const handleClose = () => {
        setModal(!modal)
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
    const handleKeyPress = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13){
            onSave && onSave()
        }
      setError('')
    }

    const onSave = () => {
        const newArrRelay = [...arrRelay]
        const {key, name, url} = relay
        if (key && name && url) {
            newArrRelay.splice(index, 1, relay)
            setArrRelay(newArrRelay)
            setModal(!modal)
        }else if (!key && !name && !url){
            setArrRelay(newArrRelay)
            setModal(!modal)
        }else setError(ConfigText.LIVE.ERR_RELAY)
    }

    return(
        <CModal
            centered={true}
            show={modal}
            closeOnBackdrop={false}
        >
            <CModalHeader className="colorHeader">
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">{ConfigText.LIVE.EDIT_RELAY_TITLE}</h4>
                    <CButton className='p-0 shadow-none' onClick={handleClose}>
                        <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
                    </CButton>
                </div>
            </CModalHeader>
            <CModalBody>
                <CForm>
                    <div className="pb-3">
                        <CInputGroup>
                            <CInputGroupPrepend>
                                <CInputGroupText>{ConfigText.LIVE.REPLAY}</CInputGroupText>
                            </CInputGroupPrepend>
                            <div style={{width:'85%'}}>
                                <CInput
                                    className="inputLive inputKey"
                                    type="text"
                                    placeholder={ConfigText.LIVE.KEY_RELAY}
                                    onChange={onChangeKeyRelay}
                                    onKeyPress={handleKeyPress}
                                    value={relay?.key}
                                    maxLength={100}
                                    minLength={3}/>
                                <CInput
                                    className="inputLive inputName"
                                    type="text"
                                    placeholder={ConfigText.LIVE.NAME_RELAY}
                                    onChange={onChangeNameRelay}
                                    onKeyPress={handleKeyPress}
                                    value={relay?.name}
                                    maxLength={100}
                                    minLength={3}/>
                                <CInput
                                    className="inputLive inputUrl"
                                    type="text"
                                    placeholder={ConfigText.LIVE.URL_RELAY}
                                    onChange={onChangeUrlRelay}
                                    onKeyPress={handleKeyPress}
                                    value={relay?.url}
                                    maxLength={100}
                                    minLength={3}/>
                            </div>
                        </CInputGroup>
                    </div>
                    {error &&
                    <p className="text text__error">{error}</p>
                    }
                </CForm>
                <div className="d-flex justify-content-end mt-3">
                    <CButton className="pl-4 pr-4 btnLive"  onClick={onSave} >{ConfigText.GENERAL.SAVE}</CButton>
                </div>
            </CModalBody>
        </CModal>
    )
}
export default PopupEditRelay