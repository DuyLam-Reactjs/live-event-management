import React, {useEffect, useState} from 'react';
import {CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const StatusInStreamAds = (props) => {
  const {itemAds, dataInStreamAdsStatus, onChangeStatus} = props
  const {status} = itemAds || {}
  const [value, setValue] = useState(status || '')
  useEffect(()=>{
    setValue(status)
  },[status])
  const onClick = (item) => {
    setValue(item.status)
    onChangeStatus && onChangeStatus(item)
  }
  return(
    <CCol >
      <p className="ml-1 mb-2">Trạng thái</p>
      <div>
        <CDropdown className="m-1 btn-group" style={{width: '100px'}}>
          <CDropdownToggle  color="default" className='border'>
            <span className="mr-2" style={{color: '#222'}}>{value === 1 ? 'Hiện' : 'Ẩn'}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {dataInStreamAdsStatus && (dataInStreamAdsStatus || []).map((item , index)=>{
              return (
                <CDropdownItem key={index} onClick={()=>onClick(item)}>{item?.name}</CDropdownItem>
              )
            })
            }
          </CDropdownMenu>
        </CDropdown>
      </div>
    </CCol>
  )
}

export default StatusInStreamAds
