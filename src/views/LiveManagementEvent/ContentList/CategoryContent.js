import React, {useState} from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const CategotyContent = (props) => {
  const {categoryFilter, handleChangeCategory} = props
  const [filter, setFilter] = useState('')
  const onClick = (item) => {
    setFilter(item?.name)
    handleChangeCategory && handleChangeCategory(item)
  }
  return(
    <div className="pr-2">
        <p className="ml-1 mb-2">Thể loại</p>
        <CDropdown className="m-1 btn-group" style={{width: '138px'}}>
          <CDropdownToggle color="default" className='border color-white'>
            <span className="text-filter" style={{ color: '#222' }}>{filter === '' ? 'Tất cả' : filter}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={()=>onClick(allData)}>{allData?.name}</CDropdownItem>
            <div>
              {categoryFilter && (categoryFilter || []).map((item, index) => {
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
export default CategotyContent
