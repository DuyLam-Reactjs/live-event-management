import React from 'react'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {useDispatch} from "react-redux";
import {openPopup} from "../actions/popup";
import {POPUP} from "../constants/constants";
import {freeSet} from "@coreui/icons";
import ConfigText from "../config/ConfigText";
import {handleLocalStorage} from "../helpers/common";
import LocalStorage from "../config/LocalStorage";


const TheHeaderDropdown = ({profile}) => {
  const {id, email, status} = profile?.data || {}
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(openPopup({name: POPUP.NAME.CUSTOMER.LOGOUT}))
  }
  const handleUpdateCustomer = () => {
    dispatch(openPopup({
      name: POPUP.NAME.CUSTOMER.UPDATE_CUSTOMER,
      id, status, email
    }))
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
      style={{fontSize: '1rem'}}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false} style={{color: '#fff'}}>
        <span className='mt-1'><strong>{email}</strong></span>
        <div className="c-avatar">
          <CIcon  size={'3xl'} name={'cil-user'}/>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        {/*<CDropdownItem to="/create-customer">*/}
        {/*  <CIcon name="cil-lock-locked" className="mfe-2"/>*/}
        {/*  Create Customer*/}
        {/*</CDropdownItem>*/}
        <CDropdownItem to="/customers">
          <CIcon name="cil-people" className="mfe-2" />
          {ConfigText.CUSTOMER.MANAGE_CUSTOMER}
        </CDropdownItem>
        <CDropdownItem onClick={handleUpdateCustomer}>
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Đổi mật khẩu
        </CDropdownItem>
        <CDropdownItem onClick={Logout}>
          <CIcon
              content={freeSet.cilAccountLogout}
              className="mfe-2"/>
          {ConfigText.CUSTOMER.LOGOUT}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
