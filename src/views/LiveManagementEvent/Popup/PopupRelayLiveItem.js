import React, {useEffect} from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import ConfigTExt from "../../../config/ConfigText";

const PopupRelayLiveItem = ({
    item,
    currentPage,
    rowPerPage,
    setCurrentPageList
}) => {
    const dispatch = useDispatch()
    const nameItem = item?.name
    const handleClose = () => {
        dispatch(closePopup())
    }
    useEffect(()=>{
        const id  = item?.id
        if (id)
            LiveEventApi.relayLiveEventById(id).then(res =>{
                if (res?.success){
                    LiveEventApi.getListLiveEvent(rowPerPage,currentPage*10).then(resp=>{
                        const {data} = res?.data
                        if (res?.success){
                            setCurrentPageList(data?.events)
                        }
                    })
                    // dispatch(closePopup())
                }
            })
    },[])
    const onBlockEvent = () => {
        const id  = item?.id
        if (id)
            LiveEventApi.blockLiveEventById(id).then(res =>{
                if (res?.success){
                    LiveEventApi.getListLiveEvent(rowPerPage,currentPage*10).then(resp=>{
                        const {data} = res?.data
                        if (res?.success){
                            setCurrentPageList(data?.events)
                        }
                    })
                    dispatch(closePopup())
                }
            })
    }
    return(
        <CModal
            centered={true}
            show={true}
            closeOnBackdrop={false}
        >
            <CModalHeader className="colorHeader">
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">{ConfigTExt.LIVE.BLOCK_EVENT + ': ' + nameItem}</h4>
                    <CButton className='p-0 shadow-none' onClick={handleClose}>
                        <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
                    </CButton>
                </div>
            </CModalHeader>
            <CModalBody>
                <div >
                    {ConfigTExt.LIVE.BLOCK_EVENT_CURRENT}
                    <div className="d-flex justify-content-end mt-3">
                        <CButton className="pl-4 pr-4 btnLive"  onClick={onBlockEvent}>{ConfigTExt.GENERAL.BLOCK}</CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PopupRelayLiveItem
