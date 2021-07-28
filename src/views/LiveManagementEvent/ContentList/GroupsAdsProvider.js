import React, {useState} from 'react'
import { CDropdown, CDropdownToggle} from "@coreui/react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {classUseStyles} from "../../../helpers/common";


const useStyles = makeStyles(classUseStyles())
const AdsGroupContent = (props) => {
  const { handleChangeAdsGroup, listAdsGroup, handleChangeAds, } = props
  const [adsName, setAdsName] = useState('')
  const [focusInput, setFocus] = useState(true)
  const onFocus = () => {
    setFocus(false)
  }
  const onClick = (event, values) => {
    setAdsName(values?.ads_group)
    handleChangeAds && handleChangeAds(values)
    handleChangeAdsGroup && handleChangeAdsGroup(values)
  }
  const classes = useStyles()
  return(
    <div className="pr-3">
        <p className="ml-1 mb-2">Ads group</p>
      { listAdsGroup ?
          <Autocomplete
              classes={classes}
              className={"color-white ml-1 mr-1"}
              // id="combo-box-demo"
              options={listAdsGroup}
              getOptionLabel={(option) => (option ? option?.ads_group : '')}
              onChange={onClick}
              onFocus={onFocus}
              size={"small"}
              style={{
                border: '1px solid #d8dbe0',
                marginTop: '11px',
                width: '138px'
              }}
              renderInput={(params) =>
                  focusInput
                      ? <TextField {...params}
                                   label={adsName ? adsName : "Tất cả"}
                                   variant="outlined"
                                   style={{height: '36px'}}
                      />
                      : <TextField
                          {...params}
                          variant="outlined"
                          style={{height: '36px'}}
                      />
              }
          />
          : <CDropdown className="m-1 btn-group" style={{width: '140px'}}>
            <CDropdownToggle color="default" className='border color-white'>
              <span className="text-filter" style={{ color: '#222' }}>{'Tất cả'}</span>
            </CDropdownToggle>
          </CDropdown>
      }
    </div>
  )
}
export default AdsGroupContent
