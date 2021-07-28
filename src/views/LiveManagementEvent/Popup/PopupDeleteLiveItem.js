import React from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {closePopup} from "../../../actions/popup";
import {useDispatch} from "react-redux";
import LiveEventApi from "../../../apis/liveEventApi";

const PopupDeleteAds = ({
    item,
    newData, setNewData, itemGroup, index
}) => {
    const dispatch = useDispatch()
    const nameItem = item?.name
    const handleClose = () => {
        dispatch(closePopup())
    }
    const onDeleteGroupAds = () => {
        const id  = item?.id
        if (id)
            LiveEventApi.deleteLiveEventById(id).then(res =>{
                if (res?.success){
                    const copyListInStreamAds = [...newData]
                    copyListInStreamAds.splice(index, 1)
                    setNewData(copyListInStreamAds)
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
            <CModalHeader style={{ backgroundColor: '#646464' }}>
                <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
                    <h4 className="mb-0">Xóa sự kiện: {nameItem}</h4>
                    <CButton className='p-0 shadow-none' onClick={handleClose}>
                        <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
                    </CButton>
                </div>
            </CModalHeader>
            <CModalBody>
                <div >
                    Bạn có muốn xóa sự kiện này ?
                    <div className="d-flex justify-content-end mt-3">
                        <CButton className="pl-4 pr-4" color="danger" onClick={onDeleteGroupAds}>Xóa</CButton>
                    </div>
                </div>
            </CModalBody>
        </CModal>
    )
}

export default PopupDeleteAds
