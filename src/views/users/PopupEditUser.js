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
import UserApi from "../../apis/userApi";

const PopupEditUser = (props) => {
  const { userItem, editField, setEditField} = props || {}
  const {email, id} = userItem || {}
  const dispatch = useDispatch()
  const [value, setValue] = useState(editField)

  const handleClose = () => {
      dispatch(closePopup())
  }
  const saveUser = (item) => {
    let data = [...value];
    const index = data.findIndex(obj => obj.id === item.id);
    UserApi.updateInfoUser(data[index].id, data[index].email, data[index].role).then(res => {
        if (res?.success){
            setEditField(data)
            dispatch(closePopup())
        }
    })
    }

    const handleChange = (item, e) => {
        let data = [...editField];
        const index = data.findIndex(obj => obj.id === item.id);
        data[index].role[e.target.name] = e.target.checked
        setEditField(data);
        setValue(data)
    }
  return (
    <CModal closeOnBackdrop={false} show={true} onClose={handleClose} centered={true} size={''}>
      <CModalHeader style={{ backgroundColor: '#646464' }}>
        <div className="w-100 d-flex justify-content-between align-items-center" style={{ color: "#FFF" }}>
          <h4 className="mb-0">User Name: {email} </h4>
          <CButton className='p-0 shadow-none' onClick={handleClose}>
            <CIcon name="cil-x" style={{ color: "#FFF" }}></CIcon>
          </CButton>
        </div>
      </CModalHeader>
      <CModalBody>
          <CFormGroup variant="custom-checkbox" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      defaultChecked={value?.find(i => i.id === userItem?.id)?.role?.read}
                      onChange={(e) => handleChange(userItem, e)}
                      id={id + "_1"}
                      name='read'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>Read</span>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      defaultChecked={value?.find(i => i.id === userItem?.id)?.role?.write}
                      onChange={(e) => handleChange(userItem, e)}
                      id={id + "_2"}
                      name='write'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>Write</span>
          </CFormGroup>
          <CFormGroup variant="custom-checkbox" inline>
              <CBadge >
                  <CSwitch
                      className={'mx-1'}
                      color={'success'}
                      labelOn={'ON'} labelOff={'OFF'}
                      defaultChecked={value?.find(i => i.id === userItem?.id)?.role?.is_admin}
                      onChange={(e) => handleChange(userItem, e)}
                      id={id + "_3"}
                      name='is_admin'
                  />
              </CBadge>
              <span className=' mt-2' style={{verticalAlign: 'super'}}>Admin</span>
          </CFormGroup>

      </CModalBody>
      <CModalFooter>
        <div className="d-flex justify-content-end">
          <CButton className="pl-4 pr-4" color="success" onClick={()=>saveUser(userItem)}>Lưu</CButton>
        </div>
      </CModalFooter>
    </CModal>
  )
}
export default PopupEditUser
