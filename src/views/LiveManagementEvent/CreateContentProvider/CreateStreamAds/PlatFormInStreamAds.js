import React, {useEffect, useState} from 'react'
import {CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const PlatformInStreamAds = (props) => {
  const {itemAds, onChangePlatform, dataInStreamAdsPlatForm} = props
  const {platform} = itemAds || {}
  const [value, setValue] = useState(platform || '')
  useEffect(()=>{
    setValue(platform)
  }, [platform])
  const onClick = (item) => {
    setValue(item.name)
    onChangePlatform && onChangePlatform(item)
  }
  return(
    <CCol>
      <p className="ml-1 mb-2">Platform</p>
      <div>
        <CDropdown className="m-1 btn-group">
          <CDropdownToggle  color="default" className='border' style={{width:'100px'}}>
            <span className="mr-2" style={{color: '#222'}}>{!value ? 'Tất cả' : value}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {dataInStreamAdsPlatForm && (dataInStreamAdsPlatForm || []).map((item , index)=>{
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
export default PlatformInStreamAds
