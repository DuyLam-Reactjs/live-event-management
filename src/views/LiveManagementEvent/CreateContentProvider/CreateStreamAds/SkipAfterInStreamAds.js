import React, {useEffect, useState} from 'react'
import {CCol, CInput, CInputGroup} from "@coreui/react";

const SkipAfterInStreamAds = (props) => {
  const {itemAds, onChangeTimeSkip} = props
  const skipAfter = itemAds?.skip_after
  const [value, setValue] = useState(skipAfter || '')

  useEffect(()=>{
    setValue(skipAfter)
  }, [skipAfter])
  const onChange = event => {
    const val = event.target.value
    const isNumber = /^\d+$/.test(val)
    if (!isNumber && val) return
    setValue(val)
  }

  const onBlurInput = () => {
    onChangeTimeSkip && onChangeTimeSkip(value)
  }

  const onFocusInput = () => {
    onChangeTimeSkip && onChangeTimeSkip(value)
  }

  return(
    <CCol className="pr-0 pl-0">
      <p className="ml-1 mb-2">Skip sau (giây)</p>
      <div>
        <CInputGroup style={{width:'100px'}}>
          <CInput
              className="mt-1"
              type="text" value={value || ''} style={{color: '#222', width:'100px'}}
                  onChange={e=>onChange(e)}
                  onFocus={e=>onFocusInput(e)}
                  onBlur={e=>onBlurInput(e)}
                  />
        </CInputGroup>
      </div>
    </CCol>
  )
}
export default SkipAfterInStreamAds
