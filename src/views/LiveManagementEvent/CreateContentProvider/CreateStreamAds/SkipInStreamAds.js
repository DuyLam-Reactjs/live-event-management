import React, {useEffect, useState} from 'react';
import {CCol, CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";

const SkipInStreamAds = (props) => {
  const {itemAds, dataInStreamAdsSkip, onChangeSkip} = props
  const canSkip = itemAds?.can_skip
  const [value, setValue] = useState(canSkip || '')

  useEffect(()=>{
    setValue(canSkip)
  },[canSkip])
  const onClick = (item) => {
    setValue(item?.can_skip)
    onChangeSkip && onChangeSkip(item)
  }
  return(
    <CCol className="pl-0">
      <p className="ml-1 mb-2">Skip</p>
      <div>
        <CDropdown className="m-1 btn-group">
          <CDropdownToggle  color="default" className='border' style={{width: '100px'}}>
            <span className="mr-2" style={{color: '#222'}}>{value ? 'Có' : 'Không'}</span>
          </CDropdownToggle>
          <CDropdownMenu>
            {dataInStreamAdsSkip && (dataInStreamAdsSkip || []).map((item , index)=>{
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

export default SkipInStreamAds
