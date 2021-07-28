import React, {useState} from 'react'
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import {makeStyles} from "@material-ui/core/styles";
import {classUseStyles} from "../../../../helpers/common";

const useStyles = makeStyles(classUseStyles())
const AdsContentItem = (props) => {
  const { handleChangeAdsGroup, listAdsGroup, groupName, setGroupAds, onChangeAdsItem} = props
    const [focusInput, setFocus] = useState(true)
    const onFocus = () => {
        setFocus(false)
    }
    const onClick = (event, values) => {
    setGroupAds(values?.ads_group)
    handleChangeAdsGroup && handleChangeAdsGroup(values)
    onChangeAdsItem && onChangeAdsItem(values)
  }
  const classes = useStyles()
  return(
    <div className="pr-3">
        <p className="ml-1 mb-2">Ads group</p>
        <Autocomplete
              classes={classes}
              className={"color-white ml-1 mr-1"}
              options={listAdsGroup || []}
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
                                   label={groupName ? groupName : "Tất cả"}
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
    </div>
  )
}
export default AdsContentItem
