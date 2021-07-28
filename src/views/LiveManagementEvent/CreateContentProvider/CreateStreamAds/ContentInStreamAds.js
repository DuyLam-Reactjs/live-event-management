import React, {useEffect, useState} from 'react'
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle} from "@coreui/react";
import PopupContent from "../../Popup/PopupContent";


const ContentInStreamAds = (props) => {
  const {
    itemAds,
    dataInStreamAdsContent,
    setContent,
  } = props
  const [popupContent,setContentPopup] = useState(false)
  const {title} = itemAds?.content || {}
  const [value, setValue] = useState(title || '')
  useEffect(()=>{
    setValue(title)
  }, [title])

  const onClick = (item) => {
    if (item?.id !== 'all'){
      setContentPopup(!popupContent)
    }
    if (item?.id === 'all'){
      setValue(item?.name)
    }
  }
  return(
    <div className="pr-3">
      <p className="ml-1 mb-2">Content</p>
      <div>
        <CDropdown className="m-1 btn-group">
          <CDropdownToggle  color="default" className='border text-name-provider' style={{width:'100px'}}>
            <span className="mr-2" style={{color: '#222'}} title={value}>
              {!value ? 'Tất cả' : (value || 'Chọn nội dung')}
            </span>
          </CDropdownToggle>
          <CDropdownMenu>
            {dataInStreamAdsContent && (dataInStreamAdsContent || []).map((item , index)=>{
              return (
                <CDropdownItem
                    key={index} color={'white'}
                    onClick={()=>onClick(item)}>{item?.name}</CDropdownItem>
              )
            })
            }
          </CDropdownMenu>
        </CDropdown>
        {popupContent &&
          <PopupContent
            setValue={setValue}
            modal={popupContent}
            setModal={setContentPopup}
            content={itemAds.content}
            setContent={setContent}
          />
        }
      </div>
    </div>
  )
}

export default ContentInStreamAds
