import React, { useState} from 'react'
import { CDropdown, CDropdownToggle} from "@coreui/react";
import AutoCompleteMaterial from "../autoCompleteMaterialUI/AutoCompleteMaterial";


const AdsGroupContent = (props) => {
  const { handleChangeAdsGroup, listAdsGroup, } = props
  const [adsName, setAdsName] = useState('')
  return(
    <div className="pr-2">
      <p className="ml-1 mb-2">Ads group</p>
      { listAdsGroup ?
          <AutoCompleteMaterial
              name={adsName?.ads_group}
              setName={setAdsName}
              listData={listAdsGroup}
              handleChangeContent={handleChangeAdsGroup}
          />
          : <CDropdown className="m-1 btn-group" style={{width: '200px'}}>
            <CDropdownToggle color="default" className='border color-white'>
              <span className='padding-ads-dropdown' >{'Tất cả'}</span>
            </CDropdownToggle>
          </CDropdown>
      }


    </div>
  )
}

export default AdsGroupContent
