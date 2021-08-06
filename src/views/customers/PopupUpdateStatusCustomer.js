import React, {useState} from "react";
import {
    CBadge,
    CButton,
    CFormGroup,
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader, CSwitch,

} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {useDispatch} from "react-redux";
import {closePopup} from "../../actions/popup";
import ConfigText from "../../config/ConfigText";
import CustomerApi from "../../apis/customerApi";
import customerApi from "../../apis/customerApi";


const PopupUpdateStatusCustomer = ({
   item,
   rowPerPage,
    currentPage,
    setCurrentPageList
   }) => {
  const {id, status, email } = item || {}
  const dispatch = useDispatch()
  const [value, setValue] = useState(status)

  const handleClose = () => {
      dispatch(closePopup())
  }

  const saveUser = () => {
      if (value === status) dispatch(closePopup())
      else{
          CustomerApi.updateStatusCustomer(id, value).then(res => {
              if (res?.success){
                  customerApi?.listCustomers(rowPerPage,  (currentPage-1)*10 ).then(resList => {
                      const data = resList?.data
                      if (resList?.success){
                          setCurrentPageList(data?.customers)
                          dispatch(closePopup())
                      }
                  })
              }
          })
      }
    }

    const handleChange = (e) => {
        const {value}= e.target
        setValue(parseInt(value))
    }

  return (
    <CModal closeOnBackdrop={false} show={true} onClose={handleClose} centered={true} size={'lg'}>
      <CModalHeader className="colorHeader">
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">User Name: {email} </h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
          <CFormGroup variant="custom-radio" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      type="radio"
                      value={0}
                      checked={value === 0 ? true : false}
                      onChange={(e) => handleChange(e)}
                      id={id + "_1"}
                      name='status'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>{ConfigText.CUSTOMER.NOT_ACTIVE_CUSTOMER}</span>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      type="radio"
                      value={1}
                      checked={value === 1 ? true : false}
                      onChange={(e) => handleChange(e)}
                      id={id + "_2"}
                      name='status'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>{ConfigText.CUSTOMER.ACTIVE_CUSTOMER}</span>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      type="radio"
                      checked={value === -1 ? true : false}
                      value={-1}
                      onChange={(e) => handleChange( e)}
                      id={id + "_3"}
                      name='status'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>{ConfigText.CUSTOMER.LOCK_CUSTOMER}</span>
          </CFormGroup>
          <CFormGroup variant="custom-radio" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      type="radio"
                      checked={value === -2 ? true : false}
                      value={-2}
                      onChange={(e) => handleChange(e)}
                      id={id + "_4"}
                      name='status'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>{ConfigText.CUSTOMER.DELETE}</span>
          </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton className="pl-4 pr-4 btnLive" onClick={()=>saveUser(item)}>Lưu</CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}
export default PopupUpdateStatusCustomer
