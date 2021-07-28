import React, {useEffect, useState} from 'react'
import {CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";


const TypeInStreamAds = (props) => {
  const {itemAds, dataInStreamAdsType, onChangeType} = props
  const {type} =  itemAds || {}
  const [value, setValue] = useState(type || '')

  useEffect( ()=>{
    setValue(type)
  },[type])

  const onClick = async item => {
    await setValue(item?.name)
    onChangeType && onChangeType(item?.name)
  }
  return(
    <CCol>
      <p className="ml-1 mb-2">Loại</p>
        <CDropdown className="m-1 btn-group">
          <CDropdownToggle  color="default" className='border text-name-provider' style={{width: '100px'}}>
            <span className="mr-2" style={{color: '#222'}}>{value}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {dataInStreamAdsType && (dataInStreamAdsType || []).map((item , index)=>{
              return (
                <CDropdownItem
                  key={index}
                  onClick={()=>onClick(item)}
                >{item?.name}</CDropdownItem>
              )
            })}
          </CDropdownMenu>
        </CDropdown>
    </CCol>
  )
}
export default TypeInStreamAds
