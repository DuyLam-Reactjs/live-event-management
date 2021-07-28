import React from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";


const StatusContentItem = (props) => {
  const {status, setStatus, onChangeStatus} = props

  const onCLick = (item) => {
    setStatus &&  setStatus(item?.status)
    onChangeStatus && onChangeStatus(item)
  }
  return(
    <div className="pr-3">
        <p className="ml-1 mb-2">Status</p>
        <CDropdown className="m-1 btn-group" style={{width:'140px'}}>
          <CDropdownToggle color="default" className='border color-white'>
            <span className="text-filter" style={{ color: '#222' }}>{status === 0 ? 'Ẩn' : 'Hiện'}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {Status && (Status || []).map((item, index) => {
              return (
                <CDropdownItem key={index} onClick={() => onCLick(item)}>{item?.name}</CDropdownItem>
              )
            })
            }
          </CDropdownMenu>
        </CDropdown>
    </div>
  )
}
const Status = [
  {id: 'show', name: 'Hiện', status: 1},
  {id: 'hide', name: 'Ẩn', status: 0}
]
export default StatusContentItem
