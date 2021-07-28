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


const TheHeaderDropdown = (props) => {
  const {profile} = props
  const isAdmin = profile?.role?.is_admin
  const dispatch = useDispatch()
  const Logout = () => {
    dispatch(openPopup({name: POPUP.NAME.USER.LOGOUT}))
  }
  return (
    <CDropdown
      inNav
      className="c-header-nav-items mx-2"
      direction="down"
      style={{fontSize: '1rem'}}
    >
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <span className='mt-1'><strong>{profile?.email}</strong></span>
        <div className="c-avatar">
          <CIcon size={'2xl'} name={'cil-user'} />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem to="/register">
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Register
        </CDropdownItem>
        <CDropdownItem to="/users">
          <CIcon name="cil-people" className="mfe-2" />
          Quản lý user
        </CDropdownItem>
        <CDropdownItem to="/change-password">
          <CIcon name="cil-lock-locked" className="mfe-2"/>
          Đổi mật khẩu
        </CDropdownItem>
        <CDropdownItem onClick={Logout}>
          <CIcon
              content={freeSet.cilAccountLogout}
              className="mfe-2"/>
          Đăng xuất
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown