import React, {useEffect, useState} from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import ConfigTExt from "../../../config/ConfigText";
import {sendToast} from "../../../helpers/common";

const PopupReloadRelay = ({
    item,
    modal, setModal
}) => {
    const nameItem = item?.name

    const [idRelay, setIdRelay] = useState('')
    useEffect(()=>{
        const id = item?.id
        if (id)
        LiveEventApi.relayLiveEventById(id).then(res =>{
            const {data} = res?.data
            if (res?.success){
                setIdRelay(data?.rules?.id)
            }
        })
    },[])
    const handleClose = () => {
        setModal(false)
    }

    const onReloadEvent = () => {
        const id  = item?.id
        if (id && idRelay){
            LiveEventApi.reloadLiveEventById(id, idRelay).then(res =>{
                if (res?.success){
                    setModal(false)
                }
            })
        }else {
            sendToast({message: 'Không có giá trị Relay'})
        }

    }
    return(
        <CModal
            centered={true}
            show={modal}
            closeOnBackdrop={false}
        >
            <CModalHeader className="colorHeader">
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">{ConfigTExt.LIVE.RELOAD_EVENT + ': ' + nameItem}</h4>
                    <CButton className='p-0 shadow-none' onClick={handleClose}>
                        <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
                    </CButton>
                </div>
            </CModalHeader>
            <CModalBody>
                <div >
                    {ConfigTExt.LIVE.RELOAD_EVENT_CURRENT}
                    <div className="d-flex justify-content-end mt-3">
                        <CButton className="pl-4 pr-4 btnLive"  onClick={onReloadEvent}>{ConfigTExt.GENERAL.RELOAD}</CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PopupReloadRelay
