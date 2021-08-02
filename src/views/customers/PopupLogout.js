import React from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import {removeApiKey} from "../../helpers/common";

const PopupLogout = () => {

  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(closePopup())
  }

  const handleLogout = () => {
    removeApiKey()
  }
  return(
    <CModal
      centered={true}
      show={true}
      closeOnBackdrop={false}
    >
      <CModalHeader style={{ backgroundColor: '#646464' }}>
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">Đăng xuất</h4>
          <CButton className='p-0 shadow-none' onClick={onClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        <div >
          Bạn có chắc sẽ đăng xuất khỏi tài khoản này?
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4 mr-2" color="success" onClick={handleLogout}>Xác nhận</CButton>
            <CButton className="pl-4 pr-4" color="secondary" onClick={onClose}>Bỏ qua</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default PopupLogout
