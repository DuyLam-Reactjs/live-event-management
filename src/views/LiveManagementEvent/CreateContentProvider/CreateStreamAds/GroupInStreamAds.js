import React, {useEffect, useState} from 'react'
import {CCol, CInput, CInputGroup} from "@coreui/react";


const GroupInStreamAds = (props) => {
  const {itemAds, onChangeNameGroup} = props
  const {group} = itemAds || {}

  const [value, setValue] = useState( group || '')
  useEffect(()=>{
    const onHandleName = () => {
      setValue(group)
    }
    onHandleName()
  },[group])

  const onChange = event => {
    const name = event.target.value
    setValue(name)
  }

  const onBlurInput = () => {
    onChangeNameGroup && onChangeNameGroup(value)
  }

  const onFocusInput = () => {
    onChangeNameGroup && onChangeNameGroup(value)
  }


  return(
    <CCol className="pr-0">
      <p className="ml-1 mb-2">Nhóm</p>
        <CInputGroup style={{width: '100px'}}>
          <CInput className="mt-1"
                  type="text" value={value || ''}
                  style={{color: '#222'}}
                  onChange={e=>onChange(e)}
                  onFocus={e=>onFocusInput(e)}
                  onBlur={e=>onBlurInput(e)}
                  maxLength="128"/>
        </CInputGroup>
    </CCol>
  )
}
export default GroupInStreamAds
