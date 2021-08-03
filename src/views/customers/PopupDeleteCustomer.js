import React from "react";
import {CButton, CModal, CModalBody, CModalHeader} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import customerApi from "../../apis/customerApi";
import ConfigText from "../../config/ConfigText";

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
          <h4 className="mb-0">{ConfigText.CUSTOMER.DELETE_CUSTOMER}</h4>
          <CButton className='p-0 shadow-none' onClick={onClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
        <div >
          {ConfigText.CUSTOMER.DELETE_CUSTOMER_CURRENT}
          <div className="d-flex justify-content-end mt-3">
            <CButton className="pl-4 pr-4" color="danger" onClick={handleDelete}>{ConfigText.GENERAL.DELETE}</CButton>
          </div>
        </div>
      </CModalBody>
    </CModal>
  )
}

export default PopupDeleteCustomer
