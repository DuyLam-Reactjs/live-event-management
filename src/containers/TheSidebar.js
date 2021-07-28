import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem, CImg,
} from '@coreui/react'


// sidebar nav config
import navigation from './_nav'
import CIcon from "@coreui/icons-react";
import ConfigImage from "../config/ConfigImage";

const TheSidebar = () => {
  const dispatch = useDispatch()
  const show = useSelector(state => state.sidebarShow)
  return (
    <CSidebar
      show={show}
      onShowChange={(val) => dispatch({type: 'set', sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/live/content-live-list">
        <h2 className='c-sidebar-brand-full' style={{color:'#0AD418', margin: '2rem 1rem'}}>Live Management</h2>
        <CIcon
          className="c-sidebar-brand-minimized"
          src={ConfigImage.logo}
          height={15}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none"/>
    </CSidebar>
  )
}

export default
React.memo(TheSidebar)
