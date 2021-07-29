import React from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import customerApi from "../../apis/customerApi";

const PopupDeleteCustomer = (props) => {
  const {
    item,
    currentPage,
    rowPerPage,
    setCurrentPageList
  } = props || {}

  const dispatch = useDispatch()
  const onClose = () => {
    dispatch(closePopup())
  }
  const handleDelete = () => {
    if (item) {
      customerApi?.deleteCustomer(item?.id).then(res => {
        if(res?.success){
          customerApi?.listCustomers(currentPage, rowPerPage).then(resList => {
            const data = resList?.data
            if (resList?.success){
              setCurrentPageList(data?.items)
              dispatch(closePopup())
            }
          })
        }
      })
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
          <h4 className="mb-0">Xóa Customer</h4>
          <CButton className='p-0 shadow-none' onClick={onClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        <div >
          Bạn có muốn xóa người dùng này ?
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>Xóa</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default PopupDeleteCustomer