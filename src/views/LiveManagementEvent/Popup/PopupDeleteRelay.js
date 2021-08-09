import React from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";
import ConfigText from "../../../config/ConfigText";

const PopupDeleteRelay = ({modal, setModal, arrRelay, setArrRelay, index, item}) => {


    const handleClose = () => {
        setModal(false)
    }
    const onDeleteGroupAds = () => {
        arrRelay.splice(index,1)
        const newArrRelay = [...arrRelay]
        setArrRelay(newArrRelay)
        setModal(false)
    }
    return(
        <CModal
            centered={true}
            show={modal}
            closeOnBackdrop={false}
        >
            <CModalHeader className="colorHeader">
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">{ConfigText.LIVE.DELETE_RELAY + " name : " + item?.name}</h4>
                    <CButton className='p-0 shadow-none' onClick={handleClose}>
                        <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
                    </CButton>
                </div>
            </CModalHeader>
            <CModalBody>
                <div >
                    {ConfigText.LIVE.DELETE_RELAY_TITLE}
                    <div className="d-flex justify-content-end mt-3">
                        <CButton className="pl-4 pr-4" color="danger" onClick={onDeleteGroupAds}>{ConfigText.GENERAL.DELETE}</CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PopupDeleteRelay
