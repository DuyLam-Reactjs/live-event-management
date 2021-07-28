import React from 'react'
import {
  CHeader,
  CHeaderNav,
} from '@coreui/react'
import {TheHeaderDropdown}  from './index'

const TheHeader = (props) => {
  const {profile} = props

  return (
    <CHeader className="px-3 justify-content-end" withSubheader>
      <CHeaderNav >
        <TheHeaderDropdown profile={profile}/>
      </CHeaderNav>
    </CHeader>
  )
}

export default TheHeader
