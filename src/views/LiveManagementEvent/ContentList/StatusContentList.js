import React, {useState} from 'react'
import {CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const StatusContentList = (props) => {
  const {status, data, onChangeStatus} = props
  const [value, setValue] = useState(data?.status)
  const onClick = (item)  => {
    if (item?.id === 'show') setValue(1)
    else setValue(0)
    onChangeStatus && onChangeStatus(item)
  }

  return(
    <CDropdown className="m-1 btn-group">
      <CDropdownToggle color="default" className='border' style={{width: '65px'}}>
        <span className="mr-2" style={{ color: '#222' }}>{value !== 0 ? 'Hiện' : 'Ẩn'}</span>
      </CDropdownToggle>
      <CDropdownMenu>
        { (status || []).map((it, index) => {
          return (
            <CDropdownItem key={index} onClick={() => onClick(it)}>{it?.name}</CDropdownItem>
          )
        })
        }
      </CDropdownMenu>
    </CDropdown>
  )
}

export default StatusContentList
