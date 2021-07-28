import React, {useState} from 'react'
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const DropdownContentProvider = (props) => {
  const {newArrContentProvider, getListAdsGroups} = props || {}
  const [nameContentProvider, setNameContentProvider] = useState('')
  const onClick = (item) => {
    setNameContentProvider(item?.name)
    getListAdsGroups && getListAdsGroups(item?.id)
  }
  return(
    <CDropdown className="m-1 btn-group">
      <CDropdownToggle color="default" className='border'>
        <span className="mr-2" style={{ color: '#222' }}>{!nameContentProvider ? 'Chọn' : nameContentProvider }</span>
      </CDropdownToggle>
      <CDropdownMenu>
        { (newArrContentProvider || []).map((it, index) => {
          return (
            <CDropdownItem key={index} onClick={() => onClick(it)}>{it?.name}</CDropdownItem>
          )
        })
        }
      </CDropdownMenu>
    </CDropdown>
  )
}
export default DropdownContentProvider
