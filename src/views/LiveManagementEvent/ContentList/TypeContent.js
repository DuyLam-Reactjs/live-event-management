import React, {useState} from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const TypeContent = (props) => {
  const {typeFilter,handleChangeType } = props
  const [filter, setFilter] = useState('')
  const onClick = (item) => {
    setFilter(item.name)
    handleChangeType && handleChangeType(item)
  }

  return(
    <div className="pr-2">
        <p className="ml-1 mb-2">Loại nội dung</p>
        <CDropdown className="m-1 btn-group" style={{width: '138px'}}>
          <CDropdownToggle color="default" className='border color-white'>
            <span className="text-filter">{filter === '' ? 'Tất cả' : filter}</span>
          </CDropdownToggle>
          <CDropdownMenu className="mt-1" >
            <CDropdownItem onClick={()=>onClick(allData)}>{allData?.name}</CDropdownItem>
            <div>
              {typeFilter && (typeFilter || []).map((item, index) => {
                return (
                  <CDropdownItem key={index} onClick={() => onClick(item)}>{item?.name}</CDropdownItem>
                )
              })
              }
            </div>
          </CDropdownMenu>
        </CDropdown>
    </div>
  )
}
const allData = {id: '', name: 'Tất cả'}
export default TypeContent
